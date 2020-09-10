<template>
  <div class="scrap_pur">
    <div class="purchase_board">
      
      <div class="pbo1">
        <font>產品:</font>
        <el-input v-model="Input_product" placeholder="請選產品" class="pbo1_input1" readonly="readonly"></el-input>
        <font>數量:</font>
        <el-input v-model.number="Input_amount" placeholder='' class="pbo1_input2"></el-input>
      </div>

      <div class="pbo2">
        <el-button class="insertbut" @click="InsertTable()">輸入</el-button>
      </div>
    
    </div>

    <div class="purchase_table adjustANDdispose">
      <el-table
        :data="DisposeData"
        stripe:true border:true height="43vh" empty-text="請輸入資料">
        <el-table-column
          prop="product"
          label="產品">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="數量">
        </el-table-column>
      </el-table>
    </div>

    <div class="purchase_bottom">
      <el-button class="pb_back" @click="GoToRecord()">歷史紀錄</el-button>
      <el-button class="pb_delet" @click="DeletTable()">刪除</el-button>
      <el-button class="pb_confirm" @click="ConfirmInventory()">確認</el-button>
    </div>
  </div>
</template>

<script>
import Disposedataservice from "@/services/Disposedataservice.js"
import Productdataservice from "@/services/Productdataservice.js"

export default {
  data() {
    return {
      Input_product: null,  //輸入框的v-model
      Input_amount: null,

      LastIDNumber: null,
      IDMakeUp: null,
      ProInventory:null,
      
      DisposeData: [], //供el-table使用的資料

      ProductData_ID: null,

      SQLdispose: { //資料庫的dispose
        dispose_id: null,
        user_id: 'ADM001',
        dispose_dt: null,
        product:[]
      },

      SQLdispose_p_products: [],

      SQLchangeproduct: [],

      GetDate: new Date(), //日期函數
      Datenow: null //儲存現在日期
    }
  },


  methods: {
    GoToRecord() {
      this.$emit('GoToRecord', 'Dispose')
    },
    
    DeletTable() {
      Disposedataservice.deleteAll()
    },

    //將最大ID+1的前面補齊
    IDMakeUP() {
      switch(this.LastIDNumber.length) {
        case 1 :
          this.IDMakeUp = 'DSPR' + '' + this.DateID + '000'
          break;
        case 2 :
          this.IDMakeUp = 'DSPR' + '' + this.DateID + '00'
          break;
        case 3 :
          this.IDMakeUp = 'DSPR' + '' + this.DateID + '0'
          break;
        case 4 :
          this.IDMakeUp = 'DSPR' + '' + this.DateID
          break;
      }
      this.LastIDNumber = this.IDMakeUp + this.LastIDNumber
      console.log(this.LastIDNumber)
    },

    //取得最大的ID+1
    GetBiggestID() {
      Disposedataservice.getBigID()
        .then(response => {
          if(response.data) {
            this.LastIDNumber = String(Number(response.data.substr(12)) + 1);
          }
          else{
            this.LastIDNumber = '1'
          }
          this.IDMakeUP()
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    //點擊輸入的按鈕
    InsertTable() {
      if(!this.Input_product) {
        this.$notify({
            title: '警告',
            message: '請輸入產品',
            duration: 3000,
            type: 'warning',
            position: 'top-left',
            showClose: false
          });
      }
      else if(!this.Input_amount) {
        this.$notify({
            title: '警告',
            message: '請輸入報廢數量',
            duration: 3000,
            type: 'warning',
            position: 'top-left',
            showClose: false
          });
      }
      else {
        //將資料推到table裡
        this.DisposeData.push({product: this.Input_product, amount: this.Input_amount})
        //將資料寫進SQLdispose_p_products陣列 == raw的數量
        this.SQLdispose.product.push({dispose_id: this.LastIDNumber,product_id: this.ProductData_ID,amount: this.Input_amount,})
        this.SQLchangeproduct.push({product_inventory: (this.ProInventory-this.Input_amount)})
        //Input清空，除了總計
        this.InitalInput();
      }
    },

    //點擊確認送出進貨資料
    ConfirmInventory() {
      if(this.DisposeData) {
        //將進貨編號寫進SQL裡面
        this.SQLdispose.dispose_id = this.LastIDNumber
        //取得SQL的日期
        this.getDate();
        this.SQLdispose.dispose_dt = this.Datenow
        //送出SQLdispose
        Disposedataservice.create(this.SQLdispose)
          .then(response => {
            console.log(response.data)
            for(let i = 0;i < this.SQLdispose.product.length;i++) {
              Productdataservice.update(this.SQLdispose.product[i].product_id, this.SQLchangeproduct[i])
                .then(response => {
                  this.$notify({
                    title: '提示',
                    message: response.data.message,
                    duration: 3000,
                    type: 'success',
                    position: 'bottom-right',
                    showClose: false
                  });
                  this.$root.$emit('refresh');
                  this.GetBiggestID()
                  this.DisposeData = []
                  this.SQLdispose.product = []
                  this.SQLchangeproduct = []
                })
            }
          })
      }
    },

    //取得最新日期
    getDate() {
      this.Datenow = this.GetDate.getFullYear() + '-' + ('0'+ (this.GetDate.getMonth()+1)).substr(-2) + '-' + ('0'+ this.GetDate.getDate()).substr(-2) + ' ' + this.GetDate.getHours() + ':' + this.GetDate.getMinutes() + ":" + this.GetDate.getSeconds()
      this.DateID = this.GetDate.getFullYear()+ '' +('0'+ (this.GetDate.getMonth()+1)).substr(-2)+('0'+ this.GetDate.getDate()).substr(-2)
    },

    //InventoryTable點擊後的動作 1.取得product_id
    getcurrentID(ProName, ProID, ProInventory) {  //從InventoryTable取得選取的Product_ID
      this.Input_product = ProName;
      this.ProductData_ID = ProID
      this.ProInventory = ProInventory
    },

    //重製Input除了總計
    InitalInput() {
      this.Input_product = null
      this.Input_amount = null
    },
  },

  mounted() {
    this.$root.$on('currentproduct', (CurrentProduct) => {
      this.getcurrentID(CurrentProduct.product_name, CurrentProduct.product_id, CurrentProduct.product_inventory);
    });
    this.getDate()
    this.GetBiggestID()
  }
}


</script>

<style scoped src="@/assets/css/Inventory.css"></style>
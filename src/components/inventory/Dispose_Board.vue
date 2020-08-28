<template>
  <div class="scrap_pur">
    <div class="purchase_board">
      
      <div class="pbo1">
        <font>產品:</font>
        <el-input v-model="Input_product" placeholder="請點選右邊產品" class="pbo1_input1" readonly="readonly"></el-input>
        <font>數量:</font>
        <el-input v-model.number="Input_amount" placeholder='' class="pbo1_input2"></el-input>
      </div>

      <div class="pbo2">
        <el-button class="insertbut" @click="InsertTable()">輸入</el-button>
      </div>
    
    </div>

    <div class="purchase_table">
      <el-table
        :data="DisposeData"
        stripe:true border:true height="36vh" empty-text="請輸入資料">
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
      <el-button class="pb_back">返回</el-button>
      <el-button class="pb_delet" @click="DeletTable()">刪除</el-button>
      <el-button class="pb_confirm" @click="ConfirmInventory()">確認</el-button>
    </div>
  </div>
</template>

<script>
import Disposedataservice from "@/services/Disposedataservice.js"
import Dispose_p_productdataservice from "@/services/Dispose_p_productdataservice.js"
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
        dispose_date: null,
      },

      SQLdispose_p_products: [],

      SQLchangeproduct: [],

      GetDate: new Date(), //日期函數
      Datenow: null //儲存現在日期
    }
  },


  methods: {
    
    DeletTable() {
      Dispose_p_productdataservice.deleteAll()
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
            this.LastIDNumber = String(Number(response.data.dispose_id.substr(12)) + 1);
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
      //將資料推到table裡
      this.DisposeData.push({product: this.Input_product, amount: this.Input_amount})
      //將資料寫進SQLdispose_p_products陣列 == raw的數量
      this.SQLdispose_p_products.push({dispose_id: this.LastIDNumber,product_id: this.ProductData_ID,dispose_participate_product_amount: this.Input_amount,})
      this.SQLchangeproduct.push({product_inventory: (this.ProInventory-this.Input_amount)})
      //Input清空，除了總計
      this.InitalInput();
    },

    //點擊確認送出進貨資料
    ConfirmInventory() {
      if(this.DisposeData) {
        //將進貨編號寫進SQL裡面
        this.SQLdispose.dispose_id = this.LastIDNumber
        //取得SQL的日期
        this.getDate();
        this.SQLdispose.dispose_date = this.Datenow
        //送出SQLdispose
        Disposedataservice.create(this.SQLdispose)
        //console.log(this.SQLdispose)
        //送出每個SQLdispose_p_products
        for(let i = 0;i < this.SQLdispose_p_products.length;i++) {
          Dispose_p_productdataservice.create(this.SQLdispose_p_products[i])
          Productdataservice.update(this.SQLdispose_p_products[i].product_id, this.SQLchangeproduct[i])
          //console.log(this.SQLdispose_p_products[i])
        }
        
        //將table清空
        this.DisposeData = null
        //將進貨編號重啟
        this.GetBiggestID()
        this.$root.$emit('refresh');
      }
      this.DisposeData = []
      this.SQLdispose_p_products = []
      this.SQLchangeproduct = []
    },

    //取得最新日期
    getDate() {
      this.Datenow = this.GetDate.getFullYear() + '-' + ('0'+ (this.GetDate.getMonth()+1)).substr(-2) + '-' + ('0'+ this.GetDate.getDate()).substr(-2) + ' ' + this.GetDate.getHours() + ':' + this.GetDate.getMinutes() + ":" + this.GetDate.getSeconds()
      this.DateID = this.GetDate.getFullYear()+ '' +('0'+ (this.GetDate.getMonth()+1)).substr(-2)+('0'+ this.GetDate.getDate()).substr(-2)
    },

    //InventoryTable點擊後的動作 1.取得product_id
    getcurrentID(ProName, ProID, ProInventory) {  //從InventoryTable取得選取的Product_ID
      this.Input_product = ProID + ':' + ProName;
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
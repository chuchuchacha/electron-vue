<template>
  <div class="scrap_pur">
    <div class="purchase_board">
      
      <div class="pbo1">
        <font>產品:</font>
        <el-input v-model="Input_product" placeholder="請點選右邊產品" class="pbo1_input1" readonly="readonly"></el-input>
        <font>調整:</font>
        <el-input v-model.number="Input_amount" placeholder='' class="pbo1_input2"></el-input>
      </div>

      <div class="pbo2">
        <el-button class="insertbut" @click="InsertTable()">輸入</el-button>
      </div>
    
    </div>

    <div class="purchase_table">
      <el-table
        :data="AdjustData"
        stripe:true border:true height="36vh" empty-text="請輸入資料">
        <el-table-column
          prop="product"
          label="產品">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="數量">
        </el-table-column>
        <el-table-column
          prop="time"
          label="時間">
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
import Adjustdataservice from "@/services/Adjustdataservice.js"
import Adjust_p_productdataservice from "@/services/Adjust_p_productdataservice.js"

export default {
  data() {
    return {
      Input_product: null,  //輸入框的v-model
      Input_amount: null,

      LastIDNumber: null,
      IDMakeUp: null,
      
      AdjustData: [], //供el-table使用的資料

      ProductData_ID: null,

      SQLadjust: { //資料庫的adjust
        adjust_id: null,
        user_id: 'U00001',
        adjust_date: null,
      },

      SQLadjust_p_products: [],

      GetDate: new Date(), //日期函數
      Datenow: null //儲存現在日期
    }
  },


  methods: {
    
    DeletTable() {
      Adjust_p_productdataservice.deleteAll()
      Adjustdataservice.deleteAll()
    },

    //將最大ID+1的前面補齊
    IDMakeUP() {
      switch(this.LastIDNumber.length) {
        case 1 :
          this.IDMakeUp = 'ADJR' + '' + this.DateID + '000'
          break;
        case 2 :
          this.IDMakeUp = 'ADJR' + '' + this.DateID + '00'
          break;
        case 3 :
          this.IDMakeUp = 'ADJR' + '' + this.DateID + '0'
          break;
        case 4 :
          this.IDMakeUp = 'ADJR' + '' + this.DateID
          break;
      }
      this.LastIDNumber = this.IDMakeUp + this.LastIDNumber
      console.log(this.LastIDNumber)
    },

    //取得最大的ID+1
    GetBiggestID() {
      Adjustdataservice.getBigID()
        .then(response => {
          if(response.data) {
            this.LastIDNumber = String(Number(response.data.adjust_id.split('AD')[1]) + 1);
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
      this.AdjustData.push({product: this.Input_product, amount: this.Input_amount})
      //將資料寫進SQLadjust_p_products陣列 == raw的數量
      this.SQLadjust_p_products.push({adjust_id: this.LastIDNumber,product_id: this.ProductData_ID,adjust_participate_product_amount: this.Input_amount,})
      //Input清空，除了總計
      this.InitalInput();
    },

    //點擊確認送出進貨資料
    ConfirmInventory() {
      if(this.AdjustData) {
        //將進貨編號寫進SQL裡面
        this.SQLadjust.adjust_id = this.LastIDNumber
        //取得SQL的日期
        this.getDate();
        this.SQLadjust.adjust_date = this.Datenow
        //送出SQLadjust
        Adjustdataservice.create(this.SQLadjust)
        //console.log(this.SQLadjust)
        //送出每個SQLadjust_p_products
        for(let i = 0;i < this.SQLadjust_p_products.length;i++) {
          Adjust_p_productdataservice.create(this.SQLadjust_p_products[i])
          //console.log(this.SQLadjust_p_products[i])
        }
        
        //將table清空
        this.AdjustData = null
        //將進貨編號重啟
        this.GetBiggestID()
      }
    },

    //取得最新日期
    getDate() {
      this.Datenow = this.GetDate.getFullYear() + '-' + ('0'+ (this.GetDate.getMonth()+1)).substr(-2) + '-' + ('0'+ this.GetDate.getDate()).substr(-2) + ' ' + this.GetDate.getHours() + ':' + this.GetDate.getMinutes() + ":" + this.GetDate.getSeconds()
      this.DateID = this.GetDate.getFullYear()+ '' +('0'+ (this.GetDate.getMonth()+1)).substr(-2)+('0'+ this.GetDate.getDate()).substr(-2)
    },

    //InventoryTable點擊後的動作 1.取得product_id
    getcurrentID(ProName, ProID) {  //從InventoryTable取得選取的Product_ID
      this.Input_product = ProID + ':' + ProName;
      this.ProductData_ID = ProID
    },

    //重製Input除了總計
    InitalInput() {
      this.Input_product = null
      this.Input_amount = null
    },
  },

  mounted() {
    this.$root.$on('currentproduct', (CurrentProduct) => {
      this.getcurrentID(CurrentProduct.product_name, CurrentProduct.product_id);
    });
    this.getDate()
    this.GetBiggestID()
  }
}


</script>

<style scoped  src="@/assets/css/scrap_pur.css"></style>
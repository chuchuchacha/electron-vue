<template>
  <div class="scrap_pur">
    <div class="purchase_board">

      <div class="pbo1">
        <font>產品:</font>
        <el-input v-model="Input_product" placeholder="請點選右邊產品" class="pbo1_input1" readonly="readonly"></el-input>
        <font>數量:</font>
        <el-input v-model.number="Input_amount" placeholder='' class="pbo1_input2"></el-input>
        <font>單價:</font>
        <el-input v-model.number="Input_price" placeholder='' class="pbo1_input3"></el-input>
      </div>

      <div class="pbo2">
        <font>單位:</font>
        <el-select v-model="Input_units" placeholder="單位" class="pbo2_input1">
          <el-option v-for="Input_units in Input_Units" :key="Input_units.value" :label="Input_units.text"
          :value="Input_units.value">
          </el-option>
        </el-select>
        <font>折扣:</font>
        <el-input v-model.number="Input_discount" placeholder='' class="pbo2_input2"></el-input>
        <el-button class="insertbut" @click="InsertTable()">輸入</el-button>
      </div>

      <div class="pbo3">
        <font>總計:</font>
        <el-input v-model.number="Input_total" placeholder="" class="pbo3_input1" readonly="readonly"></el-input>
      </div>
    
    </div>

    <div class="purchase_table">
      <el-table
        :data="PurchaseData"
        stripe:true border:true height="36vh" empty-text="請輸入資料">
        <el-table-column
          prop="product"
          label="產品">
        </el-table-column>
        <el-table-column
          prop="unit"
          label="單位">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="數量">
        </el-table-column>
        <el-table-column
          prop="price"
          label="單價">
        </el-table-column>
        <el-table-column
          prop="discount"
          label="折扣">
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
import Purchasedataservice from "@/services/Purchasedataservice.js"
import Purchase_p_productdataservice from "@/services/Purchase_p_productdataservice.js"

export default {
  data() {
    return {
      Input_product: null,  //輸入框的v-model
      Input_amount: null,
      Input_units: null,
      Input_price: null,
      Input_discount: null,
      Input_total: null,

      LastIDNumber: null,
      IDMakeUp: null,
      
      PurchaseData: [], //供el-table使用的資料

      ProductData_ID: null,

      Input_Units: [  //供el-select使用的資料
        { text: '公斤', value: '公斤' },
        { text: '斤', value: '斤' },
      ],

      SQLpurchase: { //資料庫的purchase
        purchase_id: null,
        user_id: 'U00001',
        purchase_date: null,
        purchase_subtotal: null,
        purchase_discount: null,
        purchase_total: null
      },

      SQLpurchase_p_products: [],

      GetDate: new Date(), //日期函數
      Datenow: null //儲存現在日期
    }
  },


  methods: {
    
    DeletTable() {
      Purchasedataservice.deleteAll()
    },

    //將最大ID+1的前面補齊
    IDMakeUP() {
      switch(this.LastIDNumber.length) {
        case 1 :
          this.IDMakeUp = 'PU0000000000000'
          break;
        case 2 :
          this.IDMakeUp = 'PU000000000000'
          break;
        case 3 :
          this.IDMakeUp = 'PU00000000000'
          break;
        case 4 :
          this.IDMakeUp = 'PU0000000000'
          break;
        case 5 :
          this.IDMakeUp = 'PU000000000'
          break;
        case 6 :
          this.IDMakeUp = 'PU00000000'
          break;
        case 7 :
          this.IDMakeUp = 'PU0000000'
          break;
        case 8 :
          this.IDMakeUp = 'PU000000'
          break;
        case 9 :
          this.IDMakeUp = 'PU00000'
          break;
        case 10 :
          this.IDMakeUp = 'PU0000'
          break;
        case 11 :
          this.IDMakeUp = 'PU000'
          break;
        case 12 :
          this.IDMakeUp = 'PU00'
          break;
        case 13 :
          this.IDMakeUp = 'PU0'
          break;
        case 14 :
          this.IDMakeUp = 'PU'
          break;
      }
      this.LastIDNumber = this.IDMakeUp + this.LastIDNumber
      console.log(this.LastIDNumber)
    },

    //取得最大的ID+1
    GetBiggestID() {
      Purchasedataservice.getBigID()
        .then(response => {
          if(response.data) {
            this.LastIDNumber = String(Number(response.data.purchase_id.split('PU')[1]) + 1);
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
      this.PurchaseData.push({product: this.Input_product, unit: this.Input_units, amount: this.Input_amount, price: this.Input_price, discount: this.Input_discount})
      //將資料寫進SQLpurchase_p_products陣列 == raw的數量
      this.SQLpurchase_p_products.push({purchase_id: this.LastIDNumber,product_id: this.ProductData_ID,purchase_participate_product_unit: this.Input_units,purchase_participate_product_amount: this.Input_amount,purchase_participate_product_unit_price: this.Input_price})
      //將資料寫進SQLpurchase.purchase_subtotal物件 只有1個
      this.SQLpurchase.purchase_subtotal = this.SQLpurchase.purchase_subtotal + this.Input_price * this.Input_amount
      this.SQLpurchase.purchase_discount = this.SQLpurchase.purchase_discount + this.Input_discount
      this.SQLpurchase.purchase_total = this.SQLpurchase.purchase_subtotal - this.SQLpurchase.purchase_discount
      //將資料寫進Input的總計
      this.Input_total = this.SQLpurchase.purchase_total
      //Input清空，除了總計
      this.InitalInput();
    },

    //點擊確認送出進貨資料
    ConfirmInventory() {
      if(this.PurchaseData) {
        //將進貨編號寫進SQL裡面
        this.SQLpurchase.purchase_id = this.LastIDNumber
        //取得SQL的日期
        this.getDate();
        this.SQLpurchase.purchase_date = this.Datenow
        //送出SQLpurchase
        Purchasedataservice.create(this.SQLpurchase)
        //送出每個SQLpurchase_p_products
        for(let i = 0;i < this.SQLpurchase_p_products.length;i++) {
          Purchase_p_productdataservice.create(this.SQLpurchase_p_products[i])
        }
        
        //將table清空
        this.PurchaseData = null
        //將Input總計清空
        this.Input_total = null
        //將進貨編號重啟
        this.GetBiggestID()
      }
    },

    //取得最新日期
    getDate() {
      this.Datenow = this.GetDate.getFullYear() + '-' + (this.GetDate.getMonth()+1) + '-' + this.GetDate.getDate() + ' ' + this.GetDate.getHours() + ':' + this.GetDate.getMinutes() + ":" + this.GetDate.getSeconds()
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
      this.Input_units = null
      this.Input_price = null
      this.Input_discount = null
    },
  },

  mounted() {
    this.$root.$on('currentproduct', (CurrentProduct) => {
      this.getcurrentID(CurrentProduct.product_name, CurrentProduct.product_id);
    });

    this.GetBiggestID()
  }
}


</script>

<style scoped  src="@/assets/css/scrap_pur.css"></style>
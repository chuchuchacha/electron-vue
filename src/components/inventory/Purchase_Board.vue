<template>
  <div class="scrap_pur">
    <div class="purchase_board">
      
      <div class="pbo1">
        <font>產品:</font>
        <el-input v-model="Input_product" placeholder="請選產品" class="pbo1_input1" readonly="readonly"></el-input>
        <font>數量:</font>
        <el-input v-model.number="Input_amount" placeholder='' class="pbo1_input2"></el-input>
        <font>單位:</font>
        <el-select v-model="Input_units" placeholder="單位" class="pbo1_input3">
          <el-option v-for="Input_units in Input_Units" :key="Input_units.value" :label="Input_units.text"
          :value="Input_units.value">
          </el-option>
        </el-select>
      </div>

      <div class="pbo2">
        <font>單價:</font>
        <el-input v-model.number="Input_price" placeholder='' class="pbo2_input1"></el-input>
        <font>折扣:</font>
        <el-input v-model.number="Input_discount" placeholder='' class="pbo2_input2"></el-input>
        <font>總計:</font>
        <el-input v-model.number="Input_total" placeholder="" class="pbo2_input3" readonly="readonly"></el-input>
      </div>

      <div class="pbo3">
        <font>入庫數量:</font>
        <el-input v-model.number="Inventory_Units" placeholder='' class="pbo3_input1"></el-input>
        <font>{{Font_units}}</font>
        <el-button class="insertbut" @click="InsertTable()">輸入</el-button>
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
      <el-button class="pb_back" @click="GoToRecord()">歷史紀錄</el-button>
      <el-button class="pb_delet" @click="DeletTable()">刪除</el-button>
      <el-button class="pb_confirm" @click="ConfirmInventory()">確認</el-button>
    </div>
  </div>
</template>

<script>
import Purchasedataservice from "@/services/Purchasedataservice.js"
import Productdataservice from "@/services/Productdataservice.js"

export default {
  data() {
    return {
      Input_product: null,  //輸入框的v-model
      Input_amount: null,
      Input_units: null,
      Input_price: null,
      Input_discount: null,
      Input_total: null,
      Inventory_Units: null,
      Font_units: '(庫存單位)',

      LastIDNumber: null,
      IDMakeUp: null,

      ProInventory:null,
      
      PurchaseData: [], //供el-table使用的資料

      ProductData_ID: null,

      Input_Units: [  //供el-select使用的資料
        { text: '公斤', value: '公斤' },
        { text: '斤', value: '斤' },
      ],

      SQLpurchase: { //資料庫的purchase
        purchase_id: null,
        user_id: 'ADM001',
        purchase_dt: null,
        purchase_subtotal: null,
        purchase_discount: null,
        purchase_total: null,
        product: []
      },

      SQLpurchase_p_products: [],

      SQLchangeproduct: [],

      GetDate: new Date(), //日期函數
      Datenow: null, //儲存現在日期
      DateID: null
    }
  },


  methods: {
    GoToRecord() {
      this.$emit('GoToRecord', 'Purchase')
    },

    DeletTable() {
      Purchasedataservice.deleteAll()
      this.$root.$emit('refresh');
    },

    //將最大ID+1的前面補齊
    IDMakeUP() {
      switch(this.LastIDNumber.length) {
        case 1 :
          this.IDMakeUp = 'PURR' + '' + this.DateID + '000'
          break;
        case 2 :
          this.IDMakeUp = 'PURR' + '' + this.DateID + '00'
          break;
        case 3 :
          this.IDMakeUp = 'PURR' + '' + this.DateID + '0'
          break;
        case 4 :
          this.IDMakeUp = 'PURR' + '' + this.DateID
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
      if(!this.Inventory_Units) {
        this.$notify({
            title: '警告',
            message: '請輸入入庫數量',
            duration: 3000,
            type: 'warning',
            position: 'top-left',
            showClose: false
          });
      }
      else {
        //將資料推到table裡
        this.PurchaseData.push({product: this.Input_product, unit: this.Input_units, amount: this.Input_amount, price: this.Input_price, discount: this.Input_discount})
        //將資料寫進SQLpurchase_p_products陣列 == raw的數量
        this.SQLpurchase.product.push({purchase_id: this.LastIDNumber,product_id: this.ProductData_ID,unit: this.Input_units,amount: this.Input_amount,price: this.Input_price})
        this.SQLchangeproduct.push({product_inventory: (this.Inventory_Units+this.ProInventory)})
        //將資料寫進SQLpurchase.purchase_subtotal物件 只有1個
        this.SQLpurchase.purchase_subtotal = this.SQLpurchase.purchase_subtotal + this.Input_price * this.Input_amount
        this.SQLpurchase.purchase_discount = this.SQLpurchase.purchase_discount + this.Input_discount
        this.SQLpurchase.purchase_total = this.SQLpurchase.purchase_subtotal - this.SQLpurchase.purchase_discount
        //將資料寫進Input的總計
        this.Input_total = this.SQLpurchase.purchase_total
        //Input清空，除了總計
        this.InitalInput();
      }
      
    },

    //點擊確認送出進貨資料
    ConfirmInventory() {
      if(this.PurchaseData) {
        //將進貨編號寫進SQL裡面
        this.SQLpurchase.purchase_id = this.LastIDNumber
        //取得SQL的日期
        this.getDate();
        this.SQLpurchase.purchase_dt = this.Datenow
        console.log(this.SQLpurchase)
        //送出SQLpurchase
        Purchasedataservice.create(this.SQLpurchase)
          .then(response => {
            console.log(response.data)
            for(let i = 0;i < this.SQLpurchase.product.length;i++) {
              Productdataservice.update(this.SQLpurchase.product[i].product_id, this.SQLchangeproduct[i])
                .then(response => {
                  console.log(response.data)
                  this.$root.$emit('refresh');
                  this.GetBiggestID()
                  this.PurchaseData = []
                  this.SQLpurchase.product = []
                  this.SQLchangeproduct = []
                  this.Input_total = null
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
    getcurrentID(ProName, ProID, ProInventory, ProUnit) {  //從InventoryTable取得選取的Product_ID
      this.Input_product = ProName;
      this.ProductData_ID = ProID
      this.ProInventory = ProInventory
      this.Font_units = ProUnit
    },

    //重製Input除了總計
    InitalInput() {
      this.Input_product = null
      this.Input_amount = null
      this.Input_units = null
      this.Input_price = null
      this.Input_discount = null
      this.Inventory_Units = null
    },
  },

  mounted() {
    this.$root.$on('currentproduct', (CurrentProduct) => {
      this.getcurrentID(CurrentProduct.product_name, CurrentProduct.product_id, CurrentProduct.product_inventory, CurrentProduct.product_unit);
    });
    this.getDate()
    this.GetBiggestID()
  }
}


</script>

<style scoped src="@/assets/css/Inventory.css"></style>
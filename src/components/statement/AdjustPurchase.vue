<template>
  <div>
    <div class="AdjustPurchase">
      <font>進貨編號:</font>
      <el-input v-model="OnePurchase.purchase_id" readonly="readonly"></el-input>
      <font>進貨時間:</font>

      <el-select placeholder="年" v-model="Purchase_dt.year">
        <el-option v-for="year in years" :key="year.value" :label="year.text"
          :value="year.value">
        </el-option>
      </el-select>
      <font>年</font>

      <el-select placeholder="月" v-model="Purchase_dt.month" @change="MonthChange">
        <el-option v-for="month in monthes" :key="month.value" :label="month.text"
          :value="month.value">
        </el-option>
      </el-select>
      <font>月</font>

      <el-select placeholder="日" v-model="Purchase_dt.day">
        <el-option v-for="day in days" :key="day.value" :label="day.text"
          :value="day.value">
        </el-option>
      </el-select>
      <font>日</font>

      <font>進貨小計:</font>
      <el-input v-model="OnePurchase.purchase_subtotal" readonly="readonly"></el-input>

      <font>進貨折扣:</font>
      <el-input v-model="OnePurchase.purchase_discount" @change="DiscountChange"></el-input>

      <font>進貨總計:</font>
      <el-input v-model="OnePurchase.purchase_total" readonly="readonly"></el-input>

      <font>進貨產品:</font>
      <el-select placeholder="產品" v-model="Product_id" @change="ProductChange">
        <el-option v-for="product in products" :key="product.value"
        :label="product.text" :value="product.value">
        </el-option>
      </el-select>

      <font>進貨數量:</font>
      <el-input v-model="Purchase_amount" @change="InputChange"></el-input>

      <font>進貨單位:</font>
      <el-select placeholder="單位" v-model="Purchase_unit" @change="InputChange">
        <el-option v-for="unit in units" :key="unit.value"
        :label="unit.text" :value="unit.value">
        </el-option>
      </el-select>

      <font>進貨單價:</font>
      <el-input v-model="Purchase_unit_price" @change="InputChange"></el-input>

      <el-button @click="AdjustPurchase()">修改</el-button>
    </div>

    <div class="AdjustPurchase_Table">
      <el-table
        :data="AfterAdjust_TOP"
        stripe border height="13vh" empty-text="請修改進貨紀錄">
        <el-table-column
          align='center'
          prop="purchase_id"
          label="進貨編號">
        </el-table-column>
        <el-table-column
          align='center'
          prop="purchase_dt"
          label="進貨時間">
        </el-table-column>
        <el-table-column
          align='center'
          prop="purchase_subtotal"
          label="進貨小計">
        </el-table-column>
        <el-table-column
          align='center'
          prop="purchase_discount"
          label="進貨折扣">
        </el-table-column>
        <el-table-column
          align='center'
          prop="purchase_total"
          label="進貨總計">
        </el-table-column>
      </el-table>
      <el-table
        :data="AfterAdjust_BOT"
        stripe border height="37vh" empty-text="請修改進貨紀錄">
        <el-table-column
          align='center'
          prop="product_id"
          label="進貨產品">
        </el-table-column>
        <el-table-column
          align='center'
          prop="amount"
          label="進貨數量">
        </el-table-column>
        <el-table-column
          align='center'
          prop="unit"
          label="進貨單位">
        </el-table-column>
        <el-table-column
          align='center'
          prop="price"
          label="進貨單價">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Purchasedataservice from "@/services/Purchasedataservice.js"

export default {
  props: {
    //傳進的進貨id
    ChoosenName: {
      type:String,
      required: false,
    }
  },

  data() {
    return {
      //v-modle 單位/單價/產品編號/數量/
      Purchase_unit: null, 
      Purchase_unit_price: null,
      Product_id: null,
      Purchase_amount: null,
      //

      OnePurchase: { //要寫進SQL的物件
        purchase_id: null,
        user_id: 'ADM001',
        purchase_dt: null,
        purchase_subtotal: null,
        purchase_discount: null,
        purchase_total: null,
        product: []
      },

      //修改完成後的table資料
      AfterAdjust_TOP: [],
      AfterAdjust_BOT: [],

      //v-modle 日期年月日
      Purchase_dt: {
        year: null,
        month: null,
        day: null,
      },

      //select的年月日資料
      years: [],
      monthes: [
        {text: '01', value: '01'},
        {text: '02', value: '02'},
        {text: '03', value: '03'},
        {text: '04', value: '04'},
        {text: '05', value: '05'},
        {text: '06', value: '06'},
        {text: '07', value: '07'},
        {text: '08', value: '08'},
        {text: '09', value: '09'},
        {text: '10', value: '10'},
        {text: '11', value: '11'},
        {text: '12', value: '12'}
      ],
      days: [],
      //

      //select的進貨產品
      products: [],

      //傳入進貨id的進貨產品
      TargetProduct: [],

      //紀錄目前select選擇的產品
      ChoosenProduct: null,
      
      //單位的物件
      units: [  
        { text: '包', value: '包' },
        { text: '斤', value: '斤' },
        { text: '公斤', value: '公斤' }
      ],
    }
  },

  methods: {
    InputChange() {
      let a = 0
      for(let i = 0;i < this.TargetProduct.length; i++) {
        a += (this.TargetProduct[i].purchase_participate_product.purchase_participate_product_amount * this.TargetProduct[i].purchase_participate_product.purchase_participate_product_unit_price)
      }
      a -= (this.TargetProduct[this.ChoosenProduct].purchase_participate_product.purchase_participate_product_amount * this.TargetProduct[this.ChoosenProduct].purchase_participate_product.purchase_participate_product_unit_price)
      a += this.Purchase_amount * this.Purchase_unit_price
      this.OnePurchase.purchase_subtotal = Number(a)
      this.OnePurchase.purchase_total = Number(this.OnePurchase.purchase_subtotal - this.OnePurchase.purchase_discount)
      this.TargetProduct[this.ChoosenProduct].purchase_participate_product.purchase_participate_product_amount = this.Purchase_amount
      this.TargetProduct[this.ChoosenProduct].purchase_participate_product.purchase_participate_product_unit_price = this.Purchase_unit_price
      this.TargetProduct[this.ChoosenProduct].purchase_participate_product.purchase_participate_product_unit= this.Purchase_unit
    },
    DiscountChange() {
      this.OnePurchase.purchase_total = this.OnePurchase.purchase_subtotal - this.OnePurchase.purchase_discount
    },

    // 點擊修改進貨
    AdjustPurchase() {
      //將修改後的table資料清空 永遠只會記一筆
      this.AfterAdjust = []
      //將修要傳進SQL的進貨產品清空
      this.OnePurchase.product = []
      this.OnePurchase.purchase_subtotal = Number(this.OnePurchase.purchase_subtotal)
      this.OnePurchase.purchase_discount = Number(this.OnePurchase.purchase_discount)
      this.OnePurchase.purchase_total = Number(this.OnePurchase.purchase_total)
      //將年月日組合成SQL語法
      this.OnePurchase.purchase_dt = this.Purchase_dt.year + '-' + this.Purchase_dt.month + '-' + this.Purchase_dt.day
      for(let i = 0; i < this.TargetProduct.length; i++) {
        this.OnePurchase.product.push({product_id: this.TargetProduct[i].product_id,
        amount: this.TargetProduct[i].purchase_participate_product.purchase_participate_product_amount,
        unit: this.TargetProduct[i].purchase_participate_product.purchase_participate_product_unit,price: this.TargetProduct[i].purchase_participate_product.purchase_participate_product_unit_price})
      }
      console.log(this.OnePurchase)
      Purchasedataservice.update(this.OnePurchase.purchase_id,this.OnePurchase)
        .then(response => {
          //右上角產生訊息
          this.$notify({
            title: '提示',
            message: response.data.message + '，如有修改數量請記得修改庫存',
            duration: 3000,
            type: 'success',
            position: 'bottom-right',
            showClose: false
          });
          //將修改進貨資訊寫進table
          this.AfterAdjust_TOP = []
          this.AfterAdjust_BOT = []
          this.AfterAdjust_TOP.push({purchase_id: this.OnePurchase.purchase_id, purchase_subtotal: this.OnePurchase.purchase_subtotal,
            purchase_dt: this.OnePurchase.purchase_dt, purchase_discount: this.OnePurchase.purchase_discount, purchase_total: this.OnePurchase.purchase_total})
          for(let j = 0; j < this.OnePurchase.product.length; j++) {
            this.AfterAdjust_BOT.push({product_id: this.OnePurchase.product[j].product_id, amount: this.OnePurchase.product[j].amount, unit: this.OnePurchase.product[j].unit,
            price: this.OnePurchase.product[j].price})
          }
        })
    },

    // Select更改進貨產品
    ProductChange(val) {
      //比對是哪一筆的進貨產品，將選擇的該筆進貨產品的數量/單價/單位寫進Input
      for(let i = 0; i < this.TargetProduct.length; i++) {
        if(this.TargetProduct[i].product_id == val) {
          this.Purchase_amount = this.TargetProduct[i].purchase_participate_product.purchase_participate_product_amount
          console.log(this.TargetProduct[i].purchase_participate_product)
          this.Purchase_unit_price = this.TargetProduct[i].purchase_participate_product.purchase_participate_product_unit_price
          this.Purchase_unit = this.TargetProduct[i].purchase_participate_product.purchase_participate_product_unit
          //紀錄目前select選擇的產品
          this.ChoosenProduct = i
        }
      }
    },

    // Select更改月份，自動更改日期31.30.28
    MonthChange(val) {
      this.days = [] //清空日期的select物件
      let dayscount = null //日期 31.30.28
      if(val=='01' || val=='03' || val=='05' || val=='07' || val=='08' || val=='10' || val=='12') {
        dayscount = 31
      }
      if(val=='04' || val=='06' || val=='09' || val=='11') {
        dayscount = 30
      }
      if(val=='02') {
        dayscount = 28
      }
      for(let i = 1; i <= dayscount; i++) { //將不同日期push進日期的select物件
        let temp = ('0' + String(i)).substr(-2) //將個位數補零
        this.days.push({text: temp, value: temp})
      }
    },
  },
  
  mounted() {
    Purchasedataservice.get(this.ChoosenName) //根據PurchaseRecord傳進來的進貨id抓出該產品資料
      .then(response => {
        this.Purchase_dt.year = response.data.purchase_dt.split(' ')[0].split('-')[0] //抓出Input年
        this.Purchase_dt.month = response.data.purchase_dt.split(' ')[0].split('-')[1] //抓出Input月
        this.Purchase_dt.day = response.data.purchase_dt.split(' ')[0].split('-')[2] //抓出Input日
        this.OnePurchase.purchase_subtotal = response.data.purchase_subtotal //抓出Input小計
        this.OnePurchase.purchase_discount = response.data.purchase_discount //抓出Input折扣
        this.OnePurchase.purchase_total = response.data.purchase_total //抓出Input總計
        this.TargetProduct = response.data.products //抓出進貨產品放進TargetProduct
        for(let i = 0; i < response.data.products.length; i++) { //抓出進貨產品push進產品的select物件
          this.products.push({text: response.data.products[i].product_id + '=>' + response.data.products[i].product_name, value: response.data.products[i].product_id})
        }
        this.MonthChange(this.Purchase_dt.month) //根據進貨月更改日期select
      })
    this.OnePurchase.purchase_id = this.ChoosenName //將傳進來的進貨id放進OnePurchase.purchase_id
  }
}
</script>

<style scoped src="@/assets/css/StatementView.css"></style>
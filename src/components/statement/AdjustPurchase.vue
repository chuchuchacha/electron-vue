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
      <el-input v-model="OnePurchase.purchase_discount"></el-input>

      <font>進貨總計:</font>
      <el-input v-model="OnePurchase.purchase_total" readonly="readonly"></el-input>

      <font>進貨產品:</font>
      <el-select placeholder="產品" v-model="Purchase_id" @change="ProductChange">
        <el-option v-for="product in products" :key="product.value"
        :label="product.text" :value="product.value">
        </el-option>
      </el-select>

      <font>進貨數量:</font>
      <el-input v-model="Purchase_amount" @change="changesubtotal"></el-input>

      <font>進貨單位:</font>
      <el-select placeholder="單位" v-model="Purchase_unit">
        <el-option v-for="unit in units" :key="unit.value"
        :label="unit.text" :value="unit.value">
        </el-option>
      </el-select>

      <font>進貨單價:</font>
      <el-input v-model="Purchase_unit_price" @change="changesubtotal"></el-input>

      <el-button @click="AdjustPurchase()">修改</el-button>
    </div>

    <div class="AdjustPurchase_Table">
      <el-table
        :data="AfterAdjust"
        stripe border height="50vh" empty-text="請修改進貨紀錄">
        <el-table-column
          align='center'
          prop="purchase_id"
          label="編號">
        </el-table-column>
        <el-table-column
          align='center'
          prop="purchase_dt"
          label="時間">
        </el-table-column>
        <el-table-column
          align='center'
          prop="product_id"
          label="產品編號">
        </el-table-column>
        <el-table-column
          align='center'
          prop="amount"
          label="進貨數量">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Purchasedataservice from "@/services/Purchasedataservice.js"

export default {
  props: {
    ChoosenName: {
      type:String,
      required: false,
    }
  },

  data() {
    return {
      Purchase_unit: null,
      Purchase_unit_price: null,
      Purchase_id: null,
      Purchase_amount: null,
      purchase_product: null,
      
      OnePurchase: {
        purchase_id: null,
        user_id: 'ADM001',
        purchase_dt: null,
        purchase_subtotal: null,
        purchase_discount: null,
        purchase_total: null,
        product: []
      },

      AfterAdjust: [],

      Purchase_dt: {
        year: null,
        month: null,
        day: null,
      },

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

      products: [],

      TargetProduct: [],

      ChoosenProduct: null,

      units: [  //單位的物件
        { text: '包', value: '包' },
        { text: '斤', value: '斤' },
        { text: '公斤', value: '公斤' }
      ],
    }
  },

  methods: {
    changesubtotal() {
      this.OnePurchase.purchase_total = this.OnePurchase.purchase_subtotal - this.OnePurchase.purchase_discount
    },

    AdjustPurchase() {
      this.AfterAdjust = []
      this.OnePurchase.product = []
      this.OnePurchase.purchase_dt = this.Purchase_dt.year + '-' + this.Purchase_dt.month + '-' + this.Purchase_dt.day
      for(let i = 0; i < this.TargetProduct.length; i++) {
        this.OnePurchase.product.push({product_id: this.TargetProduct[i].product_id,
        amount: this.TargetProduct[i].purchase_participate_product.purchase_participate_product_amount,
        unit: this.Purchase_unit,
        price: this.Purchase_unit_price})
      }
      console.log(this.OnePurchase)
    },

    ProductChange(val) {
      for(let i = 0; i < this.TargetProduct.length; i++) {
        if(this.TargetProduct[i].product_id == val) {
          this.Purchase_amount = this.TargetProduct[i].purchase_participate_product.purchase_participate_product_amount
          this.Purchase_unit_price = this.TargetProduct[i].purchase_participate_product.purchase_participate_product_unit_price
          this.Purchase_unit = this.TargetProduct[i].purchase_participate_product.purchase_participate_product_unit
          this.ChoosenProduct = i
        }
      }
    },

    MonthChange(val) {
      this.days = []
      let dayscount = null
      if(val=='01' || val=='03' || val=='05' || val=='07' || val=='08' || val=='10' || val=='12') {
        dayscount = 31
      }
      if(val=='04' || val=='06' || val=='09' || val=='11') {
        dayscount = 30
      }
      if(val=='02') {
        dayscount = 28
      }
      for(let i = 1; i <= dayscount; i++) {
        let temp = ('0' + String(i)).substr(-2)
        this.days.push({text: temp, value: temp})
      }
    },
  },

  mounted() {
    Purchasedataservice.get(this.ChoosenName)
      .then(response => {
        console.log(response.data)
        this.Purchase_dt.year = response.data.purchase_dt.split(' ')[0].split('-')[0]
        this.Purchase_dt.month = response.data.purchase_dt.split(' ')[0].split('-')[1]
        this.Purchase_dt.day = response.data.purchase_dt.split(' ')[0].split('-')[2]
        this.OnePurchase.purchase_subtotal = response.data.purchase_subtotal
        this.OnePurchase.purchase_discount = response.data.purchase_discount
        this.OnePurchase.purchase_total = response.data.purchase_total
        this.TargetProduct = response.data.products
        for(let i = 0; i < response.data.products.length; i++) {
          this.products.push({text: response.data.products[i].product_id + '=>' + response.data.products[i].product_name, value: response.data.products[i].product_id})
        }
        this.MonthChange(this.Purchase_dt.month) 
      })
    this.OnePurchase.purchase_id = this.ChoosenName
  }
}
</script>

<style scoped src="@/assets/css/StatementView.css"></style>
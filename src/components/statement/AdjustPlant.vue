<template>
  <div>
    <div class="AdjustPlant">
      <font>種植編號:</font>
      <el-input v-model="OnePlant.plant_id" readonly="readonly"></el-input>
      <font>種植時間:</font>

      <el-select placeholder="年" v-model="Plant_dt.year">
        <el-option v-for="year in years" :key="year.value" :label="year.text"
          :value="year.value">
        </el-option>
      </el-select>
      <font>年</font>

      <el-select placeholder="月" v-model="Plant_dt.month" @change="MonthChange">
        <el-option v-for="month in monthes" :key="month.value" :label="month.text"
          :value="month.value">
        </el-option>
      </el-select>
      <font>月</font>

      <el-select placeholder="日" v-model="Plant_dt.day">
        <el-option v-for="day in days" :key="day.value" :label="day.text"
          :value="day.value">
        </el-option>
      </el-select>
      <font>日</font>

      <font>種植產品:</font>
      <el-select v-model="plant_product" placeholder="產品" @change="ProductChange">
        <el-option v-for="product in products" :key="product.value"
        :label="product.text" :value="product.value">
        </el-option>
      </el-select>
      <font>種植數量:</font>
      <el-input v-model="plant_amount" @change="AmountChange"></el-input>
      <font>盤</font>

      <el-button @click="AdjustPlant()">修改</el-button>
    </div>

    <div class="AdjustPlant_Table">
      <el-table
        :data="AfterAdjust"
        stripe border height="63vh" empty-text="請修改種植紀錄">
        <el-table-column
          align='center'
          prop="plant_id"
          label="編號">
        </el-table-column>
        <el-table-column
          align='center'
          prop="plant_dt"
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
          label="種植數量">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Plantdataservice from "@/services/Plantdataservice.js"

export default {
  props: {
    ChoosenName: {
      type:String,
      required: false,
    }
  },

  data() {
    return {
      OnePlant: {
        plant_id: null,
        user_id: 'ADM001',
        plant_dt: null,
        product: []
      },

      AfterAdjust: [],

      Plant_dt: {
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

      plant_amount: null,
      plant_product: null,
    }
  },

  methods: {
    AdjustPlant() {
      this.AfterAdjust = []
      this.OnePlant.product = []
      this.OnePlant.plant_dt = this.Plant_dt.year + '-' + this.Plant_dt.month + '-' + this.Plant_dt.day
      for(let i = 0; i < this.TargetProduct.length; i++) {
        this.OnePlant.product.push({product_id: this.TargetProduct[i].product_id,
        amount: this.TargetProduct[i].plant_participate_product.plant_participate_product_amount})
      }
      Plantdataservice.update(this.OnePlant.plant_id, this.OnePlant)
        .then(response => {
          console.log(response.data)
          for(let j = 0; j < this.OnePlant.product.length; j++) {
            this.AfterAdjust.push({plant_id: this.OnePlant.plant_id, plant_dt: this.OnePlant.plant_dt, 
            product_id: this.OnePlant.product[j].product_id, amount: this.OnePlant.product[j].amount})
          }
        })
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
    
    ProductChange(val) {
      for(let i = 0; i < this.TargetProduct.length; i++) {
        if(this.TargetProduct[i].product_id == val) {
          this.plant_amount = this.TargetProduct[i].plant_participate_product.plant_participate_product_amount
          this.ChoosenProduct = i
        }
      }
    },
    
    AmountChange(val) {
      this.TargetProduct[this.ChoosenProduct].plant_participate_product.plant_participate_product_amount = Number(val)
    }
  },

  mounted() {
    Plantdataservice.get(this.ChoosenName)
      .then(response => {
        this.OnePlant.plant_id = response.data.plant_id
        this.Plant_dt.year = response.data.plant_dt.split(' ')[0].split('-')[0]
        this.Plant_dt.month = response.data.plant_dt.split(' ')[0].split('-')[1]
        this.Plant_dt.day = response.data.plant_dt.split(' ')[0].split('-')[2]
        this.TargetProduct = response.data.products
        for(let i = 0; i < response.data.products.length; i++) {
          this.products.push({text: response.data.products[i].product_id + '=>' + response.data.products[i].product_name, value: response.data.products[i].product_id})
        }
        this.MonthChange(this.Plant_dt.month) 
      })
  },
}
</script>

<style scoped src="@/assets/css/StatementView.css"></style>
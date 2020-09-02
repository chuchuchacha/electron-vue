<template>
  <div>
    <div class="CreatePlanting">
      <font>產品:</font>
      <el-input readonly="readonly" v-model="Input_Product"></el-input>

       <font>數量:</font>
      <el-input v-model="Input_amount"></el-input>
      <font>盤</font>
      
      <font>種植時間:</font>

      <el-select placeholder="年" v-model="Input_Year">
        <el-option v-for="year in years" :key="year.value" :label="year.text"
          :value="year.value">
        </el-option>
      </el-select>
      <font>年</font>

      <el-select placeholder="月" v-model="Input_Month" @change="MonthChange">
        <el-option v-for="month in monthes" :key="month.value" :label="month.text"
          :value="month.value">
        </el-option>
      </el-select>
      <font>月</font>

      <el-select placeholder="日" v-model="Input_Day">
        <el-option v-for="day in days" :key="day.value" :label="day.text"
          :value="day.value">
        </el-option>
      </el-select>
      <font>日</font>

      <el-button @click="CreatePlanting()">輸入</el-button>

      <el-table
        :data="PlantingTable" stripe border 
        height="45vh" empty-text="請新增種植">
        <el-table-column
          prop="product_id"
          width="110px"
          label="產品">
        </el-table-column>
        <el-table-column
          prop="plant_participate_product_amount"
          width="110px"
          label="數量(盤)">
        </el-table-column>
        <el-table-column
          prop="plant_dt"
          label="時間">
        </el-table-column>
        <el-table-column
          fixed="right"
          label=""
          width="80px">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, PlantingTable)"
              type="text" class="DeleteButton">
              刪除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-button @click="SQLPlanting()">確認</el-button>
    </div>

    <div class="ProductTable">
      <font>種類:</font>
      <el-select placeholder="種類" v-model="Input_category" @change="ChangeType">
        <el-option v-for="category in categories" :key="category.value" :label="category.text"
          :value="category.value">
        </el-option>
      </el-select>
      <font>搜尋:</font>
      <el-input></el-input>
      <el-button>輸入</el-button>
      <el-table
        :data="AllProduct" @current-change="ProductChoosen" highlight-current-row
        stripe border height="75vh" empty-text="沒有產品">
        <el-table-column
          prop="product_id"
          label="編號">
        </el-table-column>
        <el-table-column
          prop="product_name"
          label="名稱">
        </el-table-column>
        <el-table-column
          prop="product_growth_period"
          label="生長期(天)">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Supplierdataservice from "@/services/Supplierdataservice.js"
import Productdataservice from "@/services/Productdataservice.js"
import ProductCategory from "@/services/ProductCategorydataservice.js"
import Plantdataservice from "@/services/Plantdataservice.js"

export default {
  data() {
    return {
      Input_amount: null,
      Input_Product: null,
      Input_Year: null,
      Input_Month: null,
      Input_Day: null,
      Input_category: null,

      PlantingTable:[],

      AllProduct: [],

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
      categories: [
        {text: '全部', value:'all'}
      ],

      temp: [],

      PlantProduct: [],

      SQLPlant: {
        plant_id: null,
        user_id: 'ADM001',
        plant_dt: null,
        product: []
      },

      GetDate: new Date(),
      DateID: null,
    }
  },

  methods: {
    IDMakeUP() {
      switch(this.LastIDNumber.length) {
        case 1 :
          this.IDMakeUp = 'PLTR' + '' + this.DateID + '000'
          break;
        case 2 :
          this.IDMakeUp = 'PLTR' + '' + this.DateID + '00'
          break;
        case 3 :
          this.IDMakeUp = 'PLTR' + '' + this.DateID + '0'
          break;
        case 4 :
          this.IDMakeUp = 'PLTR' + '' + this.DateID
          break;
      }
      this.LastIDNumber = this.IDMakeUp + this.LastIDNumber
    },

    GetBiggestID() {
      Plantdataservice.getBigID()
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
   
    CreatePlanting() {
      if(this.Input_Product && this.Input_amount) {
        this.PlantingTable.push({product_id: this.Input_Product,plant_participate_product_amount: this.Input_amount,plant_dt: this.Input_Year + '-' + this.Input_Month + '-' + this.Input_Day})
      }
    },

    SQLPlanting() {
      if(this.PlantingTable.length > 0) {
        //將進貨編號寫進SQL裡面
        this.SQLPlant.plant_id = this.LastIDNumber
        //取得SQL的日期
        this.SQLPlant.plant_dt = this.Input_Year + '-' + this.Input_Month + '-' + this.Input_Day

        for(let i = 0;i < this.PlantingTable.length; i++) {
          this.SQLPlant.product.push({product_id: this.PlantingTable[i].product_id.split(':')[0], amount: this.PlantingTable[i].plant_participate_product_amount})
        }
        //送出SQLPlant
        Plantdataservice.create(this.SQLPlant)
          .then(response => {
            console.log(response.data)
            this.$root.$emit('refresh');
            this.GetBiggestID()
            this.PlantingTable = []
            this.SQLPlant.product = []
          })
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

    deleteRow(index, rows) {
      rows.splice(index, 1);
    },

    ProductChoosen(val) {
      if(val) {
        this.Input_Product = val.product_id + ':' + val.product_name
        this.Input_Year = this.GetDate.getFullYear()
        this.Input_Month = ('0'+ (this.GetDate.getMonth()+1)).substr(-2)
        this.Input_Day = ('0'+ this.GetDate.getDate()).substr(-2)
        this.MonthChange(this.Input_Month)
      }
    },
    
    //取得進貨的產品，不要顯示在產品Table上
    GetSupplierProduct() {
      Supplierdataservice.getAll()
        .then(response => {
          for(let i = 0; i < response.data.length; i++) {
            this.temp.push({products: response.data[i].products})
            if(i == response.data.length - 1) {
              for(let j = 0; j < this.temp.length; j++) {
                for(let o = 0; o < this.temp[j].products.length; o++) {
                  this.PlantProduct.push(this.temp[j].products[o].product_id)
                }
              }
            }
          }
          this.GetAllProduct()
        })
    },

    GetAllProduct() {
      let same = true
      Productdataservice.getAll()
        .then(response => {
          for(let x = 0; x < response.data.length; x++) {
            for(let y = 0; y < this.PlantProduct.length; y++) {
              if(response.data[x].product_id == this.PlantProduct[y]) {
                same = false
              }
            }
            if(same == true) {
              this.AllProduct.push({product_id: response.data[x].product_id, 
              product_name: response.data[x].product_name, product_growth_period: response.data[x].product_growth_period})
            }
          }
        })
    },

    ChangeType() {
      this.AllProduct = []
      if(this.Input_category == 'all') {
        this.GetSupplierProduct()
      }
      else {
        let same = true
        Productdataservice.gettype(this.Input_category)
          .then(response => {
            for(let x = 0; x < response.data.length; x++) {
              for(let y = 0; y < this.PlantProduct.length; y++) {
                if(response.data[x].product_id == this.PlantProduct[y]) {
                  same = false
                }
              }
              if(same == true) {
                this.AllProduct.push({product_id: response.data[x].product_id, 
                product_name: response.data[x].product_name, product_growth_period: response.data[x].product_growth_period})
              }
            }
          })
          .catch(e => {
            console.log(e);
          })
      }
    },

    GoBack() {
      this.$emit('BackToMain')
    },
  },

  mounted() {
    this.$root.$on('GoBack', () => {
        this.GoBack();
    });

    ProductCategory.getAll()
      .then(response => {
        for(let i = 0; i<response.data.length ; i++) {
          this.categories.push({text: response.data[i].product_category_name , value: response.data[i].product_category_id})
        }
      })
      .catch(e => {
        console.log(e);
      })

    this.GetSupplierProduct()
    this.DateID = this.GetDate.getFullYear()+ '' +('0'+ (this.GetDate.getMonth()+1)).substr(-2)+('0'+ this.GetDate.getDate()).substr(-2)
    this.GetBiggestID()
  },
}
</script>

<style scoped src="@/assets/css/PlantingView.css"></style>
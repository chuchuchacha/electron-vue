<template>
  <div>
    <div class="ProductViewTable">

      <font>種類：</font>
      <el-select v-model="Product_types" placeholder="種類" @change="ChangeType">
        <el-option v-for="typeselect in types" :key="typeselect.value" :label="typeselect.text"
          :value="typeselect.value">
        </el-option>
      </el-select>

      <font>現在選擇產品: </font>
      <el-input v-model="ChoosenIdName"></el-input>
      <el-button @click="ChangeFunction()">修改</el-button>
      <el-button @click="DeleteProduct()">刪除</el-button>
    </div>

    <div class="FunctionRow">
      <el-table
        :data="AllProduct" @current-change="ChooseRow" highlight-current-row 
        stripe border height="75vh" empty-text="沒有產品">
        <el-table-column
          sortable
          :sort-orders="['ascending', 'descending']"
          align='center'
          width="90px"
          prop="product_id"
          label="編號">
        </el-table-column>
        <el-table-column
          align='center'
          width="130px"
          prop="product_name"
          label="名稱">
        </el-table-column>
        <el-table-column
          align='center'
          width="100px"
          prop="product_category_id"
          label="類別">
        </el-table-column>
        <el-table-column
          align='center'
          width="100px"
          prop="product_unit"
          label="單位">
        </el-table-column>
        <el-table-column
          align='center'
          width="100px"
          prop="product_unit_price"
          label="單價">
        </el-table-column>
        <el-table-column
          align='center'
          width="100px"
          prop="product_growth_period"
          label="生長期(天)">
        </el-table-column>
        <el-table-column
          align='center'
          width="100px"
          prop="product_expire"
          label="保存期(天)">
        </el-table-column>
        <el-table-column
          prop="product_desc"
          label="說明">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Productdataservice from "@/services/Productdataservice.js"
import ProductCategory from "@/services/ProductCategorydataservice.js"

export default {
  data() {
    return {
      AllProduct: [],

      Product_types: null,
      
      types: [
        {text: '全部' , value: 'all'}
      ],

      ChoosenRow: null,
      ChoosenIdName: null,
    }
  },

  methods: {
    //刪除產品
    DeleteProduct() {
      if(this.ChoosenRow) {
        Productdataservice.delete(this.ChoosenRow.product_id)
        this.GetAllProduct()
      }  
    },

    //類別改變的onchange
    ChangeType() {
      if(this.Product_types == 'all') {
        this.GetAllProduct()
      }
      else {
        Productdataservice.gettype(this.Product_types)
        .then(response => {
          this.AllProduct = response.data
          this.ChangeCategoryView(this.AllProduct.length)
        })
        .catch(e => {
          console.log(e);
        })
      }
    },

    //點擊修改產品
    ChangeFunction() {
      if(this.ChoosenRow) {
        this.$emit('ChangeFunction', 'AdjustProduct' , this.ChoosenRow);
      }
    },

    //點擊單個產品
    ChooseRow(val) {
      this.ChoosenRow = val
      this.ChoosenIdName = val.product_id + ':' + val.product_name
    },

    //取得所有產品
    GetAllProduct() {
      Productdataservice.getAll()
        .then(response => {
          this.AllProduct = response.data
          //將產品類別id轉成text
          this.ChangeCategoryView(this.AllProduct.length)
        })
        .catch(e => {
          console.log(e);
        })
    },

    //將產品類別id轉成text
    ChangeCategoryView() {
      for(let i = 0 ; i < this.AllProduct.length ; i++) {
        for(let j = 0 ; j < this.types.length ; j++) {
          if(this.AllProduct[i].product_category_id == this.types[j].value) {
            this.AllProduct[i].product_category_id = this.types[j].text
          }
        }
      }
    },
  },

  mounted() {
    //取得所有產品類別
    ProductCategory.getAll()
      .then(response => {
        for(let i = 0; i<response.data.length ; i++) {
          this.types.push({text: response.data[i].product_category_name , value: response.data[i].product_category_id})
        }
      })
      .catch(e => {
        console.log(e);
      })
    //取得所有產品
    this.GetAllProduct();
  }
}
</script>

<style scoped src="@/assets/css/ProductView.css"></style>
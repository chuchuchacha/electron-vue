<template>
  <div>
    <div class="ProductViewTable">
      <el-select v-model="Product_types" placeholder="種類">
        <el-option v-for="typeselect in types" :key="typeselect.value" :label="typeselect.text"
          :value="typeselect.value">
        </el-option>
      </el-select>
      <font>現在選擇產品: </font>
      <el-input v-model="ChoosenIdName"></el-input>
      <el-button @click="ChangeFunction()">修改</el-button>
    </div>
    <div class="FunctionRow">
      <el-table
        :data="AllProduct.filter(data => !Product_types || data.product_category_id.includes(Product_types))"
        @current-change="ChooseRow" highlight-current-row stripe border height="77vh" empty-text="沒有產品">
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
      types: [],

      ChoosenRow: null,
      ChoosenIdName: null,
    }
  },

  methods: {
    ChangeFunction() {
      if(this.ChoosenRow) {
        this.$emit('ChangeFunction', 'AdjustProduct' , this.ChoosenRow);
      }
    },

    ChooseRow(val) {
      this.ChoosenRow = val
      this.ChoosenIdName = val.product_id + ':' + val.product_name
    },

    GetAllProduct() {
      Productdataservice.getAll()
        .then(response => {
          this.AllProduct = response.data
          this.ChangeCategoryView(this.AllProduct.length)
        })
        .catch(e => {
          console.log(e);
        })
    },

    ChangeCategoryView() {
      for(let i = 0;i < this.AllProduct.length;i++){
        if(this.AllProduct[i].product_category_id =='PC001') {
        this.AllProduct[i].product_category_id = '葉菜類'
        }
        if(this.AllProduct[i].product_category_id =='PC002') {
          this.AllProduct[i].product_category_id = '根莖類'
        }
      }
    },
  },

  mounted() {
    ProductCategory.getAll()
      .then(response => {
        for(let i = 0; i<response.data.length ; i++) {
          this.types.push({text: response.data[i].product_category_name , value: response.data[i].product_category_name})
        }
      })
      .catch(e => {
        console.log(e);
      })
    this.GetAllProduct();
  }
}
</script>

<style scoped src="@/assets/css/ProductView.css"></style>
<template>
  <div class="adjustproduct">
    <div class="fieldOne">
      <font>編號:</font>
      <el-input v-model="AdjustProduct.product_id" readonly="readonly"></el-input>

      <font>名稱:</font>
      <el-input v-model="AdjustProduct.product_name"></el-input>

      <font>類別:</font>
      <el-select v-model="AdjustProduct.product_category_id" placeholder="種類">
          <el-option v-for="type in types" :key="type.value" :label="type.text"
          :value="type.value">
          </el-option>
      </el-select>

      <font>單位:</font>
      <el-select v-model="AdjustProduct.product_unit" placeholder="單位">
          <el-option v-for="product_unit in units" :key="product_unit.value" :label="product_unit.text"
          :value="product_unit.value">
          </el-option>
      </el-select>
    </div>

    <div class="fieldTwo">
      <font>單價:</font>
      <el-input v-model="AdjustProduct.product_unit_price"></el-input>

      <font>生長期(天):</font>
      <el-input v-model="AdjustProduct.product_growth_period"></el-input>

      <font>保存期(天):</font>
      <el-input v-model="AdjustProduct.product_expire"></el-input>
    </div>

    <div class="fieldThree">
      <font>說明:</font>
      <el-input v-model="AdjustProduct.product_desc" type="textarea"></el-input>

      <button @click="UpdateProduct()">修改產品</button>
    </div>

    <div class="CreateProduct_table">
      <el-table
        :data="CreateProduct"
        stripe border height="48vh" empty-text="未修改產品">
        <el-table-column
          prop="product_id"
          label="編號">
        </el-table-column>
        <el-table-column
          prop="product_name"
          label="名稱">
        </el-table-column>
        <el-table-column
          prop="product_category_id"
          label="類別">
        </el-table-column>
        <el-table-column
          prop="product_unit"
          label="單位">
        </el-table-column>
        <el-table-column
          prop="product_unit_price"
          label="單價">
        </el-table-column>
        <el-table-column
          prop="product_growth_period"
          label="生長期(天)">
        </el-table-column>
        <el-table-column
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
  props: {
    //ProductView丟進來的單個產品
    AdjustProduct: {
      type: Object,
      required: false,
    }
  },

  data() {
    return {
      //下面的table
      CreateProduct: [],
      origincategory: null,
      //類別
      types: [],

      //單位
      units: [
        { text: '包', value: '包' },
        { text: '斤', value: '斤' },
        { text: '公斤', value: '公斤' }
      ],
    };
  },
  methods: {
    //更新產品
    UpdateProduct() {
      if(this.origincategory == this.AdjustProduct.product_category_id) {
        for(let i = 0 ; i < this.types.length ; i ++) {
          if(this.AdjustProduct.product_category_id  == this.types[i].text) {
            this.AdjustProduct.product_category_id  = this.types[i].value
            Productdataservice.update(this.AdjustProduct.product_id, this.AdjustProduct)
              .then()
                this.ChangeCategory(this.AdjustProduct.product_category_id)
          }
        }
      }
      else {
        Productdataservice.update(this.AdjustProduct.product_id, this.AdjustProduct)
        .then()
          this.ChangeCategory(this.AdjustProduct.product_category_id)
      }  
    },

    //更改類別 將id換成text 再push進下面的table
    ChangeCategory(val) {
      for(let i = 0 ; i < this.types.length ; i ++) {
        if(val  == this.types[i].value) {
          val = this.types[i].text
          this.CreateProduct.push({product_id: this.AdjustProduct.product_id, product_name: this.AdjustProduct.product_name
          ,product_category_id: val,product_unit: this.AdjustProduct.product_unit, product_unit_price: this.AdjustProduct.product_unit_price,
          product_growth_period: this.AdjustProduct.product_growth_period, product_expire: this.AdjustProduct.product_expire,
          product_desc: this.AdjustProduct.product_desc})
        }
      }
    },
  },

  mounted() {
    //取的所有產品類別
    ProductCategory.getAll()
      .then(response => {
        for(let i = 0; i<response.data.length ; i++) {
          this.types.push({text: response.data[i].product_category_name , value: response.data[i].product_category_id})
        }
      })
      .catch(e => {
        console.log(e);
      })
    this.origincategory = this.AdjustProduct.product_category_id 
  },
}
</script>

<style scoped src="@/assets/css/ProductView.css"></style>
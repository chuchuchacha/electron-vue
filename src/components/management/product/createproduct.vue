<template>
  <div class="adjustproduct">
    <div class="fieldOne">
      <font>編號:</font>
      <el-input v-model="CreateProduct.product_id" readonly="readonly"></el-input>

      <font>名稱:</font>
      <el-input v-model="CreateProduct.product_name"></el-input>

      <font>類別:</font>
      <el-select v-model="CreateProduct.product_category_id" placeholder="種類">
          <el-option v-for="typeselect in types" :key="typeselect.value" :label="typeselect.text"
          :value="typeselect.value">
          </el-option>
      </el-select>

      <font>單位:</font>
      <el-select v-model="CreateProduct.product_unit" placeholder="單位">
          <el-option v-for="unit in units" :key="unit.value" :label="unit.text"
          :value="unit.value">
          </el-option>
      </el-select>
    </div>

    <div class="fieldTwo">
      <font>單價:</font>
      <el-input v-model="CreateProduct.product_unit_price"></el-input>

      <font>生長期(天):</font>
      <el-input v-model="CreateProduct.product_growth_period"></el-input>

      <font>保存期(天):</font>
      <el-input v-model="CreateProduct.product_expire"></el-input>
    </div>

    <div class="fieldThree">
      <font>說明:</font>
      <el-input v-model="CreateProduct.product_desc" type="textarea"></el-input>

      <button @click="CreateManagement()">新增產品</button>
    </div>

    <div class="CreateProduct_table">
      <el-table
        :data="AllProduct"
        stripe border height="45vh" empty-text="未新增產品">
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
  data() {
    return {
      LastIDNumber: null,
      IDMakeUp: null,

      AllProduct: [],

      CreateProduct: {  //為了寫進SQL的語法
        product_id: null,
        product_category_id: null,
        published_status_id: "L01",
        product_name: null,
        product_unit: null,
        product_unit_price: null,
        product_inventory: 0,
        product_desc: null,
        product_growth_period: null,
        product_expire: null,
        product_default_save_amount: 0,
        product_actual_save_amount: 0,
        product_online_unit: null,
        product_online_unit_price: 0,
        product_online_inventory: 0,
        product_online_max_inventory: 0
      },

      types: [],

      units: [  //單位的物件
        { text: '包', value: '包' },
        { text: '斤', value: '斤' },
        { text: '公斤', value: '公斤' }
      ],
    };
  },

  methods: {
    //我是新的method喔，抓最新的ID
    IDMakeUP() {
      switch(this.LastIDNumber.length) {
        case 1:
          this.IDMakeUp = 'PD000';
          break;
        case 2:
          this.IDMakeUp = 'PD00';
          break;
        case 3:
          this.IDMakeUp = 'PD0';
          break;
        case 4:
          this.IDMakeUp = 'PD';
          break;
      }
      this.LastIDNumber = this.IDMakeUp + this.LastIDNumber
      this.CreateProduct.product_id = this.LastIDNumber
    },

    GetBiggestID() {
      Productdataservice.getBigID()
        .then(response => {
          if(response.data) {
            this.LastIDNumber = String(Number(response.data.split('PD')[1]) + 1 );
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

    CreateManagement() {
      this.AllProduct.push({product_id: this.CreateProduct.product_id, product_name: this.CreateProduct.product_name, product_category_id: this.CreateProduct.product_category_id,
      product_unit: this.CreateProduct.product_unit, product_unit_price: this.CreateProduct.product_unit_price, product_growth_period: this.CreateProduct.product_growth_period,
      product_expire: this.CreateProduct.product_expire, product_desc: this.CreateProduct.product_desc})
      
      Productdataservice.create(this.CreateProduct)
        .then(response => {
          if(response.data) {
            this.InitailInput()
            this.GetBiggestID()
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    //我是新的method喔，抓最新的ID

    InitailInput() {
      this.CreateProduct.product_id = null
      this.CreateProduct.product_name = null
      this.CreateProduct.product_category_id = null
      this.CreateProduct.product_unit = null
      this.CreateProduct.product_unit_price = null
      this.CreateProduct.product_growth_period = null
      this.CreateProduct.product_expire = null
      this.CreateProduct.product_desc = null
    },
  },

  mounted() {
    ProductCategory.getAll()
      .then(response => {
        for(let i = 0; i<response.data.length ; i++) {
          this.types.push({text: response.data[i].product_category_name , value: response.data[i].product_category_id})
        }
      })
      .catch(e => {
        console.log(e);
      })
    this.GetBiggestID()
  }
};
</script>

<style scoped src="@/assets/css/ProductView.css"></style>
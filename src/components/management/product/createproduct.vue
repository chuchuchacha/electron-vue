<template>
  <div>
    <div class="fieldOne">
      <font>編號:</font>
      <el-input v-model="products.id" readonly="readonly"></el-input>

      <font>名稱:</font>
      <el-input v-model="products.name"></el-input>

      <font>類別:</font>
      <el-select v-model="products.category_id" placeholder="種類">
          <el-option v-for="typeselect in types" :key="typeselect.value" :label="typeselect.text"
          :value="typeselect.value">
          </el-option>
      </el-select>

      <font>單位:</font>
      <el-select v-model="products.unit" placeholder="單位">
          <el-option v-for="unit in units" :key="unit.value" :label="unit.text"
          :value="unit.value">
          </el-option>
      </el-select>
    </div>

    <div class="fieldTwo">
      <font>單價:</font>
      <el-input v-model="products.unit_price"></el-input>

      <font>生長期(天):</font>
      <el-input v-model="products.growth_period"></el-input>

      <font>保存期(天):</font>
      <el-input v-model="products.expire"></el-input>

      <font>保留數量:</font>
      <el-input v-model="products.default_save_amount"></el-input>
    </div>

    <div class="fieldThree">
      <font>說明:</font>
      <el-input v-model="products.desc" type="textarea"></el-input>

      <button @click="CreateManagement()">新增產品</button>
    </div>
  </div>
</template>

<script>
import Productdataservice from "@/services/Productdataservice.js"

export default {
  data() {
    return {
      LastIDNumber: null,
      IDMakeUp: null,

      products: {
        id: null,
        name: null,
        category_id: null,
        unit: null,
        unit_price: null,
        growth_period: null,
        expire: null,
        default_save_amount: null,
        desc: null,
      },

      createproducts: {  //為了寫進SQL的語法
        product_id: null,
        product_category_id: null,
        published_status_id: "S01",
        product_name: null,
        product_unit: null,
        product_unit_price: null,
        product_inventory: 0,
        product_desc: null,
        product_growth_period: null,
        product_expire: null,
        product_default_save_amount: null,
        product_actual_save_amount: 0,
        product_online_unit: null,
        product_online_unit_price: 0,
        product_online_inventory: 0,
        product_online_max_inventory: 0
      },

      types: [  //種類的物件
        { text: '蔬菜', value: 'C0001' },
        { text: '水果', value: 'C0004' }
      ],

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
      this.products.id = this.LastIDNumber
    },

    GetBiggestID() {
      Productdataservice.getBigID()
        .then(response => {
          if(response.data) {
            this.LastIDNumber = String(Number(response.data.product_id.split('PD')[1]) + 1);
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
      this.createproducts.product_id = this.products.id,
      this.createproducts.product_category_id = this.products.category_id,
      this.createproducts.product_name = this.products.name,
      this.createproducts.product_unit = this.products.unit,
      this.createproducts.product_unit_price = this.products.unit_price,
      this.createproducts.product_desc = this.products.desc,
      this.createproducts.product_growth_period = this.products.growth_period,
      this.createproducts.product_expire = this.products.expire,
      this.createproducts.product_default_save_amount = this.products.default_save_amount,
      this.createproducts.product_online_unit = this.products.unit,
      Productdataservice.create(this.createproducts);
      this.GetBiggestID()
    },
    //我是新的method喔，抓最新的ID
  },

  mounted() {
    this.GetBiggestID()
  }
};
</script>

<style scoped src="@/assets/css/main.css"></style>
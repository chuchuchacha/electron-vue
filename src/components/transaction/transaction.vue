<template>
  <div>
    <div class="statement">
      <el-table :data="detail" class="el-table">
      <el-table-column
        prop="Pname"
        label="產品名稱">
      </el-table-column>
      <el-table-column
        prop="Punit"
        label="單價">
      </el-table-column>
      <el-table-column
        prop="Pnum"
        label="數量">
      </el-table-column>
      <el-table-column
        prop="Pprice"
        label="小計">
      </el-table-column>
    </el-table>
    </div>

    <div class="measureboard">
      <div class="TypeSelect">
        <button v-for="type in types" :key="type.value">
          {{ type.text }}
        </button>
      </div>

      <div class="ProductSelect">
        <button v-for="(product, index) in products"
                :key="index">
          {{ products[index].product_name }}
        </button>
      </div>

      <div>
        <button>加</button>
        <button>減</button>
        <button>直接輸入</button>
      </div>
    </div>

    <div class="result">
      結帳金額
      <el-input readonly="readonly"></el-input><br><br>
      折扣
      <el-input readonly="readonly"></el-input><br><br>
      應收金額
      <el-input readonly="readonly"></el-input><br><br>
      找零
      <el-input readonly="readonly"></el-input>
      <div class="result_button">
        <button class="a1">儲值</button>
        <button>取消</button>
        <button>收款</button>
      </div>
      
    </div>
  </div>
</template>

<script>
import Productdataservice from "@/services/Productdataservice.js"

export default {
  data() {
    return {
      products: [],
      types: [
        {text:'全選' , value:'all'},
        {text:'蔬菜' , value:'veg'},
        {text:'水果' , value:'fru'},
      ],
      detail: [
        {
          Pname: '大白菜',
          Punit: '40',
          Pnum: '1',
          Pprice: '40'
        },
      ]
    }
  },

  methods: {
    Retrieveproducts() {  //取得產品所有的資料
      Productdataservice.getAll()
        .then(response => {
          this.products = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
  },

  mounted() {
    this.Retrieveproducts();
  }
}
</script>

<style scoped  src="@/assets/css/transaction.css"></style>
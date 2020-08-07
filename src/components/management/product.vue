<template>
  <div>
    <div class="fieldOne">
      產品編號
      <el-input v-model="products.pid" readonly="readonly"></el-input>

      名稱
      <el-input v-model="products.pname" readonly="readonly"></el-input>

      種類
      <el-select v-model="typeselect" placeholder="種類">
          <el-option v-for="typeselect in types" :key="typeselect.value" :label="typeselect.text"
          :value="typeselect.value">
          </el-option>
      </el-select>
    </div>

    <div class="fieldTwo">
      單價
      <el-input v-model="products.punitprice" readonly="readonly"></el-input>

      存貨
      <el-input v-model="products.pinventory" readonly="readonly"></el-input>

      <button class="inputsup" @click="upORcredata()">修改/輸入</button>
    </div>

    <div class="tableback protable">
      <tableprod  @pushdata="pushdatas" @passdata="getdatas" />
    </div>
  </div>
</template>

<script>
import tableprod from "@/components/table/Table_prod.vue";
import Productdataservice from "@/services/Productdataservice.js"

export default {
  components: {
    tableprod,
  },

  data() {
    return {
      products: {
        pid: null,
        pname: null,
        punitprice: null,
        pinventory: null,
      },

      createproducts: {  //為了寫進SQL的語法
        product_id: "P00018",
        product_category_id: "C0004",
        publish_status_id: "CD1",
        product_name: "none",
        product_unit: "包",
        product_unit_price: 40,
        product_inventory: 0,
        product_description: "122",
        product_growth_period: 20.5,
        product_exp: 14.5,
        product_default_reserve_amount: 10,
        product_actual_reserve_amount: 10,
        product_online_unit: "包",
        product_online_unit_price: 40,
        product_online_inventory: 10,
        product_online_inventory_limit: 10
      },

      typeselect: null,  //種類select的v-model，C000X

      childata: null,  //分割P後的純數字

      uporch: null,  //判斷新增或修改，TRUE為新增

      types: [  //種類的物件
        { text: '蔬菜', value: 'C0005' },
        { text: '水果', value: 'C0004' }
      ],
    };
  },

  methods: {
    //Table點選後將資料傳上來
    pushdatas(val) {
      this.products.pid = val.product_id
      this.products.pname = val.product_name
      this.products.punitprice = val.product_unit_price
      this.products.pinventory = val.product_inventory
      this.typeselect = val.product_category_id
      this.uporch = false;
    },

    //將資料轉進SQL的名稱
    pushdatatocreate(){
      this.createproducts.product_id = this.products.pid;
      this.createproducts.product_name = this.products.pname;
      this.createproducts.product_category_id = this.typeselect;
      this.createproducts.product_unit_price = this.products.punitprice;
      this.createproducts.product_inventory = this.products.pinventory;
    },

    refresh() {  //重整table
      this.$root.$emit('refresh')
      this.$root.$emit('refresh')
    },

    //點選修改/輸入的按鈕處裡，如果uporch == true 表示要新增資料，反之為修改資料
    upORcredata() {
      if(this.uporch == true){ //新增
        this.pushdatatocreate()
        Productdataservice.create(this.createproducts); //SQL

        this.refresh() //重整table
      }
      else{ //修改
        this.pushdatatocreate()
        Productdataservice.update(this.createproducts.product_id , this.createproducts);

        this.refresh() //重整table
      }
      this.initdata()
    },

    created() {  //點擊新增案鈕，自動寫入ID
      this.initdata()
      let templength = String(Number(this.childata[1]) + 1);  //000X轉成數字後會變成X，取X，+1，傳成STRING
      let tempop = null  //將P與0補齊的變數
      
      switch(templength.length){  //判斷數字的長度，並補齊P與0
        case 1:
          tempop = 'P0000';
          break;
        case 2:
          tempop = 'P000';
          break;
        case 3:
          tempop = 'P00';
          break;
        case 4:
          tempop = 'P0';
          break;
        case 5:
          tempop = 'P';
          break;
      }

      this.products.pid = tempop + templength; //將+1後的ID寫進INPUT裡

      this.uporch = true;  //將新增判斷設為TRUE
    },
    
    //Table種整後會將最後一項資料的id傳上來
    getdatas(val2) {
      this.childata = val2.split('P'); //將P分割出來剩下純數字
    },


    //重整5個資料以及新增/修改判斷
    initdata() {
      this.products.pid = null
      this.products.pname = null
      this.typeselect = null
      this.products.punitprice = null
      this.products.pinventory = null
      this.uporch = false;  //init新增/修改判斷
    },
  }
};
</script>

<style scoped src="@/assets/css/main.css"></style>

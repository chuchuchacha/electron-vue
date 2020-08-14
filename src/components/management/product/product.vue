<template>
  <component v-bind:is="Component" @ChangeFunction="ChangeFunction"></component>
</template>

<script>
import Productdataservice from "@/services/Productdataservice.js"
import Createproduct from '@/components/management/product/createproduct.vue'
import Mainproduct from '@/components/management/product/mainproduct.vue'

export default {
  components: {
    'Createproduct': Createproduct,
    'Mainproduct': Mainproduct,
  },

  data() {
    return {
      Component: 'Mainproduct',
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

      typeselect: null,  //種類select的v-model，C000X

      childata: null,  //分割P後的純數字

      uporch: null,  //判斷新增或修改，TRUE為新增

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
    ChangeFunction(ProductFunction) {
      this.Component = ProductFunction
    },
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
  },
};
</script>

<style scoped src="@/assets/css/main.css"></style>

<template>
  <div>
    <div class="fieldOne">
      <label>產品編號</label>
      <input type="text" v-model="products.pid" readonly="readonly"/>

      <label>名稱</label>
      <input type="text" v-model="products.pname" />

      <label>種類</label>
      <select v-model="typeselect" class="protype">
        <option v-for="type in types" :key="type.value">
          {{ type.text }}
        </option>
      </select>
    </div>

    <div class="fieldTwo">
      <label>單價</label>
      <input type="text" v-model="products.punitprice" />

      <label>存貨</label>
      <input type="text" v-model="products.pinventory" readonly="readonly"/>

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
        ptype: null,
        punitprice: null,
        pinventory: null,
      },

      createproducts: {
        product_id: "P00018",
        product_category_id: "C0004",
        publish_status_id: "CD1",
        product_name: "青江菜",
        product_unit: "包",
        product_unit_price: 40,
        product_inventory: 20,
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

      typeselect: null,

      childata: null,

      uporch: null,

      types: [
        { text: '蔬菜', value: '1' },
        { text: '水果', value: '2' }
      ],
    };
  },

  methods: {
    pushdatas(val) {
      this.products.pid = val.product_id
      this.products.pname = val.product_name
      this.products.ptype = val.product_category_id
      this.products.punitprice = val.product_unit_price
      this.products.pinventory = val.product_inventory

      if(this.products.ptype == 'C0005'){
        this.typeselect = '蔬菜'
      }
      if(this.products.ptype == 'C0004'){
        this.typeselect = '水果'
      }

      this.uporch == false;
    },

    pushdatatocreate(){
      this.createproducts.product_id = this.products.pid;
      this.createproducts.product_name = this.products.pname;
      if(this.typeselect == '蔬菜'){
        this.products.ptype = 'C0005'
      }
      if(this.typeselect == '水果'){
        this.products.ptype = 'C0004'
      }
      this.createproducts.product_category_id = this.products.ptype;
      this.createproducts.product_unit_price = this.products.punitprice;
      this.createproducts.product_inventory = 0; //應急用
    },

    upORcredata() {
      if(this.uporch == true){
        this.pushdatatocreate()
        Productdataservice.create(this.createproducts);
        this.$root.$emit('refresh')
        this.$root.$emit('refresh')
        this.childata = null
        this.uporch == false;
      }
      else{
        this.pushdatatocreate()
        Productdataservice.update(this.createproducts.product_id , this.createproducts);
        this.$root.$emit('refresh')
        this.$root.$emit('refresh')
      }
      this.initdata()
    },

    created() {
      this.initdata()
      let templength = String(Number(this.childata[1]) + 1);
      let tempop = null
      
      switch(templength.length){
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

      this.products.pid = tempop + templength;

      this.uporch = true;
    },

    getdatas(val2) {
      this.childata = val2.split('P');
    },

    initdata() {
      this.products.pid = null
      this.products.pname = null
      this.products.ptype = null
      this.typeselect = null
      this.products.punitprice = null
      this.products.pinventory = null
    },
  }
};
</script>

<style scoped src="@/assets/css/main.css"></style>

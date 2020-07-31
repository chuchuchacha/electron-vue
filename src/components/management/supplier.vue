<template>
  <div>
    <div class="fieldOne">
      <label>供應編號</label>
      <input type="text" readonly="readonly" v-model="suppliers.sid" />

      <label>名稱</label>
      <input type="text" v-model="suppliers.sname" />
    </div>

    <div class="fieldTwo">
      <label>電話</label>
      <input type="text" v-model="suppliers.sphone" />

      <label>地址</label>
      <input class="supaddress" type="text" v-model="suppliers.saddress" />
    </div>

    <div class="fieldThree">
      <label>說明</label>
      <input class="supdisc" type="text" v-model="suppliers.sdisc" />

      <button class="inputsup" @click="upORcredata()">修改/輸入</button>
    </div>

    <div class="tableback">
      <tablesupplier @pushdata="pushdatas" @passdata="getdatas"/>
    </div>
  </div>
</template>

<script>
import tablesupplier from "@/components/table/Table_supplier.vue";
import Supplierdataservice from "@/services/Supplierdataservice.js"

export default {
  components: {
    tablesupplier,
  },

  data() {
    return {
      suppliers: {
        sid: null,
        sname: null,
        sphone: null,
        saddress: null,
        sdisc: null,
      },

      createsuppliers: {
        supplier_id: null,
        supplier_name: null,
        supplier_phone: null,
        supplier_address: null,
        supplier_disc: null,
      },

      uporch: null,
    };
  },

  methods: {
    pushdatas(val) {
      this.suppliers.sid = val.supplier_id
      this.suppliers.sname = val.supplier_name
      this.suppliers.sphone = val.supplier_phone
      this.suppliers.saddress = val.supplier_address
      this.suppliers.sdisc = val.supplier_disc
      this.uporch = false;
    },

    upORcredata() {
      if(this.uporch == true){
        this.createsuppliers.supplier_id = this.suppliers.sid;
        this.createsuppliers.supplier_name = this.suppliers.sname;
        this.createsuppliers.supplier_phone = this.suppliers.sphone;
        this.createsuppliers.supplier_address = this.suppliers.saddress;
        this.createsuppliers.supplier_disc = this.suppliers.sdisc;
        Supplierdataservice.create(this.createsuppliers);
        this.$root.$emit('refresh')
        this.$root.$emit('refresh')
        this.childata = null
        this.uporch = false;
      }
      else{
        this.createsuppliers.supplier_id = this.suppliers.sid;
        this.createsuppliers.supplier_name = this.suppliers.sname;
        this.createsuppliers.supplier_phone = this.suppliers.sphone;
        this.createsuppliers.supplier_address = this.suppliers.saddress;
        this.createsuppliers.supplier_disc = this.suppliers.sdisc;
        Supplierdataservice.update(this.createsuppliers.supplier_id , this.createsuppliers);
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
          tempop = 'S000';
          break;
        case 2:
          tempop = 'S00';
          break;
        case 3:
          tempop = 'S0';
          break;
        case 4:
          tempop = 'S';
          break;
        case 5:
          tempop = null;
          break;
      }

      this.suppliers.sid = tempop + templength;

      this.uporch = true;
    },

    getdatas(val2) {
      this.childata = val2.split('S');
    },

    initdata() {
      this.suppliers.sid = null
      this.suppliers.sname = null
      this.suppliers.sphone = null
      this.suppliers.saddress = null
      this.suppliers.sdisc = null
    },
  }
};
</script>

<style scoped src="@/assets/css/main.css"></style>

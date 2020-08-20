<template>
  <component v-bind:is="Component" @ChangeFunction="ChangeFunction"></component>
</template>

<script>
import Supplierdataservice from "@/services/Supplierdataservice.js"
import Createsupplier from '@/components/management/supplier/createsupplier.vue'
import Mainsupplier from '@/components/management/supplier/mainsupplier.vue'

export default {
  components: {
    'Createsupplier': Createsupplier,
    'Mainsupplier': Mainsupplier,
  },

  data() {
    return {
      Component: 'Mainsupplier',

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
    ChangeFunction(ProductFunction) {
      console.log(ProductFunction)
      this.Component = ProductFunction
    },
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
    // 新的不要刪掉
    GoBack() {
      if(this.Component != 'Mainsupplier') {
        this.Component = 'Mainsupplier'
      }
      else if(this.Component == 'Mainsupplier') {
        this.$emit('BackToMain')
      }
    },
  },

  mounted() {
    this.$root.$on('GoBack', () => {
        this.GoBack();
    });
  },
};
</script>

<style scoped src="@/assets/css/main.css"></style>

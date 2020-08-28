<template>
  <component v-bind:is="Component" @ChangeFunction="ChangeFunction" :AdjustSupplier="AdjustSupplier"></component>
</template>

<script>
import Createsupplier from '@/components/management/supplier/Createsupplier.vue'
import Mainsupplier from '@/components/management/supplier/Mainsupplier.vue'
import SupplierView from '@/components/management/supplier/SupplierView.vue'
import AdjustSupplier from '@/components/management/supplier/AdjustSupplier.vue'
import SupplierProduct from '@/components/management/supplier/SupplierProduct.vue'

export default {
  components: {
    'Createsupplier': Createsupplier,
    'Mainsupplier': Mainsupplier,
    'SupplierView': SupplierView,
    'AdjustSupplier': AdjustSupplier,
    'SupplierProduct': SupplierProduct,
  },

  data() {
    return {
      Component: 'Mainsupplier',
      AdjustSupplier: null,
    };
  },

  methods: {
    ChangeFunction(ProductFunction, AdjustS) {
      this.Component = ProductFunction
      this.AdjustSupplier = AdjustS
    },
    // 新的不要刪掉
    GoBack() {
       if(this.Component == 'AdjustSupplier') {
        this.Component = 'SupplierView'
      }
      else if(this.Component != 'Mainsupplier') {
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


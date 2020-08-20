<template>
  <component v-bind:is="Component" @ChangeFunction="ChangeFunction" :AdjustProduct="AdjustProduct"></component>
</template>

<script>
import Createproduct from '@/components/management/product/Createproduct.vue'
import Mainproduct from '@/components/management/product/Mainproduct.vue'
import ProductView from '@/components/management/product/ProductView.vue'
import AdjustProduct from '@/components/management/product/AdjustProduct.vue'
import Categoryproduct from '@/components/management/product/Categoryproduct.vue'

export default {
  components: {
    'Createproduct': Createproduct,
    'Mainproduct': Mainproduct,
    'ProductView': ProductView,
    'AdjustProduct': AdjustProduct,
    'Categoryproduct': Categoryproduct,
  },

  data() {
    return {
      Component: 'Mainproduct',
      AdjustProduct: null,
    };
  },

  methods: {
    ChangeFunction(ProductFunction, AdjustP) {
      this.Component = ProductFunction
      this.AdjustProduct = AdjustP
    },

    GoBack() {
      if(this.Component != 'Mainproduct') {
        this.Component = 'Mainproduct'
      }
      else if(this.Component == 'Mainproduct') {
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

<style scoped></style>

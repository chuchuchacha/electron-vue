<template>
  <component v-bind:is="Component" @ChangeFunction="ChangeFunction" :ChoosenName="ChoosenName"></component>
</template>

<script>
import PlantRecord from '@/components/statement/PlantRecord.vue'
import MainStatement from '@/components/statement/MainStatement.vue'
import InventoryRecord from '@/components/statement/InventoryRecord.vue'
import PurchaseRecord from '@/components/statement/PurchaseRecord.vue'
import AdjustPlant from '@/components/statement/AdjustPlant.vue'
import AdjustPurchase from '@/components/statement/AdjustPurchase.vue'

export default {
  components: {
    'PlantRecord': PlantRecord,
    'MainStatement': MainStatement,
    'InventoryRecord': InventoryRecord,
    'PurchaseRecord': PurchaseRecord,
    'AdjustPlant': AdjustPlant,
    'AdjustPurchase': AdjustPurchase,
  },

  data() {
    return {
      Component: 'MainStatement',
      AdjustMember: null,
      ChoosenName: null,
    };
  },

  methods: {
    ChangeFunction(ProductFunction, ChoosenName) {
      this.Component = ProductFunction
      this.ChoosenName = ChoosenName
    },

    GoBack() {
      if(this.Component == 'AdjustPlant') {
        this.Component = 'PlantRecord'
      }
      else if(this.Component == 'AdjustPurchase') {
        this.Component = 'PurchaseRecord'
      }
      else if(this.Component != 'MainStatement') {
        this.Component = 'MainStatement'
      }
      else if(this.Component == 'MainStatement') {
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
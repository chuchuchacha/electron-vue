<template>
  <component v-bind:is="Component" @ChangeFunction="ChangeFunction"></component>
</template>

<script>
import PlantRecord from '@/components/statement/PlantRecord.vue'
import MainStatement from '@/components/statement/MainStatement.vue'
import InventoryRecord from '@/components/statement/InventoryRecord.vue'
import PurchaseRecord from '@/components/statement/PurchaseRecord.vue'

export default {
  components: {
    'PlantRecord': PlantRecord,
    'MainStatement': MainStatement,
    'InventoryRecord': InventoryRecord,
    'PurchaseRecord': PurchaseRecord,
  },

  data() {
    return {
      Component: 'MainStatement',
      AdjustMember: null,
    };
  },

  methods: {
    ChangeFunction(ProductFunction) {
      this.Component = ProductFunction
    },

    GoBack() {
      if(this.Component != 'MainStatement') {
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
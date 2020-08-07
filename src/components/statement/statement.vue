<template>
  <div>
    <div class="statement">
      <div class="button_grid">
        <button v-for="StateType in StateTypes" :key="StateType.value" @click="StateTypeChange(StateType.value)">
          {{ StateType.text }}
        </button>
      </div>
    </div>

    <div class="chart">
    </div>

    <div class="statement_detail">
      <component v-bind:is="Component"></component>
    </div>
  </div>
</template>

<script>
import revenue from "@/components/statement/detail/revenue.vue"
import harvest from "@/components/statement/detail/harvest.vue"
import sales from "@/components/statement/detail/sales.vue"
import vip from "@/components/statement/detail/vip.vue"

export default {
  components: {
    'revenue': revenue,
    'harvest': harvest,
    'sales': sales,
  },

  data() {
    return {
      StateTypes: [
        { text: '營收分析', value: 'a'},
        { text: '採收統計', value: 'b'},
        { text: '累計銷售', value: 'c'},
        { text: '十大客戶', value: 'd'}
       ],
      Component: 'revenue',
    };
  },

  methods: {
    StateTypeChange(Type) {
      switch(Type){
        case 'a':
          this.Component = revenue
          break;
        case 'b':
          this.Component = harvest
          break;
        case 'c':
          this.Component = sales
          break;
        case 'd':
          this.Component = vip
          break;
      }
    },
  },
}
</script>

<style scoped src="@/assets/css/statement.css"></style>
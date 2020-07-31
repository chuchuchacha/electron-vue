<template>
  <div>
    <div class="statement">
      <div class="button_grid">
        <button v-for="StateType in StateTypes" :key="StateType.value">
          {{ StateType.text }}
        </button>
      </div>
    </div>

    <div class="chart">
    </div>

    <div class="statement_detail">
      <div class="date_button">
        <button v-for="RevenueDate in RevenueDates" :key="RevenueDate.value" @click="dateclick(RevenueDate.value)">
          {{ RevenueDate.text }}
        </button>
      </div>
      <revenue :Datetext='datetext' />
    </div>
  </div>
</template>

<script>
import revenue from "@/components/statement/detail/revenue.vue"

export default {
  components: {
    revenue
  },

  data() {
    return {
      StateTypes: [
        { text: '營收分析', value: 'a'},
        { text: '採收統計', value: 'b'},
        { text: '累計銷售', value: 'c'},
        { text: '十大客戶', value: 'd'}
       ],
      RevenueDates: [
        { text: '月收' , value: 'month'},
        { text: '日收' , value: 'day'},
      ],
      datetext:'',
    };
  },

  methods: {
    dateclick(target) {
      if(target == 'month'){
        this.datetext = '當年';
      }
        
      if(target == 'day'){
        this.datetext = '當日'
      }
        
    }
  },
}
</script>

<style scoped src="@/assets/css/statement.css"></style>
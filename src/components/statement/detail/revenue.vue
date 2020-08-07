<template>
  <div>
    <div class="date_button">
      <button v-for="RevenueDate in RevenueDates" :key="RevenueDate.value" @click="dateclick(RevenueDate.value)">
        {{ RevenueDate.text }}
      </button>
    </div>
    <keep-alive>
      <component v-bind:is="Component"></component>
    </keep-alive>
  </div>
</template>

<script>
import month from "@/components/statement/detail/revenue-month.vue"
import day from "@/components/statement/detail/revenue-day.vue"

export default {
  components: {
    'month': month,
    'day': day,
  },

  data() {
    return {
      RevenueDates: [
        { text: '月收' , value: 'month'},
        { text: '日收' , value: 'day'},
      ],
      datetext:'',
      Component: 'month',
    }
  },
  
  methods: {
    dateclick(target) {
      this.Component = target
    },
  }
}
</script>

<style scoped src="@/assets/css/revenue.css"></style>
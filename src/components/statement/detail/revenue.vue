<template>
  <div class="date_input">
    年份
    <el-select v-model="year" placeholder="請選擇年分">
      <el-option v-for="year in years" :key="year.value" :label="year.text"
    :value="year.value">
      </el-option>
    </el-select>
    年<br><br>
    月份
    <el-select v-model="day" placeholder="請選擇年分">
      <el-option v-for="day in days" :key="day.value" :label="day.text"
    :value="day.value">
      </el-option>
    </el-select>
    月<br><br>
    {{ Datetext }}營收
    <el-input readonly="readonly"></el-input>
  </div>
</template>

<script>
export default {
  props: {
    Datetext:{
      type: String,
      required: false
    }
  },

  data() {
    return {
      years: [
        { text:'2020' , value:'2020' },
        { text:'2019' , value:'2019' },
      ],
      days: [
        { text:'31' , value:'31' },
        { text:'30' , value:'30' },
      ],
      year:'',
      day:'',
    }
  },  
}
</script>

<style scoped src="@/assets/css/revenue.css"></style>
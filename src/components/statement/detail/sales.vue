<template>
  <div class="detail_div">
    累計日期<br><br>

    <el-select v-model="hyear" placeholder="年份">
      <el-option v-for="year in years" :key="year.value" :label="year.text"
      :value="year.value">
      </el-option>
    </el-select>年
    <el-select v-model="hmonth" placeholder="月份">
      <el-option v-for="month in months" :key="month.value" :label="month.text"
      :value="month.value">
      </el-option>
    </el-select>月

    <br><br>至<br><br>

    <el-select v-model="byear" placeholder="年份">
      <el-option v-for="year in years" :key="year.value" :label="year.text"
      :value="year.value">
      </el-option>
    </el-select>年
    <el-select v-model="bmonth" placeholder="月份">
      <el-option v-for="month in months" :key="month.value" :label="month.text"
      :value="month.value">
      </el-option>
    </el-select>月

    <button class="salesbutton" @click="confirm()">確定</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      years: [
        { text:'2020' , value:'2020' },
        { text:'2019' , value:'2019' },
      ],
      months: [
        { text:'12' , value:'12' },
        { text:'11' , value:'11' },
      ],
      hyear:'',
      hmonth:'',
      byear:'',
      bmonth:'',
    }
  },

  methods: {
    confirm() {

    }
  }
}
</script>

<style scoped src="@/assets/css/sales.css"></style>
<template>
  <div class="detail_div">
      年份
      <el-select v-model="year" placeholder="請選擇年分">
        <el-option v-for="year in years" :key="year.value" :label="year.text"
        :value="year.value">
        </el-option>
      </el-select>
      年<br><br>
      月份
      <el-select v-model="month" placeholder="請選擇月分">
        <el-option v-for="month in months" :key="month.value" :label="month.text"
        :value="month.value">
        </el-option>
      </el-select>
      月<br><br>
      當月總營收
      <el-input readonly="readonly"></el-input>
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
        { text:'10' , value:'10' },
        { text:'9' , value:'9' },
        { text:'8' , value:'8' },
        { text:'7' , value:'7' },
        { text:'6' , value:'6' },
        { text:'5' , value:'5' },
        { text:'4' , value:'4' },
        { text:'3' , value:'3' },
        { text:'2' , value:'2' },
        { text:'1' , value:'1' },
      ],
      year:'',
      month:'',
    }
  }
}
</script>

<style scoped src="@/assets/css/revenue.css"></style>

<template>
  <div class="detail_div">
    <div class="ProType">
      種類
      <el-select v-model="Type" placeholder="選擇種類">
        <el-option v-for="Type in Types" :key="Type.value" :label="Type.text"
      :value="Type.value">
        </el-option>
      </el-select>
      產品
      <el-select v-model="Pro" placeholder="選擇產品">
        <el-option v-for="Type in Types" :key="Type.value" :label="Type.text"
      :value="Type.value">
        </el-option>
      </el-select>
    </div>

    <div class="ProTable">
      <el-table :data="tableData">
      <el-table-column
        prop="name"
        label="名稱">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="number"
        label="數量">
      </el-table-column>
    </el-table>
    </div>
  </div>  
</template>

<script>
export default {
  data() {
    return {
      Types: [
        { text:'全選' , value:'all' },
        { text:'蔬菜' , value:'veg' },
        { text:'水果' , value:'fru' },
      ],
      Type:'',
      Pro:'',
      tableData: [
        {
          name: '小白菜',
          date: '109/6/5',
          number: '20'
        },
      ],
    }
  }
}
</script>

<style scoped src="@/assets/css/harvest.css"></style>
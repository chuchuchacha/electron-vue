<template>
  <div>
    <div class="Categorymember">
      <font>類別編號:</font>
      <el-input v-model="id" readonly="readonly"></el-input>
      <font>類別名稱:</font>
      <el-input v-model="name"></el-input>
      <font>類別說明:</font>
      <el-input type="textarea" v-model="desc"></el-input>
      <el-button @click="Createcategory()">輸入</el-button>
      <el-button @click="CreateChose()">新增類別</el-button>
      <el-button @click="Backtomemberview()">修改會員</el-button>
    </div>
    <div class="CategoryTable">
      <el-table
        :data="AllCategory"
        @current-change="ChooseRow" highlight-current-row stripe border height="60vh" empty-text="未新增類別">
        <el-table-column
          prop="member_category_id"
          label="編號">
        </el-table-column>
        <el-table-column
          prop="member_category_name"
          label="名稱">
        </el-table-column>
        <el-table-column
          prop="member_category_desc"
          label="說明">
        </el-table-column>
        <el-table-column
          prop="member"
          label="會員">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      AllCategory: [],
      id: null,
      name: null,
      desc: null,
    }
  },
}
</script>

<style scoped src="@/assets/css/MemberView.css"></style>
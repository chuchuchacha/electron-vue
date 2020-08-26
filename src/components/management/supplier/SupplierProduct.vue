<template>
  <div>
    <div class="SPSupplier">
      <font>供應商:</font>
      <el-input></el-input>
      <el-button>修改</el-button>

      <el-table
        :data="AllSupplier"
        stripe border height="75vh" empty-text="沒有供應商">
        <el-table-column
          prop="supplier_id"
          label="編號">
        </el-table-column>
        <el-table-column
          prop="supplier_name"
          label="名稱">
        </el-table-column>
      </el-table>
    </div>

    <div class="SPProduct">

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      AllSupplier: [],
    }
  },
}
</script>

<style scoped src="@/assets/css/SupplierView.css"></style>
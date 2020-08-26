<template>
  <div>
    <div class="FunctionRow">
      <font>現在選擇產品:</font>
      <el-input v-model="ChoosenName"></el-input>
      <el-button @click="ChangeFunction()">修改</el-button>
      <el-button @click="DeleteSupplier()">刪除</el-button>
    </div>
    
    <div class="supplierviewtable">
      <el-table
        :data="AllSupplier"
        @current-change="ChooseRow" highlight-current-row stripe border height="75vh" empty-text="沒有供應商">
        <el-table-column
          prop="supplier_id"
          label="編號">
        </el-table-column>
        <el-table-column
          prop="supplier_name"
          label="名稱">
        </el-table-column>
        <el-table-column
          prop="supplier_phone"
          label="電話">
        </el-table-column>
        <el-table-column
          prop="supplier_address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="supplier_desc"
          label="說明">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Supplierdataservice from "@/services/Supplierdataservice.js"

export default {
  data() {
    return {
      AllSupplier: [],
      ChoosenRow: null,
      ChoosenName: null,
    }
  },

  methods: {
    DeleteSupplier() {
      if(this.ChoosenRow) {
        Supplierdataservice.delete(this.ChoosenRow.supplier_id)
        this.GetAllSupplier()
      } 
    },

    ChangeFunction() {
      if(this.ChoosenRow) {
        this.$emit('ChangeFunction', 'AdjustSupplier', this.ChoosenRow);
      }
    },

    GetAllSupplier() {
      Supplierdataservice.getAll()
        .then(response => {
          this.AllSupplier = response.data
        })
        .catch(e => {
          console.log(e);
        })
    },

    ChooseRow(val) {
      this.ChoosenRow = val
      this.ChoosenName = val.supplier_name
    },
  },

  mounted() {
    this.GetAllSupplier()
  },
}
</script>

<style scoped src="@/assets/css/SupplierView.css"></style>
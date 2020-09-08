<template>
  <div>
    <div class="FunctionRow_Purchase">
      <font>庫存紀錄:</font>
      <el-input v-model="ChoosenName"></el-input>
      <el-button @click="ChangeFunction()">修改</el-button>
      <el-button @click="DeleteSupplier()">刪除</el-button>
    </div>

    <div class="plantviewtable">
      <el-table
        :data="AllPurchase" @current-change="ChooseRow" highlight-current-row 
        stripe border height="75vh" empty-text="沒有進貨紀錄">
        <el-table-column
          sortable
          :sort-orders="['ascending', 'descending']"
          align='center'
          prop="purchase_id"
          width="200px"
          label="編號">
        </el-table-column>
        <el-table-column
          align='center'
          prop="product"
          label="進貨產品">
          <template slot-scope="{row,}">
            <span v-for="(product,index) in row.products" :key="index">{{product.product_name}},</span>
          </template>
        </el-table-column>
        <el-table-column
          align='center'
          prop="purchase_dt"
          label="進貨時間">
        </el-table-column>
        <el-table-column
          align='center'
          prop=""
          label="供應商">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Purchasedataservice from "@/services/Purchasedataservice.js"

export default {
  data() {
    return {
      AllPurchase: [],
      ChoosenName:null,
    }
  },

  methods: {
    ChangeFunction() {
      if(this.ChoosenName) {
        this.$emit('ChangeFunction', 'AdjustPurchase', this.ChoosenName);
      }
    },

    ChooseRow(val) {
      this.ChoosenName = val.purchase_id
    },

    GetAllPurchase() {
      Purchasedataservice.getAll()
        .then(response => {
          this.AllPurchase = response.data
        })
    },
  },

  mounted() {
    this.GetAllPurchase()
  }
}
</script>

<style scoped src="@/assets/css/StatementView.css"></style>
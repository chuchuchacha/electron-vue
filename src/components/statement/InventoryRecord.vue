<template>
  <div>
    <div class="FunctionRowInventory">
      <font>庫存行為:</font>
      <el-select placeholder="庫存行為" v-model="InventoryStatus" @change="InventoryStatusChange">
        <el-option v-for="Status in Statuses" :key="Status.value"
        :label="Status.text" :value="Status.value">
        </el-option>
      </el-select>

      <font>庫存紀錄:</font>
      <el-input v-model="ChoosenName"></el-input>
      <el-button @click="ChangeFunction()">修改</el-button>
      <el-button @click="DeleteSupplier()">刪除</el-button>
    </div>

    <div class="plantviewtable">
      <el-table
        :data="AllInventory" @current-change="ChooseRow" highlight-current-row 
        stripe border height="75vh" empty-text="沒有種植紀錄">
        <el-table-column
          sortable
          :sort-orders="['ascending', 'descending']"
          align='center'
          prop="inventory_id"
          width="200px"
          label="編號">
        </el-table-column>
        <el-table-column
          align='center'
          prop="product_id"
          width="120px"
          label="產品編號">
        </el-table-column>
        <el-table-column
          align='center'
          prop="product_name"
          width="200px"
          label="產品名稱">
        </el-table-column>
        <el-table-column
          align='center'
          prop="inventory_participate_product_amount"
          width="120px"
          label="變動數量">
        </el-table-column>
        <el-table-column
          align='center'
          prop="inventory_dt"
          label="變動時間">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Adjustdataservice from "@/services/Adjustdataservice.js"
import Disposedataservice from "@/services/Disposedataservice.js"

export default {
  data() {
    return {
      InventoryStatus: null,
      Statuses: [
        {text: '全部',value: 'all'},
        {text: '調整',value: 'adjust'},
        {text: '報廢',value: 'dispose'},
      ],
      ChoosenName: null,

      AllInventory: [],
    }
  },

  methods: {
    InventoryStatusChange() {
      this.ChoosenName = null
      let adjustchoice = null
      if(this.InventoryStatus == 'adjust') {
        this.AllInventory = []
        Adjustdataservice.getAll()
          .then(response => {
            console.log(response.data)
            for(let i = 0; i < response.data.length; i++) {
              for(let j = 0; j < response.data[i].products.length; j++) {
                if(response.data[i].products[j].adjust_participate_product.adjust_choice == '增加')
                  adjustchoice = '+'
                if(response.data[i].products[j].adjust_participate_product.adjust_choice == '減少')
                  adjustchoice = '-'
                this.AllInventory.push({inventory_id: response.data[i].adjust_id, inventory_dt: response.data[i].adjust_dt,
                product_id: response.data[i].products[j].product_id, product_name: response.data[i].products[j].product_name,
                inventory_participate_product_amount: adjustchoice + ' ' + response.data[i].products[j].adjust_participate_product.adjust_participate_product_amount})
              }
            }
          })
      }
      if(this.InventoryStatus == 'dispose') {
        this.AllInventory = []
        Disposedataservice.getAll()
        .then(response => {
          console.log(response.data)
          for(let i = 0; i < response.data.length; i++) {
            for(let j = 0; j < response.data[i].products.length; j++) {
              this.AllInventory.push({inventory_id: response.data[i].dispose_id, inventory_dt: response.data[i].dispose_dt,
              product_id: response.data[i].products[j].product_id, product_name: response.data[i].products[j].product_name,
              inventory_participate_product_amount: '-' + ' ' + response.data[i].products[j].dispose_participate_product.dispose_participate_product_amount})
            }
          }
        })
      }
      if(this.InventoryStatus == 'all') {
        this.GetAllInventory()
      }
    },

    ChooseRow(val) {
      this.ChoosenName = val.inventory_id + ':' + val.product_id
    },

    GetAllInventory() {
      this.ChoosenName = null
      let adjustchoice = null
      this.AllInventory = []
      Adjustdataservice.getAll()
        .then(response => {
          console.log(response.data)
          for(let i = 0; i < response.data.length; i++) {
            for(let j = 0; j < response.data[i].products.length; j++) {
              if(response.data[i].products[j].adjust_participate_product.adjust_choice == '增加')
                adjustchoice = '+'
              if(response.data[i].products[j].adjust_participate_product.adjust_choice == '減少')
                adjustchoice = '-'
              this.AllInventory.push({inventory_id: response.data[i].adjust_id, inventory_dt: response.data[i].adjust_dt,
              product_id: response.data[i].products[j].product_id, product_name: response.data[i].products[j].product_name,
              inventory_participate_product_amount: adjustchoice + ' ' + response.data[i].products[j].adjust_participate_product.adjust_participate_product_amount})
            }
          }
        })
      Disposedataservice.getAll()
        .then(response => {
          console.log(response.data)
          for(let i = 0; i < response.data.length; i++) {
            for(let j = 0; j < response.data[i].products.length; j++) {
              this.AllInventory.push({inventory_id: response.data[i].dispose_id, inventory_dt: response.data[i].dispose_dt,
              product_id: response.data[i].products[j].product_id, product_name: response.data[i].products[j].product_name,
              inventory_participate_product_amount: '-' + ' ' + response.data[i].products[j].dispose_participate_product.dispose_participate_product_amount})
            }
          }
        })
    },
  },

  mounted() {
    this.GetAllInventory()
  }
}
</script>

<style scoped src="@/assets/css/StatementView.css"></style>
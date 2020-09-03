<template>
  <div>
    <div class="FunctionRow">
      <font>種植狀態:</font>
      <el-select placeholder="種植狀態" v-model="PlantStatus">
        <el-option v-for="Status in Statuses" :key="Status.value"
        :label="Status.text" :value="Status.value">
        </el-option>
      </el-select>

      <font>種植紀錄:</font>
      <el-input v-model="ChoosenName"></el-input>
      <el-button @click="ChangeFunction()">修改</el-button>
      <el-button @click="DeleteSupplier()">刪除</el-button>
    </div>

    <div class="plantviewtable">
      <el-table
        :data="AllPlanting" @current-change="ChooseRow" highlight-current-row 
        stripe border height="75vh" empty-text="沒有種植紀錄">
        <el-table-column
          sortable
          :sort-orders="['ascending', 'descending']"
          align='center'
          prop="plant_id"
          width="200px"
          label="種植編號">
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
          prop="plant_participate_product_amount"
          width="120px"
          label="種植數量(盤)">
        </el-table-column>
        <el-table-column
          align='center'
          prop="plant_dt"
          label="種植時間">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Plantdataservice from "@/services/Plantdataservice.js"

export default {
  components: {
    
  },

  data() {
    return {
      ChoosenName: null,

      PlantStatus: null,

      Statuses: [
        {text: '已採收', value: 'harvested'}
      ],

      AllPlanting: [],
    }
  },

  methods: {
    GetAllPlanting() {
      Plantdataservice.getAll()
        .then(response => {
          console.log(response.data)
          for(let i = 0; i < response.data.length; i++) {
            for(let j = 0; j < response.data[i].products.length; j++) {
              this.AllPlanting.push({plant_id: response.data[i].plant_id, plant_dt: response.data[i].plant_dt,
              product_id: response.data[i].products[j].product_id, product_name: response.data[i].products[j].product_name,
              plant_participate_product_amount: response.data[i].products[j].plant_participate_product.plant_participate_product_amount})
            }
          }
        })
    },

    ChooseRow(val) {
      this.ChoosenName = val.plant_id + ':' + val.product_id
    },

    GoBack() {
      this.$emit('BackToMain')
    },
  },

  mounted() {
    this.$root.$on('GoBack', () => {
      this.GoBack();
    });

    this.GetAllPlanting()
  },
}
</script>

<style scoped src="@/assets/css/StatementView.css"></style>
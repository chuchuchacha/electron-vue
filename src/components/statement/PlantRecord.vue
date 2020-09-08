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
      <el-input v-model="ChoosenName" readonly="readonly"></el-input>
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
          prop="product"
          label="種植產品">
          <template slot-scope="{row,}">
            <span v-for="(product,index) in row.products" :key="index">{{product.product_name}},</span>
          </template>
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
    ChangeFunction() {
      if(this.ChoosenName) {
        this.$emit('ChangeFunction', 'AdjustPlant', this.ChoosenName);
      }
    },

    GetAllPlanting() {
      Plantdataservice.getAll()
        .then(response => {
          this.AllPlanting = response.data
        })
    },

    ChooseRow(val) {
      this.ChoosenName = val.plant_id
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
<template>
  <div>
    <div class="CreatePlanting">
      <font>種植編號:</font>
      <el-input readonly="readonly"></el-input>
      <font>產品:</font>
      <el-input readonly="readonly"></el-input>
      <font>種植時間:</font>
      <el-select placeholder="年" v-model="Input_Year">
        <el-option></el-option>
      </el-select>
      <font>年</font>
      <el-select placeholder="月" v-model="Input_Month">
        <el-option></el-option>
      </el-select>
      <font>月</font>
      <el-select placeholder="日" v-model="Input_Day">
        <el-option></el-option>
      </el-select>
      <font>日</font>
      <font>數量:</font>
      <el-input></el-input>
      <font>盤</font>
      <el-button>輸入</el-button>

      <el-table
        :data="PlantingTable" @current-change="ChooseRow" highlight-current-row 
        stripe border height="45vh" empty-text="請新增種植">
        <el-table-column
          prop="product_id"
          width="110px"
          label="產品">
        </el-table-column>
        <el-table-column
          prop="plant_participate_product_amount"
          width="110px"
          label="數量">
        </el-table-column>
        <el-table-column
          prop="plant_dt"
          label="時間">
        </el-table-column>
      </el-table>

      <el-button>確認</el-button>
    </div>

    <div class="ProductTable">
      <font>種類:</font>
      <el-select placeholder="產品種類">
        <el-option></el-option>
      </el-select>
      <font>搜尋:</font>
      <el-input></el-input>
      <el-button>輸入</el-button>
      <el-table
        :data="AllProduct" @current-change="ChooseRow" highlight-current-row
        stripe border height="75vh" empty-text="沒有產品">
        <el-table-column
          prop="product_id"
          label="編號">
        </el-table-column>
        <el-table-column
          prop="product_name"
          label="名稱">
        </el-table-column>
        <el-table-column
          prop="product_unit"
          label="單位">
        </el-table-column>
        <el-table-column
          prop="product_inventory"
          label="庫存">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Input_Year: null,
      Input_Month: null,
      Input_Day: null,

      PlantingTable:[
        {
          product_id: 'PC0001',
          plant_participate_product_amount: '20',
          plant_dt: '2020-08-31'
        }
      ],

      AllProduct: [],
    }
  },

  methods: {
    GoBack() {
      this.$emit('BackToMain')
    },
  },

  mounted() {
    this.$root.$on('GoBack', () => {
        this.GoBack();
    });
  },
}
</script>

<style scoped src="@/assets/css/PlantingView.css"></style>
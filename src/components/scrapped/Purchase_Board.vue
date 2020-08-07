<template>
  <div class="scrap_pur">
    <div class="purchase_board">

      <div class="pbo1">
        <font>產品:</font>
        <el-input v-model="input1" placeholder="請點選右邊產品" class="pbo1_input1" readonly="readonly"></el-input>
        <font>數量:</font>
        <el-input v-model="input3" placeholder="" class="pbo1_input2"></el-input>
        <font>單位:</font>
        <el-input v-model="input2" placeholder="" class="pbo1_input3"></el-input>
      </div>

      <div class="pbo2">
        <font>單價:</font>
        <el-input v-model="input4" placeholder="" class="pbo2_input1"></el-input>
        <font>折扣:</font>
        <el-input v-model="input5" placeholder="" class="pbo2_input2"></el-input>
        <el-button class="insertbut">輸入</el-button>
      </div>

      <div class="pbo3">
        <font>總計:</font>
        <el-input v-model="input6" placeholder="" class="pbo3_input1" readonly="readonly"></el-input>
      </div>
    
    </div>

    <div class="purchase_table">
      <el-table
        :data="PurchaseData"
        stripe:true border:true height="36vh" empty-text="請輸入資料">
        <el-table-column
          prop="product"
          label="產品">
        </el-table-column>
        <el-table-column
          prop="unit"
          label="單位">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="數量">
        </el-table-column>
        <el-table-column
          prop="price"
          label="單價">
        </el-table-column>
        <el-table-column
          prop="discount"
          label="折扣">
        </el-table-column>
      </el-table>
    </div>

    <div class="purchase_bottom">
      <el-button class="pb_back">返回</el-button>
      <el-button class="pb_delet">刪除</el-button>
      <el-button class="pb_confirm">確認</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: null,
      input2: '',
      input3: null,
      input4: '',
      input5: '',
      input6: null,
      
      PurchaseData: [
        
      ]
    }
  },


  methods: {
    getcurrentID(ProName, ProID) {
      this.input1 = ProID + ':' + ProName;
      this.input5 = 0
    },
  },

  mounted() {
    this.$root.$on('currentproduct', (CurrentProduct) => {
      this.getcurrentID(CurrentProduct.product_name, CurrentProduct.product_id);
    });
  }
}


</script>

<style scoped  src="@/assets/css/scrap_pur.css"></style>
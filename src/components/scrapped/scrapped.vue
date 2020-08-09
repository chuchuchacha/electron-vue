<template>
  <div>
    <div class="func_selec">
      <button class="func_pur" @click="FunctionClick()" ref="PurchaseClick" id="進貨">進貨</button>
      <button class="func_har" @click="FunctionClick()" ref="HarvestClick" id="採收">採收</button>
      <button class="func_adj" @click="FunctionClick()" ref="AdjustClick" id="調整">調整</button>
      <button class="func_scr" @click="FunctionClick()" ref="ScrappedClick" id="報廢">報廢</button>
    </div>

    <component v-bind:is="Component" :FuncText="FuncText"></component>

    <div class="show_form">
      <!-- <tableprod :FuncSelects="FuncText" :ProductTypes="ProductType" :AdjustMinuss="AdjustMinus" @InitialData="InitialData"></tableprod> -->
      <tableprod></tableprod>
    </div>

  </div>
</template>

<script>
import tableprod from '@/components/table/Table_inventory.vue'
import MeasureBoard from '@/components/scrapped/Measure_Board.vue'
import PurchaseBoard from '@/components/scrapped/Purchase_Board.vue'

export default {
  components: {
    'tableprod': tableprod,
    'MeasureBoard': MeasureBoard,
    'PurchaseBoard': PurchaseBoard,
  },

  data() {
    return {
      Component: 'MeasureBoard',
      FuncText: '進貨',
    };
  },
  
  methods: {
    //initial 功能選擇扭的顏色、文字
    InitalFunc() {
      this.$refs.PurchaseClick.style.backgroundColor = "#dcdcdc"
      this.$refs.HarvestClick.style.backgroundColor = "#dcdcdc"
      this.$refs.AdjustClick.style.backgroundColor = "#dcdcdc"
      this.$refs.ScrappedClick.style.backgroundColor = "#dcdcdc"
      this.FuncText = event.target.id
    },

    //功能點擊鈕的事件處裡，根據不同的功能變更其顏色
    FunctionClick() {
      this.InitalFunc();
      switch(event.target.id){
        case '進貨':
          this.Component = PurchaseBoard;
          this.$refs.PurchaseClick.style.backgroundColor = "#F0FFFF"
          break;
        case '採收':
          this.$refs.HarvestClick.style.backgroundColor = "#F0FFFF"
          break;
        case '調整':
          this.$refs.AdjustClick.style.backgroundColor = "#F0FFFF"
          this.AdjustBoolean = true;
          break;
        case '報廢':
          this.$refs.ScrappedClick.style.backgroundColor = "#F0FFFF"
          break;
      }
    },
  }
}
</script>

<style scoped src="@/assets/css/scrapped.css"></style>
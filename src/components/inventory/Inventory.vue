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
import PurchaseBoard from '@/components/inventory/Purchase_Board.vue'
import HarvestBoard from '@/components/inventory/Harvest_Board.vue'
import AdjustBoard from '@/components/inventory/Adjust_Board.vue'
import DisposeBoard from '@/components/inventory/Dispose_Board.vue'

export default {
  components: {
    'tableprod': tableprod,
    'PurchaseBoard': PurchaseBoard,
    'HarvestBoard': HarvestBoard,
    'AdjustBoard': AdjustBoard,
    'DisposeBoard': DisposeBoard,
  },

  data() {
    return {
      Component: 'PurchaseBoard',
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
          this.Component = HarvestBoard;
          this.$refs.HarvestClick.style.backgroundColor = "#F0FFFF"
          break;
        case '調整':
          this.Component = AdjustBoard;
          this.$refs.AdjustClick.style.backgroundColor = "#F0FFFF"
          break;
        case '報廢':
          this.Component = DisposeBoard;
          this.$refs.ScrappedClick.style.backgroundColor = "#F0FFFF"
          break;
      }
    },
    // 新的不要刪掉
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

<style scoped src="@/assets/css/scrapped.css"></style>
<template>
  <div>
    <div class="func_selec">
      <button class="func_pur" @click="FunctionClick()" ref="PurchaseClick" id="進貨">進貨</button>
      <button class="func_har" @click="FunctionClick()" ref="HarvestClick" id="採收">採收</button>
      <button class="func_adj" @click="FunctionClick()" ref="AdjustClick" id="調整">調整</button>
      <button class="func_scr" @click="FunctionClick()" ref="ScrappedClick" id="報廢">報廢</button>
    </div>

    <div class="measure_board">
      <div class="measure_show">
        {{ FuncText }}數量<input type="int" v-model="MeasureInput">
        種類<select class="typeselect" @change="TypeChange($event)">
          <option v-for="type in types" :key="type.value">
            {{ type.text }}
          </option>
        </select>
      </div>

      <div class="measure_grid">
        <button v-for="MeasureButton in MeasureButtons" :key="MeasureButton.value" v-on:click="MeasureClick(MeasureButton.value)">
          {{ MeasureButton.text }}
        </button>
      </div>
    </div>

    <div class="confirm_but">
      <button class="confirm_can" @click="MeasureClear()">清除</button>
      <button class="confirm_sure" @click="MeasureConfirm()">確定</button>
    </div>

    <div class="show_form">
      <tableprod :FuncSelects="FuncText" :ProductTypes="ProductType" :AdjustMinuss="AdjustMinus" @InitialData="InitialData"></tableprod>
    </div>

  </div>
</template>

<script>
import tableprod from '@/components/table/Table_inventory.vue'

export default {
  components: {
    tableprod
  },

  data() {
    return {
      AdjustMinus:null, //判斷是否為調整的減少存貨 Boolean
      AdjustBoolean:null, //判斷是否為調整，miuns按鍵才可使用 Boolean
      FuncText: "進貨", //功能切換時xx數量的切換
      MeasureInput: "", //xx數量:的Input值
      FuncSelect: null, //判斷現在是哪種功能 String 1.2.3.4
      ProductType: '', //將蔬菜、水果...轉換成C0005、C0004

      types: [ //產品種類
        { text: '全選', value: 'A' },
        { text: '蔬菜', value: 'B' },
        { text: '水果', value: 'C' }
      ],

      MeasureButtons: [ //數字鍵 text是顯示的值 value是程式讀取的值
        { text: '1', value: '1' },
        { text: '2', value: '2' },
        { text: '3', value: '3' },
        { text: '4', value: '4' },
        { text: '5', value: '5' },
        { text: '6', value: '6' },
        { text: '7', value: '7' },
        { text: '8', value: '8' },
        { text: '9', value: '9' },
        { text: '0', value: '0' },
        { text: '00', value: '00' },
        { text: 'minus', value: 'minus' },
      ]
    };
  },
  
  methods: {
    MeasureClick: function (value) {  //點擊數字鍵的處裡  value為傳入的this.MeasureButtons.value

      let splitzero = this.MeasureInput.split('0');

      if(splitzero[0] == ""){ //避免數字開頭是0
        this.MeasureInput = ""
      }

      // if(String(Number(this.MeasureInput)).length == 3){ 限制輸入長度，如果有負號會出問題 還沒做好
      //   return;
      // }

      if(this.AdjustBoolean == true){ //判斷功能是否為調整，如果是調整才可以點擊minus才會有動作
        if(value != 'minus') {
          this.MeasureInput = this.MeasureInput + value;
        }
        if(value == 'minus') {
          this.MeasureInput = '-' + this.MeasureInput;
          this.AdjustMinus = true;
        }
      }
      else {
        this.MeasureInput = this.MeasureInput + value;
      }
    },

    MeasureClear() { //清除數量的Input
      this.MeasureInput = ''
      this.AdjustMinus = false; //重制減少調整的判斷
    },


    //initial 功能選擇扭的顏色、文字
    InitalFunc() {
      this.$refs.PurchaseClick.style.backgroundColor = "#dcdcdc"
      this.$refs.HarvestClick.style.backgroundColor = "#dcdcdc"
      this.$refs.AdjustClick.style.backgroundColor = "#dcdcdc"
      this.$refs.ScrappedClick.style.backgroundColor = "#dcdcdc"
      this.FuncText = event.target.id
      this.AdjustMinus = false;
      this.AdjustBoolean = false;
    },

    //功能點擊鈕的事件處裡，根據不同的功能變更其顏色
    FunctionClick() {
      this.InitialData();
      this.InitalFunc();
      switch(event.target.id){
        case '進貨':
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

    MeasureConfirm() { //點擊確定鈕
      if(Number(this.MeasureInput)){ //確認有輸入數字才送出
        this.$root.$emit('ChangeInventory', (this.MeasureInput)) //啟動子組件的function 子組件要在computed用$on接起來
      }
    },

    //種類變換
    TypeChange(event) { //種類改變
      this.ChangeTypeToCode(event.target.value);
      console.log(this.ProductType)
      this.$root.$emit('ChangeType', (this.ProductType)) //重整該種類的Table 子組件接起來
    },
    
    //將種類的作轉成編號
    ChangeTypeToCode(TypeCode) {
      switch(TypeCode) {
        case '全選':
          this.ProductType = '';
          break;
        case '蔬菜':
          this.ProductType = 'C0005';
          break;
        case '水果':
          this.ProductType = 'C0004';
          break;
      }
    },

    //重制data
    InitialData() {
      this.MeasureInput = ''; //清空Input
      this.AdjustMinus = false; //負號被清空所以AdjustMinus變false
    }
  }
}
</script>

<style scoped src="@/assets/css/scrapped.css"></style>
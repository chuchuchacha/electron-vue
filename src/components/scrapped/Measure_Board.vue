<template>
  <div>
    <div class="measure_board">
      <div class="measure_show">
        {{ FuncText }}數量
        <el-input readonly="readonly" v-model="MeasureInput"></el-input>
        種類
        <el-select v-model="type" placeholder="種類" @change="TypeChange(type)">
          <el-option v-for="type in types" :key="type.value" :label="type.text"
          :value="type.value">
          </el-option>
        </el-select>
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
  </div>
</template>

<script>
export default {
  props: {
    FuncText: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      type:'',
      MeasureInput: "", //xx數量:的Input值
      
      types: [ //產品種類
        { text: '全選', value: '全選' },
        { text: '蔬菜', value: '蔬菜' },
        { text: '水果', value: '水果' }
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
      ],
    }
  },

  methods: {
    MeasureConfirm() { //點擊確定鈕
      if(Number(this.MeasureInput)){ //確認有輸入數字才送出
        this.$root.$emit('ChangeInventory', (this.MeasureInput)) //啟動子組件的function 子組件要在computed用$on接起來
      }
    },

    MeasureClear() { //清除數量的Input
      this.MeasureInput = ''
      this.AdjustMinus = false; //重制減少調整的判斷
    },

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
        if(value == 'minus') {
          console.log('no minus')
        }
        else {
          this.MeasureInput = this.MeasureInput + value;
        }        
      }
    },
    
    //種類變換
    TypeChange(type) { //種類改變
      this.ChangeTypeToCode(type);
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
  },
}
</script>

<style scoped src="@/assets/css/scrapped.css"></style>
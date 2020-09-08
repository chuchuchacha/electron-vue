<template>
  <div class="Inventory">
    <div class="func_selec">
      <button class="func_pur" @click="FunctionClick()" ref="PurchaseClick" id="進貨">進貨</button>
      <button class="func_har" @click="FunctionClick()" ref="HarvestClick" id="採收">採收</button>
      <button class="func_adj" @click="FunctionClick()" ref="AdjustClick" id="調整">調整</button>
      <button class="func_scr" @click="FunctionClick()" ref="ScrappedClick" id="報廢">報廢</button>
    </div>

    <component v-bind:is="Component" :FuncText="FuncText"></component>

    <div class="show_form">
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
import PurchaseBoard from '@/components/inventory/Purchase_Board.vue'
import HarvestBoard from '@/components/inventory/Harvest_Board.vue'
import AdjustBoard from '@/components/inventory/Adjust_Board.vue'
import DisposeBoard from '@/components/inventory/Dispose_Board.vue'
import Productdataservice from "@/services/Productdataservice.js"
import Supplierdataservice from "@/services/Supplierdataservice.js"

export default {
  components: {
    'PurchaseBoard': PurchaseBoard,
    'HarvestBoard': HarvestBoard,
    'AdjustBoard': AdjustBoard,
    'DisposeBoard': DisposeBoard,
  },

  data() {
    return {
      Component: 'PurchaseBoard',
      FuncText: '進貨',

      AllProduct: [],

      temp:[],
      SupplierProduct:[],
      PlantProduct: [],
    };
  },
  
  methods: {
    ChooseRow(val) {
      if(val) {
        this.$root.$emit('currentproduct', val)
      }
    },

    GetAllProduct() {
      this.AllProduct = []
      Productdataservice.getAll()
        .then(response => {
          this.AllProduct = response.data
        })
        .catch(e => {
          console.log(e);
        })
    },

    GetSupplierProduct() {
      this.AllProduct = []
      Supplierdataservice.getAll()
        .then(response => {
          for(let i = 0; i < response.data.length; i++) {
            this.temp.push({products: response.data[i].products})
            if(i == response.data.length - 1) {
              for(let j = 0; j < this.temp.length; j++) {
                for(let o = 0; o < this.temp[j].products.length; o++) {
                  this.SupplierProduct.push(this.temp[j].products[o])
                }
              }
            }
          }
          for(let k = 0; k < this.SupplierProduct.length; k++) {
            if(k != 0) {
              let same = false
              for(let c = 0; c < this.AllProduct.length; c++) {
                if(this.SupplierProduct[k].product_id == this.AllProduct[c].product_id) {
                  same = true
                }
              }
              if(same != true) {
                this.AllProduct.push(this.SupplierProduct[k])
              }
            }
            else {
              this.AllProduct.push(this.SupplierProduct[k])
            }
          }
        })
    },

    GetPLANTProduct() {
      this.AllProduct = []
      this.PlantProduct = []
      Supplierdataservice.getAll()
        .then(response => {
          for(let i = 0; i < response.data.length; i++) {
            this.temp.push({products: response.data[i].products})
            if(i == response.data.length - 1) {
              for(let j = 0; j < this.temp.length; j++) {
                for(let o = 0; o < this.temp[j].products.length; o++) {
                  this.PlantProduct.push(this.temp[j].products[o].product_id)
                }
              }
            }
          }
          this.GetPlantProduct()
        })
    },

    GetPlantProduct() {
      let same = true
      Productdataservice.getAll()
        .then(response => {
          for(let x = 0; x < response.data.length; x++) {
            for(let y = 0; y < this.PlantProduct.length; y++) {
              if(response.data[x].product_id == this.PlantProduct[y]) {
                same = false
              }
            }
            if(same == true) {
              this.AllProduct.push(response.data[x])
            }
          }
        })
    },

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
          this.GetSupplierProduct()
          this.Component = PurchaseBoard;
          this.$refs.PurchaseClick.style.backgroundColor = "#F0FFFF"
          break;
        case '採收':
          this.GetPLANTProduct()
          this.Component = HarvestBoard;
          this.$refs.HarvestClick.style.backgroundColor = "#F0FFFF"
          break;
        case '調整':
          this.GetAllProduct()
          this.Component = AdjustBoard;
          this.$refs.AdjustClick.style.backgroundColor = "#F0FFFF"
          break;
        case '報廢':
          this.GetAllProduct()
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
    this.$root.$on('refresh', () => {
      this.GetAllProduct();
    });
    this.GetAllProduct()
  },
}
</script>

<style scoped src="@/assets/css/Inventory.css"></style>
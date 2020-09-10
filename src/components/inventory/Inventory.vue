<template>
  <div class="Inventory">
    <div class="func_selec">
      <button class="func_pur" @click="FunctionClick()" ref="PurchaseClick" id="進貨">進貨</button>
      <button class="func_har" @click="FunctionClick()" ref="HarvestClick" id="採收">採收</button>
      <button class="func_adj" @click="FunctionClick()" ref="AdjustClick" id="調整">調整</button>
      <button class="func_scr" @click="FunctionClick()" ref="ScrappedClick" id="報廢">報廢</button>
    </div>

    <component v-bind:is="Component" :FuncText="FuncText" @GoToRecord="GoToRecord"></component>

    <div class="show_form">
      <font>種類:</font>
      <el-select placeholder="種類" v-model="Input_category" @change="ChangeType">
        <el-option v-for="category in categories" :key="category.value" :label="category.text"
          :value="category.value">
        </el-option>
      </el-select>
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
import ProductCategory from "@/services/ProductCategorydataservice.js"

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

      categories: [
        {text: '全部', value:'all'}
      ],
      Input_category:null,

      temp:[],
      SupplierProduct:[],
      PlantProduct: [],
    };
  },
  
  methods: {
    //更改產品類別
    ChangeType() {
      //選擇調整或報廢
      if(this.Component.__file == 'src/components/inventory/Adjust_Board.vue' || this.Component.__file == 'src/components/inventory/Dispose_Board.vue') {
        //不是all根據種類抓產品
        if(this.Input_category != 'all') {
          this.GetAllProductByCategory(this.Input_category)
        }
        //選擇all
        if(this.Input_category == 'all') {
          this.GetAllProduct()
        }
      }
      //選擇採收
      if(this.Component.__file == 'src/components/inventory/Harvest_Board.vue') {
        //不是all根據種類抓產品
        if(this.Input_category != 'all') {
          this.PushPlantProductByCategory(this.Input_category)
        }
        //選擇all
        if(this.Input_category == 'all') {
          this.PushPlantProduct()
        }
      }
      //選擇進貨
      if(this.Component.__file == 'src/components/inventory/Purchase_Board.vue') {
        //不是all根據種類抓產品
        if(this.Input_category != 'all') {
          this.PushSupplierProductByCategory(this.Input_category)
        }
        //選擇all
        if(this.Input_category == 'all') {
          this.PushSupplierProduct()
        }
      }
    },
    
    //選擇產品
    ChooseRow(val) {
      if(val) {
        //將選擇的產品資訊傳到xxxxx_Board.vue
        this.$root.$emit('currentproduct', val)
      }
    },

    //選擇全部產品
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

    //選擇特定種類的全部產品
    GetAllProductByCategory(val) {
      this.AllProduct = []
      Productdataservice.gettype(val)
        .then(response => {
          this.AllProduct = response.data
        })
        .catch(e => {
          console.log(e);
        })
    },
    
    //根據供應商供應的產品，配對所有產品push進AllProduct
    PushSupplierProduct() {
      this.AllProduct = []
      let same = false
      Productdataservice.getAll()
        .then(response => {
          for(let i = 0; i < response.data.length; i++) {
            for(let j = 0; j < this.SupplierProduct.length; j++) {
              if(response.data[i].product_id == this.SupplierProduct[j].product_id) {
                same = true
              }
            }
            if(same == true) {
              this.AllProduct.push(response.data[i])
            }
            same = null
          }
        })
        .catch(e => {
          console.log(e);
        })
    },

    //根據供應商供應的產品，配對特定種類產品push進AllProduct
    PushSupplierProductByCategory(val) {
      this.AllProduct = []
      let same = false
      Productdataservice.gettype(val)
        .then(response => {
          for(let i = 0; i < response.data.length; i++) {
            for(let j = 0; j < this.SupplierProduct.length; j++) {
              if(response.data[i].product_id == this.SupplierProduct[j].product_id) {
                same = true
              }
            }
            if(same == true) {
              this.AllProduct.push(response.data[i])
            }
            same = null
          }
        })
        .catch(e => {
          console.log(e);
        })
    },

    //取得供應商供應的產品
    GetSupplierProduct() {
      this.AllProduct = []
      this.SupplierProduct = []
      //取得供應商供應的產品
      Supplierdataservice.getAll()
        .then(response => {
          //將所有供應商供應的產品push到temp物件，會有'重複'的產品
          for(let i = 0; i < response.data.length; i++) {
            for(let j = 0; j < response.data[i].products.length; j++) {
              this.SupplierProduct.push(response.data[i].products[j])
            }
          }
          this.PushSupplierProduct()
        })
    },

    //根據'不是'供應商供應的產品，配對特定種類產品push進AllProduct
    PushPlantProductByCategory(val) {
      this.AllProduct = []
      let same = null
      Productdataservice.gettype(val)
        .then(response => {
          for(let i = 0; i < response.data.length; i++) {
            for(let j = 0; j < this.SupplierProduct.length; j++) {
              if(response.data[i].product_id != this.SupplierProduct[j].product_id) {
                same = true
              }
            }
            if(same == null) {
              this.AllProduct.push(response.data[i])
            }
            same = null
          }
        })
        .catch(e => {
          console.log(e);
        })
    },

    //根據'不是'供應商供應的產品，配對所有產品push進AllProduct
    PushPlantProduct() {
      this.AllProduct = []
      let same = null
      Productdataservice.getAll()
        .then(response => {
          for(let i = 0; i < response.data.length; i++) {
            for(let j = 0; j < this.SupplierProduct.length; j++) {
              if(response.data[i].product_id == this.SupplierProduct[j].product_id) {
                same = true
              }
            }
            if(same == null) {
              this.AllProduct.push(response.data[i])
            }
            same = null
          }
        })
        .catch(e => {
          console.log(e);
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
      this.Input_category = 'all'
      switch(event.target.id){
        case '進貨':
          this.PushSupplierProduct()
          this.Component = PurchaseBoard;
          this.$refs.PurchaseClick.style.backgroundColor = "#F0FFFF"
          break;
        case '採收':
          this.PushPlantProduct()
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
    
    GoBack() {
      this.$emit('BackToMain')
    },
    
    GoToRecord(val) {
      this.$emit('BackToMain', val)
    }
  },

  mounted() {
    this.$refs.PurchaseClick.style.backgroundColor = "#F0FFFF"
    this.$refs.HarvestClick.style.backgroundColor = "#dcdcdc"
    this.$refs.AdjustClick.style.backgroundColor = "#dcdcdc"
    this.$refs.ScrappedClick.style.backgroundColor = "#dcdcdc"
    this.Component = PurchaseBoard;
    ProductCategory.getAll()
      .then(response => {
        for(let i = 0; i<response.data.length ; i++) {
          this.categories.push({text: response.data[i].product_category_name , value: response.data[i].product_category_id})
        }
      })
      .catch(e => {
        console.log(e);
      })
    this.$root.$on('GoBack', () => {
      this.GoBack();
    });
    this.$root.$on('refresh', () => {
      this.GetAllProduct();
    });
    this.GetSupplierProduct()
  },
}
</script>

<style scoped src="@/assets/css/Inventory.css"></style>
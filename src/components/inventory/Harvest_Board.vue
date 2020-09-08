<template>
  <div class="scrap_pur">
    <div class="purchase_board">
      
      <div class="pbo1">
        <font>產品:</font>
        <el-input v-model="Input_product" placeholder="請選產品" class="pbo1_input1" readonly="readonly"></el-input>
        <font>數量:</font>
        <el-input v-model.number="Input_amount" placeholder='' class="pbo1_input2"></el-input>
      </div>

      <div class="pbo2">
        <font>種植紀錄:</font>
        <el-select placeholder="種植紀錄" v-model="Select_Plant">
          <el-option v-for="plant in plants" :key="plant.value"
          :label="plant.text" :value="plant.value">
          </el-option>
        </el-select>
        <el-button class="insertbut" @click="InsertTable()">輸入</el-button>
      </div>
    
    </div>

    <div class="purchase_table">
      <el-table
        :data="HarvestData"
        stripe:true border:true height="36vh" empty-text="請輸入資料">
        <el-table-column
          prop="product"
          label="產品">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="數量">
        </el-table-column>
      </el-table>
    </div>

    <div class="purchase_bottom">
      <el-button class="pb_delet" @click="DeletTable()">刪除</el-button>
      <el-button class="pb_confirm" @click="ConfirmInventory()">確認</el-button>
    </div>
  </div>
</template>

<script>
import Harvestdataservice from "@/services/Harvestdataservice.js"
import Productdataservice from "@/services/Productdataservice.js"
import Plantdataservice from "@/services/Plantdataservice.js"

export default {
  data() {
    return {
      Input_product: null,  //輸入框的v-model
      Input_amount: null,
      Select_Plant: null,
      plants: [],

      LastIDNumber: null,
      IDMakeUp: null,

      ProInventory:null,
      
      HarvestData: [], //供el-table使用的資料

      //放置產品id 在currentproduct更新
      ProductData_ID: null,

      SQLharvest: { //資料庫的harvest
        harvest_id: null,
        user_id: 'ADM001',
        harvest_dt: null,
        product: []
      },

      //更新產品存貨
      SQLchangeproduct: [],

      GetDate: new Date(), //日期函數
      Datenow: null, //儲存現在日期
      DateID: null,
    }
  },


  methods: {
    DeletTable() {
      //Harvestdataservice.deleteAll()
    },

    //將最大ID+1的前面補齊
    IDMakeUP() {
      switch(this.LastIDNumber.length) {
        case 1 :
          this.IDMakeUp = 'HARR' + '' + this.DateID + '000'
          break;
        case 2 :
          this.IDMakeUp = 'HARR' + '' + this.DateID + '00'
          break;
        case 3 :
          this.IDMakeUp = 'HARR' + '' + this.DateID + '0'
          break;
        case 4 :
          this.IDMakeUp = 'HARR' + '' + this.DateID
          break;
      }
      this.LastIDNumber = this.IDMakeUp + this.LastIDNumber
      console.log(this.LastIDNumber)
    },

    //取得最大的ID+1
    GetBiggestID() {
      Harvestdataservice.getBigID()
        .then(response => {
          if(response.data) {
            this.LastIDNumber = String(Number(response.data.substr(12)) + 1);
          }
          else{
            this.LastIDNumber = '1'
          }
          this.IDMakeUP()
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    //點擊輸入的按鈕
    InsertTable() {
      //將資料推到table裡
      this.HarvestData.push({product: this.Input_product, amount: this.Input_amount})
      //將資料寫進SQLharvest_p_products陣列 == raw的數量
      this.SQLharvest.product.push({product_id: this.ProductData_ID,amount: this.Input_amount})
      //更新產品庫存
      this.SQLchangeproduct.push({product_inventory: (this.Input_amount+this.ProInventory)})
      //Input清空
      this.InitalInput();
    },

    //點擊確認送出進貨資料
    ConfirmInventory() {
      if(this.HarvestData) {
        //將進貨編號寫進SQL裡面
        this.SQLharvest.harvest_id = this.LastIDNumber
        //取得SQL的日期
        this.getDate();
        this.SQLharvest.harvest_dt = this.Datenow
        //送出SQLharvest
        Harvestdataservice.create(this.SQLharvest)
          .then(response => {
            console.log(response.data)
            for(let i = 0;i < this.SQLharvest.product.length;i++) {
              Productdataservice.update(this.SQLharvest.product[i].product_id, this.SQLchangeproduct[i])
                .then(response => {
                  this.$notify({
                    title: '提示',
                    message: response.data.message,
                    duration: 3000,
                    type: 'success',
                    position: 'bottom-right',
                    showClose: false
                  });
                  this.$root.$emit('refresh');
                  this.GetBiggestID()
                  this.HarvestData = []
                  this.SQLharvest.product = []
                  this.SQLchangeproduct = []
                })
            }
          })
      }
    },

    //取得最新日期
    getDate() {
      this.Datenow = this.GetDate.getFullYear() + '-' + ('0'+ (this.GetDate.getMonth()+1)).substr(-2) + '-' + ('0'+ this.GetDate.getDate()).substr(-2) + ' ' + this.GetDate.getHours() + ':' + this.GetDate.getMinutes() + ":" + this.GetDate.getSeconds()
      this.DateID = this.GetDate.getFullYear()+ '' +('0'+ (this.GetDate.getMonth()+1)).substr(-2)+('0'+ this.GetDate.getDate()).substr(-2)
    },

    //InventoryTable點擊後的動作 1.取得product_id
    getcurrentID(ProName, ProID, ProInventory) {  //從InventoryTable取得選取的Product_ID
      this.Input_product = ProName;
      this.ProductData_ID = ProID
      this.ProInventory = ProInventory
    },

    //重製Input除了總計
    InitalInput() {
      this.Input_product = null
      this.Input_amount = null
    },

    GetAllPlants() {
      Plantdataservice.getAll()
        .then(response => {
          for(let i = 0; i < response.data.length; i++) {
            this.plants.push({text: response.data[i].plant_id, value: response.data[i].plant_id})
          }
        })
    },
  },

  mounted() {
    this.$root.$on('currentproduct', (CurrentProduct) => {
      this.getcurrentID(CurrentProduct.product_name, CurrentProduct.product_id, CurrentProduct.product_inventory);
    });
    this.getDate()
    this.GetBiggestID()
    this.GetAllPlants()
  }
}


</script>

<style scoped src="@/assets/css/Inventory.css"></style>
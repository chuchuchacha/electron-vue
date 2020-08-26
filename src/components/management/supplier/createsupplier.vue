<template>
  <div>
    <div class="createsupplier">
      <div class="fieldOne">
        <font>編號:</font>
        <el-input v-model="createsuppliers.supplier_id" readonly="readonly"></el-input>

        <font>名稱:</font>
        <el-input v-model="createsuppliers.supplier_name"></el-input>

        <font>地址:</font>
        <el-input v-model="createsuppliers.supplier_address"></el-input>
      </div>

      <div class="fieldTwo">
        <font>電話:</font>
        <el-input v-model="createsuppliers.supplier_phone"></el-input>

        <font>說明:</font>
        <el-input v-model="createsuppliers.supplier_desc" type="textarea" resize="none" ></el-input>

        <button @click="CreateManagement()">新增供應商</button>
      </div>
    </div>

    <div class="createsupplier_table">
      <el-table
        :data="AllSupplier"
        stripe border height="58vh" empty-text="未新增供應商">
        <el-table-column
          prop="supplier_id"
          label="編號">
        </el-table-column>
        <el-table-column
          prop="supplier_name"
          label="名稱">
        </el-table-column>
        <el-table-column
          prop="supplier_phone"
          label="電話">
        </el-table-column>
        <el-table-column
          prop="supplier_address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="supplier_remark"
          label="說明">
        </el-table-column>
      </el-table>
    </div>
  </div>
    
</template>

<script>
import Supplierdataservice from "@/services/Supplierdataservice.js"

export default {
  data() {
    return {
      LastIDNumber: null,
      IDMakeUp: null,

      AllSupplier: [],

      createsuppliers: {  //為了寫進SQL的語法
        supplier_id: null,
        supplier_name: null,
        supplier_phone: null,
        supplier_address: null,
        supplier_desc: null,
      },
    };
  },

  methods: {
    //我是新的method喔，抓最新的ID
    IDMakeUP() {
      switch(this.LastIDNumber.length) {
        case 1:
          this.IDMakeUp = 'S000';
          break;
        case 2:
          this.IDMakeUp = 'S00';
          break;
        case 3:
          this.IDMakeUp = 'S0';
          break;
        case 4:
          this.IDMakeUp = 'S';
          break;
      }
      this.LastIDNumber = this.IDMakeUp + this.LastIDNumber
      this.createsuppliers.supplier_id = this.LastIDNumber
    },

    GetBiggestID() {
      Supplierdataservice.getBigID()
        .then(response => {
          if(response.data) {
            this.LastIDNumber = String(Number(response.data.split('S')[1]) + 1);
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

    CreateManagement() {
      Supplierdataservice.create(this.createsuppliers)
        .then(response => {
          if(response.message) {
            this.InitialInput()
            this.GetBiggestID()
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    InitialInput() {
      this.createsuppliers.supplier_id = null,
      this.createsuppliers.supplier_name = null,
      this.createsuppliers.supplier_phone = null,
      this.createsuppliers.supplier_address = null,
      this.createsuppliers.supplier_desc = null
    },
  },

  mounted() {
    this.GetBiggestID()
  }
};
</script>

<style scoped src="@/assets/css/SupplierView.css"></style>
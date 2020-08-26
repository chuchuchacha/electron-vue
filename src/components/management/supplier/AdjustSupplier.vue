<template>
  <div>
    <div class="createsupplier">
      <div class="fieldOne">
        <font>編號:</font>
        <el-input v-model="suppliers.supplier_id" readonly="readonly"></el-input>

        <font>名稱:</font>
        <el-input v-model="suppliers.supplier_name"></el-input>

        <font>地址:</font>
        <el-input v-model="suppliers.supplier_address"></el-input>
      </div>

      <div class="fieldTwo">
        <font>電話:</font>
        <el-input v-model="suppliers.supplier_phone"></el-input>

        <font>說明:</font>
        <el-input v-model="suppliers.supplier_desc" type="textarea" resize="none" ></el-input>

        <button @click="UpdateSupplier()">修改供應商</button>
      </div>
    </div>

    <div class="createsupplier_table">
      <el-table
        :data="AllSupplier" class="adjusttable"
        stripe border height="58vh" empty-text="請修改供應商">
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
          prop="supplier_desc"
          label="說明">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Supplierdataservice from "@/services/Supplierdataservice.js"

export default {
  props: {
    AdjustSupplier: {
      type: Object,
      required: false,
    }
  },

  data() {
    return {
      AllSupplier: [],

      suppliers: {  //為了寫進SQL的語法
        supplier_id: null,
        supplier_name: null,
        supplier_phone: null,
        supplier_address: null,
        supplier_desc: null,
      },
    }
  },

  methods: {
    UpdateSupplier() {
      Supplierdataservice.update(this.suppliers.supplier_id, this.suppliers)
        .then()
          this.AllSupplier.push({supplier_id: this.suppliers.supplier_id, supplier_name: this.suppliers.supplier_name, 
          supplier_phone: this.suppliers.supplier_phone, supplier_address: this.suppliers.supplier_address, supplier_desc: this.suppliers.supplier_desc })
    },

    CatchTargetSupplier() {
      this.suppliers.supplier_id = this.AdjustSupplier.supplier_id
      this.suppliers.supplier_name = this.AdjustSupplier.supplier_name
      this.suppliers.supplier_phone = this.AdjustSupplier.supplier_phone
      this.suppliers.supplier_address = this.AdjustSupplier.supplier_address
      this.suppliers.supplier_desc = this.AdjustSupplier.supplier_desc
    },
  },

  mounted() {
    this.CatchTargetSupplier()
  },
}
</script>

<style scoped src="@/assets/css/SupplierView.css"></style>
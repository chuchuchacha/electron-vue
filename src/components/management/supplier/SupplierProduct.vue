<template>
  <div>
    <div class="Supplierbar">
      <font>供應商:</font>
      <el-select v-model="SupplierTarget" placeholder="供應商" @change="SupplierChange">
        <el-option v-for="Supplier in Suppliers" :key="Supplier.value"
        :label="Supplier.text" :value="Supplier.value">
        </el-option>
      </el-select>

      <el-button @click="UpdateSupplier">確認</el-button>
    </div>

    <div class="ProductTable">
      <el-table
        :data="AllProduct" @selection-change="ProductSelect" ref="productrow"
        stripe border height="73vh" empty-text="請先新增產品">
        <el-table-column
          type="selection"
          width="39px">
        </el-table-column>
        <el-table-column
          prop="product_id"
          label="編號">
        </el-table-column>
        <el-table-column
          prop="product_name"
          label="名稱">
        </el-table-column>
        <el-table-column
          prop="product_category_id"
          label="類別">
        </el-table-column>
        <el-table-column
          prop="product_unit"
          label="單位">
        </el-table-column>
        <el-table-column
          prop="product_unit_price"
          label="單價">
        </el-table-column>
        <el-table-column
          prop="product_descs"
          label="說明">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Productdataservice from "@/services/Productdataservice.js"
import Supplierdataservice from "@/services/Supplierdataservice.js"

export default {
  data() {
    return {
      AllProduct: [],

      Suppliers: [],
      SupplierTarget: null,

      Defaultproduct: [],

      TempTarget: [],

      TargetProduct: {
        products: []
      },
    }
  },

  methods: {
    UpdateSupplier() {
      for(let i = 0; i < this.TempTarget.length; i++) {
        this.TargetProduct.products.push({product_id: this.TempTarget[i].product_id})
      }
      if(this.SupplierTarget) {
        Supplierdataservice.update(this.SupplierTarget, this.TargetProduct)
          .then(response => {
            console.log(response.data)
            this.TargetProduct={products: []}
          })
      }
    },

    SupplierChange(val) {
      Supplierdataservice.get(val)
      .then(response => {
        this.Defaultproduct = []
        for(let i = 0; i < response.data.products.length; i++) {
            for(let j = 0; j < this.AllProduct.length; j++) {
              if(response.data.products[i].product_id == this.AllProduct[j].product_id) {
                this.Defaultproduct.push({j})
              }
            }
          }
          this.$refs.productrow.clearSelection();
          for(let o = 0; o < this.Defaultproduct.length; o++) {
            this.$refs.productrow.toggleRowSelection(this.AllProduct[this.Defaultproduct[o].j],true);
          }
      })
    },
    
    ProductSelect(val) {
      this.TempTarget = val
    },

    GetAllProduct() {
      Productdataservice.getAll()
        .then(response => {
          this.AllProduct = response.data
        })
        .catch(e => {
          console.log(e);
        })
    },

    GetAllSupplier() {
      Supplierdataservice.getAll()
        .then(response => {
          for(let i = 0; i < response.data.length; i++) {
            this.Suppliers.push({text: response.data[i].supplier_id + ' => ' 
            + response.data[i].supplier_name, value: response.data[i].supplier_id})
          }
        })
        .catch(e => {
          console.log(e);
        })
    },
  },

  mounted() {
    this.GetAllProduct()
    this.GetAllSupplier()
  },
}
</script>

<style scoped src="@/assets/css/SupplierView.css"></style>
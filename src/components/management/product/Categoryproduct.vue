<template>
  <div>
    <div class="Categoryproduct">
      <font>類別編號:</font>
      <el-input v-model="CreateCategory.product_category_id" readonly="readonly"></el-input>
      <font>類別名稱:</font>
      <el-input v-model="CreateCategory.product_category_name"></el-input>
      <font>類別說明:</font>
      <el-input type="textarea" v-model="CreateCategory.product_category_desc"></el-input>
      <el-button @click="Createcategory()">輸入</el-button>
      <el-button @click="CreateChose()">新增類別</el-button>
      <el-button @click="BacktoProductview()">修改產品</el-button>
    </div>
    <div class="CategoryTable">
      <el-table
        :data="AllCategory"
        @current-change="ChooseRow" highlight-current-row stripe border height="60vh" empty-text="未新增類別">
        <el-table-column
          prop="product_category_id"
          label="編號">
        </el-table-column>
        <el-table-column
          prop="product_category_name"
          label="名稱">
        </el-table-column>
        <el-table-column
          prop="product_category_desc"
          label="說明">
        </el-table-column>
        <el-table-column
          prop="product_category_img"
          label="圖片">
        </el-table-column>
        <el-table-column
          prop="product_category_parent"
          label="父類別">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import ProductCategorydata from "@/services/ProductCategorydataservice.js"

export default {

  data() {
    return {
      LastIDNumber: null,
      IDMakeUp: null,

      AllCategory: [],

      CreateCategory: {
        product_category_id: null,
        product_category_name: null,
        product_category_desc: null,
        product_category_img: null,
        product_category_sort: 0,
        product_category_parent: null
      },

      CreateBoolean: null,
    }
  },

  methods: {
    BacktoProductview() {
      this.$emit('ChangeFunction', 'ProductView');
    },

    ChooseRow(val) {
      if(val) {
        this.CreateCategory.product_category_id = val.product_category_id
        this.CreateCategory.product_category_name = val.product_category_name
        this.CreateCategory.product_category_desc = val.product_category_desc
        this.CreateBoolean = false
      } 
    },

    CreateChose() {
      this.CreateCategory.product_category_id = this.LastIDNumber
      this.CreateCategory.product_category_name = null
      this.CreateCategory.product_category_desc = null
      this.CreateBoolean = true
    },

    Createcategory() {
      if(this.CreateBoolean == true) {
        ProductCategorydata.create(this.CreateCategory)
          .then()
            this.GetAllProductCategory()
            this.GetAllProductCategory()
            this.CreateBoolean = null;
      }
      if(this.CreateBoolean == false) {
        ProductCategorydata.update(this.CreateCategory.product_category_id , this.CreateCategory)
          .then()
            this.GetAllProductCategory()
            this.GetAllProductCategory()
            this.CreateBoolean = null;
      } 
    },

    IDMakeUP() {
      switch(this.LastIDNumber.length) {
        case 1:
          this.IDMakeUp = 'PC00';
          break;
        case 2:
          this.IDMakeUp = 'PC0';
          break;
        case 3:
          this.IDMakeUp = 'PC';
          break;
      }
      this.LastIDNumber = this.IDMakeUp + this.LastIDNumber
      console.log(this.LastIDNumber)
    },
    
    GetBiggestID() {
      ProductCategorydata.getBigID()
        .then(response => {
          console.log(response.data)
          if(response.data) {
            this.LastIDNumber = String(Number(response.data.split('PC')[1]) + 1);
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

    GetAllProductCategory() {
      ProductCategorydata.getAll()
        .then(response => {
          this.AllCategory = response.data
        })
        .catch(e => {
          console.log(e);
        })
    },
  },

  mounted() {
    this.GetBiggestID()
    this.GetAllProductCategory();
  },
}
</script>

<style scoped src="@/assets/css/ProductView.css"></style>
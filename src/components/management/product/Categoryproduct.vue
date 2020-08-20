<template>
  <div>
    <div class="Categoryproduct">
      <font>類別編號:</font>
      <el-input v-model="id" readonly="readonly"></el-input>
      <font>類別名稱:</font>
      <el-input v-model="name"></el-input>
      <font>類別說明:</font>
      <el-input type="textarea" v-model="desc"></el-input>
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
        product_category_img: '',
        product_category_sort: 0,
        product_category_parent: null
      },

      id:null,
      name:null,
      desc:null,
    }
  },

  methods: {
    BacktoProductview() {
      this.$emit('ChangeFunction', 'ProductView');
    },

    ChooseRow(val) {
      val.product_category_id = this.id
      val.product_category_name = this.name
      val.product_category_desc = this.desc
    },

    CreateChose() {
      this.id = this.LastIDNumber
      this.name = null
      this.desc = null
    },

    Createcategory() {
      this.CreateCategory.product_category_id = this.id
      this.CreateCategory.product_category_name = this.name
      this.CreateCategory.product_category_desc = this.desc
      ProductCategorydata.create(this.CreateCategory);
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
    },
    
    GetBiggestID() {
      ProductCategorydata.getBigID()
        .then(response => {
          if(response.data) {
            this.LastIDNumber = String(Number(response.data.product_category_id.split('PC')[1]) + 1);
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

    GetAllProduct() {
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
    this.GetAllProduct();
  },
}
</script>

<style scoped src="@/assets/css/ProductView.css"></style>
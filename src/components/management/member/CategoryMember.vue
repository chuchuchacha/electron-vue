<template>
  <div>
    <div class="Categorymember">
      <font>類別編號:</font>
      <el-input v-model="CreateCategory.member_category_id" readonly="readonly"></el-input>
      <font>類別名稱:</font>
      <el-input v-model="CreateCategory.member_category_name"></el-input>
      <font>類別說明:</font>
      <el-input type="textarea" v-model="CreateCategory.member_category_desc"></el-input>
      <el-button @click="Createcategory()">輸入</el-button>
      <el-button @click="CreateChose()">新增類別</el-button>
      <el-button @click="Backtomemberview()">修改會員</el-button>
    </div>
    <div class="CategoryTable">
      <el-table
        :data="AllCategory" @current-change="ChooseRow" highlight-current-row 
        stripe border height="60vh" empty-text="未新增類別">
        <el-table-column
          prop="member_category_id"
          label="編號">
        </el-table-column>
        <el-table-column
          prop="member_category_name"
          label="名稱">
        </el-table-column>
        <el-table-column
          prop="member_category_desc"
          label="說明">
        </el-table-column>
        <el-table-column
          prop="member"
          label="會員">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import MemberCategoryservice from "@/services/MemberCategoryservice.js"

export default {
  data() {
    return {
      LastIDNumber: null,
      IDMakeUp: null,

      AllCategory: [],

      CreateCategory: {
        member_category_id: null,
        member_category_name: null,
        member_category_desc: null
      },

      CreateBoolean: null,
    }
  },

  methods: {
    Backtomemberview() {
      this.$emit('ChangeFunction', 'AdjustCategory');
    },

    Createcategory(){
      if(this.CreateBoolean == true) {
        MemberCategoryservice.create(this.CreateCategory)
          .then(response => {
            console.log(response.data)
            this.GetAllCategories()
          })
      }
      if(this.CreateBoolean == false) {
        MemberCategoryservice.update(this.CreateCategory.member_category_id, this.CreateCategory)
          .then(response => {
            console.log(response.data)
            this.GetAllCategories()
          })
      }
    },

    CreateChose() {
      this.CreateCategory.member_category_id = this.LastIDNumber
      this.CreateCategory.member_category_name = null
      this.CreateCategory.member_category_desc = null
      this.CreateBoolean = true
    },

    IDMakeUP() {
      switch(this.LastIDNumber.length) {
        case 1:
          this.IDMakeUp = 'MC00';
          break;
        case 2:
          this.IDMakeUp = 'MC0';
          break;
        case 3:
          this.IDMakeUp = 'MC';
          break;
      }
      this.LastIDNumber = this.IDMakeUp + this.LastIDNumber
    },
    
    GetBiggestID() {
      MemberCategoryservice.getBigID()
        .then(response => {
          if(response.data) {
            this.LastIDNumber = String(Number(response.data.split('MC')[1]) + 1);
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
    
    GetAllCategories() {
      MemberCategoryservice.getAll()
        .then(response => {
          this.AllCategory = response.data
        })
        .catch(e => {
          console.log(e);
        })
    },

    ChooseRow(val) {
      if(val) {
        this.CreateCategory.member_category_id = val.member_category_id
        this.CreateCategory.member_category_name = val.member_category_name
        this.CreateCategory.member_category_desc = val.member_category_desc
        this.CreateBoolean = false
      } 
    }
  },

  mounted() {
    this.GetAllCategories()
    this.GetBiggestID()
  },
}
</script>

<style scoped src="@/assets/css/MemberView.css"></style>
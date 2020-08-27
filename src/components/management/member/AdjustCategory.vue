<template>
  <div>
    <div class="Categorybar">
      <font>會員類別:</font>
      <el-select v-model="CategoryTarget" placeholder="會員類別" @change="CategoryChange">
        <el-option v-for="Category in Categories" :key="Category.value"
        :label="Category.text" :value="Category.value">
        </el-option>
      </el-select>

      <el-button @click="UpdateCategory">確認</el-button>
    </div>

    <div class="MemberTable">
      <el-table
        :data="AllMember" @selection-change="MemberSelect" ref="memberrow"
        stripe border height="73vh" empty-text="請先新增會員">
        <el-table-column
          type="selection"
          width="39px">
        </el-table-column>
        <el-table-column
          prop="member_id"
          label="編號">
        </el-table-column>
        <el-table-column
          prop="member_name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="member_phone"
          label="電話">
        </el-table-column>
        <el-table-column
          prop="member_address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="member_remark"
          label="備註">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Memberdataservice from "@/services/Memberdataservice.js"
import MemberCategoryservice from "@/services/MemberCategoryservice.js"

export default {
  data() {
    return {
      AllMember: [],

      Categories: [],
      CategoryTarget: null,

      TargetMember: {
        members: []
      },

      TempTarget: [],

      Defaultmember: [],
    }
  },

  methods: {
    CategoryChange(val) {
      MemberCategoryservice.get(val)
        .then(response => {
          this.Defaultmember = []
          for(let i = 0; i < response.data.members.length; i++) {
            for(let j = 0; j < this.AllMember.length; j++) {
              if(response.data.members[i].member_id == this.AllMember[j].member_id) {
                this.Defaultmember.push({j})
              }
            }
          }
          this.$refs.memberrow.clearSelection();
          for(let o = 0; o < this.Defaultmember.length; o++) {
            this.$refs.memberrow.toggleRowSelection(this.AllMember[this.Defaultmember[o].j],true);
          }
        })
    },

    MemberSelect(val) {
      this.TempTarget = val
    },

    UpdateCategory() {
      for(let i = 0; i < this.TempTarget.length; i++) {
        this.TargetMember.members.push({member_id: this.TempTarget[i].member_id})
      }
      if(this.CategoryTarget) {
        console.log(this.TargetMember)
        MemberCategoryservice.update(this.CategoryTarget, this.TargetMember)
          .then(response => {
            console.log(response.data)
            this.TargetMember={members: []}
          })
      }
    },

    GetAllMember() {
      Memberdataservice.getAll()
        .then(response => {
          this.AllMember = response.data
        })
        .catch(e => {
          console.log(e);
        })
    },

    GetAllCategories() {
      MemberCategoryservice.getAll()
        .then(response => {
          for(let i = 0; i < response.data.length; i++) {
            this.Categories.push({text: response.data[i].member_category_id + ' => ' 
            + response.data[i].member_category_name, value: response.data[i].member_category_id})
          }
        })
        .catch(e => {
          console.log(e);
        })
    },
  },

  mounted() {
    this.GetAllMember()
    this.GetAllCategories()
  },
}
</script>

<style scoped src="@/assets/css/MemberView.css"></style>
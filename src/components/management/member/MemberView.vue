<template>
  <div>
    <div class="adjustmember">
      <font>搜尋:</font>
      <el-input v-model="search" placeholder="輸入要搜尋的內容"></el-input>
      <font>現在選擇會員: </font>
      <el-input v-model="ChoosenIdName"></el-input>
      <el-button @click="ChangeMember()">修改</el-button>
      <el-button @click="DeleteMember()">刪除</el-button>
    </div>

    <div class="tablemember">
      <el-table :data="AllMember.filter(data => !search || data.member_name.includes(search) || data.member_id.toLowerCase().includes(search.toLowerCase())|| 
        String(data.member_phone).includes(String(search)) || String(data.member_address).includes(String(search)) || data.member_gender.toLowerCase().includes(search.toLowerCase()))"
        @current-change="ChooseRow" highlight-current-row :row-style="{height: '10vh'}" stripe border height="75vh" empty-text="沒有會員">
        <el-table-column
          sortable
          :sort-orders="['ascending', 'descending']"
          :resizable="false"
          width="90px"
          align='center'
          prop="member_id"
          label="編號">
        </el-table-column>
        <el-table-column
          :resizable="false"
          width="105px"
          prop="member_name"
          label="姓名">
        </el-table-column>
        <el-table-column
          :resizable="false"
          width="80px"
          prop="member_gender"
          label="性別">
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="member_phone"
          width="130px"
          label="電話">
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="member_address"
          width="320px"
          label="地址">
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="member_remark"
          width="257px"
          label="備註">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Memberdataservice from "@/services/Memberdataservice.js"

export default {
  data() {
    return {
      AllMember:[],
      ChoosenRow: null,
      ChoosenIdName: null,

      search:null,

      Gender: [
        {text: '男', value: 1},
        {text: '女', value: 2},
      ],
    }
  },

  methods: {
    DeleteProduct() {
      if(this.ChoosenRow) {
        Memberdataservice.delete(this.ChoosenRow.member_id)
        this.GetAllMember()
      }  
    },

    GetAllMember() {
      Memberdataservice.getAll()
        .then(response => {
          this.AllMember = response.data
          for(let i = 0; i < response.data.length; i++) {
            for(let j = 0; j < this.Gender.length; j++) {
              if(response.data[i].member_gender == this.Gender[j].value) {
                this.AllMember[i].member_gender = this.Gender[j].text
              }
            }
          }
        })
        .catch(e => {
          console.log(e);
        })
    },

    ChooseRow(val) {
      if(val) {
        this.ChoosenRow = val
        this.ChoosenIdName = val.member_id + ':' + val.member_name
      }
    },
    
    ChangeMember() {
      if(this.ChoosenRow) {
        for(let j = 0; j < this.Gender.length; j++) {
          if(this.ChoosenRow.member_gender == this.Gender[j].text) {
            this.ChoosenRow.member_gender = this.Gender[j].value
            this.$emit('ChangeFunction', 'AdjustMember', this.ChoosenRow);
          }
        }
      }
    },
  },

   mounted() {
     this.GetAllMember()
   },
}
</script>

<style scoped src="@/assets/css/MemberView.css"></style>
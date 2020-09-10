<template>
  <div>
    <div class="adjustmember">
      <font>現在選擇會員: </font>
      <el-input v-model="ChoosenIdName"></el-input>
      <el-button @click="ChangeMember()">修改</el-button>
      <el-button @click="DeleteMember()">刪除</el-button>
    </div>

    <div class="tablemember">
      <el-table :data="AllMember" @current-change="ChooseRow" highlight-current-row :row-style="{height: '8vw'}"
        stripe border height="75vh" empty-text="沒有會員" width="200vw">
        <el-table-column
          sortable
          :sort-orders="['ascending', 'descending']"
          :resizable="false"
          align='center'
          width="90px"
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
          prop="member_birthday"
          width="130px"
          label="生日">
        </el-table-column>
        <el-table-column
          prop="member_phone"
          width="130px"
          label="電話">
        </el-table-column>
        <el-table-column
          prop="member_email"
          width="280px"
          label="信箱">
        </el-table-column>
        <el-table-column
          prop="member_address"
          width="320px"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="member_remark"
          width="320px"
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
      this.ChoosenRow = val
      this.ChoosenIdName = val.member_id + ':' + val.member_name
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
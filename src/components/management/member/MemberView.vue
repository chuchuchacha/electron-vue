<template>
  <div>
    <div class="adjustmember">
      <font>現在選擇會員: </font>
      <el-input v-model="ChoosenIdName"></el-input>
      <el-button @click="ChangeMember()">修改</el-button>
    </div>

    <div class="tablemember">
      <el-table
        :data="AllMember"
        @current-change="ChooseRow" highlight-current-row stripe border height="75vh" empty-text="沒有會員">
        <el-table-column
          prop="member_id"
          label="編號">
        </el-table-column>
        <el-table-column
          prop="member_card_id"
          label="會員卡">
        </el-table-column>
        <el-table-column
          prop="member_name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="member_gender"
          label="性別">
        </el-table-column>
        <el-table-column
          prop="member_birthday"
          label="生日">
        </el-table-column>
        <el-table-column
          prop="member_phone"
          label="電話">
        </el-table-column>
        <el-table-column
          prop="member_email"
          label="信箱">
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
          console.log(this.AllMember)
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
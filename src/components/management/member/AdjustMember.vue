<template>
  <div>
    <div class="createmember">
      <div class="fieldOne">
        <font>編號:</font>
        <el-input v-model="AdjustMember.member_id" readonly="readonly"></el-input>

        <font>會員卡編號:</font>
        <el-input v-model="AdjustMember.member_card_id"></el-input>

        <font>姓名:</font>
        <el-input v-model="AdjustMember.member_name"></el-input>

        <font>姓別:</font>
        <el-select v-model="AdjustMember.member_gender" placeholder="性別">
            <el-option v-for="gender in genders" :key="gender.value" :label="gender.text"
            :value="gender.value">
            </el-option>
        </el-select>
      </div>

      <div class="fieldTwo">
        <font>生日:</font>
        <el-input v-model="AdjustMember.member_birthday"></el-input>

        <font>電話:</font>
        <el-input v-model="AdjustMember.member_phone"></el-input>

        <font>地址:</font>
        <el-input v-model="AdjustMember.member_address"></el-input>
      </div>

      <div class="fieldThree">
        <font>信箱:</font>
        <el-input v-model="AdjustMember.member_email"></el-input>

        <font>備註:</font>
        <el-input type="textarea" resize="none" v-model="AdjustMember.member_remark"></el-input>

        <button @click="UpdateMember()">新增會員</button>
      </div>
    </div>

    <div class="createmember_table">
      <el-table
        :data="AllMember"
        stripe border height="45vh" empty-text="未新增會員">
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
  props: {
    AdjustMember: {
      type: Object,
      required: false,
    }
  },

  data() {
    return {
      AllMember: [],

      genders: [
        { text:'男' , value:1 },
        { text:'女' , value:2 },
      ],
    }
  },

  methods: {
    UpdateMember() {
      Memberdataservice.update(this.AdjustMember.member_id, this.AdjustMember)
        .then(response => {
          console.log(response.data.message)
          let tablegender = this.AdjustMember.member_gender
          for(let j = 0; j < this.genders.length; j++) {
            if(tablegender == this.genders[j].value) {
              tablegender = this.genders[j].text
            }
          }
          this.AllMember.push({member_id: this.AdjustMember.member_id, member_card_id: this.AdjustMember.member_card_id,
          member_name: this.AdjustMember.member_name, member_gender: tablegender,
          member_birthday: this.AdjustMember.member_birthday, member_phone: this.AdjustMember.member_phone,
          member_email: this.AdjustMember.member_email, member_address: this.AdjustMember.member_address,
          member_remark: this.AdjustMember.member_remark});
        })
    },
  },

  mounted() {
  }
}
</script>

<style scoped src="@/assets/css/MemberView.css"></style>
<template>
  <div>
    <div class="createmember">
      <div class="fieldOne">
        <font>編號:</font>
        <el-input v-model="CreateMember.member_id" readonly="readonly"></el-input>

        <font>會員卡編號:</font>
        <el-input v-model="CreateMember.member_card_id" readonly="readonly"></el-input>

        <font>姓名:</font>
        <el-input v-model="CreateMember.member_name"></el-input>

        <font>姓別:</font>
        <el-select v-model="CreateMember.member_gender" placeholder="性別">
            <el-option v-for="gender in genders" :key="gender.value" :label="gender.text"
            :value="gender.value">
            </el-option>
        </el-select>
      </div>

      <div class="fieldTwo">
        <font>生日:</font>
        <el-input v-model="CreateMember.member_birthday" placeholder="year-month-day"></el-input>

        <font>電話:</font>
        <el-input v-model="CreateMember.member_phone"></el-input>

        <font>地址:</font>
        <el-input v-model="CreateMember.member_address"></el-input>
      </div>

      <div class="fieldThree">
        <font>信箱:</font>
        <el-input v-model="CreateMember.member_email"></el-input>

        <font>備註:</font>
        <el-input type="textarea" resize="none" v-model="CreateMember.member_remark"></el-input>

        <button @click="CreateManagement()">新增會員</button>
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
  data() {
    return {
      LastIDNumber: null,
      IDMakeUp: null,

      genders: [
        {text:"男", value:"男"},
        {text:"女", value:"女"},
      ],

      AllMember: [],

      CreateMember: {
        member_id: null,
        member_card_id: null,
        member_name: null,
        member_gender: null,
        member_birthday: null,
        member_phone: null,
        member_email: null,
        member_address: null,
        member_remark: null,
      },
    }
  },

  methods: {
    IDMakeUP() {
      switch(this.LastIDNumber.length) {
        case 1:
          this.IDMakeUp = 'M0000';
          break;
        case 2:
          this.IDMakeUp = 'M000';
          break;
        case 3:
          this.IDMakeUp = 'M00';
          break;
        case 4:
          this.IDMakeUp = 'M0';
          break;
        case 5:
          this.IDMakeUp = 'M';
          break;
      }
      this.LastIDNumber = this.IDMakeUp + this.LastIDNumber
      this.CreateMember.member_id = this.LastIDNumber
    },

    GetBiggestID() {
      Memberdataservice.getBigID()
        .then(response => {
          Memberdataservice.get(response.data)
            .then(response => {
              this.CreateMember.member_card_id = String(Number(response.data.member_card_id) + 1)
            })
          if(response.data) {
            this.LastIDNumber = String(Number(response.data.split('M')[1]) + 1);
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

    CreateManagement() {
      Memberdataservice.create(this.CreateMember)
    },
  },

  mounted() {
    this.GetBiggestID()
  },
}
</script>

<style scoped src="@/assets/css/MemberView.css"></style>
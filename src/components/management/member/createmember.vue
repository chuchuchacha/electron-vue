<template>
  <div>
    <div class="createmember">
      <div class="fieldOne">
        <font>編號:</font>
        <el-input readonly="readonly"></el-input>

        <font>會員卡編號:</font>
        <el-input ></el-input>

        <font>姓名:</font>
        <el-input></el-input>

        <font>姓別:</font>
        <el-select v-model="gender" placeholder="性別">
            <el-option v-for="gender in genders" :key="gender.value" :label="gender.text"
            :value="gender.value">
            </el-option>
        </el-select>
      </div>

      <div class="fieldTwo">
        <font>生日:</font>
        <el-input></el-input>

        <font>電話:</font>
        <el-input></el-input>

        <font>地址:</font>
        <el-input></el-input>
      </div>

      <div class="fieldThree">
        <font>信箱:</font>
        <el-input></el-input>

        <font>備註:</font>
        <el-input type="textarea" class="haha"></el-input>

        <button @click="CreateManagement()">新增會員</button>
      </div>
    </div>

    <div class="createmember_table">
      <el-table
        :data="AllMember"
        stripe border height="45vh" empty-text="未新增產品">
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
export default {
  data() {
    return {
      gender: null,
      genders: [
        {text:"男", value:"男"},
        {text:"女", value:"女"},
      ],

      AllMember: [],
    }
  }
}
</script>

<style scoped src="@/assets/css/MemberView.css"></style>
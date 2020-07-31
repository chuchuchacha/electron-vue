<template>
  <div>
    <div class="fieldOne">
      <label>會員編號</label>
      <input type="text" v-model="members.mid" readonly="readonly"/>  <!--readonly 設定input只能讀取-->

      <label>姓名</label>
      <input type="text" v-model="members.mname" />

      <label>餘額</label>
    </div>

    <div class="fieldTwo">
      <label>性別</label>
      <select v-model="selectgender">
        <option v-for="type in types" :key="type.value">
          {{ type.text }}
        </option>
      </select>

      <label>電話</label>
      <input type="text" v-model="members.mphone" />

      <input type="text" readonly="readonly" class="inputbalance"  v-model="members.mbalance" />
    </div>

    <div class="fieldThree">
      <label>地址</label>
      <input class="inputaddress" type="text"  v-model="members.maddress" />

      <button class="inputbut" @click="writeclick()">修改/輸入</button>
    </div>

    <div class="tableback">
        <tablemember @showdata="showdatas" @passlastid="getlastid"/>
    </div>
  </div>
</template>

<script>
import tablemember from "@/components/table/Table_membe.vue";
import Memberdataservice from "@/services/Memberdataservice.js"

export default {
  components: {
    tablemember
  },

  data() {
    return {
      members: {
        mid: null,
        mname: null,
        mgender: null,
        mphone: null,
        maddress: null,
        mbalance: null
      },

      createmember: {
        member_id: null,
        member_name: null,
        member_gender: null,
        member_phone: null,
        member_address: null,
        member_balance: null,
      },

      selectgender: null,

      lastids: null,  //存取資料最後一筆的id 從子組件傳來

      newdata: null,  //因為修改跟輸入的按鈕做在一起 所以用boolean來判斷是要新增資料還是更新資料

      types: [   //陣列紀錄性別的種類，放進slelect option 裡面
        { text: '男', value: '1' },
        { text: '女', value: '2' },
        { text: '其他', value: '3' }
      ]
    };
  },

  methods: {
    showdatas(val) {  //從子組件將點擊的該資料的資料放進input
      this.members.mid = val.member_id
      this.members.mname = val.member_name
      this.members.mgender = val.member_gender
      this.members.mphone = val.member_phone
      this.members.maddress = val.member_address
      this.members.mbalance = val.member_balance
      if(this.members.mgender == 1){  //性別在資料庫是記成數字，這邊轉換成文字，之後再寫一個function簡化
        this.selectgender = '男'
      }
      if(this.members.mgender == 2){
        this.selectgender = '女'
      }
      if(this.members.mgender == 3){
        this.selectgender = '其他'
      }
      this.newdata == false;  //初始newdata 如果使用者點及新增後又點擊下方資料就要初始化
    },

    writeclick() {  //新增資料或是更新資料 點擊修改/輸入button的處裡
      if(this.newdata == true){
        this.copydata()
        Memberdataservice.create(this.createmember);
        this.$root.$emit('refresh')
        this.$root.$emit('refresh')
        this.lastids = null
        this.newdata == false;
      }
      else{
        this.copydata()
        Memberdataservice.update(this.createmember.member_id , this.createmember);
        this.$root.$emit('refresh')
        this.$root.$emit('refresh')
      }
      this.initinputval()
    },

    addclick() {  //點擊新增按鈕 並主動輸入新資料的id
      this.initinputval()  //清空input的值
      let templength = String(Number(this.lastids[1]) + 1);  //將最後一筆資料的id+1 作為新資料的id
      let tempop = null //用來處理id前面的好幾個0
      
      switch(templength.length){  //用SWITCH CASE 補0   目前會員ID前面沒有英文不然應該要將this.lastids切字串 可以參考產品的同一位置
        case 1:
          tempop = 'M0000';
          break;
        case 2:
          tempop = 'M000';
          break;
        case 3:
          tempop = 'M00';
          break;
        case 4:
          tempop = 'M0';
          break;
        case 5:
          tempop = 'M';
          break;
        case 6:
          tempop = null;
          break;
      }

      this.members.mid = tempop + templength;  //將新資料的id寫進input的value裡面

      this.newdata = true;  //將狀態記為新增資料
    },

    getlastid(lastid) {  //從子組件取得最後一個資料的id  存進lastids
      this.lastids = lastid.split('M');
    },

    initinputval() {  //清空input的值
      this.members.mid = null
      this.members.mname = null
      this.members.mgender = null
      this.selectgender = null
      this.members.mphone = null
      this.members.maddress = null
      this.members.mbalance = null
    },

    copydata() {
      this.distingGender();
      this.createmember.member_id = this.members.mid;
      this.createmember.member_name = this.members.mname;
      this.createmember.member_gender = this.members.mgender;
      this.createmember.member_phone = this.members.mphone;
      this.createmember.member_address = this.members.maddress;
      this.createmember.member_balance = this.members.mbalance;
    },

    distingGender() {
      if(this.selectgender == '男'){  //性別在資料庫是記成數字，這邊轉換成文字，之後再寫一個function簡化
        this.members.mgender = 1
      }
      if(this.selectgender == '女'){
        this.members.mgender = 2
      }
      if(this.selectgender == '其他'){
        this.members.mgender = 3
      }
    }
  }
};
</script>

<style scoped src="@/assets/css/main.css"></style>

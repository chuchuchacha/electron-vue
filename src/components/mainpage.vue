<template>
  <div>
    <div class="pageselect">
      <router-link to="/membershipview"><button @click="ChangeTitleName()" id="會員管理">會員管理</button></router-link>
      <router-link to="/supplierview"><button @click="ChangeTitleName()" id="供應商管理">供應商管理</button></router-link>
      <router-link to="/productview"><button @click="ChangeTitleName()" id="產品管理">產品管理</button></router-link>
      <router-link to="/scrappview"><button @click="ChangeTitleName()" id="庫存管理">庫存管理</button></router-link>
      <router-link to="/transactionview"><button @click="ChangeTitleName()" id="結帳">結帳</button></router-link>
      <router-link to="/practiceview"><button @click="ChangeTitleName()" id="測試">測試</button></router-link>
      <router-link to="/statementview"><button @click="ChangeTitleName()" id="種植管理">種植管理</button></router-link>
      <router-link to="/statementview"><button @click="ChangeTitleName()" id="報表">報表</button></router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      TitleText: '會員管理'
    }
  },

  methods: {
    ChangeTitleName() {
      this.TitleText = event.target.id
      console.log(this.TitleText)
      this.$emit('ChangeTitle', this.TitleText);
    }
  },
}
</script>

<style scoped src="@/assets/css/Main.css"></style>

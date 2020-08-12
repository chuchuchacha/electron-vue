<template>
  <div class="pageselect">
      <button @click="ChangeTitleName()" id="Createmember">新增會員</button>
      <button @click="ChangeTitleName()" id="修改會員">檢視會員</button>
      <button @click="ChangeTitleName()" id="會員類別">會員類別</button>
    </div>
</template>

<script>
export default {
  methods: {
    ChangeTitleName() {
      this.TitleText = event.target.id
      this.$emit('ChangeFunction', this.TitleText);
    }
  },
}
</script>

<style scoped src="@/assets/css/main.css"></style>
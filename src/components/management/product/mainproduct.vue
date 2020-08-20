<template>
  <div class="pageselect">
      <button @click="ChangeTitleName()" id="Createproduct">新增產品</button>
      <button @click="ChangeTitleName()" id="ProductView">檢視產品</button>
      <button @click="ChangeTitleName()" id="Categoryproduct">類別管理</button>
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
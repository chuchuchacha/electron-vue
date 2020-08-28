<template>
  <div class="pageselect">
      <button @click="ChangeTitleName()" id="Createsupplier">新增供應商</button>
      <button @click="ChangeTitleName()" id="SupplierView">檢視供應商</button>
      <button @click="ChangeTitleName()" id="SupplierProduct">供應商產品</button>
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

<style scoped src="@/assets/css/Main.css"></style>
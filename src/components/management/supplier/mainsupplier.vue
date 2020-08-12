<template>
  <div class="pageselect">
      <button @click="ChangeTitleName()" id="Createsupplier">新增供應商</button>
      <button @click="ChangeTitleName()" id="修改供應商">檢視供應商</button>
      <button @click="ChangeTitleName()" id="供應商類別">供應商類別</button>
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
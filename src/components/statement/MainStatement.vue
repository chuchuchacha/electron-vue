<template>
  <div class="pageselect">
    <button @click="ChangeTitleName()" id="PlantRecord">種植紀錄</button>
    <button @click="ChangeTitleName()" id="InventoryRecord">庫存紀錄</button>
    <button @click="ChangeTitleName()" id="PurchaseRecord">進貨紀錄</button>
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
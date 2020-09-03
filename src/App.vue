<template>
    <div class="main_blue">
      <div class="top_title">
        <h1 class="title">{{this.TitleName}}</h1>
        <button class="top_backbutton" @click="Initial()">返回</button>
      </div>
      <component v-bind:is="Component" @ChangeTitle="InitialData" @BackToMain="BackToMain"></component>
    </div>
</template>

<script>
import Product from '@/components/management/product/Product.vue'
import Member from '@/components/management/member/Member.vue'
import Mainpage from '@/components/Mainpage.vue'
import Supplier from '@/components/management/supplier/Supplier.vue'
import Inventory from '@/components/inventory/Inventory.vue'
import Planting from '@/components/planting/Planting.vue'
import Statement from '@/components/statement/Statement.vue'

export default {
  components: {
    'Product': Product,
    'Mainpage': Mainpage,
    'Member': Member,
    'Supplier': Supplier,
    'Inventory': Inventory,
    'Planting': Planting,
    'Statement': Statement,
  },

  data() {
    return {
      Component: 'Mainpage',
      TitleName: '首頁'
    }   
  },

  methods: {
    InitialData(TitleText) {
      this.TitleName = TitleText;
      switch(TitleText) {
        case '產品管理':
          this.Component = 'Product';
          break;
        case '會員管理':
          this.Component = 'Member';
          break;
        case '供應商管理':
          this.Component = 'Supplier';
          break;
        case '庫存管理':
          this.Component = 'Inventory';
          break;
        case '種植管理':
          this.Component = 'Planting';
          break;
        case '報表管理':
          this.Component = 'Statement';
          break;
      }
    },
    Initial() {
      if(this.Component != 'Mainpage') {
        this.$root.$emit('GoBack')
      }
      else {
        this.Component = 'Mainpage'
      }
    },
    BackToMain() {
      this.Component = 'Mainpage'
    }
  },
}
</script>

<style>
.el-table--striped .el-table__body tr.el-table__row--striped.current-row td, .el-table__body tr.current-row>td {
  color: #fff;
  background-color: darkgray!important;
}

* .el-textarea__inner {
  height: 10vh;
  font-size: 20px;
}

body {
  margin: 0 !important;
  padding: 0 !important;
}
.main_blue {
  position: relative;
  background-color: gainsboro;
  height: 100vh;
  width: 100vw;
  margin: 0;
  border: 0;
}
.top_title {
  position: absolute;
  top: 0;
  height: 13vh;
  font-size: 30px;
  width: 100vw;
  background-color: lightseagreen;
}

.top_title button {
  position: absolute;
  top: 2.5vh;
  height: 8vh;
  width: 12.5vw;
  cursor: pointer;
}

.top_backbutton {
  right: 2vw;
}


.title {
  position: absolute;
  font-size: 2.5rem;
  color: snow;
  top: 0.8vh;
  height: 9vh;
  left: 3vw;
}

div {
  font-family: "DFKai-SB", Arial !important;
}

button{
  font-size: 30px;
  font-family: "DFKai-SB", Arial;
  outline:none;
  border-radius: 10px;
  cursor: pointer;
  border: 0;
}
</style>


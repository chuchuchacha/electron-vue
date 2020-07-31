<template>
    <div class="main_blue">
      <div class="top_title">
        <h1 class="title">{{this.TitleName}}</h1>
        <el-button class="top_createbutton">新增</el-button>
        <router-link to="/"><button class="top_backbutton" @click="TitleText()">返回</button></router-link>
      </div>
      <router-view @ChangeTitle="InitialData"/>
    </div>
</template>

<script>
export default {
  data() {
    return {
      TitleName: '首頁'
    }   
  },

  methods: {
    InitialData(TitleText) {
      this.TitleName = TitleText;
    },

    TitleText() {
      this.TitleName = '首頁'
    }
  },
}
</script>

<style>
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

.top_createbutton {
  right: 16.5vw;
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


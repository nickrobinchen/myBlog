<template>
  <div id="app">
    <el-row :gutter="5">
          <el-col :span="4" :offset="4"><img src="./assets/icon.jpeg" style="width: 240px; height: 180px"></el-col>
          <el-col :span="10"><p style="font-size:60px">文本非文本图像分类系统</p></el-col>     
      </el-row>
    
    <!--HelloWorld msg="Welcome to Your Vue.js App"/-->
    <KeywordInput @done='displayResult'/>
    <result :id='id' v-if="isDisplayed"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import KeywordInput from './components/KeywordInput.vue'
import Result from './components/Result.vue'

export default {
  name: 'app',
  components: {
    HelloWorld, KeywordInput, Result
  },
  data: function() {
        return {
      id:'',
      isDisplayed: true
    }
  },
  methods:{
    displayResult(id){
        this.id = id
        this.isDisplayed = true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
</style>

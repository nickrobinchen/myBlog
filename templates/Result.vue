<template>
<div>
 <el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="文本图片" name="text">
<el-row :gutter="20">
  <el-col :span="6" v-for="imgUrl in textList" :key='imgUrl'>
    <el-image
      style="width: 300px; height: 300px"
      :src="imgUrl" :preview-src-list="textList"
      fit="contain"></el-image></el-col>
</el-row>
  </el-collapse-item>
  <el-collapse-item title="非文本图片" name="nonText">
    <el-row :gutter="20">
  <el-col :span="6" v-for="imgUrl in nonTextList" :key='imgUrl'>
    <el-image
      style="width: 300px; height: 300px"
      :src="imgUrl" :preview-src-list="nonTextList"
      fit="contain"></el-image></el-col>
</el-row>
  </el-collapse-item>
</el-collapse>
</div>
</template>
<script>
    import axios from 'axios';
    export default {
      props:{
          id:{
              type: String,
              required: true
          }
      },
      name: 'Result',
      data: function() {
          return {
            id_data: this.id,
            activeNames: ['1'],
            text_num: 13,
            nonText_num: 7,
            textList: [],
            nonTextList: []
          }
      },
      methods: {
      handleChange(val) {
        //console.log(val);
      },
      run(){
          console.log(this.id_data)
          this.id_data = this.id
          console.log(this.id_data)
          const path = 'http://127.0.0.1:5000/getImgList';
          var that = this;
          axios.get(path, {params : {'id' : this.id_data, 'type' : 'text'}}).then(function (response) {
            that.text_num = response.data.urls.length;
            that.textList = response.data.urls.map((u) => 'http://127.0.0.1:5000' + u);
          }).catch(function (error) {
              
          })
          axios.get(path, {params : {'id' : this.id_data, 'type' : 'nonText'}}).then(function (response) {
            that.nonText_num = response.data.urls.length
            that.nonTextList = response.data.urls.map((u) => 'http://127.0.0.1:5000' + u)
          }).catch(function (error) {
              
          })          
          console.log(this.nonTextList)
          console.log(this.nonText_num)
          console.log(this.text_num)
          console.log(this.textList)
    } 
},
    mounted: function(){
        var that = this;
        this.$watch(()=>that.id, function(){
            that.id_data = that.id
            const path = 'http://127.0.0.1:5000/getImgList';
            axios.get(path, {params : {'id' : that.id_data, 'type' : 'text'}}).then(function (response) {
            that.text_num = response.data.urls.length;
            that.textList = response.data.urls.map((u) => 'http://127.0.0.1:5000' + u);
          }).catch(function (error) {
              
          })
          axios.get(path, {params : {'id' : that.id_data, 'type' : 'nonText'}}).then(function (response) {
            that.nonText_num = response.data.urls.length
            that.nonTextList = response.data.urls.map((u) => 'http://127.0.0.1:5000' + u)
          }).catch(function (error) {  
          })
        },{immediate: that.id != ''})
        this.id_data = this.id
        
    }
}
</script>
<style scoped>
    .el-collapse{
        margin-left: 30px;
        margin-right: 30px;
    }
</style>
</style>
<template>
  <div class="home">
      <el-row type="flex" justify="center">
          <el-col :span="12"><el-input v-model="input" placeholder="待分类图像的关键字"><template slot="prepend">请输入图片关键字：</template></el-input></el-col>
            <el-col :span="6" >
                <div class="input-suffix">选择图片数量：
                <el-input-number v-model="num" @change="handleChange" :min="2" :max="200" label="输入爬取图像数量"></el-input-number>
                </div>
            </el-col>
           <el-col :span="2"><el-button type="primary" @click="run">爬取图像并分类</el-button></el-col>     
    <el-col :span="2"><el-button type="danger" @click="delete_download">删除已下载图片</el-button></el-col>     
      </el-row>
      <el-row v-if="isProcessing">
      <el-col v-html='progress'></el-col>
      </el-row>
  </div>
</template>
<style>

</style>
<script>
    import axios from 'axios';
    export default {
      name: 'KeywordInput',
      data: function() {
          return {
            serverResponse: 'resp',
            input : '',
            num: 20,
            query_id: '',
            timer: '',
            progress:'',
            state: '',
            isProcessing: false,
            icon:'<i class="el-icon-loading"></i>'
          }
      },
      methods: {
        run() {
            this.isProcessing = false
            clearInterval(this.timer);
            if(this.input == ''){
                return
            }
          var that = this;
          const path = 'http://127.0.0.1:5000/run';
          axios.get(path, {params : {'keyword' : this.input, 'number' : this.num}}).then(function (response) {
            if(response.data.msg == 'busy')
            {
                that.progress = 'Error: 服务器忙';
                return
            }
            that.query_id = response.data.query_id;
          }).catch(function (error) {
          })
          this.isProcessing = true
          this.timer = setInterval(this.getState, 1000);

        },
        handleChange(value) {
            console.log(value);
        },
        delete_download() {
          const path = 'http://127.0.0.1:5000/delete';
          var that = this;
          axios.get(path).then(function (response) {
            if(response.data.msg == 'success')
            {
              const h = that.$createElement;
              that.$notify({title: '已完成', message: '已删除下载文件'});}
          }).catch(function (error) {
              //etc.
          })
        },
        getState(){
            const path = 'http://127.0.0.1:5000/getState';
            var that = this;
            axios.get(path, {params : {'id' : this.query_id}}).then(function (response) {
            that.state = response.data.state;
            if(that.state == '0'){
                that.progress=that.icon+'获取进度时出错:请求不存在';
            }
            else if(that.state == '1'){
                that.progress=that.icon+'当前任务：请求已创建';
            }
            else if(that.state == '2'){
                that.progress=that.icon+'当前进度：准备爬取图片';
            }
            else if(that.state == '3'){
                that.progress=that.icon+'当前进度：已完成爬取图片，正在分类('+String(parseInt(response.data.progress)) + '/'+String(that.num)+')' +'<el-progress :text-inside="true" :stroke-width="26" :percentage="'+String(parseInt(parseInt(response.data.progress)/that.num))+"></el-progress>"
            }
            else if(that.state == '-1'){
                that.progress='当前进度：已完成';
                that.isProcessing = false

                clearInterval(that.timer);
                that.$emit('done', that.query_id)
            }else{
                that.progress='获取进度时出错:未知状态';
            }
          }).catch(function (error) {
            that.progress='获取进度时出错';
          })
        }
      }
    }
</script>

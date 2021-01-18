<template>
  <div>
      <div class="l-banan">
        <div class="img-content" data-aos="fade-down">
          <h1 class="m-hero-title bigger">Message Board</h1>
          <p class="m-heading__description">
            Say what you want to say
          </p>
        </div>
        <div class="l-image">
        <img src="https://picabstract-preview-ftn.weiyun.com/ftn_pic_abs_v3/9296859da63c1179144d6ab77e6c046b7f0b14c2c988ab6aa350fc909caab4b03586945644423f05c69c1bc81f1c2360?pictype=scale&from=30013&version=3.3.3.3&uin=2248410897&fname=pexels-tirachard-kumtanom-733854.jpg&size=750" class="image" style="height:500px;">
        </div>
      </div>
       <div class="l-content" data-aos="fade-up"> 
         <div class="el-drawer-d"> 
            <el-card class="el-card-d" shadow="always">
             <div class="infinite-list-wrapper" style="overflow:auto;">
                <el-timeline
                  infinite-scroll-disabled="disabled">
                <div v-if="allmessages.length>0"> 
                  <el-timeline-item v-for="(item,index) in allmessages"  :key="index" :timestamp='item.createTime' placement="top">
                    <el-card class="el-card-m" style="height:120px">
                      <h4>{{item.memberName}}：</h4>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.content}}</p>
                    </el-card>
                  </el-timeline-item>
                </div>
                <div v-else>
                   <el-timeline-item placement="top">
                    <el-card class="el-card-m" style="height:120px">
                      <h4>大黄子：</h4>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 说点什么吧😁</p>
                    </el-card>
                  </el-timeline-item>
                </div>
              </el-timeline> 
              </div>
              <div class="el-card-messages">
                 <el-input type="textarea" :rows="5" placeholder="输入留言" maxlength="200" v-model="message"></el-input>
                 <el-button type="info" round class="submit-message" @click="submitMessage">留言</el-button>
              </div>
            </el-card> 
          </div>
      </div>
  </div>
</template>

<script>
  export default {
  data() {
    return {
        message:'',
        allmessages:[]
    };
  },
  created() {
   this.findMessage();
     this.$router.afterEach((to,from,next)=>{
　　　　window,scrollTo(0,0)
　　})
  },
  mounted() {

  },
  methods: {
 submitMessage(){
      if(this.message=='' || this.message.replace(/(^\s*)|(\s*$)/g, "")==""){
          this.$message('写点啥提交也行呀😉');
          return;
      }
      this.$post('/api/blog/saveBlogMessage',{
        content:this.message,
        contentType:1
      })
      .then(res => { 
          if(res.code=='200'){
            this.$message('留言成功');
            this.message="";
            this.findMessage();
          }else if(res.code=='-1'){
            this.$message(res.msg+"😉");
          }
      });
    },
    findMessage(){
      this.$post('/api/blog/findMessage',{ 
          contentType:1
      })
      .then(res => {
        this.allmessages = res.data;
      });
    },
  },
}
</script>

<style lang='less' scoped>
@import '../../assets/css/common.less';
@media screen and (max-width: 3000px) and (min-width: 767px) {
          .img-content{
        position: absolute;
        left:39%;
        top:35%;
        transform: translate(-45%, -38%);
        color:  #faf9f9;
      }
   }
    @media screen and (max-width:768px) and (min-width: 100px){ 
        .img-content{
            position: absolute;
            left:20%;
            top:40%;
            transform: translate(-45%, -45%);
            color:  #faf9f9;
        }
    }
.l-content{
    height: 800px;
}
.el-drawer-d{
  width: 100%;
  height: 100%; 
  text-align: left;
}
    .el-card-messages{
      margin-top: 10px;
    }
 
    .infinite-list-wrapper{
      width: 100%;
      height: 500px;
    }
    .submit-message{
        width: 100%; 
        background: rgb(235, 245, 247);
        color: cadetblue;
        letter-spacing:20px;
    }
 @media screen and (max-width: 3000px) and (min-width: 767px) {
    .el-card-d{
      float: left;
      margin-top: 20px;
      margin-left: 10%; 
      width: 80%;
      height: 90%;
    }

   }
  /*
  屏幕小于768px的
  */
  @media screen and (max-width:768px) and (min-width: 100px){  
     .el-card-d{

      width: 100%;
      height: 100%;
    }
  }
</style>
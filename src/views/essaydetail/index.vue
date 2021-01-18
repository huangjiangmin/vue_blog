<template>
  <div>
      <div class="l-banan">
        <img 
        :src="essayImg" class="image"> 
      </div>
      <div class="e-content"  data-aos="fade-up" v-highlight>
        <div>
          <h1 align='center'  style="font-size:200%;">{{essayDetail.essayTitle}}</h1>
          <br>
        </div>
          <article v-html="essayContent"></article>
      </div>
      <div class="e-banan"> 
      
         <el-tooltip class="item" effect="light" :content='contente' placement="right-start"> 
          <img src="../../assets/img/boycontent.png" class="boy-content" @mouseover='mouseover'>
         </el-tooltip> 

        <img src="../../assets/img/message.png" @click="drawer = true"  class="mage">
        <el-drawer
           direction='btt'
           size="80%"
          :visible.sync="drawer"
          :with-header="false">
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
        </el-drawer>
      </div>
      <h2 style="margin-top:50px">Recommended for you</h2>
      <div v-if="essayList.length>0" class="essay-card">
        <card :essayList="essayList"/>
      </div>
      <div v-else class="essay-card">
        <h3>No posts found</h3>
        <p>
        Apparently there are no posts at the moment, check again later.
      </p>
      </div>
       
      <!-- <circle class="progress-ring__circle js-progress" fill="transparent" r="23" stroke-width="3" cx="25" cy="25" style="stroke-dasharray: 157.08, 157.08; stroke-dashoffset: 141.372;"></circle> -->
     
  </div>
  
</template>

<script>
import Card from '@/components/card'
  export default { 
    components: {
      Card
  },
  data() {
    return {
        essayDetail: {},
        essayContent: '',
        essayImg:'',
        essayList:[],
        id: this.$Base64.decode(this.$route.params.id),
        contente:'',
        drawer: false,
        count: 10,
        loading: false,
        message:'',
        allmessages:[]
    };
  },
  created() {
     this.getEssay();
      this.findMessage();
     this.$router.afterEach((to,from,next)=>{
　　　　window,scrollTo(0,0)
　　})
  },
  mounted() {

  },
  watch:{
    $route:{
        handler(newVal,oldVal){
            this.id=this.$Base64.decode(newVal.params.id),
            this.getEssay()
        }
    }
  },
 
  methods: {
    submitMessage(){
      if(this.message=='' || this.message.replace(/(^\s*)|(\s*$)/g, "")==""){
          this.$message('写点啥提交也行呀😉');
          return;
      }
      this.$post('/api/blog/saveBlogMessage',{
        essayId:this.id,
        content:this.message,
        contentType:0
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
         essayId:this.id,
      })
      .then(res => {
        this.allmessages = res.data;
      });
    },
 

    mouseover(){//移进显示
     this.getcontent();
    },

    getcontent(){
      let contents=[
        '你能看到这句话一定是个细心的人呀。😁',
        '不管生活如何，一定要充满希望！😝',
        '年轻就要有年轻的样子。😉',
        '哎呀，来看博客呀，怪不得这么有为。😊',
        '看了文章之后有什么要对大黄子说的吗。😊'
        ];
      let cons=contents[Math.floor((Math.random()*contents.length))];
      this.contente="大黄子说：“"+cons+"”";
    },

    getEssay(){
          this.$post('/api/blog/findEssayById',{
              id:this.id
          })
          .then(res =>{
            this.essayContent = res.data.essayContent
            this.essayDetail = res.data
            this.essayImg = res.data.essayImg
            this.getListEssay(res.data.labelId,res.data.id);
          })
    },
      /**
       * 加载essayList
       */
      getListEssay(labelId,id){
            this.$post('/api/blog/findEssayByRe',{
              labelId:labelId,
              id:id
            })
            .then((response) =>{
              this.essayList=response.data.rows;
            })
      }
  },
}
</script>

<style scoped>
.l-banan{
    margin: 0 auto;
    width: 100%;
    height: 500px;
  }
.image{
   width: 100%; 
   height:100%;
  object-fit: cover;
}
 @media screen and (max-width: 3000px) and (min-width: 767px) {
     .e-content{
    width: 50%;
    height: 70%;
    margin:0 auto;
    text-align:left;
    margin-top: 50px;
    }
   }
  /*
  屏幕小于768px的
  */
  @media screen and (max-width:768px) and (min-width: 100px){ 
    .e-content{
    width: 90%;
    height: 70%;
     margin:0 auto; 
    text-align:left;
    margin-top: 50px;
    }
  }


.e-banan{
   background: rgb(235, 245, 247);
   width: 100%;
   height: 200px;
   margin-top: 40px;
}
.essay-card{
  margin-bottom: 80px;
}
.boy-content{
  margin-top: 30px; 
}
 
.mage{
  margin-left: 30px;
    cursor: pointer;
}
.el-drawer-d{
  width: 100%;
  height: 100%;
  background: rgb(235, 245, 247);
  text-align: left;
}
    .el-card-messages{
      margin-top: 10px;
    }
    .infinite-list-wrapper{
      width: 100%;
      height: 330px;
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
  /*
    变更  v-html 中的 img样式
   */
article >>> img{
  width: 100%;
  height: 100%;
  object-fit: cover;
} 
</style>
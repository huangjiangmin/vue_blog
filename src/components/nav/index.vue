<template>
  <div>
      <div class="navs" data-aos="fade-down">
        
          <img src='../../assets/img/boy.png' class="nav-image" @click="changeStyle('home')"/>
          <div class="nav"   :class="{'changeStyle':changeSelectStyle == 'home'}" @click="changeStyle('home')">Home</div>
          <div class="nav"    :class="{'changeStyle':changeSelectStyle == 'code'}"  @click="changeStyle('code')">Code</div>
          <div class="nav"   :class="{'changeStyle':changeSelectStyle == 'life'}"  @click="changeStyle('life')">Life</div>
          <div class="nav"   :class="{'changeStyle':changeSelectStyle == 'author'}"  @click="changeStyle('author')" >Author </div> 
          <div class="nav-search"  >
            <i class="el-icon-more-outline" ref="outlineShow" style="font-size:40px;" @click="showCards" v-show="outlineShow"></i>
              <i class="el-icon-more" style="font-size:40px;" @click="showCards" v-show="outlineNo"></i>
            <i><img class="el-icon-message" src='../../assets/img/message.png' @click="changeStyle('message')"></i> 
          </div>
          <a href="https://github.com/lewky" class="github-corner" target="_blank" title="Follow me on GitHub" aria-label="Follow me on GitHub">
            <svg width="80" height="80" viewBox="0 0 250 250" style="fill:#222; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true">
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
            <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
            </svg>
          </a>
            
      <transition name="el-zoom-in-top"> 
         <div class="show-card" v-show="divContent">
           <h3 class="card-recent"> Recent articles</h3>
           <div class="small-card">
              <el-row>
                <el-col :span="6" v-for="(item, index) in essayList" :key="index">
                  <el-card :body-style="{ padding: '0px'}" class="card-blog">
                    <img :src="item.essayImg" class="nav-show-image"  @click="getEssayDetail(item.id)"> 
                    <div class="card-massges" @click="getEssayDetail(item.id)">
                      <p class="card-m" >{{item.essayTitle}}</p>
                    </div> 
                  </el-card>
                </el-col>
              </el-row>
           </div>
           <div>
             <h3 class="nav-tags">Tags</h3>
             <div class="tags-div">
             <div class="tags" v-for="(item, index) in tags" :key="index" @click="goLabels(item.id,item.labelName)">{{item.labelName}}</div>
             </div>
           </div>
          </div>
      </transition>
       </div>
      </div>
</template>

<script>
  export default {
  data() {
    return {
        changeSelectStyle:'',
        divContent:false,
        outlineShow:true,
        outlineNo:false,
        essayList:[],
        tags:[],
        imgurl:'../../assets/img/boy.png'
    };
  },
  created(){ document.addEventListener('click',(e)=>{
          if(!this.$refs.outlineShow.contains(e.target)){
            this.divContent =false;
            this.outlineShow = true;
            this.outlineNo = false
            
          }   
      })
  },
  mounted() {
  },
  methods: {


      changeStyle(val) {
         this.changeSelectStyle = val;
         this.$router.push('/'+val);
      },
      showCards(){
        this.divContent = !this.divContent;
        this.outlineShow = !this.outlineShow;
        this.outlineNo = !this.outlineNo;
        //出现下拉，加载数据
        if(this.outlineNo==true){
          this.getListEssay();
          this.getAllLabel();
        }
      },
      getEssayDetail(bid){
        let id= this.$Base64.encode(bid);
        this.$router.push(`/essaydetail/${id}`)
      },
      getListEssay(){
        this.$post('/api/blog/findEssay',{ 
        })
        .then((response) =>{
          this.essayList=response.data.rows.slice(0,4); 
        })
      },
      getAllLabel(){
        this.$post('/api/blog/findAllLabel',{

        }).then((res) => {
          this.tags=res.data;
        })
      },
       goLabels(blabelId,labelName){
        let labelId= this.$Base64.encode(blabelId);
        if(labelName=="Author"){
            
            this.$router.push('/author');
        }else if(labelName=="life"){
            this.$router.push('/Life');
        }
        else{
            this.$router.push(`/labels/${labelId}/${labelName}`)
        }
      
      }
    }
  }
</script>

<style lang="less" scoped>

 @media (max-width: 991px) {
    /* GitHub Cornor */
    .github-corner :hover .octo-arm {
        animation: octocat-wave 560ms ease-in-out;
    }
   .github-corner >svg {
     fill: #fff !important;
     color: #222 !important;
   }
    .github-corner .github-corner:hover .octo-arm {
      animation: none;
    }
    .github-corner .github-corner .octo-arm {
      animation: octocat-wave 560ms ease-in-out;
    }
  }
  @-moz-keyframes octocat-wave {
    0%, 100% {
      -webkit-transform: rotate(0);
      -moz-transform: rotate(0);
      -ms-transform: rotate(0);
      -o-transform: rotate(0);
      transform: rotate(0);
    }
    20%, 60% {
      -webkit-transform: rotate(-25deg);
      -moz-transform: rotate(-25deg);
      -ms-transform: rotate(-25deg);
      -o-transform: rotate(-25deg);
      transform: rotate(-25deg);
    }
    40%, 80% {
      -webkit-transform: rotate(10deg);
      -moz-transform: rotate(10deg);
      -ms-transform: rotate(10deg);
      -o-transform: rotate(10deg);
      transform: rotate(10deg);
    }
  }
  @-webkit-keyframes octocat-wave {
    0%, 100% {
      -webkit-transform: rotate(0);
      -moz-transform: rotate(0);
      -ms-transform: rotate(0);
      -o-transform: rotate(0);
      transform: rotate(0);
    }
    20%, 60% {
      -webkit-transform: rotate(-25deg);
      -moz-transform: rotate(-25deg);
      -ms-transform: rotate(-25deg);
      -o-transform: rotate(-25deg);
      transform: rotate(-25deg);
    }
    40%, 80% {
      -webkit-transform: rotate(10deg);
      -moz-transform: rotate(10deg);
      -ms-transform: rotate(10deg);
      -o-transform: rotate(10deg);
      transform: rotate(10deg);
    }
  }
  @-o-keyframes octocat-wave {
    0%, 100% {
      -webkit-transform: rotate(0);
      -moz-transform: rotate(0);
      -ms-transform: rotate(0);
      -o-transform: rotate(0);
      transform: rotate(0);
    }
    20%, 60% {
      -webkit-transform: rotate(-25deg);
      -moz-transform: rotate(-25deg);
      -ms-transform: rotate(-25deg);
      -o-transform: rotate(-25deg);
      transform: rotate(-25deg);
    }
    40%, 80% {
      -webkit-transform: rotate(10deg);
      -moz-transform: rotate(10deg);
      -ms-transform: rotate(10deg);
      -o-transform: rotate(10deg);
      transform: rotate(10deg);
    }
  }
  @keyframes octocat-wave {
    0%, 100% {
      -webkit-transform: rotate(0);
      -moz-transform: rotate(0);
      -ms-transform: rotate(0);
      -o-transform: rotate(0);
      transform: rotate(0);
    }
    20%, 60% {
      -webkit-transform: rotate(-25deg);
      -moz-transform: rotate(-25deg);
      -ms-transform: rotate(-25deg);
      -o-transform: rotate(-25deg);
      transform: rotate(-25deg);
  }
  40%, 80% {
    -webkit-transform: rotate(10deg);
    -moz-transform: rotate(10deg);
    -ms-transform: rotate(10deg);
    -o-transform: rotate(10deg);
    transform: rotate(10deg);
  }
}

  /*
  屏幕小于768px的
  */
  @media screen and (max-width:768px) and (min-width: 100px){ 
     .navs{
      width: 100%;
      height: 80px;
      /* line-height: 80px; */
      background: rgb(254, 254, 254);
 
      .nav{
      display: none;
      }
      .changeStyle{
        font-weight: bold;
      }
      .nav-image{ 
        float: left;
        display: inline; 
        margin-top: 10px;
        margin-left: 30px; 
      }
      
      .nav-search{
      float: left; 
      margin-left:28%;
      margin-top: 23px;
      }
       .el-icon-message{
          margin-left: 70px;
          cursor: pointer;
      }
      .github-corner{
        display: none;
      }
  }
  .show-card{ 
   width: 100%; 
   background-image: url(../../assets/img/tags.jpeg);
   z-index: 100; 
   position:absolute;
   margin-top: 100px;
   height:450px ;      
   border-top: 0.5px solid rgb(214, 212, 212);
  .card-recent{
    display: none;
    margin-top: 20px;
    margin-right: 65%;
  }
  .small-card{
   display: none;
   width:100%;
   margin: 0 auto;
    .el-col{
    float: left;
    margin-left: 20px;
    width:100px;
    height:100px; 
      .nav-show-image{
        width: 100%; 
        height:140px; 
        object-fit: cover;
        transition: all 0.6s;
        }
      .nav-show-image:hover{
        transform: scale(1.2);
        }
      .card-massges{
        object-fit: cover;
        height: 20px;
        font-size: 15px;
      }
    }
  }
  .nav-tags{ 
    float: left;
    margin-top: 30px;
    margin-left: 80px;
    color: rgb(228, 236, 218);
    font-size: 150%;
  }
  .tags-div{
    float: right;
    margin-right: 40%;
    margin-top: 80px;
    .tags{ 
      margin-top: 15px;
      font-size: 20px;
      color: rgb(226, 238, 225);
    }
  }
  }
}
  
  @media screen and (max-width: 3000px) and (min-width: 767px) {
     .navs{
        width: 100%;
        height: 80px;
        /* line-height: 80px; */ 
        .nav{
        float:left;
        margin-left: 40px;
        font-size: 18px;
        cursor: pointer;
        margin-top: 30px;
        }
        .changeStyle{
          font-weight: bold;
        }
        .nav-image{ 
          float: left;
          display: inline; 
          margin-top: 10px; 
          margin-left: 17%;
        }
        
        .nav-search{
        float: left;
        margin-left: 15px;
        margin-top: 23px;
        cursor: pointer;
        }
        .el-icon-message{
          margin-left: 400px;
          cursor: pointer;
        }
    }
     .show-card{
   width: 100%;
   height: 400px;
   background: rgb(255, 255, 255);
   z-index: 100; 
   position:absolute;
   margin-top: 100px;      
   border-top: 0.5px solid rgb(214, 212, 212);
  .card-recent{
    margin-top: 20px;
    margin-right: 65%;
  }
   .small-card{
   width:75%;
   margin: 0 auto;
    .card-blog{ 
    margin-left: 20px;
    width:200px;
    height:200px; 
      .nav-show-image{
        width: 100%; 
        height:140px; 
        object-fit: cover;
        transition: all 0.6s;
        }
      .nav-show-image:hover{
        transform: scale(1.2);
        }
      .card-massges{
        object-fit: cover;
        height: 20px;
        font-size: 15px;
      }
    }
  }
  .nav-tags{
   margin-top: 30px;
   margin-right: 72%;
  }
   .tags-div{
    margin-left: 200px;
  }
  .tags{
    float:left;
    margin-left:3%;
    font-size: 18px;
    cursor: pointer;
    margin-top: 10px;
    font-weight: bold;
    }
 }
} 
 
</style>
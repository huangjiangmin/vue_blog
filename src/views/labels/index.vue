<template>
  <div>
    <div class="l-banan">
        <div class="img-content " data-aos="fade-down">
          <h1 class="m-hero-title bigger">{{labelName}}</h1>
          <p class="m-heading__description">
            {{essayCount}} articles with this tag
          </p>
        </div>
        <div class="image" style="height:500px;">
        </div>
      </div>
        <div class="l-content" data-aos="fade-up">
           <card :essayList="essayList"/>
      </div>
      <div class="l-content-foot"> 
        <el-pagination 
          small
          layout="prev, pager, next"
           @current-change="current_change"
            :page-size="9"
          :total='essayCount'>
        </el-pagination>
      </div>
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
        labelId : this.$Base64.decode(this.$route.params.labelId), 
        labelName: this.$route.params.labelName,
        essayList:[],
        essayCount:0, 
    };
  },
  created() {
   this.getListEssay();
   this.$router.afterEach((to,from,next)=>{
　　　　window,scrollTo(0,0)
　　})
  },
  watch:{
    $route:{
        handler(newVal,oldVal){
            this.labelId=this.$Base64.decode(newVal.params.labelId),
            this.labelName=this.$route.params.labelName,
            this.getListEssay()
        }
    }
  },
  mounted() {

  },
  methods: {
      current_change(currentPage){  //改变当前页
             this.currentPage = currentPage;
             this.getListEssay(currentPage);
         },
      /**
       * 加载essayList
       */
      getListEssay(currentPage){
            this.$post('/api/blog/findEssay',{
              pageNumber:currentPage,
              labelId:this.$Base64.decode(this.$route.params.labelId), 
            })
            .then((response) =>{
              this.essayList=response.data.rows;
              this.essayCount=response.data.total;
            })
      },
    },
}
</script>

<style scoped>
  .l-banan{
    width: 100%;
    height: 15%;
    position: relative;
  }
   @media screen and (max-width: 3000px) and (min-width: 767px) {
          .img-content{
        position: absolute;
        left:45%;
        top:38%;
        transform: translate(-45%, -38%);
        color:  #faf9f9;
      }
   }
    @media screen and (max-width:768px) and (min-width: 100px){ 
        .img-content{
            position: absolute;
            left:30%;
            top:30%;
            transform: translate(-45%, -45%);
            color:  #faf9f9;
        }
    }
 
  .m-hero-content{ 
     color: rgb(218, 216, 216);
  }
.image{
   width: 100%; 
   background: rgb(190, 207, 203);
    object-fit: cover;
}
  .l-content-foot{
    font-size: 40px;
    margin-top: 50px;
    height: 120px;
  }
</style>
<template>
    <div>
      <div class="l-banan">
        <div class="img-content " data-aos="fade-down">
          <h1 class="m-hero-title bigger">Life</h1>
          <p class="m-heading__description">
            Love life , stay safe
          </p>
        </div>
        <div class="l-image">
        <img src="../../assets/img/life.jpg" class="image" style="height:500px;">
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
        essayList:[],
        essayCount:0, 
      };
    },
    created() {
      this.getListEssay();
    },
    mounted() {
    },
    methods: {
      getEssayDetail(id){
        this.$router.push(`/essaydetail/${id}`)
      },
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
              labelId:1
            })
            .then((response) =>{
              this.essayList=response.data.rows;
              this.essayCount=response.data.total;
            })
      },
    },
  }
</script>

 
<style lang="less" scoped>  
@import '../../assets/css/common.less';
</style>
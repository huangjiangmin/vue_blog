<template>
    <div>
      <div class="l-banan">
        <div class="img-content " data-aos="fade-down">
          <h1 class="m-hero-title bigger">Author</h1>
          <p class="m-heading__description">
            Sun was shining over me
          </p>
        </div>
        <div class="l-image">
        <img 
          v-lazy='"https://picabstract-preview-ftn.weiyun.com/ftn_pic_abs_v3/d078ff000f9e4cbfcd4b3be8b0a10bf74d2f3948a85d427ba9506f8040bcdbc98bb2ccdd2fc1fa81557dfd08bb17e012?pictype=scale&from=30013&version=3.3.3.3&uin=2248410897&fname=pexels-sam-lion-5731804.jpg&size=750"' 
          :key='"https://picabstract-preview-ftn.weiyun.com/ftn_pic_abs_v3/d078ff000f9e4cbfcd4b3be8b0a10bf74d2f3948a85d427ba9506f8040bcdbc98bb2ccdd2fc1fa81557dfd08bb17e012?pictype=scale&from=30013&version=3.3.3.3&uin=2248410897&fname=pexels-sam-lion-5731804.jpg&size=750"'
         class="image" style="height:500px;">
        </div>
      </div>
      <div class="l-content" data-aos="fade-up">
           <card :essayList="essayList"/>
      </div>
      <div class="l-content-foot"> 
        <el-pagination  v-show="isPage" 
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
        isPage:false,
        essayList:[],
        essayCount:0, 
      };
    },
    created() {  
    },
    mounted() {
       // 开启滚动监听
	  window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
       // 滚动监听  滚动触发的效果写在这里
      handleScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        if (scrollTop >= 30) { 
          this.getListEssay(); 
          this.isPage=true
          window.removeEventListener('scroll', this.handleScroll); // 关闭监听  
        } 
      },
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
              labelType:2
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
<template>
  <div>
      <div class="m-footer">
        <div class="m-footer-p">
          <span class="m-footer-i">Dahuangzi © 2020</span>
          <span class="m-footer-i">&nbsp; • &nbsp;</span>
          <span> <a href="http://beian.miit.gov.cn/" class="m-footer-a" target="_blank" rel="noopener">京ICP备2020047706号</a></span>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
  data() {
    return {

    };
  },
  created() {

  },
  mounted() {

  },
  methods: {

  },
}
</script>

<style lang="less" scoped>

.m-footer{
    width: 100%;
    height: 200px;
    background: #3c6d9e;
    .m-footer-p{
      float: left;
      width:100%;
      margin-top: 80px;
      color: rgb(250, 250, 250); 
      .m-footer-a{
        text-decoration: none;
        color: rgb(250, 250, 250); 
      }
    }
}


</style>
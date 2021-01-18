<template>
  <div>
    <nav-bar></nav-bar>
    <router-view></router-view>
    <my-footer></my-footer>
  </div>
  
</template>

<script>
import NavBar from '../../components/nav'
import MyFooter from '../../components/footer'
export default {
    components:{
      NavBar,
      MyFooter
    }

}
</script>

<style>

</style>
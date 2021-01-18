<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app { 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #071f36;
  letter-spacing:1px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
body {
  margin:0px;
}
#container { 
  position:relative;
  margin-right:auto;
}
::selection {
    background: #96c7c9; /* Safari */
    color: #ffffff;
}
::-moz-selection {
    background: #8fbbb9; /* Firefox */
    color: #ffffff;
}
</style>

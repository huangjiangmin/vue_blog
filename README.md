# 开发一个简单的个人博客

**整体风格上，我对设计没有太多的见解，做的时候参考了好多网上现有的博客，总体喜欢简约。**
![Image text](https://img-blog.csdnimg.cn/20201223184703472.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1YW5namlhbmdtaW4=,size_16,color_FFFFFF,t_70#pic_center)

![Image text](https://img-blog.csdnimg.cn/202012231843361.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1YW5namlhbmdtaW4=,size_16,color_FFFFFF,t_70)
![Image text](https://img-blog.csdnimg.cn/20201223184333744.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2h1YW5namlhbmdtaW4=,size_16,color_FFFFFF,t_70)
 
# 用到的技术
 
## 前端  

  **vue +  vue-router + axios + element ui框架的样式 + aos.css 动画 + less + media 媒体查询 自适应 Web+H5**
 
  **包含技术点：**

 
 1.  axios请求封装
 2. aos动画的使用 
 3.  博客代码高亮highlight 
 4. 基本组件封装 
 5. 父子组件传值  
 6. 路由传参 
 7. 传参加密 
 8.  同界面路由变更回到顶部 watch()
 9. 媒体查询@media
 
 
# 后端
## 1、 node.js
**egg.js  +mongoDB + redis 实现**

 **包含技术点：**
 
 1.  安装egg，创建项目 
 2. 引入mongo  、redis     （config/config.default.js）
 3. extend框架扩展：统一返回 （code,msg,data）
 4. middleware中间件：统一异常处理、Jwt自定义登陆拦截
 5. 封装redis公共方法 service
 6. 基本增删改查

 

## 2、Java
**springboot + mysql + mybatis + redis**

 **包含技术点：（这对后端开发其实没啥技术点）**
 
 1.  springboot+mybatis 实现基本增删改查
 2.  redis工具类
 3.  aop规范控制台日志 
 4.  统一返回 （code,msg,data）
 5. Dockerfile 编写
 

## 服务（部署Java）
阿里云服务器  **centos8 + docker + dockerfile + nginx+ mysql** 

 **包含技术点：**

 1.  centos8 安装 docker。
 2. docker + mysql 文件挂载、远程连接。
 3.  docker + nginx 文件挂载、负载、反向。
 4.  docker化 nginx后，SSL证书的配置。
 6. dockerfile 文件，实现项目打包镜像。 

## " 基本实现了一个简单的个人网页 ：  [https://www.dahuangzi.work/](https://www.dahuangzi.work/) "

## 1、获取项目到本地
## 2、vscode 终端 输入 npm i 下载package.json中的依赖包
## 3、npm run dev 启动
## 4、修改 utils 下 https 中封装的 baseURL 为自己的后端接口地址
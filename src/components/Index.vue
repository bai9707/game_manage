<template>
  <div>
    <div id="top">
      <div class="simulate logo">
        <div class="nav_logobox"><div class="nav_logo"></div></div>
      </div>
      <div class="simulate broadside">
        <span class="title">{{title}}</span>
        <div class="exit" @click="log_off">
          <span class="exit-icon"></span>
          <span class="exit-text">退出登录</span>
        </div>
      </div>
    </div>
    <div id="nav" class="col-md-2 col-sm-3">
      <div class="nav_reactive"></div>
      <div class="nav_menu">
        <ul class="menu">
          <li v-for="(val,index) in list" :class="{'active':check==index}" @click="btn_click(index)">
            <router-link :to="val.url">
              <div>
                <span class="ulicon glyphicon" :class="val.icon"></span>
                <span class="ulmenu">{{val.name}}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Index',
  props:["path"],
  data(){
    return {
      list:{
        0:{icon:"glyphicon-th-list",name:"盒子列表",url:"/"},
        1:{icon:"glyphicon-th-list",name:"游戏列表",url:"/ClientList"},
        2:{icon:"glyphicon-check",name:"活动导入",url:"/ActivityList"},
      },
      title:this.overall.title,
      check:0,
    }
  },
  methods:{
    btn_click(index){
      this.check=index;
    },
    log_off(){
      if(confirm("是退出登录?")){
        sessionStorage.removeItem("user");
        window.location.reload();
      }
    },
  },
  created(){
    var path=this.path;
    if(path=="/"||path=="/GameSettings"){
      this.check=0;
    }else if(path=="/ClientList"||path=="/ClientSettings"){
      this.check=1;
    }else if(path=="/ActivityList"){
      this.check=2;
    }
  }
}
</script>

<style scoped>
@import '../../static/css/bootstrap.min.css';
@import '../../static/css/base.css';
@import '../../static/css/index.css';
</style>
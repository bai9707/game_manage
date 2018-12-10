<template>
  <div id=app>
    <Login v-if="Login_state"></Login>
    <Index v-else v-on:monitor="monitor" v-bind:path="path"></Index>
    <router-view v-on:monitor="monitor" id="main" class="col-md-10 col-sm-9 col-md-offset-2 col-sm-offset-3" v-if="!Login_state"/>
  </div>
</template>

<script>
import Login from '@/components/Login'
import Index from '@/components/Index'
export default {
  name: 'App',
  data(){
    return{
      path:""
    }
  },
  methods:{
     monitor(value){
       this.$router.push({path:value.link});
     }
  },
  components:{Login,Index},
  created(){
    if(sessionStorage.getItem("user")!=null){
      this.Login_state=false;
      this.overall.Login_user=sessionStorage.getItem("user");
      this.path=this.$route.path;
    }else{
      this.Login_state=true;
    };
  }
}
</script>

<style>
@import '../static/css/reset.css';
@import '../static/css/unify.css';
</style>
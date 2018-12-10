<template>
  <div class="main">
      <div class="box">
	      <div class="title">
            <span>{{title}}</span>
        </div>
        <div class="input_box">
          <ul>
            <li><span>账户：</span><input type="text" @keyup.enter="Login_btn" v-model="name"></li>
            <li><span>密码：</span><input type="password" @keyup.enter="Login_btn" v-model="pass"></li>
            <a v-on:click="Login_btn">立即登录</a>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      title:this.overall.title,
      pass:"",
      name:"",
    }
  },
  methods:{
    Login_btn(){
      if(this.name!=""&&this.pass!=""){
        var data=this.overall.json_str({userid:this.name,userpass:this.pass})
        var url=this.overall.link+"user/login"
        this.$http.post(url,data,{emulateJSON:true}).then(function(res){
          var data=res.body;
          if(data.code==100){
            this.overall.al(data.data.user.userid+"登录成功");
            window.sessionStorage.setItem('user',data.data.user.userid);
            window.location.reload();
          }else{
            this.overall.al(data.msg)
          }
        },function(err){
          console.log(err);
        })
      }else{
        this.overall.al("请输入用户名和密码");
      }
    }
  }
}
</script>

<style>
@import '../../static/css/login.css';
html,body,#app{
  width:100%;
  height:100%;
}
</style>
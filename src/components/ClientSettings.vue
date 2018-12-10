<template>
  <div>
    <h1>新增游戏</h1>
    <div class="btn_box">
      <p class="btn_box">
        <span class="btn" @click="_box(true)">{{btn}}</span>
        <span class="btn" @click="_box(false)">退出</span>
      </p>
    </div>
    <div class="input_box box_info">
      <ul>
        <li><span><i>*</i>游戏盒子</span><select v-model="boxData.boxName" :disabled="disabled"><option v-for="i in boxname" :value="i">{{i}}</option></select></li>
        <li><span><i>*</i>游戏名称</span><input v-model="boxData.minigameName" :disabled="disabled_"></li>
        <li><span><i>*</i>gh_id</span><input v-model="boxData.minigameGhid" :disabled="disabled_"></li>
        <li><span><i>*</i>app_id</span><input v-model="boxData.minigameAppid" :disabled="disabled_"></li>
        <li><span><i>*</i>位置类型</span><select v-model="boxData.minigamePosition" :disabled="disabled"><option value="侧边栏">侧边栏</option><option value="钻石">钻石</option></select></li>
        <li><span><i>*</i>跳转路径</span><input v-model="boxData.minigameUrl" :disabled="disabled"></li>
        <li><span>ExtraData</span><input v-model="boxData.minigameExtradata" :disabled="disabled"></li>
      </ul>
    </div>
    <div class="img_box">
        <div class='card'>
          <label for="file">
            <div><img v-if="boxData.minigameLogourl" :src="boxData.minigameLogourl"><p v-else>单击上传图片</p></div>
            <input type="file" id="file" @change="up_img($event)" :disabled="disabled">
          </label>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'ClientSettings',
  data(){
    return{
      status:{
        type:window.sessionStorage.getItem("type"),
        id:window.sessionStorage.getItem("id")
      },
      boxname:[],
      boxData:{
        boxName:null,
        minigameName:null,
        minigameGhid:null,
        minigameAppid:null,
        minigamePosition:"侧边栏",
        minigameUrl:null,
        minigameLogourl:null
      },
      disabled:false,
      disabled_:false,
      port:"minigame/",
      btn:"新增",
    }
  },
  methods:{
    up_img(e,index){
      this.overall.update(this,e,index);
    },
    _box(type){
      this.overall.info(this,type);
    }
  },
  created(){
    this.overall.info_if(this);
    this.overall.boxname_(this,true);
  }
}
</script>

<style scoped>
.input_box li span{
  display:inline-block;
  width:15%;
}
#main .card{
  display:block;
  margin:auto;
}
</style>
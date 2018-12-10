<template>
  <div>
    <h1>新增盒子</h1>
    <div class="btn_box">
      <p class="btn_box">
        <span class="btn" @click="_box(true)">{{btn}}</span>
        <span class="btn" @click="_box(false)">退出</span>
      </p>
    </div>
    <div class="input_box box_info">
      <ul>
        <li><span><i>*</i>盒子名称</span><input v-model="boxData.boxName" :disabled="disabled_"></li>
        <li><span><i>*</i>gh_id</span><input v-model="boxData.boxGhid" :disabled="disabled_"></li>
        <li><span><i>*</i>app_id</span><input v-model="boxData.boxAppid" :disabled="disabled_"></li>
        <li><span><i>*</i>密钥</span><input v-model="boxData.boxAppsecret" :disabled="disabled"></li>
      </ul>
    </div>
    <div class="img_box">
      <div class='card' v-for="(value,index) in boxImgList">
        <label :for="'file'+index">
          <div><img v-if="value.imageurl" :src="value.imageurl"><p v-else>单击上传图片</p></div>
          <input type="file" :id="'file'+index" @change="up_img($event,index)" :disabled="disabled">
        </label>
        <textarea placeholder='请输入描述语' v-model="value.description" :disabled="disabled"></textarea>
        <span @click="card(false,index)" :style="{display:disabled?'none':'block'}"></span>
      </div>
      <span class="btn new_btn" @click="card(true)" :style="{display:disabled?'none':'block'}">添加分享卡片</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'GameSettings',
  data(){
    return{
      boxImgList:[],
      status:{
        type:window.sessionStorage.getItem("type"),
        id:window.sessionStorage.getItem("id")
      },
      boxData:{
        boxName:null,
        boxGhid:null,
        boxAppid:null,
        boxAppsecret:null
      },
      disabled:false,
      disabled_:false,
      port:"box/",
      btn:"新增",
    }
  },
  methods:{
    card(operation,index){
      if(operation){
        this.boxImgList.push({imageurl:false,description:""})
      }else{
        if(this.boxImgList[index].id&&confirm("是否删除该图片?")){
          var now=this;
          this.overall.ajax(this,this.port+"deleteimg",{id:this.boxImgList[index].id},{
            success(res){
              var data=res.data;
              if(data.code==100){
                now.overall.al(data.data);
              }else{
                now.overall.al("发生未知错误");
              };
            },
          });
        };
        this.boxImgList.splice(index,1);
      }
    },
    up_img(e,index){
      this.overall.update(this,e,index);
    },
    _box(type){
      this.overall.info(this,type);
    }
  },
  created(){
    this.overall.info_if(this);
  }
}
</script>

<style scoped>
.input_box li span{
  display:inline-block;
  width:15%;
}
</style>
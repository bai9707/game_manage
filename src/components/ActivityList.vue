<template>
  <div>
    <h1>活动导入</h1>
    <div class="btn_box">
        <span class="btn" v-for="(val,index) in activity_list" :class="{'btn_active':check==index}"  @click="btn_click(index)">{{val.name}}</span>
        <label for="file">
          <span class="btn new_btn">导入数据</span>
          <input type="file" id="file" @change="update_excel($event)">
        </label>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th v-for="i in table_head">{{i}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in table_body">
          <td>{{i.aid}}</td>
          <td v-for="z in body_para">{{i[z]}}</td>
        </tr>
      </tbody>
    </table>
    <PaGing :pagecount="pagecount" :select_data="select_data" v-on:transmit="select"></PaGing>
    <div class="mask"></div>
  </div>
</template>

<script>
export default {
  name:'ActivityList',
  data(){
    return{
      activity_list:[
        {name:"邀请好友",port:"invite/",head:["序号","资源ID","资源名称","邀请好友数量","导入日期"],body:["reid","rename","inviteNum","createTime"]},
        {name:"好友助力",port:"friendGive/",head:["序号","收益时间","导入日期"],body:["profitTime","createTime"]},
        {name:"每日签到",port:"signday/",head:["序号","签到天数","资源ID","资源名称","数量","导入日期"],body:["daySign","reId","reName","account","createTime"]},
        {name:"限时好礼",port:"draw/",head:["序号","当前可购买最高等级赔率","导入日期"],body:["multiplying","createTime"]},
        {name:"在线礼包",port:"gift/",head:["序号","在线时间","资源ID","资源名称","数量","导入日期"],body:["time","reId","reName","count","createTime"]},
        {name:"抽奖",port:"draw/",head:["序号","项目类型","资源ID","资源名称","数量","概率","导入日期"],body:["type","reId","reName","account","probability","createTime"]},
      ],
      check:0,
      table_body:null,
      table_head:null,
      body_para:null,
      port:null,
      pagecount:1,
      select_data:{
        currentpage:1,
        pagesize:10,
        minigameStatus:"",
        boxName:"",
        minigameName:""
      },
    }
  },
  methods:{
    btn_click(index){
      this.change(index);
    },
    select(page){
      this.overall.select(this,page);
    },
    change(index){
      this.overall.activity(this,index);
      this.check=index||0;
      this.select("change");
    },
    update_excel(e){
      this.overall.update(this,e);
    }
  },
  components:{},
  created(){
    this.change();
  },
}
</script>

<style scoped>
  #main .btn_box{
    position:relative;
  }
  #main .new_btn{
    position:absolute;
    margin:auto;
    right:25px;
    bottom:0;
    top:0;
  }
  #main input[type=file]{
    display:none;
  }
  #main span.btn_active{
    background:#41a8ee;
    color:#ffffff;
  }
</style>
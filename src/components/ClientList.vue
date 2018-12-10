<template>
  <div>
    <h1>客户小游戏列表</h1>
    <div class="btn_box">
      <span class="btn" @click="operation(null,'new')">新增盒子</span>
      <span class="btn" @click="box_status('status_box')">设置状态</span>
      <span class="btn" @click="box_status('select_box')">高级查询</span>
    </div>
    <div class="input_box" :style="{display:select_box}">
      <ul>
        <li><span>开始日期</span><input type="date" v-model="select_data.dateStart" @change="select('change')"></li>
        <li><span>结束日期</span><input type="date" v-model="select_data.dateEnd" @change="select('change')"></li>
        <li><span>游戏状态</span><select v-model.number="select_data.minigameStatus" @change="select('change')"><option value="">全部</option><option value=0>正常</option><option value=1>冻结</option></select></li>
        <li><span>游戏盒子</span><select v-model.number="select_data.boxName" @change="select('change')"><option value="">全部</option><option v-for="i in boxname" :value="i">{{i}}</option></select></li>
        <li><span>游戏名称</span><input v-model="select_data.minigameName" @keyup.enter="select('change')"></li>
      </ul>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th><input type="checkbox" @click="check(true)" v-model="th_check"></th>
          <th v-for="i in table_head">{{i}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(val,index) in table_body">
          <td><input type="checkbox" v-model="val.checked" @click="check(false,index)"></td>
          <td>{{val.aid}}</td>
          <td>{{val.boxName}}</td>
          <td>{{val.minigameName}}</td>
          <td><img :src="val.minigameLogourl"></td>
          <td>{{val.minigameAppid}}</td>
          <td>{{val.x}}</td>
          <td>{{val.x}}</td>
          <td>{{val.x}}</td>
          <td>{{val.minigamePosition}}</td>
          <td>{{val.minigameStatus==0?"正常":"冻结"}}</td>
          <td>{{val.minigameDate}}</td>
          <td>
            <span class="btn" @click="operation(index,'delete')">删除</span>
            <span class="btn" @click="operation(index,'info')">详情</span>
          </td>
        </tr>
      </tbody>
    </table>
    <PaGing :pagecount="pagecount" :select_data="select_data" v-on:transmit="select"></PaGing>
    <div class="mask"></div>
    <form class="min_window" :style="{display:status_box}">
        <h2>设置盒子状态</h2>
        <ul>
          <li>
            <select v-model.number="set_state">
              <option value=0>正常</option>
              <option value=1>冻结</option>
            </select>
          </li>
        </ul>
        <div>
          <p class="btn_box">
            <span class="btn" @click="set_state_()">确定</span>
            <span class="btn" @click="box_status('status_box')">取消</span>
          </p>
        </div>
    </form>
  </div>
</template>

<script>
export default {
  name:'ClientList',
  data(){
    return{
      boxname:[],
      table_body:null,
      table_head:{
        1:"序号",
        2:"游戏盒子",
        3:"游戏名称",
        4:"游戏Logo",
        5:"app_id",
        6:"昨日新增人数",
        7:"昨日访问人数",
        8:"总人数",
        9:"位置类型",
        10:"游戏状态",
        11:"创建日期",
        12:"操作"
      },
      port:"minigame/",
      select_box:"none",
      status_box:"none",
      pagecount:1,
      set_state:0,
      select_data:{
        currentpage:1,
        pagesize:10,
        minigameStatus:"",
        boxName:"",
        minigameName:""
      },
      th_check:false,
    }
  },
  methods:{
    box_status(data){
      this.overall.set_box(this,data);
    },
    set_state_(){
      this.overall.choose(this);
    },
    select(page){
      this.overall.select(this,page);
    },
    check(choice,index){
      this.$forceUpdate();
      this.overall.checked(choice,this,index);
    },
    operation(index,opera){
      this.overall.operation_(this,index,opera);
    },
  },
  created(){
    this.select("change");
    this.overall.boxname_(this);
  },
}
</script>
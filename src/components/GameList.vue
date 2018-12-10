<template>
  <div>
    <h1>小游戏盒子列表</h1>
    <div class="btn_box">
        <span class="btn" @click="operation(null,'new')">新增盒子</span>
        <span class="btn" @click="box_status('status_box')">设置状态</span>
        <span class="btn" @click="box_status('select_box')">高级查询</span>
    </div>
    <div class="input_box" :style="{display:select_box}">
        <ul>
            <li><span>开始日期</span><input type="date" v-model="select_data.dateStart" @change="select('change')"></li>
            <li><span>结束日期</span><input type="date" v-model="select_data.dateEnd" @change="select('change')"></li>
            <li><span>盒子名称</span><input v-model="select_data.boxName" @keyup.enter="select('change')"></li>
            <li><span>盒子状态</span><select v-model.number="select_data.boxStatus" @change="select('change')"><option value="">全部</option><option value=0>正常</option><option value=1>冻结</option></select></li>
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
          <td>{{val.boxGhid}}</td>
          <td>{{val.boxAppid}}</td>
          <td>{{val.boxAppsecret}}</td>
          <td>{{val.pNew}}</td>
          <td>{{val.pvist}}</td>
          <td>{{val.ptotal}}</td>
          <td>{{val.boxStatus==1?"冻结":"正常"}}</td>
          <td>{{val.boxDatecreate}}</td>
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
  name: 'GameList',
  data(){
    return{
      table_body:null,
      table_head:{
        1:"序号",
        2:"游戏名称",
        3:"gh_id",
        4:"app_id",
        5:"密钥",
        6:"昨日新增人数",
        7:"昨日访问人数",
        8:"总人数",
        9:"游戏状态",
        10:"创建日期",
        11:"操作"
      },
      port:"box/",
      select_box:"none",
      status_box:"none",
      pagecount:1,
      set_state:0,
      select_data:{
        currentpage:1,
        pagesize:10,
        boxStatus:"",
        dateStart:"",
        dateEnd:"",
        boxName:"",
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
  },
}
</script>
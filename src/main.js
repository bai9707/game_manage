// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Overall from '@/components/Overall'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.prototype.overall = Overall
Vue.component('PaGing', {
  props: ['pagecount', 'select_data'],
  template: `
    <div class="article">
      <select v-model.number="select_data_.pagesize" @change="select('change')">
        <option value=10>10条/页</option>
        <option value=15>15条/页</option>
        <option value=20>20条/页</option>
        <option value=25>25条/页</option>
        <option value=30>30条/页</option>
      </select>
      <span @click="select('-')">上一页</span>
      <input v-model.number="select_data_.currentpage" @keyup.enter="select('=')">
      <span @click="select('+')">下一页</span>
      <span class="pagecount">总页数:{{pagecount}}</span>
    </div>
  `,
  data () {
    return {
      select_data_: this.select_data
    }
  },
  methods: {
    select (type) {
      this.$emit('transmit', {type: type, value: this.select_data_})
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})

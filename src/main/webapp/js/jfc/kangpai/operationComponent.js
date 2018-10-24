/**
 * Created by wangxiangyang on 2018/4/27.
 */
Vue.component('switch-label', {
    props: ['status', 'boards'],
    template: `<ul v-on:click="switchBoard">
        <li v-for="boa in boards" :class="{active: status.active_board===boa.title}" :target="boa.title">{{ boa.name }}</li>
        <li :class="{active: status.active_board==='duplicate_check'}" target="duplicate_check">查重</li>
        <li :class="{active: status.active_board==='update'}" target="update">修改</li>
        <li :class="{active: status.active_board==='delete'}" target="delete">删除</li>
        <li :class="{active: status.active_board==='approve'}" target="approve">审核</li>
    </ul>`,
    methods: {
        switchBoard: function(){
            this.$emit('switch_board',event)
        }
    }
});
Vue.component('updating-table', {
    props: ['status', 'to_update'],
    data: function(){
        return {
            rows: this.status.checked_row
        }
    },
    template: ``
});
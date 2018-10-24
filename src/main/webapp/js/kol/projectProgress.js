/**
 * Created by wangxiangyang on 2018/5/22.
 */
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var realPath = localhostPath + projectName;
const data = {
    brief: {
        sample_number: 0,//样本量
        sampled_number: 0,//抽样人数
        participant_number: 0,//参与人数
        participate_online_number: 0,//线上参与人数
        reply_online_number: 0,//线上回复人数
        penetration_rate: 0,
        difficulty_level: 0,
        loss_rate: 0,
        identifying: 0,//甄别状态
        excess: 0,//超配额状态
        completed: 0//完成状态
    },
    member_fields: [],
    member_data: [],
    reply_rates: {},
    list: []
},
      computed = {
          penetration_rate: function(){
              this.penetration_rate = this.completed / (this.completed + this.identifying) || 0
          },//渗透率
          difficulty_level: function(){
              this.difficulty_level = this.completed / (this.completed + this.identifying + this.excess) || 0
          },//难易度
          loss_rate: function(){
              this.loss_rate = 0
          }//丢失率
      },
      methods = {
          eventHandler: function(){
              let self = this;
              return {
                  'click .member': function(e, value, row, index){
                      $.ajax({
                          url: realPath + '/doctor/updateEcho',
                          type: 'post',
                          contentType: 'application/json;charset=utf-8',
                          dataType: 'json',
                          async: true,
                          data: JSON.stringify({
                              docId: [row.samDocId]
                          }),
                          success: function(d){
                              if (d[0].doctor[0]){
                                  let result = d[0].doctor[0];
                                  self.member_data = [{
                                      name: result.docName,
                                      province: result['hospital'].hosProvince,
                                      city: result['hospital'].hosCity,
                                      title_level: result.levId,
                                      department: result.belongId,
                                      organization: result['hospital'].hosName,
                                      organization_level: result['hospital'].hoslelId,
                                      cellphone: result.docPhone1,
                                      email: result.docEmail
                                  }];
                                  self.member_fields = [{
                                      key: 'name',
                                      value: '会员名称'
                                  },{
                                      key: 'province',
                                      value: '省份'
                                  },{
                                      key: 'city',
                                      value: '城市'
                                  },{
                                      key: 'title_level',
                                      value: '职称级别'
                                  },{
                                      key: 'department',
                                      value: '所在科室'
                                  },{
                                      key: 'organization',
                                      value: '单位名称'
                                  },{
                                      key: 'organization_level',
                                      value: '单位级别'
                                  },{
                                      key: 'cellphone',
                                      value: '手机'
                                  },{
                                      key: 'email',
                                      value: '邮箱'
                                  }];
                                  self.alert.tableAlert()
                              } else {
                                  simpleAlert('请求失败','#f56c6c')
                              }
                          },
                          error: function(e){
                              simpleAlert('请求失败','#f56c6c')
                          }
                      })
                  }
              }
          },
          query: function(){
              let self = this;
              self.k_id = sessionStorage.getItem('project_id');
              this.queryParams = function(){
                  return {
                      kId: sessionStorage.getItem('progress_k_id')
                  }
              };
              this.tableInit(realPath + '/management/progressSearch')
          },
          queryParams: function(){},
          tableInit: function(url){
              let self = this;
              $("#result").bootstrapTable('destroy')
                  .bootstrapTable({
                      url: url,         // 请求后台的URL（*）
                      method: 'post',                      // 请求方式（*）
                      toolbar: '#tools',                // 工具按钮用哪个容器
                      striped: true,                      // 是否显示行间隔色
                      cache: false,                       // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                      pagination: false,                   // 是否显示分页（*）
                      sortable: false,                     // 是否启用排序
                      sortOrder: "asc",                   // 排序方式
                      queryParams: self.queryParams,// 传递参数（*）
                      //sidePagination: "server",           // 分页方式：client客户端分页，server服务端分页（*）
                      //pageNumber:1,                       // 初始化加载第一页，默认第一页
                      //pageSize: 20,                       // 每页的记录行数（*）
                      //pageList: [10, 20, 50, 100],        // 可供选择的每页的行数（*）
                      //search: false,                       // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                      strictSearch: true,
                      showColumns: true,                  // 是否显示所有的列
                      showRefresh: true,                  // 是否显示刷新按钮
                      minimumCountColumns: 2,             // 最少允许的列数
                      clickToSelect: true,                // 是否启用点击选中行
                      //height: 500,                        // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                      uniqueId: "id",                     // 每一行的唯一标识，一般为主键列
                      showToggle:true,                    // 是否显示详细视图和列表视图的切换按钮
                      cardView: false,                    // 是否显示详细视图
                      detailView: false,                   // 是否显示父子表
                      columns: [
                          {
                              field: 'kNumber',
                              title: '项目ID'
                              ,class: 'kNumber'
                          },{
                              field: 'addStatus',
                              title: '完成状态'
                          },{
                              field: 'addAddress',
                              title: '链接内容'
                              ,class: 'addAddress'
                          },{
                              field: 'addType',
                              title: '类型'
                              ,class: 'addType'
                          },{
                              field: 'samDocId',
                              title: '会员ID'
                              ,class: 'samDocId',
                              formatter : function(value, row, index) {
                                  return "<a class=\"btn btn-xs member\" title=\"会员ID\">"+ value +"</a>"
                              }
                              ,events : self.eventHandler()
                          },{
                              field: 'addPerson',
                              title: '发送人员',
                              class: 'addPerson'
                          },{
                              field: 'addCreateTime',
                              title: '发送日期',
                              class: 'addCreateTime'
                          },{
                              field: 'addReplyTime',
                              title: '回复日期',
                              class: 'addReplyTime'
                          },{
                              field: 'addIp',
                              title: '回复地址IP'
                              ,class: 'addIp'
                          }],
                      responseHandler: function(data){
                          let statistics = data[0],
                              list = statistics.resultAdress,
                              brief = self.brief;
                          for (let i = 0; i < list.length; i++){
                              let c = list[i].addCreateTime,
                                  r = list[i].addReplyTime,
                                  s = list[i].addStatus;
                              list[i].addCreateTime = (c.year + 1900) + '-' + (c.month + 1) + '-' + c.date;
                              list[i].addReplyTime = r ? ((r.year + 1900) + '-' + (r.month + 1) + '-' + r.date) : '';
                              if (s === 's'){
                                  list[i].addStatus = '甄别状态'
                              } else if (s === 'q'){
                                  list[i].addStatus = '超配额状态'
                              } else {
                                  list[i].addStatus = '完成状态'
                              }
                          }
                          $('#tools').find('.numbers').html(`共查询到数据<span style="font-size: 14px;color: #f00;">` + list.length + `</span>条`);

                          brief.sample_number = statistics.kSampleNumber;//样本量
                          brief.sampled_number = statistics.kRecruitmentNumber;//抽样人数
                          brief.participant_number = 0;//参与人数
                          brief.participate_online_number = 0;//线上参与人数
                          brief.reply_online_number = 0;//线上回复人数

                          for (let k = 0, sqc = statistics.countSCQ; k < sqc.length; k++){
                              if (sqc[k]){
                                  if (sqc[k].addStatus === 's'){
                                      brief.identifying = sqc[k].count
                                  } else if (sqc[k].addStatus === 'q') {
                                      brief.excess = sqc[k].count
                                  } else {
                                      brief.completed = sqc[k].count
                                  }
                              }
                          }
                          return list;
                      }
                  });
          }
      },
      beforeCreate = function(){
          this.alert = new TableAlert({
              title: '会员名称',
              fields: 'member_fields',
              data: 'member_data'
          })
      };
      mounted = function(){
          this.query()
      };
      vm = new Vue({
          el: '#root',
          data: data,
          computed: computed,
          methods: methods,
          beforeCreate: beforeCreate,
          mounted: mounted
      });
import alerting from './alerting.js';

var curWwwPath=window.document.location.href;
var pathName=window.document.location.pathname;
var pos=curWwwPath.indexOf(pathName);
var localhostPath=curWwwPath.substring(0,pos);
var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
var realPath=localhostPath+projectName;

const functions = {
    realPath: realPath,
    changeSurveyName: function (survey_id,survey_name){//--------------------------------------------更改问卷名称
        let result;
        $.ajax({
            url: '',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: {
                survey_id: survey_id,
                survey_name: survey_name
            },
            async: false,
            success: function(data){
                result = data[0].result > 0
            },
            error: function(error){
                console.log(error);
                result = false
            }
        });
        return result
    },
    togglePublish: function(status){//--------------------------------------------切换问卷状态
        let result;
        $.ajax({
            url: '',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                status: status
            }),
            async: false,
            success: function(data){
                if (data[0].result > 0){
                    result = !status
                } else {
                    result = status
                }
            },
            error: function(error){
                console.log(error);
                result = status
            }
        });
        return result
    },
    save: function($this,key,id){

        let data = $this.$data,
            to_send = {
                usr_email: data.usr_email,
                survey_id: data.survey_id,
                survey_number: data.survey_number,
                survey_name: data.survey_name,
                survey_remark: data.survey_remark,
                questions: {},
                logic: data.saved_logic,
                style: data.style
            },
            questions = {};

        $.extend(true,questions,data.questions);

        to_send.questions = questions;

        for (let i = 0; i < to_send.questions.length; i++){
            let question = to_send.questions[i];
            question.editing && delete(question.editing);
            question.recommend_stretched && delete(question.recommend_stretched);
            question.site_questions && delete(question.site_questions);
            question.config.func_display && delete(question.config.func_display);
            question.config.neck && delete(question.config.neck);
            question.config.neck_initial && delete(question.config.neck_initial);
            if (question.sub_questions){
                for (let j = 0; j < question.sub_questions.length; j++){
                    delete(question.sub_questions[j].scroll_initial);
                    delete(question.sub_questions[j].scroll_open);
                }
            }
            if (question.options){
                for (let j = 0; j < question.options.length; j++){
                    delete(question.options[j].option_addition);
                    delete(question.options[j].scroll_initial);
                    delete(question.options[j].scroll_open);
                }
            }
        }

        let to_send_final = {};
        if (key === 'question'){
            to_send_final[key] = {};
            to_send_final[key][id] = to_send.questions[to_send.questions.mapping[id]]
        } else {
            to_send_final[key] = to_send[key]
        }
        to_send_final.survey_id = to_send.survey_id;
        to_send_final.usr_email = to_send.usr_email;


        // try {
        //     $.ajax({
        //         url:  functions.realPath + '/survey/insert',
        //         type: 'post',
        //         contentType: 'application/json;charset=utf-8',
        //         dataType: 'json',
        //         data: JSON.stringify(to_send_final),
        //         async: true,
        //         success: function(d){
        //             console.log(d);
        //             if (d[0].wj_id){
        //                 data.survey_id = d[0].wj_id;
        //                 alerting.alertAntoRemove('保存成功','#00dbff')
        //             }
        //             if (d[0].sub_id){
        //                 data.questions[data.questions.mapping[id]].sub_id = d[0].sub_id;
        //                 alerting.alertAntoRemove('保存成功','#00dbff')
        //             }
        //             if (!d[0]){
        //                 alerting.alertAntoRemove('保存失败','#f56c6c')
        //             }
        //         },
        //         error: function(error){
        //             console.log(error);
        //             alerting.alertAntoRemove('保存失败','#f56c6c')
        //         }
        //     })
        // } catch (e){
        //     console.log(e)
        // }
    },
    switchEdit: function($this){
        $this.editing = !$this.editing
    },
    changeContent: function(target, $this, key){
        $this[key] = $(target).html()
    },
    changeOptionContent: function($this, target, option){
        option.option_content = $(target).html()
    },
    changeSubQuestionContent: function($this, target, question){
        question.question_content = $(target).html()
    },
    closeEditor: function(event,curtain,employer){
        event.stopPropagation();
        event.preventDefault();
        curtain.fadeOut(300);
        setTimeout(function(){
            curtain.remove();
            curtain = null;
            if (employer){
                for (let i = 0; i < employer.length; i++){
                    employer[i] = null
                }
            }
        },300);
    },
    preventClose: function(event){
        event.stopPropagation();
        // event.preventDefault();
    },
    activeEdit: function(event,workspace){
        let target = $(event.currentTarget),
            id,item;
        if (target.hasClass('item')){
            id = target.attr('id').match(/item\-(\d)/)[1]
        } else {
            id = target.parents('.item').attr('id').match(/item\-(\d)/)[1]
        }

        item = workspace.questions[workspace.questions.mapping[id]];
        workspace.status.editing.proto = item;
        // item.editing = true
        // workspace.status.editing.id = id;
    },
    rtfEdit: function(event,$this){
        let self = $this,
            curtain = $(`
                <div class="rtf-curtain">
                    
                </div>
            `),
            container = $(`
                <div class="rtf-container">
                    
                </div>    
            `),
            header = $(`
                <div class="rtf-header">高级编辑器</div>
            `),
            remove_icon = $(`
                <span class="rtf-close glyphicon glyphicon-remove"></span>
            `),
            board = $(`
                <div id="board"></div>
            `),
            footer = $(`
                <div class="rtf-footer">
                        
                </div>
            `),
            confirm = $(`
                <button class="rtf-confirm btn btn-default btn-sm">确认</button>
            `),
            cancel = $(`
                <button class="rtf-cancel btn btn-default btn-sm">取消</button>
            `);
        curtain.append(container);
        container.append(header)
            .append(remove_icon)
            .append(board)
            .append(footer);
        footer.append(confirm)
            .append(cancel);
        curtain.css('display','none');
        curtain.fadeIn(300);
        $('#root').append(curtain);
        let height_client = document.documentElement.clientHeight,
            height_container = parseInt(container.css('height'));
        container.css('top', (height_client - height_container) / 2);
        setTimeout(function(){
            let rtf_editor = new self.E('#board'),
                target = $(event.target).parents('.rtf-container').find('.rtf-target');
            // rtf_editor.customConfig.onchange = function(html){
            //     target.val(html)
            // };
            // self.closeEditor(event, curtain, [rtf_editor]){
            //     event.stopPropagation();
            //     event.preventDefault();
            //     curtain.fadeOut(300);
            //     setTimeout(function(){
            //         curtain.remove();
            //         curtain = null;
            //         rtf_editor = null;
            //     },300);
            // }

            remove_icon.on('click', function(event){
                self.closeEditor(event, curtain, [rtf_editor])
            });
            cancel.on('click', function(event){
                self.closeEditor(event, curtain, [rtf_editor])
            });
            confirm.on('click', function(event){
                target.html(rtf_editor.txt.html());
                setTimeout(function(){
                    target.change()
                },0);
                self.closeEditor(event, curtain, [rtf_editor])
            });
            container.on('click', self.preventClose);
            curtain.on('click', function(event){
                self.closeEditor(event, curtain, [rtf_editor])
            });

            rtf_editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
            // editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
            rtf_editor.create();
            rtf_editor.txt.html(target.html());
        },0)
    },
    editLogic: function(event,$this,entry){
        let self = $this,
            curtain = $(`
                <div class="rtf-curtain">
                    
                </div>
            `),
            container = $(`
                <div class="rtf-container">
                    
                </div>    
            `),
            header = $(`
                <div class="rtf-header">逻辑编辑器</div>
            `),
            remove_icon = $(`
                <span class="rtf-close glyphicon glyphicon-remove"></span>
            `),
            board = $(`
                <div id="logics">
                    <div class="logic-switch">
                        <span class="label" :class="{ 'active': editing === 'display' }" @click="switchLabel('display')">显示逻辑</span>
                        <span class="label" :class="{ 'active': editing === 'jump' }" @click="switchLabel('jump')">跳转逻辑</span>
                    </div>
                    <div class="logic-brick display" v-if="editing === 'display'">
                        <div class="logic-item" v-for="item in logic.display_logic">
                            <i class="part delete" @click="deleteLogic(logic.display_logic,item)"><b class="glyphicon glyphicon-minus-sign"></b></i>
                            <div class="condition" v-for="condition in item.conditions">
                                <i class="part">
                                <select v-model="condition.id">
                                    <option value="">请选择</option>
                                    <option v-for="question in question_id_array" v-if="question.type==='choice' || question.type==='check' || question.type==='matrix' || question.type==='score' || question.type==='sort' || question.type==='pictures'" :value="question.id">第{{ question.number }}题</option>
                                </select>
                                </i>
                                <b class="part" v-if="condition.type === 'matrix'">中</b>
                                <i class="part" v-if="condition.type === 'matrix'">
                                    <select v-model="condition.sub_question">
                                        <option value="">请选择</option>
                                        <option v-for="question in condition.sub_questions_now" :value="question.question_id">{{ question.question_content }}</option>
                                    </select>
                                </i>
                                <b class="part">的</b>
                                <i class="part">
                                    <select v-model="condition.option">
                                        <option value="">请选择</option>
                                        <option v-for="option in condition.options_now" :value="option.option_id">{{ option.option_content }}</option>
                                    </select>
                                </i>
                                <i class="part">
                                    <select v-model="condition.judgement">
                                        <option value="">请选择</option>
                                        <option value="checked">被选中</option>
                                        <option value="unchecked">未被选中</option>
                                    </select>
                                </i>
                            </div>
                            <p class="result">
                                <b class="part">时，则显示</b>
                                <i class="part">
                                    <select v-model="item.target">
                                        <option value="">请选择</option>
                                        <option v-for="question in question_id_array" :value="question.id">{{ question.number }}</option>
                                    </select>
                                </i>
                            </p>
                            <i class="part push" @click="pushCondition(item)"><b class="glyphicon glyphicon-plus"></b></i>
                        </div>
                        <p class="logic-append logic-item" @click="appendLogic('display')"><i class="glyphicon glyphicon-plus-sign"></i></p>
                    </div>
                    <div class="logic-brick jump" v-else>
                        <div class="logic-item" v-for="item in logic.jump_logic">
                            <i class="part delete" @click="deleteLogic(logic.display_logic,item)"><b class="glyphicon glyphicon-minus-sign"></b></i>
                            <div class="condition" v-for="condition in item.conditions">
                                <i class="part">
                                    <select v-model="condition.id">
                                        <option value="">请选择</option>
                                        <option v-for="question in question_id_array" v-if="question.type==='choice' || question.type==='check' || question.type==='matrix' || question.type==='score' || question.type==='sort' || question.type==='pictures'" :value="question.id">第{{ question.number }}题</option>
                                    </select>
                                </i>
                                <b class="part" v-if="condition.type === 'matrix'">中</b>
                                <i class="part" v-if="condition.type === 'matrix'">
                                    <select v-model="condition.sub_question">
                                        <option value="">请选择</option>
                                        <option v-for="question in condition.sub_questions_now" :value="question.question_id">{{ question.question_content }}</option>
                                    </select>
                                </i>
                                <b class="part">的</b>
                                <i class="part">
                                    <select v-model="condition.option">
                                        <option value="">请选择</option>
                                        <option v-for="option in condition.options_now" :value="option.option_id">{{ option.option_content }}</option>
                                    </select>
                                </i>
                                <i class="part">
                                    <select v-model="condition.judgement">
                                        <option value="">请选择</option>
                                        <option value="checked">被选中</option>
                                        <option value="unchecked">未被选中</option>
                                    </select>
                                </i>
                            </div>
                            <p class="result">
                                <b class="part">时，则显示</b>
                                <i class="part">
                                    <select v-model="item.target">
                                        <option value="">请选择</option>
                                        <option v-for="question in question_id_array" :value="question.id">{{ question.number }}</option>
                                    </select>
                                </i>
                            </p>
                            <i class="part push" @click="pushCondition(item)"><b class="glyphicon glyphicon-plus"></b></i>
                        </div>
                        <p class="logic-append logic-item" @click="appendLogic('jump')"><i class="glyphicon glyphicon-plus-sign"></i></p>
                    </div>
                </div>
            `),
            footer = $(`
                <div class="rtf-footer">
                        
                </div>
            `),
            confirm = $(`
                <button class="rtf-confirm btn btn-default btn-sm">确认</button>
            `),
            cancel = $(`
                <button class="rtf-cancel btn btn-default btn-sm">取消</button>
            `);
        curtain.append(container);
        container.append(header)
            .append(remove_icon)
            .append(board)
            .append(footer);
        footer.append(confirm)
            .append(cancel);
        $('#root').append(curtain);
        let height_client = document.documentElement.clientHeight,
            height_container = parseInt(container.css('height'));
        container.css('top', (height_client - height_container) / 2);

        let logic_vue = new Vue({
            el: '#logics',
            data: {
                question_array: [],
                proto: {},
                question_id_array: [],
                // sub_questions_now: [],
                id: 0,
                index: 0,
                number: '',
                logic:self.logic,
                editing: 'display'
            },
            methods: {
                switchLabel: function(label){
                    this.editing = label
                },
                appendLogic: function(label){
                    this.logic[label + '_logic'].push({
                        conditions: [{
                            id: '',
                            type: '',
                            sub_questions_now: {0:{}},
                            options_now: [{}],
                            sub_question: '',
                            option: '',
                            judgement: ''
                        }],
                        target: ''
                    })
                },
                deleteLogic: function(item_array,item){
                    item_array.splice(item_array.indexOf(item),1)
                },
                pushCondition: function(item){
                    item.conditions.push({
                        id: '',
                        type: '',
                        sub_questions_now: {0:{}},
                        options_now: [{}],
                        sub_question: {},
                        option: {},
                        judgement: ''
                    })
                }
            },
            mounted: function(){
                self.logic = JSON.parse(JSON.stringify(self.saved_logic));
                this.question_array = self.questions;
                for (let i = 0; i < this.question_array.length; i++){
                    if (this.question_array[i].index = i + 1){
                        this.question_id_array.push(this.question_array[i])
                    }
                }
                // if (entry === 'setting_bar'){
                //     this.proto = self.status.editing.proto;
                //     this.id = self.status.editing.id;
                //     this.index = self.status.editing.proto.index;
                //     this.number = self.status.editing.proto.number;
                //     this.type = self.status.editing.type;
                //     if (this.proto.sub_questions){
                //         this.sub_questions_now = this.proto.sub_questions
                //     }
                //     if (this.proto.options){
                //         this.options_now = this.proto.options_now
                //     }
                //
                // }
            },
            watch: {
                'logic': {
                    handler: function(value,old){
                        for (let i = 0; i < value.display_logic.length; i++){
                            for (let j = 0; j < value.display_logic[i].conditions.length; j++){
                                let proto = this.question_array[this.question_array.mapping[value.display_logic[i].conditions[j].id]];
                                if (proto){
                                    if (proto.type){
                                        value.display_logic[i].conditions[j].type = proto.type
                                    }
                                    if (proto.sub_questions){
                                        value.display_logic[i].conditions[j].sub_questions_now = proto.sub_questions
                                    }
                                    if (proto.options){
                                        value.display_logic[i].conditions[j].options_now = proto.options
                                    }
                                }
                            }
                        }

                        for (let i = 0; i < value.jump_logic.length; i++){
                            for (let j = 0; j < value.jump_logic[i].conditions.length; j++){
                                let proto = this.question_array[this.question_array.mapping[value.jump_logic[i].conditions[j].id]];
                                if (proto){
                                    if (proto.type){
                                        value.jump_logic[i].conditions[j].type = proto.type
                                    }
                                    if (proto.sub_questions){
                                        value.jump_logic[i].conditions[j].sub_questions_now = proto.sub_questions
                                    }
                                    if (proto.options){
                                        value.jump_logic[i].conditions[j].options_now = proto.options
                                    }
                                }
                            }
                        }
                    },
                    deep: true
                }
            }
        });

        curtain.css('display','none');
        curtain.fadeIn(300);

        remove_icon.on('click', function(event){
            self.closeEditor(event, curtain, [logic_vue])
        });
        cancel.on('click', function(event){
            self.closeEditor(event, curtain, [logic_vue])
        });
        confirm.on('click', function(event){
            self.saved_logic = JSON.parse(JSON.stringify(self.logic));
            self.closeEditor(event, curtain, [logic_vue])
        });
        container.on('click',self.preventClose);
        curtain.on('click', function(event){
            self.closeEditor(event, curtain, [logic_vue])
        });
    },
    NewArray: function(){
        function Pt(){
            this.findItemById = function(id){
                return this[this.mapping[id]]
            };
            this.push = function(arg){
                arg.id = this.length;
                Array.prototype.push.call(this, arg);
                this.mapping[arg.id] = this.length - 1;
                return arg
            }
        }
        Pt.prototype = [];
        function CreateArray(){
            this.mapping = {}
        }
        CreateArray.prototype = new Pt();
        return new CreateArray();
    },
    switchNeck: function($this){
        $this.config.neck = !$this.config.neck;
        if ($this.config.neck_initial) {
            $this.config.neck_initial = false
        }
    },
    activeShift: function(event, $this, workspace){
        let base = $('#root'),
            wrap = $('#items'),
            queue = $('#items').find('.item'),
            insert_before = null,
            insert_after = null,
            target = $(event.currentTarget),
            target_data = $this.$data,
            target_index = workspace.questions.indexOf(target_data),
            initial_top = target[0].offsetTop,
            initial_height = target[0].offsetHeight,
            initial_y = event.clientY,
            index_target = Array.prototype.indexOf.call(queue, target[0]),
            moving = false;

        console.log('moving initialed as false');

        Array.prototype.splice.apply(queue, [index_target, 1]);

        function shiftItem(event){
            let instant_y = event.clientY,
                instant_top = initial_top + (instant_y - initial_y),
                instant_middle_top = instant_top + initial_height / 2;
            target.addClass('drift');
            target.css('top', instant_top + 'px');
            wrap.css('paddingBottom', initial_height);

            setTimeout(function(){
                for (let i = 0; i <= queue.length; i++){
                    if (queue[i]){
                        if (instant_middle_top > queue[i].offsetTop + queue[i].offsetHeight / 2){
                            continue;
                        }
                    }
                    if (queue[i-1]){
                        wrap.find('.before-insert').removeClass('before-insert');
                        wrap.find('.after-insert').removeClass('after-insert');
                        $(queue[i-1]).addClass('before-insert');
                        insert_before = $(queue[i-1]);
                        insert_after = null
                    } else {
                        wrap.find('.before-insert').removeClass('before-insert');
                        wrap.find('.after-insert').removeClass('after-insert');
                        $(queue[0]).addClass('after-insert');
                        insert_after = $(queue[0]);
                        insert_before = null
                    }
                    // insert_before = null
                    break
                }
            },0);
            if (!moving) {
                moving = true;
                console.log('changed moving')
            }
            // base.on('mouseup', endShift)
        }

        function endShift(event){
            console.log(moving);
            target.removeClass('drift');
            wrap.css('paddingBottom', 0);
            setTimeout(function(){
                if (insert_before){
                    let index_before = workspace.questions[workspace.questions.mapping[insert_before.attr('id').match(/item-(\d*)/)[1]]].index;
                    if (index_target > index_before + 1){
                        for (let i = 0; i < workspace.questions.length; i++){
                            if (workspace.questions[i].index > index_before && workspace.questions[i].index < index_target){
                                workspace.questions[i].index += 1
                            }
                        }
                        target_data.index = index_before + 1
                    } else if (index_target < index_before){
                        for (let i = 0; i < workspace.questions.length; i++){
                            if (workspace.questions[i].index <= index_before && workspace.questions[i].index > index_target){
                                workspace.questions[i].index -= 1
                            }
                        }
                        target_data.index = index_before + 1
                    }
                    $(target).insertAfter(insert_before);
                    insert_before.removeClass('before-insert')
                } else if (insert_after) {
                    if (queue.length){
                        let index_after = workspace.questions[workspace.questions.mapping[insert_after.attr('id').match(/item-(\d*)/)[1]]].index;
                        if (index_target > index_after){
                            for (let i = 0; i < workspace.questions.length; i++){
                                if (workspace.questions[i].index >= index_after && workspace.questions[i].index < index_target){
                                    workspace.questions[i].index += 1
                                }
                            }
                            target_data.index = index_after - 1
                        } else if (index_target < index_after){
                            for (let i = 0; i < workspace.questions.length; i++){
                                if (workspace.questions[i].index < index_after && workspace.questions[i].index > index_target){
                                    workspace.questions[i].index -= 1
                                }
                            }
                        }
                        insert_after.removeClass('after-insert');
                        $(target).insertBefore($(queue[0]))
                    }
                }
                let new_sort = [];
                for (let i = 0; i < workspace.questions.length; i++){
                    new_sort.push({
                        sub_id: workspace.questions[i].sub_id,
                        index: workspace.questions[i].index
                    })
                }
                $.ajax({
                    url: functions.realPath + '/survey/swap_positions',
                    type: 'post',
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    data: JSON.stringify({
                        new_sort: new_sort
                    }),
                    async: true,
                    success: function(d){
                        console.log(d);
                        alerting.alertAntoRemove('操作成功','#00dbff');
                    },
                    error: function(e){
                        console.log(e);
                        alerting.alertAntoRemove('网络错误','#f56c6c');
                    }
                })
            },0);
            target.css('top', 'auto')
        }

        base.on('mousemove', shiftItem)
            .on('mouseup', function(event){
                event.preventDefault();
                base.off('mousemove',shiftItem)
                    .off('mouseup');
                if (moving){
                    endShift();
                }
            })

    },
    activeShiftOutline: function(event, $this, workspace){
        let base = $('#root'),
            wrap = $('#question_array'),
            queue = $('#question_array').find('.question'),
            insert_before = null,
            insert_after = null,
            target = $(event.currentTarget),
            target_data = $this,
            target_index = workspace.questions.indexOf(target_data),
            initial_top = target[0].offsetTop,
            initial_height = target[0].offsetHeight,
            initial_y = event.clientY,
            index_target = Array.prototype.indexOf.call(queue, target[0]),
            moving = false;

        console.log('moving initialed as false');

        Array.prototype.splice.apply(queue, [index_target, 1]);

        function shiftItem(event){
            let instant_y = event.clientY,
                instant_top = initial_top + (instant_y - initial_y),
                instant_middle_top = instant_top + initial_height / 2;
            target.addClass('drift');
            target.css('top', instant_top + 'px');
            wrap.css('paddingBottom', initial_height);

            setTimeout(function(){
                for (let i = 0; i <= queue.length; i++){
                    if (queue[i]){
                        if (instant_middle_top > queue[i].offsetTop + queue[i].offsetHeight / 2){
                            continue;
                        }
                    }
                    if (queue[i-1]){
                        wrap.find('.before-insert').removeClass('before-insert');
                        wrap.find('.after-insert').removeClass('after-insert');
                        $(queue[i-1]).addClass('before-insert');
                        insert_before = $(queue[i-1]);
                        insert_after = null
                    } else {
                        wrap.find('.before-insert').removeClass('before-insert');
                        wrap.find('.after-insert').removeClass('after-insert');
                        $(queue[0]).addClass('after-insert');
                        insert_after = $(queue[0]);
                        insert_before = null
                    }
                    // insert_before = null
                    break
                }
            },0);
            if (!moving) {
                moving = true;
                console.log('changed moving')
            }
            // base.on('mouseup', endShift)
        }

        function endShift(event){
            console.log(moving);
            target.removeClass('drift');
            wrap.css('paddingBottom', 0);
            setTimeout(function(){
                if (insert_before){
                    let index_before = workspace.questions[workspace.questions.mapping[insert_before.attr('ol_id').match(/item-(\d*)/)[1]]].index;
                    if (index_target > index_before + 1){
                        for (let i = 0; i < workspace.questions.length; i++){
                            if (workspace.questions[i].index > index_before && workspace.questions[i].index < index_target){
                                workspace.questions[i].index += 1
                            }
                        }
                        target_data.index = index_before + 1
                    } else if (index_target < index_before){
                        for (let i = 0; i < workspace.questions.length; i++){
                            if (workspace.questions[i].index <= index_before && workspace.questions[i].index > index_target){
                                workspace.questions[i].index -= 1
                            }
                        }
                        target_data.index = index_before + 1
                    }
                    $(target).insertAfter(insert_before);
                    insert_before.removeClass('before-insert')
                } else if (insert_after) {
                    if (queue.length){
                        let index_after = workspace.questions[workspace.questions.mapping[insert_after.attr('ol_id').match(/item-(\d*)/)[1]]].index;
                        if (index_target > index_after){
                            for (let i = 0; i < workspace.questions.length; i++){
                                if (workspace.questions[i].index >= index_after && workspace.questions[i].index < index_target){
                                    workspace.questions[i].index += 1
                                }
                            }
                            target_data.index = index_after - 1
                        } else if (index_target < index_after){
                            for (let i = 0; i < workspace.questions.length; i++){
                                if (workspace.questions[i].index < index_after && workspace.questions[i].index > index_target){
                                    workspace.questions[i].index -= 1
                                }
                            }
                        }
                        insert_after.removeClass('after-insert');
                        $(target).insertBefore($(queue[0]))
                    }
                }
            },0);
            target.css('top', 'auto')
        }

        base.on('mousemove', shiftItem)
            .on('mouseup', function(event){
                event.preventDefault();
                base.off('mousemove',shiftItem)
                    .off('mouseup');
                if (moving){
                    endShift();
                }
            })

    },
    activeOptionShift: function(option,event,options){
        event.preventDefault();
        event.stopPropagation();

        let base = $('#root'),
            wrap = $(event.target).parents('.item-options'),
            queue = wrap.find('.option'),
            insert_before = null,
            insert_after = null,
            target = $(event.target).parents('.option'),
            target_data = option,
            target_index = options.indexOf(target_data),
            initial_top = target[0].offsetTop,
            initial_height = target[0].offsetHeight,
            initial_y = event.clientY,
            index_target = Array.prototype.indexOf.call(queue, target[0]),
            moving = false;

        Array.prototype.splice.apply(queue, [index_target, 1]);

        function shiftItem(event){
            let instant_y = event.clientY,
                instant_top = initial_top + (instant_y - initial_y),
                instant_middle_top = instant_top + initial_height / 2;
            target.addClass('drift');
            target.css('top', instant_top + 'px');
            wrap.css('paddingBottom', initial_height);

            setTimeout(function(){
                for (let i = 0; i <= queue.length; i++){
                    if (queue[i]){
                        if (instant_middle_top > queue[i].offsetTop + queue[i].offsetHeight / 2){
                            continue;
                        }
                    }
                    if (queue[i-1]){
                        wrap.find('.before-insert').removeClass('before-insert');
                        wrap.find('.after-insert').removeClass('after-insert');
                        $(queue[i-1]).addClass('before-insert');
                        insert_before = $(queue[i-1]);
                        insert_after = null;
                    } else {
                        wrap.find('.before-insert').removeClass('before-insert');
                        wrap.find('.after-insert').removeClass('after-insert');
                        $(queue[0]).addClass('after-insert');
                        insert_after = $(queue[0]);
                        insert_before = null
                    }
                    break
                }
            },0);
            // base.one('mouseup', endShift)
            if (!moving){
                moving = true
            }
        }

        function endShift(event){
            console.log(1);
            target.removeClass('drift');
            wrap.css('paddingBottom', 0);
            setTimeout(function(){
                if (insert_before){
                    let index_before = insert_before.attr('index');
                    if (index_target > index_before + 1){
                        for (let i = 0; i < options.length; i++){
                            if (options[i].index > index_before && options[i].index < index_target){
                                options[i].index += 1
                            }
                        }
                        target_data.index = index_before + 1
                    } else if (index_target < index_before){
                        for (let i = 0; i < options.length; i++){
                            if (options[i].index <= index_before && options[i].index > index_target){
                                options[i].index -= 1
                            }
                        }
                        target_data.index = index_before + 1
                    }
                    $(target).insertAfter(insert_before);
                    insert_before.removeClass('before-insert')
                } else if (insert_after) {
                    if (queue.length){
                        let index_after = insert_after.attr('index');
                        if (index_target > index_after){
                            for (let i = 0; i < options.length; i++){
                                if (options[i].index >= index_after && options[i].index < index_target){
                                    options[i].index += 1
                                }
                            }
                            target_data.index = index_after - 1
                        } else if (index_target < index_after){
                            for (let i = 0; i < options.length; i++){
                                if (options[i].index < index_after && options[i].index > index_target){
                                    options[i].index -= 1
                                }
                            }
                        }
                        insert_after.removeClass('after-insert');
                        $(target).insertBefore($(queue[0]))
                    }
                }
            },0);
            target.css('top', 'auto')
        }

        base.on('mousemove', shiftItem)
            .on('mouseup', function(event){
                base.off('mousemove',shiftItem)
                    .off('mouseup', endShift);
                if (moving){
                    endShift();
                    event.preventDefault()
                }
            })

    },
    activeSubQuestionShift: function(question,event,sub_questions){
        event.preventDefault();
        event.stopPropagation();

        let base = $('#root'),
            wrap = $(event.target).parents('.item-branches'),
            queue = wrap.find('.sub-question'),
            insert_before = null,
            insert_after = null,
            target = $(event.target).parents('.sub-question'),
            target_data = question,
            target_index = sub_questions.indexOf(target_data),
            initial_top = target[0].offsetTop,
            initial_height = target[0].offsetHeight,
            initial_y = event.clientY,
            index_target = Array.prototype.indexOf.call(queue, target[0]),
            moving = false;

        Array.prototype.splice.apply(queue, [index_target, 1]);

        function shiftItem(event){
            let instant_y = event.clientY,
                instant_top = initial_top + (instant_y - initial_y),
                instant_middle_top = instant_top + initial_height / 2;
            target.addClass('drift');
            target.css('top', instant_top + 'px');
            wrap.css('paddingBottom', initial_height);

            setTimeout(function(){
                for (let i = 0; i <= queue.length; i++){
                    if (queue[i]){
                        if (instant_middle_top > queue[i].offsetTop + queue[i].offsetHeight / 2){
                            continue;
                        }
                    }
                    if (queue[i-1]){
                        wrap.find('.before-insert').removeClass('before-insert');
                        wrap.find('.after-insert').removeClass('after-insert');
                        $(queue[i-1]).addClass('before-insert');
                        insert_before = $(queue[i-1]);
                        insert_after = null;
                    } else {
                        wrap.find('.before-insert').removeClass('before-insert');
                        wrap.find('.after-insert').removeClass('after-insert');
                        $(queue[0]).addClass('after-insert');
                        insert_after = $(queue[0]);
                        insert_before = null
                    }
                    break
                }
            },0);
            // base.one('mouseup', endShift)
            if (!moving){
                moving = true
            }
        }

        function endShift(event){
            console.log(1);
            target.removeClass('drift');
            wrap.css('paddingBottom', 0);
            setTimeout(function(){
                if (insert_before){
                    let index_before = insert_before.attr('index');
                    if (index_target > index_before + 1){
                        for (let i = 0; i < sub_questions.length; i++){
                            if (sub_questions[i].index > index_before && sub_questions[i].index < index_target){
                                sub_questions[i].index += 1
                            }
                        }
                        target_data.index = index_before + 1
                    } else if (index_target < index_before){
                        for (let i = 0; i < sub_questions.length; i++){
                            if (sub_questions[i].index <= index_before && sub_questions[i].index > index_target){
                                sub_questions[i].index -= 1
                            }
                        }
                        target_data.index = index_before + 1
                    }
                    $(target).insertAfter(insert_before);
                    insert_before.removeClass('before-insert')
                } else if (insert_after) {
                    if (queue.length){
                        let index_after = insert_after.attr('index');
                        if (index_target > index_after){
                            for (let i = 0; i < sub_questions.length; i++){
                                if (sub_questions[i].index >= index_after && sub_questions[i].index < index_target){
                                    sub_questions[i].index += 1
                                }
                            }
                            target_data.index = index_after - 1
                        } else if (index_target < index_after){
                            for (let i = 0; i < sub_questions.length; i++){
                                if (sub_questions[i].index < index_after && sub_questions[i].index > index_target){
                                    sub_questions[i].index -= 1
                                }
                            }
                        }
                        insert_after.removeClass('after-insert');
                        $(target).insertBefore($(queue[0]))
                    }
                }
            },0);
            target.css('top', 'auto')
        }

        base.on('mousemove', shiftItem)
            .on('mouseup', function(event){
                base.off('mousemove',shiftItem)
                    .off('mouseup', endShift);
                if (moving){
                    endShift();
                    event.preventDefault()
                }
            })
    },
    triggerSubQuestionOperate: function(question){
        if (question.scroll_initial){
            question.scroll_initial = false
        }
        question.scroll_open = !question.scroll_open
    },
    triggerOptionOperate: function(option){
        if (option.scroll_initial){
            option.scroll_initial = false
        }
        option.scroll_open = !option.scroll_open
    },
    deleteMatrixSubQuestion: function(sub_questions, question){
        sub_questions.splice(sub_questions.indexOf(question), 1)
    },
    deleteMatrixOption: function(options, option){
        options.splice(options.indexOf(option), 1)
    },
    changeSubQuestionClass: function(question){
        if (question.class === 'blank'){
            question.blank = false
        }
    },
    changeSubQuestionBlank: function(event, question){
        question.blank = $(event.target).prop('checked')
    },
    autoAppendOption: function(event,$this,option){
        if ($this.options.indexOf(option) === $this.options.length - 1){
            functions.pushOption($this.options)
        }
    },
    autoAppendSubQuestion: function(event,$this,question){
        if ($this.sub_questions.indexOf(question) === $this.sub_questions.length - 1){
            functions.pushSubQuestion($this.sub_questions)
        }
    },
    switchFunc: function(event, $this){
        $this.config.func_display = !$this.config.func_display;
    },
    pushOption: function(options){
        var id = 0,index,option;
        for (let i = 0; i < options.length; i++){
            if (options[i].option_id > id){
                id = options[i].option_id
            }
        }
        index = options.length;
        option = {
            option_id: id,
            option_index:index,
            option_code: '',
            option_content: ''
        };
        options.push(option);
        return option
    },
    pushSubQuestion: function(sub_questions){
        var id = 0,index,question;
        for (let i = 0; i < sub_questions.length; i++){
            if (sub_questions[i].question_id > id){
                id = sub_questions[i].question_id
            }
        }
        index = sub_questions.length;
        question = {
            question_id: id,
            question_index: index,
            question_content: '',
        };
        sub_questions.push(question);
        return question
    },
    batchOption: function(event,$this){
        let self = $this,
            curtain = $(`
                <div class="rtf-curtain">
                    
                </div>
            `),
            container = $(`
                <div class="rtf-container">
                    
                </div>    
            `),
            header = $(`
                <div class="rtf-header">批量编辑选项</div>
            `),
            remove_icon = $(`
                <span class="rtf-close glyphicon glyphicon-remove"></span>
            `),
            board = $(`
                <div id="batch_option">
                    <textarea></textarea>
                </div>
            `),
            footer = $(`
                <div class="rtf-footer">
                        
                </div>
            `),
            confirm = $(`
                <button class="rtf-confirm btn btn-default btn-sm">确认</button>
            `),
            cancel = $(`
                <button class="rtf-cancel btn btn-default btn-sm">取消</button>
            `);
        curtain.append(container);
        container.append(header)
            .append(remove_icon)
            .append(board)
            .append(footer);
        footer.append(confirm)
            .append(cancel);
        curtain.css('display','none');
        curtain.fadeIn(300);
        $('#root').append(curtain);
        let height_client = document.documentElement.clientHeight,
            height_container = parseInt(container.css('height'));
        container.css('top', (height_client - height_container) / 2);

        let batch_saved = '';

        for (let i = 0; i < $this.options.length; i++){
            batch_saved += $this.options[i].option_content;
            batch_saved += '\n'
        }

        $('#batch_option').find('textarea').val(batch_saved);

        setTimeout(function(){

            remove_icon.on('click', function(event){
                self.closeEditor(event, curtain)
            });
            cancel.on('click', function(event){
                self.closeEditor(event, curtain)
            });
            confirm.on('click', function(event){

                function pushOption(){
                    let abc = $this.pushOption();
                    console.log(abc)
                }

                setTimeout(function(){
                    let batch = $('#batch_option').find('textarea').val().split('\n');
                    for (let i = 0; i < batch.length; i++){
                        if ($this.options[i]){
                            $this.options[i].option_content = batch[i]
                        } else {
                            let option = functions.pushOption($this.options);
                            option.option_content = batch[i]
                        }
                    }
                },0);
                self.closeEditor(event, curtain)
            });
            container.on('click', self.preventClose);
            curtain.on('click', function(event){
                self.closeEditor(event, curtain)
            });
        },0)
    },
    batchSubQuestion: function(event, $this){
        let self = $this,
            curtain = $(`
                <div class="rtf-curtain">
                    
                </div>
            `),
            container = $(`
                <div class="rtf-container">
                    
                </div>    
            `),
            header = $(`
                <div class="rtf-header">批量编辑子问题</div>
            `),
            remove_icon = $(`
                <span class="rtf-close glyphicon glyphicon-remove"></span>
            `),
            board = $(`
                <div id="batch_option">
                    <textarea></textarea>
                </div>
            `),
            footer = $(`
                <div class="rtf-footer">
                        
                </div>
            `),
            confirm = $(`
                <button class="rtf-confirm btn btn-default btn-sm">确认</button>
            `),
            cancel = $(`
                <button class="rtf-cancel btn btn-default btn-sm">取消</button>
            `);
        curtain.append(container);
        container.append(header)
            .append(remove_icon)
            .append(board)
            .append(footer);
        footer.append(confirm)
            .append(cancel);
        curtain.css('display','none');
        curtain.fadeIn(300);
        $('#root').append(curtain);
        let height_client = document.documentElement.clientHeight,
            height_container = parseInt(container.css('height'));
        container.css('top', (height_client - height_container) / 2);

        let batch_saved = '';

        for (let i = 0; i < $this.sub_questions.length; i++){
            batch_saved += $this.sub_questions[i].question_content;
            batch_saved += '\n'
        }

        $('#batch_option').find('textarea').val(batch_saved);

        setTimeout(function(){

            remove_icon.on('click', function(event){
                self.closeEditor(event, curtain)
            });
            cancel.on('click', function(event){
                self.closeEditor(event, curtain)
            });
            confirm.on('click', function(event){

                function pushOption(){
                    let abc = $this.pushOption();
                    console.log(abc)
                }

                setTimeout(function(){
                    let batch = $('#batch_option').find('textarea').val().split('\n');
                    for (let i = 0; i < batch.length; i++){
                        if ($this.sub_questions[i]){
                            $this.sub_questions[i].question_content = batch[i]
                        } else {
                            let question = functions.pushSubQuestion($this.sub_questions);
                            question.question_content = batch[i]
                        }
                    }
                },0);
                self.closeEditor(event, curtain)
            });
            container.on('click', self.preventClose);
            curtain.on('click', function(event){
                self.closeEditor(event, curtain)
            });
        },0)
    },
    settingOptions: function(event, $this){
        let self = $this,
            curtain = $(`
                <div class="rtf-curtain" id="option_settings">
                    
                </div>
            `),
            container = $(`
                <div class="rtf-container">
                    
                </div>    
            `),
            header = $(`
                <div class="rtf-header">选项设置</div>
            `),
            remove_icon = $(`
                <span class="rtf-close glyphicon glyphicon-remove"></span>
            `),
            board = $(`
                <div id="setting-board">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th v-for="option in options">{{ option.option_content }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>默认选中</th>
                                <td v-for="option in options">
                                    <input type="radio" name="checked" :checked="option.checked" @change="setChecked($event, option)">
                                </td>
                            </tr>
                            <tr>
                                <th>选项互斥</th>
                                <td v-for="option in options">
                                    <input type="radio" name="mutex" :checked="option.mutex" @change="setMutex($event, option)" :disabled="type==='choice' || type==='score' || type==='pictures'">
                                </td>
                            </tr>
                            <tr>
                                <th>其他</th>
                                <td v-for="option in options">
                                    <input type="checkbox" name="blank" :checked="option.blank" @change="setBlank($event, option)">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `),
            footer = $(`
                <div class="rtf-footer">
                        
                </div>
            `),
            confirm = $(`
                <button class="rtf-confirm btn btn-default btn-sm">确认</button>
            `),
            cancel = $(`
                <button class="rtf-cancel btn btn-default btn-sm">取消</button>
            `);
        curtain.append(container);
        container.append(header)
            .append(remove_icon)
            .append(board)
            .append(footer);
        footer.append(confirm)
            .append(cancel);
        $('#root').append(curtain);
        let height_client = document.documentElement.clientHeight,
            height_container = parseInt(container.css('height'));
        container.css('top', (height_client - height_container) / 2);

        let options = JSON.parse(JSON.stringify($this.options)),
            settings = new Vue({
            el: '#setting-board',
            data: {
                type: $this.type,
                options: options
            },
            methods: {
                setChecked: function(event,option){
                    event.stopPropagation();
                    for (let i = 0; i < this.options.length; i++){
                        if (this.options[i] === option){
                            this.options[i].checked = true
                        } else {
                            this.options[i].checked = false
                        }
                    }
                },
                setMutex: function(event,option){
                    event.stopPropagation();
                    for (let i = 0; i < this.options.length; i++){
                        if (this.options[i] === option){
                            this.options[i].mutex = true
                        } else {
                            this.options[i].mutex = false
                        }
                    }
                },
                setBlank: function(event,option){
                    event.stopPropagation();
                    option.blank = $(event.currentTarget).prop('checked')
                }
            }
        });
        curtain.css('display','none');
        curtain.fadeIn(300);

        setTimeout(function(){

            remove_icon.on('click', function(event){
                self.closeEditor(event, curtain, [settings])
            });
            cancel.on('click', function(event){
                self.closeEditor(event, curtain, [settings])
            });
            confirm.on('click', function(event){

                setTimeout(function(){
                    $this.options = options
                },0);
                self.closeEditor(event, curtain, [settings])
            });
            container.on('click', self.preventClose);
            curtain.on('click', function(event){
                self.closeEditor(event, curtain, [settings])
            });
        },0)
    },
    deleteOption: function(target, option, options){
        if (options.length > 1){
            $(target).fadeOut(200, function(){
                setTimeout(function(){
                    $(target).show();
                    options.splice(options.indexOf(option),1)
                },0)
            });
        }
    },
    stretch_recommend: function($this){
        $this.recommend_stretched = !$this.recommend_stretched
    },
    activeUpload: function(event){
        $(event.currentTarget).find('input').click()
    },
    changeOptionUrl: function(event, option){
        option.option_url = $(event.currentTarget).val();
        if (option.option_url){
            let form = option.option_url.substring(option.option_url.lastIndexOf(".")).toLowerCase();
            if( !form.match(/.png|.jpg|.jpeg/) ) {
                alerting.alertAntoRemove('\'上传错误,文件格式必须为：png/jpg/jpeg\'','#f56c6c');
            } else {
                option.picture_path = window.URL.createObjectURL(event.currentTarget.files[0])
            }
        } else {
            option.option_url = '点击添加图片'
        }
    },
    switchPage: function($this,page){
        $this.status.page = page;
        console.log(page);
        console.log(page === $this.status.page)
    },
    previousPage: function($this){

    },
    nextPage: function($this){

    },
    appendPage: function($this){
        let last = $this.status.page_array.length + 1;
        $this.status.page_array.push(last);
        $this.status.page = last
    },
    deletePage: function($this, page){
        if ($this.status.page_array.length > 1){
            let index = $this.status.page_array.indexOf(page),
                to_show;
            if (index > 0){
                to_show = index
            } else {
                to_show = index + 1
            }
            $this.status.page_array.splice(index, 1);
            $this.status.page = to_show;
            for (let i = 0; i < $this.questions.length; i++){
                if ($this.questions[i].page === index + 1){
                    $this.questions[i].config.exist = false
                } else if ($this.questions[i].page > index + 1){
                    $this.questions[i].page -= 1
                }
            }
            for (let i = 0; i < $this.status.page_array.length; i++){
                if ($this.status.page_array[i] > index + 1){
                    $this.status.page_array[i] -= 1
                }
            }
        }
    },
    showEnd: function($this){
        $this.status.page = 'end'
    },
    triggerCollect: function(event,$this){
        event.stopPropagation();
        event.preventDefault();
        let collected = $this.config.collected,
            to_send = {};

        $.extend(true,to_send,$this._data);

        to_send.editing && delete(to_send.editing);
        to_send.recommend_stretched && delete(to_send.recommend_stretched);
        to_send.site_questions && delete(to_send.site_questions);
        to_send.config.func_display && delete(to_send.config.func_display);
        to_send.config.neck && delete(to_send.config.neck);
        to_send.config.neck_initial && delete(to_send.config.neck_initial);
        if (to_send.sub_questions){
            for (let j = 0; j < to_send.sub_questions.length; j++){
                delete(to_send.sub_questions[j].scroll_initial);
                delete(to_send.sub_questions[j].scroll_open);
            }
        }
        if (to_send.options){
            for (let j = 0; j < to_send.options.length; j++){
                delete(to_send.options[j].option_addition);
                delete(to_send.options[j].scroll_initial);
                delete(to_send.options[j].scroll_open);
            }
        }

        // $.ajax({
        //     url: '',
        //     type: 'post',
        //     contentType: 'application/json;charset=utf-8',
        //     dataType: 'json',
        //     data: JSON.stringify({
        //         usrname: '',
        //         collected: collected,
        //         question: to_send
        //     }),
        //     async: true,
        //     success: function(d){
        //         if (d[0].result > 0){
                    $this.config.collected = !collected;
        //             alerting.alertAntoRemove('收藏成功','#00dbff')
        //         } else {
        //             alerting.alertAntoRemove('收藏未成功','#f56c6c')
        //         }
        //     },
        //     error: function(e){
        //         console.log(e);
        //         alerting.alertAntoRemove('网络错误','#f56c6c')
        //     }
        // })
    },
    deleteItem: function(event, item){
        event.stopPropagation();
        item.config.exist = false;
    }
};

export default functions;
import alerting from './alerting.js';
import workspace from '../design/workspace.js';

const functions = {
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
    save: function($this){
        $.ajax({
            url: '',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                survey_id: $this.survey_id,
                survey_name: $this.survey_name,
                survey_content: $this.survey_content
            }),
            async: true,
            success: function(data){
                console.log(data);
                if (data[0].result > 0){
                    alerting.alertAntoRemove('保存成功','#00dbff')
                } else {
                    alerting.alertAntoRemove('保存失败','#f56c6c')
                }
            },
            error: function(error){
                console.log(error);
                alerting.alertAntoRemove('保存失败','#f56c6c')
            }
        })
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
        event.preventDefault();
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
    activeShift: function(event, $this){
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
                    let index_before = workspace.questions[workspace.questions.mapping[insert_before.attr('id').match(/[A-z]*(\d*)/)]].index;
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
                        let index_after = workspace.questions[workspace.questions.mapping[insert_after.attr('id').match(/[A-z]*(\d*)/)]].index;
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
                        let index_after = insert_before.attr('index');
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
    autoAppendOption: function(event,$this,option){
        if ($this.options.indexOf(option) === $this.options.length - 1){
            functions.pushOption($this.options)
        }
    },
    switchFunc: function(event, $this){
        $this.config.func_display = !$this.config.func_display;
    },
    pushOption: function(options){
        var id = 0,index,option;
        for (let i = 0; i < options.length; i++){
            if (options[i].option_id > id){
                id = options[i].id
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
        $this.stretch_recommend = !$this.stretch_recommend
    }
};

export default functions;
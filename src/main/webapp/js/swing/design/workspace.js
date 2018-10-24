import initial from '../common/initial-survey.js';
import functions from '../common/functions.js';
import alerting from '../common/alerting.js';
import templates from './item-template.js';
import toolbar from './toolbar.js';

function appendItem($this,event,level,type,id){

    if (type === 'paging'){
        functions.appendPage($this);
        return
    }

    let container = $('#items'),
        item = $(templates[level][type].template),
        $this_data,
        $this_methods = templates[level][type].methods,
        watcher_part,
        watcher,
        $this_vue,
        page = $this.status.page,
        breaking = $this.status.break;

    if (id !== undefined){
        let index = $this.questions.mapping[id];
        $this_data = $this.questions[index];
        $this_data.type = type;
        $this_vue = $this.vues[index];
    } else {
        let last_number_prefix = '',
            last_number_integer = '';

        if ($this.questions[0]){
            let last_index = -1,
                last_number;
            for (let i = 0; i < $this.questions.length; i++){
                if ($this.questions[i].index > last_index){
                    last_index = $this.questions[i].index;
                    last_number = $this.questions[i].number
                }
            }
            last_number_prefix = last_number.match(/([A-z]*)\d*/)[1];
            last_number_integer = parseInt(last_number.match(/[A-z]*(\d*)/)[1]);
        }

        $this_data = $this.questions.push(JSON.parse(JSON.stringify(templates[level][type].data)));
        if (templates[level][type].watch){
            watcher_part = templates[level][type].watch;
        }
        $this_data.number = last_number_integer ? last_number_prefix + (last_number_integer + 1) : '1';
        $this_data.site_questions = $this.questions;
        $this_data.index = $this.questions.length;
        $this_data.numbering = false;
        $this_data.config.page = $this_data.config.page_now = $this_data.page = page;
        $this_data.config.break = breaking;
    }
    item.attr('id', 'item-' + $this_data.id);
    if (id !== undefined){
        let to_replace = $('#item-' + id);
        item.insertBefore(to_replace);
        to_replace.remove();
        to_replace = null
    } else {
        container.append(item);
    }
    watcher = {
        'id': {
            handler: function(){
                // $this.save()
            },
            deep: true
        },
        'number': {
            handler: function(){
                $this.save('question',$this_data.id)
            },
            deep: true
        },
        'name': {
            handler: function(){
                $this.save('question',$this_data.id)
            },
            deep: true
        },
        'remark': {
            handler: function(){
                $this.save('question',$this_data.id)
            },
            deep: true
        },
        'type': {
            handler: function(){
                $this.save('question',$this_data.id)
            },
            deep: true
        },
        'options': {
            handler: function(){
                $this.save('question',$this_data.id)
            },
            deep: true
        },
        'config': {
            handler: function(){
                $this.save('question',$this_data.id)
            },
            deep: true
        },
        'config.recommend.recommended': {
            handler: function(value){
                $this.recommend_stretched = false;
                if (value){
                    $this.recommend.bool = true
                }
            },
            deep: true
        },
        'config.the_class': function(value){
            if (this.type === 'matrix'){
                for (let i = 0; i < this.sub_questions.length; i++){
                    this.sub_questions.the_class = value
                }
            }
        },
        'config.mode': function(value){
            let id = 'map-' + $this.id;

        }
    };
    if (watcher_part){
        for (let k in watcher_part){
            watcher[k] = watcher_part[k]
        }
    }

    $this_vue = new Vue({
        el: '#item-' + $this_data.id,
        data: $this_data,
        methods: $this_methods,
        watch: watcher,
        mounted: function(){
            $this.E = window.wangEditor;
            if (type === 'geolocation'){
                this.initialDefault();
            }
        }
    });
    $this_vue.id = $this_data.id;
    if (id === undefined){
        $this.vues.push($this_vue);
    }
    $this.save('question',$this_data.id);
    document.getElementById('item-' + $this_data.id).scrollIntoView(false)
}

const workspace = new Vue({
    el: '#workspace',
    data: {
        usr_email: initial.usr_email,//登录邮箱
        survey_id: initial.survey_id,//问卷ID
        sub_id: initial.survey_id,
        survey_number: initial.survey_number,//问卷编号
        survey_name: initial.survey_name,//问卷名称
        survey_remark: initial.survey_remark,
        logic: {
            display_logic: [{
                conditions: [{
                    id: '',
                    type: '',
                    sub_questions_now: {0:{}},
                    options_now: [{}],
                    sub_question: {},
                    option: '',
                    judgement: ''
                }],
                target: {}
            }],
            jump_logic: [{
                conditions: [{
                    id: '',
                    type: '',
                    sub_questions_now: {0:{}},
                    options_now: [{}],
                    sub_question: {},
                    option: '',
                    judgement: ''
                }],
                target: {}
            }]
        },
        saved_logic: {
            display_logic: [{
                conditions: [{
                    id: '',
                    type: '',
                    sub_questions_now: {0:{}},
                    options_now: [{}],
                    sub_question: {},
                    option: '',
                    judgement: ''
                }],
                target: {}
            }],
            jump_logic: [{
                conditions: [{
                    id: '',
                    type: '',
                    sub_questions_now: {0:{}},
                    options_now: [{}],
                    sub_question: {},
                    option: '',
                    judgement: ''
                }],
                target: {}
            }]
        },
        style: {
            theme_array: [
                {
                    id: 9,
                    checked: false,
                    class_name: 'theme-9',
                    config: {
                        logo: '',
                        background: '',
                        color_head: '',
                        color_background: '',
                        color_font: ''
                    }
                },{
                    id: 8,
                    checked: false,
                    class_name: 'theme-8',
                    config: {
                        logo: '',
                        background: '',
                        color_head: '',
                        color_background: '',
                        color_font: ''
                    }
                },{
                    id: 7,
                    checked: true,
                    class_name: 'theme-7',
                    config: {
                        logo: '',
                        background: '',
                        color_head: '',
                        color_background: '',
                        color_font: ''
                    }
                },{
                    id: 6,
                    checked: false,
                    class_name: 'theme-6',
                    config: {
                        logo: '',
                        background: '',
                        color_head: '',
                        color_background: '',
                        color_font: ''
                    }
                },{
                    id: 5,
                    checked: false,
                    class_name: 'theme-5',
                    config: {
                        logo: '',
                        background: '',
                        color_head: '',
                        color_background: '',
                        color_font: ''
                    }
                },{
                    id: 4,
                    checked: false,
                    class_name: 'theme-4',
                    config: {
                        logo: '',
                        background: '',
                        color_head: '',
                        color_background: '',
                        color_font: ''
                    }
                },{
                    id: 3,
                    checked: false,
                    class_name: 'theme-3',
                    config: {
                        logo: '',
                        background: '',
                        color_head: '',
                        color_background: '',
                        color_font: ''
                    }
                },{
                    id: 2,
                    checked: false,
                    class_name: 'theme-2',
                    config: {
                        logo: '',
                        background: '',
                        color_head: '',
                        color_background: '',
                        color_font: ''
                    }
                },{
                    id: 1,
                    checked: false,
                    class_name: 'theme-1',
                    config: {
                        logo: '',
                        background: '',
                        color_head: '',
                        color_background: '',
                        color_font: ''
                    }
                },{
                    id: 0,
                    checked: false,
                    class_name: 'theme-0',
                    config: {
                        logo: '',
                        background: '',
                        color_head: '',
                        color_background: '',
                        color_font: ''
                    }
                }
            ],
            checked_theme: {
                id: 7,
                checked: true,
                class_name: 'theme-7',
                config: {
                    logo: '',
                    background: '',
                    color_head: '',
                    color_background: '',
                    color_font: ''
                }
            },
            checked_theme_name: 7
        },
        vues: new functions.NewArray(),
        questions: new functions.NewArray(),
        item_bank: [
            {
                id: 1,
                name: '某题0001',
                type: '',
            },{
                id: 2,
                name: '某题0002',
                type: '',
            },{
                id: 3,
                name: '某题0003',
                type: '',
            },{
                id: 4,
                name: '某题0004',
                type: '',
            },{
                id: 5,
                name: '某题0005',
                type: '',
            },{
                id: 6,
                name: '某题0006',
                type: '',
            },
        ],
        status: {
            page: 1,
            page_array: [1],
            break: 1,
            break_array: [1],
            citing: false,
            initial: true,
            left_side: 'item-types',
            editing: {
                proto: {},
                id: '',
                type: '',
                saved_type: '',
                class: '',
                options: [],
                option_indexes: [],
                option_scores: [],
                config: {
                    exist: true,
                    collected: false,
                    neck: false,
                    neck_initial: true,
                    func_display: false,
                    required: true,
                    type: '',
                    class: '',
                    restrict: 'none',
                    number: 'none',
                    layout: {
                        orientation: 'portrait',
                        cols_number: 1,
                        width_percent: '100%'
                    },
                    random_option: 'fixed',
                    min_option: 1,
                    max_option: 1,
                    min_word: 1,
                    max_word: 1,
                    post: '',
                    matrix_recommend: false,
                    recommend_question: '',
                    random_branch: false,
                    random_option_matrix: false,
                    transpose: false,
                    style: '',
                    min_score: 1,
                    max_score: 1,
                    credit: '',
                    left_label: '',
                    right_label: '',
                    total: 0,
                    recommend: {
                        bool: false,
                        recommended: ''
                    }
                }
            }
        }
    },
    methods: {
        E: function(){},
        save: function(key,id){
            functions.save(this, key,id)
        },
        changeContent: function(target, key){
            functions.changeContent(target, this, key)
        },
        switchItemType: function(event, number){
            let container = $('#item_type'),
                first = $('#common_type'),
                second = $('#advanced_type'),
                third = $('#quick_type');
            switch (number){
                case 1:
                    if(!second.is(':animated')){
                        second.animate({top: '390px'},300);
                        third.animate({top: '390px'},300);
                    }
                    break;
                case 2:
                    if(!second.is(':animated')){
                        second.animate({top: '0px'},300);
                        third.animate({top: '390px'},300);
                    }
                    break;
                case 3:
                    if(!second.is(':animated')){
                        second.animate({top: '0px'},300);
                        third.animate({top: '0px'},300);
                    }
                    break;
            }
        },
        switchStyleBar: function(event, number){
            let container = $('#style'),
                first = $('#theme'),
                second = $('#customize'),
                third = $('#more-setting');
            switch (number){
                case 1:
                    if(!second.is(':animated')){
                        second.animate({top: '390px'},300);
                        third.animate({top: '390px'},300);
                    }
                    break;
                case 2:
                    if(!second.is(':animated')){
                        second.animate({top: '0px'},300);
                        third.animate({top: '390px'},300);
                    }
                    break;
                case 3:
                    if(!second.is(':animated')){
                        second.animate({top: '0px'},300);
                        third.animate({top: '0px'},300);
                    }
                    break;
            }
        },
        closeEditor: function(event,curtain,employer){
            functions.closeEditor(event,curtain,employer);
        },
        preventClose: function(event){
            functions.preventClose(event);
        },
        rtfEdit: function(event){
            functions.rtfEdit(event, this)
        },
        insertPicture: function(){

        },
        triggerCiting: function(){
            this.status.citing = !this.status.citing;
            if (this.status.initial) {
                this.status.initial = false;
                let self = this;
                this.triggerCiting = function(){
                    self.status.citing = !self.status.citing;
                }
            }
        },
        citeItem: function(item){

        },
        deleteItem: function(item){

        },
        changeTranspose: function(event){
            this.status.editing.config.transpose = !this.status.editing.config.transpose
        },
        changeConfigRequired: function(){
            this.status.editing.config.required = !this.status.editing.config.required
        },
        changeMatrixRecommend: function(target){
            this.status.editing.config.matrix_recommend = $(target).prop('checked')
        },
        changeRandomBranch: function(target){
            this.status.editing.config.random_branch = $(target).prop('checked')
        },
        changeRandomOptionMatrix: function(target){
            this.status.editing.config.random_option_matrix = $(target).prop('checked')
        },
        editLogic: function(event,entry){
            functions.editLogic(event,this,entry)
        },
        appendItem: function($event, level, type){
            appendItem(this, $event, level, type);
        },
        changeItemType: function(){
            let this_question = this.status.editing.proto,
                value = this.status.editing.type,
                old = this.status.editing.saved_type;
            if (old==='choice'){
                if (value==='check'){
                    if (this_question.config.layout.orientation === 'select'){
                        this_question.config.layout.orientation = 'portrait'
                    }
                    for (let i = 0; i < this_question.options.length; i++){
                        this_question.options[i].mutex = false
                    }
                }
            }
            if (value && old && value !== old){
                appendItem(this,null,'common','check',this.status.editing.id);
                this.status.editing.saved_type = this.status.editing.type
            }
        },
        switchPage(page){
            functions.switchPage(this, page)
        },
        appendPage: function(){
            functions.appendPage(this)
        },
        deletePage: function(page){
            functions.deletePage(this, page)
        },
        showEnd: function(){
            functions.showEnd(this)
        },
        activeShiftOutline: function(event,question){
            functions.activeShiftOutline(event,question,this)
        },
        pickTheme: function(theme){
            for (let i = 0; i < this.style.theme_array.length; i++){
                this.style.theme_array[i].checked = false
            }
            theme.checked = true;
            // this.style.checked_theme = theme;
            // this.style.checked_theme_name = theme.id;
        },
        switchNumbering: function(event,item){
            item.numbering = !item.numbering;
            if (item.numbering){
                $(event.target).parent().find('.numbering')[0].focus()
            }
            event.stopPropagation();
        }
    },
    mounted: function(){
        let self = this;
        self.E = window.wangEditor;

        var filearr = [];
        var myfile = document.getElementById('logo-upload');
        myfile.onchange = function(){
            var files = self.files;
            for(var i = 0;i<files.length;i++){
                filearr.push(files[i]);
            }

            var formData = new FormData();
            for(var i =0;i<filearr.length;i++){    //提交时，我们把filearr中的数据遍历一遍
                formData.append("upfile[]", filearr[i]); //用append添加到formData中，就得用户最终要提交的图片了，多张的话[]必须
            }
            $.ajax({
                url: functions.realPath + '',
                type: "POST",
                data:formData,
                cache:false,         //不设置缓存
                processData: false,  // 不处理数据
                contentType: false   // 不设置内容类型
            });
        };

        $('.pick-color').paigusu({
            color : '#85c8ff'//初始色  支持两种配置方案
            //		,color : '42,0,255'
        },function(event,obj){
            console.log(event);
            console.log(obj);
            // $(event).css('color','#' + obj.hex)
            // $('.workspace').addClass('customize');
            let str = 'rgba(' + obj.rgba + ')';

            self.style.checked_theme_name = 'customize';
            self.style.checked_theme.id = 'customize';
            self.style.checked_theme.class_name = 'customize';
            self.style.checked_theme.config.color_background = str;

            // setTimeout(function(){
            //     $('.theme-customize').css('background-color', str);
            // },0)

            // checked_theme: {
            //     id: 7,
            //         checked: true,
            //         class_name: 'theme-7',
            //         config: {
            //         logo: '',
            //             background: '',
            //             color_head: '',
            //             color_background: '',
            //             color_font: ''
            //     }
            // },
            // checked_theme_name: 7
        });

        $('#style_picture').on('change', function(){
            let fileInput = document.getElementById("style_picture");
            let file = fileInput.files[0];
            //创建读取文件的对象
            let reader = new FileReader();
            //创建文件读取相关的变量
            let imgFile;
            //为文件读取成功设置事件
            reader.onload=function(e) {
                // alert('文件读取完成');
                imgFile = e.target.result;
                console.log(imgFile);
                // $('.workspace').addClass('customize');
                self.style.checked_theme_name = 'customize';
                self.style.checked_theme.id = 'customize';
                self.style.checked_theme.class_name = 'theme-customize';
                self.style.checked_theme.config.background = imgFile;

                setTimeout(function(){
                    $("#style_preview").attr('src',imgFile);
                    // $('.theme-customize').css('background-image', 'url(' + imgFile + ')')
                },0)
            };

            //正式读取文件
            reader.readAsDataURL(file);
        });


        // let reads= new FileReader(),
        //     f=document.getElementById('style_picture').files[0];
        // reads.readAsDataURL(f);
        // reads.onload=function (e) {
        //     document.getElementById('style_preview').src=this.result;
        // };
    },
    watch: {
        'status.editing.proto': {
            handler: function(value,old){
                this.status.editing.id = value.id;
                this.status.editing.type = this.status.editing.saved_type = this.status.editing.config.type = value.type;
                for (let k in value.config){
                    this.status.editing.config[k] = value.config[k]
                }
                if (value.options){
                    this.status.editing.options = JSON.parse(JSON.stringify(value.options));
                    this.status.editing.option_indexes = [];
                    this.status.editing.option_scores = [];
                    for (let j = 1; j <= value.options.length; j++){
                        this.status.editing.options.push(value.options[j-1]);
                        this.status.editing.option_indexes.push(j);
                        if (value.type === 'score'){
                            this.status.editing.option_scores.push(value.options[j-1].score);
                        }
                    }
                }
                // if (value.type === 'score'){
                //     let l = value.options.length;
                //     this.status.editing.config.layout.orientation = 'orientation';
                //     this.status.editing.config.layout.cols_number = l;
                //     for (let i = 0; i < l; i++){
                //         this.status.editing.option_scores.push(i + 1)
                //     }
                // }
            },
            deep: true
        },
        // 'status.editing.id': function(value,old){
        //     if (value){
        //         let options;
        //         for (let i = 0,l = this.questions.length; i < l; i++){
        //             if (this.questions[i].id === parseInt(value)){
        //                 let this_question = this.questions[i];
        //                 this.status.editing.type = this.status.editing.config.type = this_question.type;
        //
        //                 if (this_question.options){
        //                     options = this_question.options;
        //                     this.status.editing.options = [];
        //                     this.status.editing.option_indexes = [];
        //                     for (let j = 1; j <= options.length; j++){
        //                         this.status.editing.options.push(options[j-1]);
        //                         this.status.editing.option_indexes.push(j);
        //                         if (this_question.type === 'score'){
        //                             this.status.editing.option_scores.push(options[j-1].score);
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // },
        'status.page': function(value){
            // if (this.status.editing.proto.id){
            //     this.status.editing.proto.config.page_now = value
            // }
            for (let i = 0; i < this.questions.length; i++){
                this.questions[i].config.page_now = value
            }
        },
        'status.break': function(value){
            for (let i = 0; i < this.questions.length; i++){
                this.questions[i].config.break_now = value
            }
        },
        'status.editing.config': {
            handler: function(value, old){
                // if (value.layout.orientation === 'portrait'){
                //     value.layout.cols_number = 1
                // } else if (value.layout.orientation === 'select'){
                //
                // }
                // let this_config = this.questions[this.questions.mapping[this.status.editing.id]].config;
                let this_config = this.status.editing.proto.config;
                for (let k in this_config){
                    this_config[k] = value[k]
                }
                // this.questions[this.questions.mapping[this.status.editing.id]].config = value
            },
            deep: true
        },
        // 'status.editing.type': function(value,old){
        //     let this_question = this.status.editing.proto;
        //     if (old==='choice'){
        //         if (value==='check'){
        //             if (this_question.config.layout.orientation === 'select'){
        //                 this_question.config.layout.orientation = 'portrait'
        //             }
        //             for (let i = 0; i < this_question.options.length; i++){
        //                 this_question.options[i].mutex = false
        //             }
        //         }
        //     }
        //     if (value && old && value !== old){
        //         appendItem(this,null,'common','check',this.status.editing.id)
        //     }
        // },
        'status.editing.config.layout': {
            handler: function(value,old){
                if (value.orientation === 'horizon'){
                    value.width_percent = parseInt(100 / value.cols_number) + '%'
                } else {
                    value.cols_number = 1;
                    value.width_percent = '100%'
                }
            },
            deep: true
        },
        'status.editing.config.credit': function(value,old){
            switch (value){
                case '满意度':
                    this.editing.config.left_label = '非常不满意';
                    this.editing.config.right_label = '非常满意';
                    break;
                case '认同度':
                    this.editing.config.left_label = '非常不认同';
                    this.editing.config.right_label = '非常认同';
                    break;
                case '重要度':
                    this.editing.config.left_label = '非常不重要';
                    this.editing.config.right_label = '非常重要';
                    break;
                case '愿意度':
                    this.editing.config.left_label = '非常不愿意';
                    this.editing.config.right_label = '非常愿意';
                    break;
                case '符合度':
                    this.editing.config.left_label = '非常不符合';
                    this.editing.config.right_label = '非常符合';
                    break;
            }
        },
        'survey_id': function(){
            // this.save()
        },
        'survey_number': function(){
            // this.save()
        },
        'survey_name': function(){
            this.save('survey_name')
        },
        'survey_remark': function(){
            this.save('survey_remark')
        },
        'saved_logic': {
            handler: function(){
                if (this.saved_logic.jump_logic.length && this.saved_logic.display_logic.length){
                    this.save('saved_logic')
                }
            },
            deep: true
        },
        'style': {
            handler: function(){
                let checked;
                for (let i = 0; i < this.style.theme_array.length; i++){
                    if (this.style.theme_array[i].checked === true){
                        checked = this.style.theme_array[i]
                    }
                }
                if (this.style.checked_theme_name !== 'customize'){
                    this.style.checked_theme_name = checked.id;
                    this.style.checked_theme = checked
                }

                if (this.style.checked_theme.config.color_background){
                    $('.workspace').css('background-color', this.style.checked_theme.config.color_background)
                }
                if (this.style.checked_theme.config.background){
                    $('.workspace').css('background-image', 'url(' + this.style.checked_theme.config.background + ')')
                }

                this.save('style')
            },
            deep: true
        },
        'status': {
            handler: function(){
                // this.save()
            },
            deep: true
        }
    },
    computed: {

    }
});

export default workspace;
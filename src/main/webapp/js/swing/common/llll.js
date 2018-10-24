var question = [
    {//单选
        id: 0,//id
        sub_id: '',//sub_id
        index: 1,//序号
        page: 1,//所在页面
        break: 1,//所在小节
        number: 's1',//题号
        name: '',//题目标题
        remark: '',//题目备注
        type: 'choice',//题目类型
        logic: {jump: [], display: []},//逻辑设置
        editing: false,//没用
        site_questions: [],//没用
        options: [{//选项
            option_id: 0,//选项id
            option_index:1,//选项序号
            option_code: '',//选项编码
            option_content: '第一项',//选项文本
            checked: false,//默认选中
            mutex: false,//互斥
            blank: false,//其他
            option_addition: ''//没用
        },{
            option_id: 2,
            option_index:2,
            option_code: '',
            option_content: '第二项',
            checked: false,
            mutex: false,
            blank: false,
            option_addition: ''
        }],
        // uuu: 0,
        recommend_stretched: false,//没用
        config: {//配置
            exist: true,//存在（未被删除）
            collected: false,//已被收藏
            page_now: 1,//当前页码
            required: true,//必答
            neck: false,//没用
            neck_initial: true,//没用
            func_display: false,//没用
            random_option: 'fixed',//选项随机
            layout: {//布局
                orientation: 'portrait',//方向
                cols_number: 1,//列数
                width_percent: '100%'//宽度
            },
            recommend: {//引用
                bool: false,//是否引用
                recommended: ''//所引用的题号
            }
        }
    },{//多选
        id: 0,
        sub_id: '',
        index: 1,
        page: 1,
        break: 1,
        number: 's1',
        name: '',
        remark: '',
        type: 'check',
        logic: {jump: [], display: []},
        editing: false,
        site_questions: [],
        options: [{
            option_id: 0,
            option_index:1,
            option_code: '',
            option_content: '第一项',
            checked: false,
            mutex: false,
            blank: false,
            option_addition: ''
        },{
            option_id: 2,
            option_index:2,
            option_code: '',
            option_content: '第二项',
            checked: false,
            mutex: false,
            blank: false,
            option_addition: ''
        }],
        // uuu: 0,
        recommend_stretched: false,
        config: {
            exist: true,
            collected: false,
            page_now: 1,
            required: true,
            neck: false,
            neck_initial: true,
            func_display: false,
            random_option: 'fixed',
            layout: {
                orientation: 'portrait',
                cols_number: 1,
                width_percent: '100%'
            },
            recommend: {
                bool: false,
                recommended: ''
            }
        }
    },{//填空
        id: 0,
        sub_id: '',
        index: 1,
        page: 1,
        break: 1,
        number: 's1',
        name: '填空题',
        remark: '',
        type: 'blank',
        logic: {jump: [], display: []},
        editing: false,
        site_questions: [],
        sub_questions: [{//子问题
            question_id: 0,//子问题id
            question_index: 1,//子问题序号
            question_content: '第一子问题',//子问题文本
        },{
            question_id: 1,
            question_index: 2,
            question_content: '第二子问题',
        }],
        recommend_stretched: false,
        config: {
            exist: true,
            collected: false,
            page_now: 1,
            required: true,
            neck: false,
            the_class: 'single',//填空类型
            neck_initial: true,
            func_display: false,
            layout: {
                orientation: 'portrait',
                cols_number: 1,
                width_percent: '100%'
            },
            recommend: {
                bool: false,
                recommended: ''
            },
            restrict: 'none',//内容限制
            number: '',
            min_word: '',
            max_word: '',
            post: '',
        }
    },{//矩阵题
        id: 0,
        sub_id: '',
        index: 1,
        page: 1,
        break: 1,
        number: 's1',
        name: '矩阵题',
        remark: '',
        type: 'matrix',
        logic: {jump: [], display: []},
        editing: false,
        site_questions: [],
        sub_questions: [{
            question_id: 0,
            question_index: 1,
            the_class: 'matrix_choice',//子问题类型
            question_content: '第一子问题',
            scroll_open: false,//没用
            scroll_initial: true//没用
        },{
            question_id: 1,
            question_index: 2,
            the_class: 'matrix_choice',
            question_content: '第二子问题',
            scroll_open: false,
            scroll_initial: true
        }],
        options: [{
            option_id: 0,
            option_index:1,
            option_code: '',
            option_content: '第一项',
            option_addition: '',
            scroll_open: false,
            scroll_initial: true
        },{
            option_id: 2,
            option_index:2,
            option_code: '',
            option_content: '第二项',
            option_addition: '',
            scroll_open: false,
            scroll_initial: true
        }],
        recommend_stretched: false,
        config: {
            exist: true,
            collected: false,
            page_now: 1,
            required: true,
            neck: false,
            the_class: 'matrix_choice',
            neck_initial: true,
            func_display: false,
            layout: {
                orientation: 'portrait',
                cols_number: 1,
                width_percent: '100%'
            },
            recommend: {
                bool: false,
                recommended: ''
            },
            restrict: 'none',
            number: '',
            min_word: '',
            max_word: '',
            post: '',
            random_branch: '',
            random_option_matrix: ''
        }
    },{//打分题
        id: 0,
        sub_id: '',
        index: 1,
        page: 1,
        break: 1,
        number: 's1',
        name: '',
        remark: '',
        type: 'score',
        logic: {jump: [], display: []},
        editing: false,
        site_questions: [],
        options: [{
            option_id: 0,
            option_index: 1,
            option_code: '',
            option_content: '1',
            checked: false,
            mutex: false,
            blank: false,
            option_addition: ''
        },{
            option_id: 1,
            option_index: 2,
            option_code: '',
            option_content: '2',
            checked: false,
            mutex: false,
            blank: false,
            option_addition: ''
        },{
            option_id: 2,
            option_index: 3,
            option_code: '',
            option_content: '3',
            checked: false,
            mutex: false,
            blank: false,
            option_addition: ''
        },{
            option_id: 3,
            option_index: 4,
            option_code: '',
            option_content: '4',
            checked: false,
            mutex: false,
            blank: false,
            option_addition: ''
        },{
            option_id: 4,
            option_index: 5,
            option_code: '',
            option_content: '5',
            checked: false,
            mutex: false,
            blank: false,
            option_addition: ''
        }],
        // uuu: 0,
        recommend_stretched: false,
        config: {
            exist: true,
            collected: false,
            page_now: 1,
            required: true,
            neck: false,
            neck_initial: true,
            func_display: false,
            layout: {
                orientation: 'horizon',
                cols_number: 5,
                width_percent: '20%'
            },
            recommend: {
                bool: false,
                recommended: ''
            },
            style: 'number',
            min_score: '',//最小分
            max_score: '',//最大分
            credit: 'satisfaction',//评价类型
            left_label: '非常不满意',//最左侧标语
            right_label: '非常满意'//最右侧标语
        }
    },{//排序题
        id: 0,
        sub_id: '',
        index: 1,
        page: 1,
        break: 1,
        number: 's1',
        name: '',
        remark: '',
        type: 'sort',
        logic: {jump: [], display: []},
        editing: false,
        site_questions: [],
        options: [{
            option_id: 0,
            option_index:1,
            option_code: '',
            option_content: '第一项',
            checked: false,
            mutex: false,
            blank: false,
            option_addition: ''
        },{
            option_id: 2,
            option_index:2,
            option_code: '',
            option_content: '第二项',
            checked: false,
            mutex: false,
            blank: false,
            option_addition: ''
        }],
        // uuu: 0,
        recommend_stretched: false,
        config: {
            exist: true,
            collected: false,
            page_now: 1,
            required: true,
            neck: false,
            neck_initial: true,
            func_display: false,
            layout: {
                orientation: 'portrait',
                cols_number: 1,
                width_percent: '100%'
            },
            recommend: {
                bool: false,
                recommended: ''
            },
            style: 'number',
            min_score: '',
            max_score: '',
            credit: 'satisfaction'
        }
    },{//图片选择题
        id: 0,
        sub_id: '',
        index: 1,
        page: 1,
        break: 1,
        number: 's1',
        name: '',
        remark: '',
        type: 'pictures',
        logic: {jump: [], display: []},
        editing: false,
        site_questions: [],
        options: [{
            option_id: 0,
            option_index:1,
            option_code: '',
            option_content: '第一项',
            option_url: '点击添加图片',//显示的图片路径
            picture_path: '',//保存的图片路径
            checked: false,
            mutex: false,
            blank: false,
            option_addition: ''
        },{
            option_id: 2,
            option_index:2,
            option_code: '',
            option_content: '第二项',
            option_url: '点击添加图片',
            picture_path: '',
            checked: false,
            mutex: false,
            blank: false,
            option_addition: ''
        }],
        // uuu: 0,
        recommend_stretched: false,
        config: {
            exist: true,
            collected: false,
            page_now: 1,
            required: true,
            neck: false,
            neck_initial: true,
            func_display: false,
            layout: {
                orientation: 'portrait',
                cols_number: 1,
                width_percent: '100%'
            },
            recommend: {
                bool: false,
                recommended: ''
            },
            style: 'number',
            min_score: '',
            max_score: '',
            credit: 'satisfaction'
        }
    },{//描述说明题
        id: 0,
        sub_id: '',
        index: 1,
        page: 1,
        break: 1,
        number: 's1',
        name: '',
        remark: '',
        type: 'description',
        logic: {jump: [], display: []},
        editing: false,
        site_questions: [],
        options: [{
            option_id: 0,
            option_index:1,
            option_code: '',
            option_content: '第一项',
            checked: false,
            mutex: false,
            blank: false,
            option_addition: ''
        },{
            option_id: 2,
            option_index:2,
            option_code: '',
            option_content: '第二项',
            checked: false,
            mutex: false,
            blank: false,
            option_addition: ''
        }],
        // uuu: 0,
        recommend_stretched: false,
        config: {
            exist: true,
            collected: false,
            page_now: 1,
            neck: false,
            neck_initial: true,
            func_display: false,
            layout: {
                orientation: 'portrait',
                cols_number: 1,
                width_percent: '100%'
            },
            recommend: {
                bool: false,
                recommended: ''
            },
            style: 'number',
            min_score: '',
            max_score: '',
            credit: 'satisfaction'
        }
    },{//文件题
        id: 0,
        sub_id: '',
        index: 1,
        page: 1,
        break: 1,
        number: 's1',
        name: '文件上传题',
        remark: '',
        type: 'upload',
        editing: false,
        config: {
            exist: true,
            collected: false,
            page_now: 1,
            required: true,
            neck: false,
            restrict: {
                all: true,
                image: {
                    all: true,
                    gif: true,
                    png: true,
                    jpg: true,
                    jpeg: true,
                    bmp: true
                },
                document: {
                    all: true,
                    doc: true,
                    docx: true,
                    pdf: true,
                    xls: true,
                    xlsx: true,
                    ppt: true,
                    pptx: true,
                    txt: true
                },
                compressed: {
                    all: true,
                    rar: true,
                    zip: true,
                    gzip: true
                }
            },
            class: 'single',
            neck_initial: true,
            func_display: false,
            number: '',
            min_word: '',
            max_word: '',
            post: '',
        }
    },{//地理位置题
        id: 0,
        sub_id: '',
        index: 1,
        page: 1,
        break: 1,
        number: 's1',
        name: '定位题',
        remark: '',
        type: 'geolocation',
        logic: {jump: [], display: []},
        editing: false,
        recommend_stretched: false,
        config: {
            exist: true,
            collected: false,
            page_now: 1,
            required: true,
            neck: false,
            neck_initial: true,
            func_display: false,
            map_obj: {}
        }
    },{//联动题
        id: 0,
        sub_id: '',
        index: 1,
        page: 1,
        break: 1,
        number: 's1',
        name: '',
        remark: '',
        type: 'linkage',
        logic: {jump: [], display: []},
        editing: false,
        sub_question: [{//下拉框
            question_id: 0,
            question_index: 1,
            options: [{//下拉框选项
                option_content: '',
                option_id: ''
            }],
        },{
            question_id: 1,
            question_index: 2,
            options: [{
                option_content: '',
                option_id: ''
            }]
        }],
        // uuu: 0,
        recommend_stretched: false,
        config: {
            exist: true,
            collected: false,
            page_now: 1,
            required: true,
            neck: false,
            neck_initial: true,
            func_display: false,
            random_option: 'fixed',
            layout: {
                orientation: 'portrait',
                cols_number: 1,
                width_percent: '100%'
            },
            recommend: {
                bool: false,
                recommended: ''
            }
        }
    },{//姓名题
        id: 0,
        sub_id: '',
        index: 1,
        page: 1,
        break: 1,
        number: 's1',
        name: '请输入您的姓名：',
        remark: '',
        type: 'name',
        logic: {jump: [], display: []},
        editing: false,
        site_questions: [],
        sub_questions: [{
            question_id: 0,
            question_index: 1,
            question_content: '第一子问题',
        }],
        recommend_stretched: false,
        config: {
            exist: true,
            collected: false,
            page_now: 1,
            required: true,
            neck: false,
            the_class: 'single',
            neck_initial: true,
            func_display: false,
            layout: {
                orientation: 'portrait',
                cols_number: 1,
                width_percent: '100%'
            },
            recommend: {
                bool: false,
                recommended: ''
            },
            restrict: 'none',
            number: '',
            min_word: '',
            max_word: '',
            post: '',
        }
    },{//性别题
        id: 0,
        sub_id: '',
        index: 1,
        page: 1,
        break: 1,
        number: 's1',
        name: '请选择您的性别：',
        remark: '',
        type: 'choice',
        logic: {jump: [], display: []},
        editing: false,
        site_questions: [],
        options: [{
            option_id: 0,
            option_index:1,
            option_code: '',
            option_content: '男性',
            checked: false,
            mutex: false,
            blank: false,
            option_addition: ''
        },{
            option_id: 2,
            option_index:2,
            option_code: '',
            option_content: '女性',
            checked: false,
            mutex: false,
            blank: false,
            option_addition: ''
        }],
        // uuu: 0,
        recommend_stretched: false,
        config: {
            exist: true,
            collected: false,
            page_now: 1,
            required: true,
            neck: false,
            neck_initial: true,
            func_display: false,
            random_option: 'fixed',
            layout: {
                orientation: 'portrait',
                cols_number: 1,
                width_percent: '100%'
            },
            recommend: {
                bool: false,
                recommended: ''
            }
        }
    },{//年龄题
        id: 0,
        sub_id: '',
        index: 1,
        page: 1,
        break: 1,
        number: 's1',
        name: '请输入您的年龄：',
        remark: '',
        type: 'name',
        logic: {jump: [], display: []},
        editing: false,
        site_questions: [],
        sub_questions: [{
            question_id: 0,
            question_index: 1,
            question_content: '第一子问题',
        }],
        recommend_stretched: false,
        config: {
            exist: true,
            collected: false,
            page_now: 1,
            required: true,
            neck: false,
            the_class: 'single',
            neck_initial: true,
            func_display: false,
            layout: {
                orientation: 'portrait',
                cols_number: 1,
                width_percent: '100%'
            },
            recommend: {
                bool: false,
                recommended: ''
            },
            restrict: 'none',
            number: '',
            min_word: '',
            max_word: '',
            post: '',
        }
    },{//工作单位题
        id: 0,
        sub_id: '',
        index: 1,
        page: 1,
        break: 1,
        number: 's1',
        name: '请输入您的工作单位：',
        remark: '',
        type: 'name',
        logic: {jump: [], display: []},
        editing: false,
        site_questions: [],
        sub_questions: [{
            question_id: 0,
            question_index: 1,
            question_content: '第一子问题',
        }],
        recommend_stretched: false,
        config: {
            exist: true,
            collected: false,
            page_now: 1,
            required: true,
            neck: false,
            the_class: 'single',
            neck_initial: true,
            func_display: false,
            layout: {
                orientation: 'portrait',
                cols_number: 1,
                width_percent: '100%'
            },
            recommend: {
                bool: false,
                recommended: ''
            },
            restrict: 'none',
            number: '',
            min_word: '',
            max_word: '',
            post: '',
        }
    },{//工作部门题
        id: 0,
        sub_id: '',
        index: 1,
        page: 1,
        break: 1,
        number: 's1',
        name: '请输入您的工作部门：',
        remark: '',
        type: 'name',
        logic: {jump: [], display: []},
        editing: false,
        site_questions: [],
        sub_questions: [{
            question_id: 0,
            question_index: 1,
            question_content: '第一子问题',
        }],
        recommend_stretched: false,
        config: {
            exist: true,
            collected: false,
            page_now: 1,
            required: true,
            neck: false,
            the_class: 'single',
            neck_initial: true,
            func_display: false,
            layout: {
                orientation: 'portrait',
                cols_number: 1,
                width_percent: '100%'
            },
            recommend: {
                bool: false,
                recommended: ''
            },
            restrict: 'none',
            number: '',
            min_word: '',
            max_word: '',
            post: '',
        }
    },{//地址题
        id: 0,
        sub_id: '',
        index: 1,
        page: 1,
        break: 1,
        number: 's1',
        name: '请输入您的地址：',
        remark: '',
        type: 'name',
        logic: {jump: [], display: []},
        editing: false,
        site_questions: [],
        sub_questions: [{
            question_id: 0,
            question_index: 1,
            question_content: '第一子问题',
        }],
        recommend_stretched: false,
        config: {
            exist: true,
            collected: false,
            page_now: 1,
            required: true,
            neck: false,
            the_class: 'single',
            neck_initial: true,
            func_display: false,
            layout: {
                orientation: 'portrait',
                cols_number: 1,
                width_percent: '100%'
            },
            recommend: {
                bool: false,
                recommended: ''
            },
            restrict: 'none',
            number: '',
            min_word: '',
            max_word: '',
            post: '',
        }
    },{//电子邮箱题
        id: 0,
        sub_id: '',
        index: 1,
        page: 1,
        break: 1,
        number: 's1',
        name: '请输入您的电子邮箱：',
        remark: '',
        type: 'name',
        logic: {jump: [], display: []},
        editing: false,
        site_questions: [],
        sub_questions: [{
            question_id: 0,
            question_index: 1,
            question_content: '第一子问题',
        }],
        recommend_stretched: false,
        config: {
            exist: true,
            collected: false,
            page_now: 1,
            required: true,
            neck: false,
            the_class: 'single',
            neck_initial: true,
            func_display: false,
            layout: {
                orientation: 'portrait',
                cols_number: 1,
                width_percent: '100%'
            },
            recommend: {
                bool: false,
                recommended: ''
            },
            restrict: 'none',
            number: '',
            min_word: '',
            max_word: '',
            post: '',
        }
    },{//电话号码题
        id: 0,
        sub_id: '',
        index: 1,
        page: 1,
        break: 1,
        number: 's1',
        name: '请输入您的电话号码：',
        remark: '',
        type: 'name',
        logic: {jump: [], display: []},
        editing: false,
        site_questions: [],
        sub_questions: [{
            question_id: 0,
            question_index: 1,
            question_content: '第一子问题',
        }],
        recommend_stretched: false,
        config: {
            exist: true,
            collected: false,
            page_now: 1,
            required: true,
            neck: false,
            the_class: 'single',
            neck_initial: true,
            func_display: false,
            layout: {
                orientation: 'portrait',
                cols_number: 1,
                width_percent: '100%'
            },
            recommend: {
                bool: false,
                recommended: ''
            },
            restrict: 'none',
            number: '',
            min_word: '',
            max_word: '',
            post: '',
        }
    },{//手机号码题
        id: 0,
        sub_id: '',
        index: 1,
        page: 1,
        break: 1,
        number: 's1',
        name: '请输入您的手机号码：',
        remark: '',
        type: 'name',
        logic: {jump: [], display: []},
        editing: false,
        site_questions: [],
        sub_questions: [{
            question_id: 0,
            question_index: 1,
            question_content: '第一子问题',
        }],
        recommend_stretched: false,
        config: {
            exist: true,
            collected: false,
            page_now: 1,
            required: true,
            neck: false,
            the_class: 'single',
            neck_initial: true,
            func_display: false,
            layout: {
                orientation: 'portrait',
                cols_number: 1,
                width_percent: '100%'
            },
            recommend: {
                bool: false,
                recommended: ''
            },
            restrict: 'none',
            number: '',
            min_word: '',
            max_word: '',
            post: '',
        }
    },
];

let baaaaa = [
    {
        "pageTotal": "1",
        "wjSurvey": [
            {
                "createTime": {
                    "date": 12,
                    "day": 3,
                    "hours": 9,
                    "minutes": 37,
                    "month": 8,
                    "seconds": 48,
                    "time": 1536716268000,
                    "timezoneOffset": -480,
                    "year": 118
                },
                "pLogin": "57102890230@qq.com",
                "updateTime": null,
                "wjDelete": "",
                "wjId": 34,
                "wjName": "萨达萨达撒",
                "wjNumber": "",
                "wjRemark": "撒大大",
                "wjSavedLogic": "",
                "wjStatus": "",
                "wjStyle": "",
                "wjTemplate": "",
                "wjTime": null
            }
        ],
        "wjSubject": [
            {
                "logic": "",//逻辑设置
                "questions": "",     //子问题
                "siteQuestions": "",   //对应你的   site_questions: [],
                "subBreak": "1",//所在小节
                "subConfig":   "[{\"exist\":true,\"collected\":false,\"page_now\":1,\"required\":true,\"neck\":false,\"func_display\":false,\"random_option\":\"fixed\",\"layout\":{\"orientation\":\"portrait\",\"cols_number\":1,\"width_percent\":\"100%\"},\"recommend\":{\"bool\":false,\"recommended\":\"\"}}]",
                "subId": 73,  //sub_id
                "subIndex": "1",//序号
                "subLogic": [

                ],
                "subName": "萨达萨达撒",//题目标题
                "subNumber": "1",   //题号
                "subOption":      "[{\"option_id\":0,\"option_index\":1,\"option_code\":\"\",\"option_content\":\"第一项\",\"checked\":false,\"mutex\":false,\"blank\":false},{\"option_id\":2,\"option_index\":2,\"option_code\":\"\",\"option_content\":\"第二项\",\"checked\":false,\"mutex\":false,\"blank\":false}]",
                "subPId": 0,  //id
                "subPage": "1",//所在页面
                "subQuestions": [

                ],
                "subRecommendStretched": "false",
                "subRemark": "",//题目备注
                "subSiteQuestions": [

                ],
                "subType": "choice",//题目类型
                "subWjId": 34,
                "sub_page": ""
            },
            {
                "logic": "[B@5339525d",
                "questions": "",
                "siteQuestions": "",
                "subBreak": "1",
                "subConfig": "[{\"exist\":true,\"collected\":false,\"page_now\":1,\"required\":true,\"neck\":false,\"func_display\":false,\"random_option\":\"fixed\",\"layout\":{\"orientation\":\"portrait\",\"cols_number\":1,\"width_percent\":\"100%\"},\"recommend\":{\"bool\":false,\"recommended\":\"\"}}]",
                "subId": 74,
                "subIndex": "2",
                "subLogic": [

                ],
                "subName": "",
                "subNumber": "2",
                "subOption": "[{\"option_id\":0,\"option_index\":1,\"option_code\":\"\",\"option_content\":\"第一项\",\"checked\":false,\"mutex\":false,\"blank\":false},{\"option_id\":2,\"option_index\":2,\"option_code\":\"\",\"option_content\":\"第二项\",\"checked\":false,\"mutex\":false,\"blank\":false}]",
                "subPId": 1,
                "subPage": "1",
                "subQuestions": [

                ],
                "subRecommendStretched": "false",
                "subRemark": "",
                "subSiteQuestions": [

                ],
                "subType": "check",
                "subWjId": 34,
                "sub_page": ""
            },
            {
                "logic": "[B@21863a25",
                "questions": "[B@426d6a67",
                "siteQuestions": "",
                "subBreak": "1",
                "subConfig": "[{\"exist\":true,\"collected\":false,\"page_now\":1,\"required\":true,\"neck\":false,\"the_class\":\"matrix_choice\",\"func_display\":false,\"layout\":{\"orientation\":\"portrait\",\"cols_number\":1,\"width_percent\":\"100%\"},\"recommend\":{\"bool\":false,\"recommended\":\"\"},\"restrict\":\"none\",\"number\":\"\",\"min_word\":\"\",\"max_word\":\"\",\"post\":\"\",\"random_branch\":\"\",\"random_option_matrix\":\"\"}]",
                "subId": 75,
                "subIndex": "3",
                "subLogic": [

                ],
                "subName": "矩阵题",
                "subNumber": "3",
                "subOption": "[{\"option_id\":0,\"option_index\":1,\"option_code\":\"\",\"option_content\":\"第一项\"},{\"option_id\":2,\"option_index\":2,\"option_code\":\"\",\"option_content\":\"第二项\"}]",
                "subPId": 2,
                "subPage": "1",
                "subQuestions": [

                ],
                "subRecommendStretched": "false",
                "subRemark": "",
                "subSiteQuestions": [

                ],
                "subType": "matrix",
                "subWjId": 34,
                "sub_page": ""
            }
        ]
    }
];

const answers = {
    "sub_id": 21,//问卷id
    "respondent": "",//受访者id（第一页提交后取得）
    "answers_now": [
        {//单选题
            type: 'choice',
            answer_content: {
                "option_id": 0,//选项id
                "option_index": "",//选项序号
                "option_code": "",//code
                "option_content": "",//选项文本
                "option_addition": ""//“其他”项的填空内容
            }
        },
        {//多选题
            type: 'check',
            answer_content: [
                {
                    "option_id": 0,
                    "option_code": ""
                },
                {
                    "option_id": "",//选项id
                    "option_index": "",//选项序号
                    "option_code": "",//code
                    "option_content": "",//选项文本
                    "option_addition": ""//“其他”项的填空内容
                }
            ]
        },
        {//填空题
            type: 'blank',
            answer_content: [
                {
                    "question_id": 0,//子问题id
                    "question_index": 1,//子问题序号
                    "question_content": "ç¬¬ä¸å­é®é¢",//子问题文本
                    "answer": "i"//子问题答案
                }
            ]
        },
        {//矩阵题
            type: 'matrix',
            answer_content: [
                {
                    "question_id": 0,//子问题id
                    "question_index": 1,//子问题序号
                    "question_content": "ç¬¬ä¸å­é®é¢",//子问题文本
                    "class": "matrix_choice",//子问题类型
                    "options": [//选项
                        {
                            "option_id": 0,//选项id
                            "option_index": 0,//选项序号
                            "option_code": "",//code
                            "option_content": 0,//选项文本
                            "option_addition": "",//“其他”项的填空内容
                            "option_checked": true,//此项（如果是选择题）是否被勾选
                            "option_answer": ""//此项（如果是填空题）的回答
                        },
                        {
                            "option_id": 2,
                            "option_index": 2,
                            "option_code": "",
                            "option_content": 2,
                            "option_addition": "",
                            "option_checked": false,
                            "option_answer": ""
                        }
                    ]
                },
                {
                    "question_id": 1,
                    "question_index": 2,
                    "question_content": "ç¬¬äºå­é®é¢",
                    "class": "matrix_choice",
                    "options": [
                        {
                            "option_id": 0,
                            "option_index": 0,
                            "option_code": "",
                            "option_content": 0,
                            "option_addition": "",
                            "option_checked": false,
                            "option_answer": ""
                        },
                        {
                            "option_id": 2,
                            "option_index": 2,
                            "option_code": "",
                            "option_content": 2,
                            "option_addition": "",
                            "option_checked": true,
                            "option_answer": ""
                        }
                    ]
                }
            ]
        },
        {//打分题
            type: 'score',
            answer_content: {
                "option_id": 2,//选项id
                "option_index": "",//选项序号
                "option_code": "",//code
                "option_content": "",//选项文本
                "option_addition": ""//“其他”项的填空内容
            }
        },
        {//排序题（）
            type: 'sort',
            answer_content: [
                {
                    "option_id": 1,//选项id
                    "option_index": "",//选项序号
                    "option_code": "",//code
                    "option_content": "",//选项文本
                    "option_addition": "",//“其他”项的填空内容
                    "order": 0//排序结果（排第几位）
                },
                {
                    "option_id": 2,
                    "option_index": "",
                    "option_code": "",
                    "option_content": "",
                    "option_addition": "",
                    "order": 1
                }
            ]
        },
        {//文件（上传）题
            "type": 'upload',
            "answer_content": {
                "file_path": ''//文件上传后的储存路径
            }
        },
        {//定位题
            "type": 'geolocation',
            "answer_content": {
                "position": '',//坐标信息
                "accuracy": '',//精确度
                "location_type": '',//定位信息来源
                "message": '',//定位结果信息
                "info": '',//状态信息
                "addressComponent": '',//地址信息
                "formattedAddress": '',//地址字符串
                "pois": '',//POI信息
                "roads": '',//附近道路信息
                "crosses": ''//附近道路交叉口信息
            }
        },
        {//联动题
            "type": 'linkage',
            "answer_content": {
                "sub_question": [{
                    "question_id": 0,//子问题id
                    "question_index": 1,//子问题序号
                    "options": [{//下拉框（所选中的）选项
                        "option_content": '',//选项文本
                        "option_id": ''//选项id
                    }]
                }]
            }
        }
    ]
};
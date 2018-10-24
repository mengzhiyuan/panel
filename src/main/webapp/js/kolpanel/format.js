/**
 *
 * Created by wangxiangyang on 2017/10/17.
 */


var obj = {
    active: true,
    index: 1,
    itemId: 1,
    type: 'choice',
    form: 'single',//填空题
    title: '第一题',
    description: '这是单项选择题',
    required: true,
    editing: true,
    options: {//选择题
        1: {
            index: 1,
            optionId: 1,
            value: '好好',
            fillable: false
        },
        2: {
            index: 2,
            optionId: 2,
            value: '不好',
            fillable: false
        },
        3: {
            index: 3,
            optionId: 3,
            value: '好不',
            fillable: false
        },
        4: {
            index: 4,
            optionId: 4,
            value: '不不',
            fillable: true
        }
    },
    sub_questions: {//填空题
        1: {
            index: 1,
            title: ''
        },
        2: {
            index: 2,
            title: ''
        }
    },
    need: {
        time: [],
        date: []
    },
    jump: {
        options: [],
        target: ''
    },
    depend: {
        itemId: '',
        options: []
    },
    quote: {
        itemId: ''
    },
    relate: {
        itemId: ''
    },
    evaluate: {
        itemId: '',
        matches: [
            {
                optionIndex: '',
                text: ''
            }
        ]
    }
};
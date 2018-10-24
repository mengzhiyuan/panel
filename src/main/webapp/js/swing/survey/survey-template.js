import functions from "../common/functions";

const survey_template = {
    logic: [],
    choice: {
        template: `
                    <div class="item" v-if="correspond && config.exist && page === config.page_now">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-options" v-if="config.layout.orientation === 'select'">
                                <select :name="'item-' + id" v-model="answer.option_id">
                                    <option v-for="option in options" :value="option.option_id">{{ option.option_content }}</option>
                                </select>
                            </div>
                            <div class="item-options" v-else>
                                <p class="option" v-for="option in options" :style="{ width: config.layout.width_percent }">
                                    <label :for="'item-' + id + 'option-' + option.option_id">
                                        <input class="radio" type="radio" :id="'item-' + id + 'option-' + option.option_id" :name="'item-' + id" @change="changeChoice(option.option_id)">
                                        <span>{{ option.option_content }}</span>
                                        <input class="blank" type="text" v-if="option.blank" v-model="option.option_addition">
                                    </label>
                                </p>
                            </div>
                        </div>            
                    </div>
            `,
        data: {
            answer: {}
        },
        methods: {
            changeChoice: function(option_id){
                this.answer.option_id = option_id
            },
            randomSort: function(arr){
                if (arr.length >= 2){
                    let result = [],
                        circle = arr.length - 1;

                    for (let i = 0; i < circle; i++){
                        let last = arr.length - 1,
                            next = Math.floor(last * Math.random());
                        result.push(arr.splice(next,1)[0])
                    }
                    return result
                }
            }
        },
        mounted: function(){

            let condition = this.config.random_option;

            if (condition === 'random'){
                let transiting = this.randomSort(this.options);
                this.options = transiting;
            } else if (condition === 'fix_one'){
                let fixed = this.options.splice(this.options.length - 2, 1),
                    transiting = this.randomSort(this.options);
                this.options = transiting.concat(fixed);
            } else if (condition === 'fix_two'){
                let fixed = this.options.splice(this.options.length - 3, 2),
                    transiting = this.randomSort(this.options);
                this.options = transiting.concat(fixed);
            } else if (condition === 'fix_three'){
                let fixed = this.options.splice(this.options.length - 4, 3),
                    transiting = this.randomSort(this.options);
                this.options = transiting.concat(fixed);
            }
        },
        watch: {
            answer: {
                handler: function(value,old){
                    for (let i = 0; i < this.options.length; i++){
                        if (parseInt(value.option_id) === this.options[i].option_id){
                            let answer_option = this.options[i];
                            value.option_code = answer_option.option_code;
                            if (answer_option.blank){
                                value.option_addition = answer_option.option_addition
                            }
                        }
                    }
                    if (value.option_id !== ''){
                        this.pass += 1
                    }
                },
                deep: true
            },
            pass: function(value,old){
                if (value){
                    for (let i = 0; i < survey_template.logic.display_logic.length; i++){
                        let display_logic = survey_template.logic.display_logic[i];
                        for (let j = 0; j < display_logic.conditions.length; j++){
                            if (this.id === display_logic.conditions[j].id){
                                if (this.answer[0].option_id === display_logic.conditions[j].option){
                                    display_logic.conditions[j].correspond = display_logic.conditions[j].judgement === 'checked'
                                } else {
                                    display_logic.conditions[j].correspond = display_logic.conditions[j].judgement === 'unchecked'
                                }
                            }
                        }
                    }
                    for (let i = 0; i < survey_template.logic.jump_logic.length; i++){
                        let jump_logic = survey_template.logic.jump_logic[i];
                        for (let j = 0; j < jump_logic.conditions.length; j++){
                            if (this.id === jump_logic.conditions[j].id){
                                if (this.answer[0].option_id === jump_logic.conditions[j].option){
                                    jump_logic.conditions[j].correspond = jump_logic.conditions[j].judgement === 'checked'
                                } else {
                                    jump_logic.conditions[j].correspond = jump_logic.conditions[j].judgement === 'unchecked'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    check: {
        template: `
                <div class="item" v-if="correspond && config.exist && page === config.page_now">
                    <div class="item-head">
                        <i class="index"><b class="present">{{ number }}</b></i>
                        <p class="item-name">{{ name }}</p>
                    </div>
                    <div class="item-neck">
                        <p class="item-remark" v-if="remark">{{ remark }}</p>
                    </div>
                    <div class="item-chest">
                        <div class="item-options">
                            <p class="option" v-for="option in options" :style="{ width: config.layout.width_percent }">
                                <label :for="'item-' + id + 'option-' + option.option_id">
                                    <input class="checkbox" type="checkbox" :id="'item-' + id + 'option-' + option.option_id" :name="'item-' + id" @change="changeCheck($event,option.option_id)">
                                    <span>{{ option.option_content }}</span>
                                    <input class="blank" type="text" v-if="option.blank" v-model="option.option_addition">
                                </label>
                            </p>
                        </div>
                    </div>
                </div>`,
        data: {},
        methods: {
            changeCheck: function(event,option_id){
                let answer_option;
                for (let i = 0; i < this.options.length; i++){
                    if (this.options[i].option_id === option_id){
                        answer_option = this.options[i];
                        break
                    }
                }
                if ($(event.currentTarget).prop('checked')){

                    let obj = {
                        option_id: answer_option.option_id,
                        option_code: answer_option.option_code,
                    };
                    if (answer_option.blank){
                        obj.option_addition = answer_option.option_addition
                    }

                    if (this.answer[0].option_id !== ''){
                        this.answer.push(obj)
                    } else {
                        this.answer[0] = obj
                    }
                } else {
                    if (this.answer.length > 1){
                        this.answer.splice(this.answer.indexOf(answer_option),1)
                    } else {
                        this.answer[0] = {
                            option_id: answer_option.option_id,
                            option_code: answer_option.option_code,
                        };
                        if (answer_option.blank){
                            obj.option_addition = answer_option.option_addition
                        }
                    }
                }
            }
        },
        mounted: function(){
            let condition = this.config.random_option;

            if (condition === 'random'){
                let transiting = this.randomSort(this.options);
                this.options = transiting;
            } else if (condition === 'fix_one'){
                let fixed = this.options.splice(this.options.length - 2, 1),
                    transiting = this.randomSort(this.options);
                this.options = transiting.concat(fixed);
            } else if (condition === 'fix_two'){
                let fixed = this.options.splice(this.options.length - 3, 2),
                    transiting = this.randomSort(this.options);
                this.options = transiting.concat(fixed);
            } else if (condition === 'fix_three'){
                let fixed = this.options.splice(this.options.length - 4, 3),
                    transiting = this.randomSort(this.options);
                this.options = transiting.concat(fixed);
            }
        },
        watch: {
            answer: {
                handler: function(value,old){
                    if (value.length >= 2){
                        this.pass += 1
                    } else {
                        this.pass = 0
                    }
                },
                deep: true
            },
            pass: function(value,old){
                if (value){
                    for (let i = 0; i < survey_template.logic.display_logic.length; i++){
                        let display_logic = survey_template.logic.display_logic[i];
                        for (let j = 0; j < display_logic.conditions.length; j++){
                            if (this.id === display_logic.conditions[j].id){
                                let checked = false;
                                for (let k = 0; k < this.answer.length; k++){
                                    if (this.answer[k].option_id === display_logic.conditions[j].option_id){
                                        checked = true;
                                        break
                                    }
                                }
                                if (display_logic.conditions[j].judgement === 'checked'){
                                    display_logic.conditions[j].correspond = true
                                } else if (display_logic.conditions[j].judgement === 'unchecked'){
                                    display_logic.conditions[j].correspond = true
                                } else {
                                    display_logic.conditions[j].correspond = false
                                }
                            }
                        }
                    }
                    for (let i = 0; i < survey_template.logic.jump_logic.length; i++){
                        let jump_logic = survey_template.logic.jump_logic[i];
                        for (let j = 0; j < jump_logic.conditions.length; j++){
                            if (this.id === jump_logic.conditions[j].id){
                                let checked = false;
                                for (let k = 0; k < this.answer.length; k++){
                                    if (this.answer[k].option_id === jump_logic.conditions[j].option_id){
                                        checked = true;
                                        break
                                    }
                                }
                                if (jump_logic.conditions[j].judgement === 'checked'){
                                    jump_logic.conditions[j].correspond = true
                                } else if (jump_logic.conditions[j].judgement === 'unchecked'){
                                    jump_logic.conditions[j].correspond = true
                                } else {
                                    jump_logic.conditions[j].correspond = false
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    blank: {
        template: `
                <div class="item" v-if="correspond && config.exist && page === config.page_now">
                    <div class="item-head">
                        <i class="index"><b class="present">{{ number }}</b></i>
                        <p class="item-name">{{ name }}</p>
                    </div>
                    <div class="item-neck">
                        <p class="item-remark" v-if="remark">{{ remark }}</p>
                    </div>
                    <div class="item-chest">
                        <div class="item-blank">
                            <p class="single-blank" v-if="config.the_class==='single'">
                                <textarea v-model="answer[0].answer"></textarea>
                                <span class="post" v-if="config.post">{{ config.post }}</span>
                            </p>
                            <div class="multi-blank" v-if="config.the_class==='multi'">
                                <p class="branch-blank">
                                    <label v-for="sub_answer in answer" :for="'item-' + id + 'sub_question-' + sub_question.question_id">
                                        <b>{{ question.question_content }}</b>
                                        <input :id="'item-' + id + 'sub_question-' + sub_question.question_id" type="text" @v-model="sub_question.answer">
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>    
                </div>
            `,
        data: {},
        methods: {},
        watch: {
            answer: {
                handler: function(value,old){
                    if (this.config.the_class === 'single'){
                        if (value[0].answer){
                            this.pass += 1
                        } else {
                            this.pass = 0
                        }
                    } else {
                        let pass = 1;
                        for (let i = 0; i < value.length; i++){
                            if (!value[i].answer){
                                pass = 0
                            }
                        }
                        this.pass = pass
                    }
                },
                deep: true
            }
        },
        created: function(){
            for (let i = 0; i < this.sub_questions.length; i++){
                if (this.answer[i]){
                    this.answer[i].question_id = this.sub_questions[i].question_id;
                    this.answer[i].question_index = this.sub_questions[i].question_index;
                    this.answer[i].question_content = this.sub_questions[i].question_content;
                    this.answer[i].answer = ''
                } else {
                    this.answer.push({
                        question_id: '',
                        answer: ''
                    })
                }
            }
        }
    },
    matrix: {
        template: `
                    <div class="item" v-if="correspond && config.exist && page === config.page_now">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <table class="item-matrix">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th v-for="question in sub_questions">{{ question.question_content }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="option in options">
                                        <th>{{ option.option_content }}</th>
                                        <td v-for="question in sub_questions">
                                            <span v-if="question.the_class==='matrix_choice'"><input :name="'item-' + id + 'sub_question-' + question.question_id" type="radio" @change="changeChoice($event,question.question_id,option.option_id)"></span>
                                            <span v-if="question.the_class==='matrix_check'"><input :name="'item-' + id + 'sub_question-' + question.question_id" type="checkbox" @change="changeCheck($event,question.question_id,option.option_id)"></span>
                                            <span v-if="question.the_class==='matrix_blank'"><input :name="'item-' + id + 'sub_question-' + question.question_id" type="text" @change="changeBlank($event,question.question_id,option.option_id)"></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
            `,
        data: {},
        methods: {
            changeChoice(event,question_id,option_id){
                if ($(event.currentTarget).prop('checked')){
                    for (let i = 0; i < this.answer.length; i++){
                        if (this.answer[i].question_id === question_id){
                            let this_question = this.answer[i];
                            for (let j = 0; j < this_question.options.length; j++){
                                this_question.options[j].option_checked = this_question.options[j].option_id === option_id
                            }
                        }
                    }
                }
            },
            changeCheck(event,question_id,option_id){
                for (let i = 0; i < this.answer.length; i++){
                    if (this.answer[i].question_id === question_id){
                        let this_question = this.answer[i];
                        for (let j = 0; j < this_question.options.length; j++){
                            if (this_question.options[j].option_id === option_id){
                                this_question.options[j].option_checked = $(event.currentTarget).prop('checked');
                                break
                            }
                        }
                    }
                }
            },
            changeBlank(event,question_id,option_id){
                for (let i = 0; i < this.answer.length; i++){
                    if (this.answer[i].question_id === question_id){
                        let this_question = this.answer[i];
                        for (let j = 0; j < this_question.options.length; j++){
                            if (this_question.options[j].option_id === option_id){
                                this_question.options[j].option_answer = $(event.currentTarget).val();
                                break
                            }
                        }
                    }
                }
            }
        },
        watch: {
            answer: {
                handler: function(value,old){
                    let pass = 1;
                    for (let i = 0; i < value.length; i++){
                        let sub_pass;
                        if (value[i].the_class === 'matrix_blank'){
                            sub_pass = true;
                            for (let j = 0; j < value[i].options.length; j++){
                                if (!value[i].options[j].option_answer){
                                    sub_pass = 0;
                                    break
                                }
                            }
                        } else {
                            sub_pass = false;
                            for (let j = 0; j < value[i].options.length; j++){
                                if (value[i].options[j].option_checked){
                                    sub_pass += 1;
                                    break
                                }
                            }
                        }
                        if (!sub_pass){
                            pass = 0
                        }
                    }
                    this.pass = pass
                },
                deep: true
            },
            pass: function(value,old){
                if (value){
                    for (let i = 0; i < survey_template.logic.display_logic.length; i++){
                        let display_logic = survey_template.logic.display_logic[i];
                        for (let j = 0; j < display_logic.conditions.length; j++){
                            if (this.id === display_logic.conditions[j].id){
                                for (let k = 0; k < this.answer.length; k++){
                                    if (this.answer[k].question_id === display_logic.conditions[j].sub_question){
                                        let checked = false;
                                        for (let o = 0; o < this.answer[k].options.length; o++){
                                            if (display_logic.conditions[j].option === this.answer[k].options[o]){
                                                checked = true;
                                                break
                                            }
                                        }
                                        if (display_logic.conditions[j].judgement === 'checked'){
                                            display_logic.conditions[j].correspond = true
                                        } else if (display_logic.conditions[j].judgement === 'unchecked'){
                                            display_logic.conditions[j].correspond = true
                                        } else {
                                            display_logic.conditions[j].correspond = false
                                        }
                                    }
                                }
                            }
                        }
                    }
                    for (let i = 0; i < survey_template.logic.jump_logic.length; i++){
                        let jump_logic = survey_template.logic.jump_logic[i];
                        for (let j = 0; j < jump_logic.conditions.length; j++){
                            if (this.id === jump_logic.conditions[j].id){
                                for (let k = 0; k < this.answer.length; k++){
                                    if (this.answer[k].question_id === jump_logic.conditions[j].sub_question){
                                        let checked = false;
                                        for (let o = 0; o < this.answer[k].options.length; o++){
                                            if (jump_logic.conditions[j].option === this.answer[k].options[o]){
                                                checked = true;
                                                break
                                            }
                                        }
                                        if (jump_logic.conditions[j].judgement === 'checked'){
                                            jump_logic.conditions[j].correspond = true
                                        } else if (jump_logic.conditions[j].judgement === 'unchecked'){
                                            jump_logic.conditions[j].correspond = true
                                        } else {
                                            jump_logic.conditions[j].correspond = false
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        created: function(){
            this.answer = [];
            for (let i = 0; i < this.sub_questions.length; i++){
                let about_question = {
                    question_id: this.sub_questions[i].question_id,
                    question_index: this.sub_questions[i].question_index,
                    question_content: this.sub_questions[i].question_content,
                    class: this.sub_questions[i].the_class,
                    options: []
                };
                for (let j = 0; j < this.options.length; j++){
                    about_question.options.push({
                        option_id: this.options[j].option_id,
                        option_index: this.options[j].option_id,
                        option_code: this.options[j].option_code,
                        option_content: this.options[j].option_id,
                        option_addition: '',
                        option_checked: '',
                        option_answer: ''
                    })
                }
                this.answer.push(about_question)
            }
        }
    },
    score: {
        template: `
                    <div class="item" v-if="correspond && config.exist && page === config.page_now">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest item-score">
                            <div class="option-label">
                                <span class="left-label" v-html="config.left_label"></span>
                                <span class="right-label" v-html="config.right_label"></span>
                            </div>
                            <div class="item-options">
                                <p class="option score" v-for="option in options" :style="{ width: config.layout.width_percent }">
                                    <label class="score" :class="{ 'checked': option.option_checked }" :for="'item-' + id + 'option-' + option.option_id">
                                        <input class="radio" type="radio" :id="'item-' + id + 'option-' + option.option_id" :name="'item-' + id" @change="changeChoice(option.option_id)">
                                        <span>{{ option.option_content }}</span>
                                        <span class="thumb" v-if="config.style==='thumb'"></span>
                                        <span class="heart" v-if="config.style==='heart'"></span>
                                        <span class="star" v-if="config.style==='start'"></span>
                                        <input class="blank" type="text" v-if="option.blank" v-model="option.option_addition">
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>
            `,
        data: {},
        methods: {
            changeChoice: function(option_id){
                this.answer.option_id = option_id
            }
        },
        watch: {
            answer: {
                handler: function(value,old){
                    for (let i = 0; i < this.options.length; i++){
                        if (parseInt(value.option_id) === this.options[i].option_id){
                            let answer_option = this.options[i];
                            value.option_code = answer_option.option_code;
                            if (answer_option.blank){
                                value.option_addition = answer_option.option_addition
                            }
                        }
                    }
                    if (value.option_id !== ''){
                        this.pass += 1
                    }
                },
                deep: true
            },
            pass: function(value,old){
                if (value){
                    for (let i = 0; i < survey_template.logic.display_logic.length; i++){
                        let display_logic = survey_template.logic.display_logic[i];
                        for (let j = 0; j < display_logic.conditions.length; j++){
                            if (this.id === display_logic.conditions[j].id){
                                if (this.answer[0].option_id === display_logic.conditions[j].option){
                                    display_logic.conditions[j].correspond = display_logic.conditions[j].judgement === 'checked'
                                } else {
                                    display_logic.conditions[j].correspond = display_logic.conditions[j].judgement === 'unchecked'
                                }
                            }
                        }
                    }
                    for (let i = 0; i < survey_template.logic.jump_logic.length; i++){
                        let jump_logic = survey_template.logic.jump_logic[i];
                        for (let j = 0; j < jump_logic.conditions.length; j++){
                            if (this.id === jump_logic.conditions[j].id){
                                if (this.answer[0].option_id === jump_logic.conditions[j].option){
                                    jump_logic.conditions[j].correspond = jump_logic.conditions[j].judgement === 'checked'
                                } else {
                                    jump_logic.conditions[j].correspond = jump_logic.conditions[j].judgement === 'unchecked'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    sort: {
        template: `
                    <div class="item" v-if="correspond && config.exist && page === config.page_now">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-options sort-area inputting">
                                <p class="option" v-for="option in options" :style="{ width: config.layout.width_percent }">
                                    <div class="label" :for="'item-' + id + 'option-' + option.option_id">
                                        <input class="order" type="number" :id="'item-' + id + 'option-' + option.option_id" :name="'item-' + id" v-model="option.order">
                                        <span>{{ option.option_content }}</span>
                                        <input class="blank" type="text" v-if="option.blank" v-model="option.option_addition">
                                    </div>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                    </div>
            `,
        data: {},
        methods: {},
        watch: {
            answer: {
                handler: function(value,old){

                },
                deep: true
            },
            pass: function(value,old){
                if (value){
                    for (let i = 0; i < survey_template.logic.display_logic.length; i++){
                        let display_logic = survey_template.logic.display_logic[i];
                        for (let j = 0; j < display_logic.conditions.length; j++){
                            if (this.id === display_logic.conditions[j].id){
                                let checked = false;
                                for (let k = 0; k < this.answer.length; k++){
                                    if (this.answer[k].option_id === display_logic.conditions[j].option_id){
                                        checked = true;
                                        break
                                    }
                                }
                                if (display_logic.conditions[j].judgement === 'checked'){
                                    display_logic.conditions[j].correspond = true
                                } else if (display_logic.conditions[j].judgement === 'unchecked'){
                                    display_logic.conditions[j].correspond = true
                                } else {
                                    display_logic.conditions[j].correspond = false
                                }
                            }
                        }
                    }
                    for (let i = 0; i < survey_template.logic.jump_logic.length; i++){
                        let jump_logic = survey_template.logic.jump_logic[i];
                        for (let j = 0; j < jump_logic.conditions.length; j++){
                            if (this.id === jump_logic.conditions[j].id){
                                let checked = false;
                                for (let k = 0; k < this.answer.length; k++){
                                    if (this.answer[k].option_id === jump_logic.conditions[j].option_id){
                                        checked = true;
                                        break
                                    }
                                }
                                if (jump_logic.conditions[j].judgement === 'checked'){
                                    jump_logic.conditions[j].correspond = true
                                } else if (jump_logic.conditions[j].judgement === 'unchecked'){
                                    jump_logic.conditions[j].correspond = true
                                } else {
                                    jump_logic.conditions[j].correspond = false
                                }
                            }
                        }
                    }
                }
            }
        }

    },
    pictures: {
        template: `
                    <div class="item" v-if="correspond && config.exist && page === config.page_now">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-pictures">
                                <p class="option" v-for="option in options" :style="{ width: config.layout.width_percent }">
                                    <label :for="'item-' + id + 'option-' + option.option_id">
                                        <input class="radio" type="radio" :id="'item-' + id + 'option-' + option.option_id" :name="'item-' + id" @change="changeChoice(option.option_id)">
                                        <span>{{ option.option_content }}</span>
                                        <img :src="option.picture_path" :title="option.option_content" v-if="option.picture_path">
                                        <input class="blank" type="text" v-if="option.blank" v-model="option.option_addition">
                                    </label>
                                </p>
                            </div>
                        </div>
                    </div>
            `,
        data: {},
        methods: {
            changeChoice: function(option_id){
                this.answer.option_id = option_id
            }
        },
        watch: {
            'answer': {
                handler: function(value,old){
                    for (let i = 0; i < this.options.length; i++){
                        if (parseInt(value.option_id) === this.options[i].option_id){
                            let answer_option = this.options[i];
                            value.option_code = answer_option.option_code;
                            if (answer_option.blank){
                                value.option_addition = answer_option.option_addition
                            }
                        }
                    }
                    if (value.option_id !== ''){
                        this.pass += 1
                    }
                },
                deep: true
            }
        }
    },
    description: {
        template: `
            <div class="item" v-if="correspond && config.exist && page === config.page_now">
                <div class="item-head">
                    <i class="index"><b class="present">{{ number }}</b></i>
                    <p class="item-name">{{ name }}</p>
                </div>
            </div>
            `,
        data: {},
        methods: {}
    },
    upload: {
        template: `
                <div class="item item-blank" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <input type="file" :accept="accept">
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {

        },
        methods: {

        },
        watch: {

        },
        mounted: function(){
            let accept = '';
            for (let j in this.config.restrict){
                if (this.config.restrict[j].all === true){
                    accept += j + '/*,'
                } else {
                    for (let k in this.config.restrict[j]){
                        if (k !== 'all'){
                            accept += j + '/' + k + ','
                        }
                    }
                }
            }
            this.accept = accept
        }
    },
    geolocation: {
        template: `
                <div class="item item-geolocation" v-if="correspond && config.exist && page === config.page_now">
                    <script type="text/javascript"
	                src="https://webapi.amap.com/maps?v=1.4.9&key=45e883962deaebb8a4c3a6b5f6e221f4&plugin=AMap.Geocoder"></script>
                    <div class="item-head">
                        <i class="index"><b class="present">{{ number }}</b></i>
                        <p class="item-name">{{ name }}</p>
                    </div>
                    <div class="item-neck">
                        <p class="item-remark" v-if="remark">{{ remark }}</p>
                    </div>
                    <div class="item-chest item-map">
                        <div class="map" :id="'map-' + id"></div>
                    </div>
                    <div class="control"></div>
                </div>
            `,
        data: {

        },
        methods: {},
        mounted: function(){
            let self = this;
            function onComplete(result){
                console.log(result);
                self.answer = result;
                self.pass = 1
            }
            function onError(error){
                console.log(error);
                self.answer = error;
                self.pass = 0
            }


            mapObj = new AMap.Map('iCenter');
            if (self.config.mode === 'default'){
                mapObj.plugin('AMap.Geolocation', function () {
                    geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true,//是否使用高精度定位，默认:true
                        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                        showButton: true,        //显示定位按钮，默认：true
                        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    });
                    mapObj.addControl(geolocation);
                    geolocation.getCurrentPosition();
                    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
                    AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
                });
            } else {
                var marker = new AMap.Marker({
                    position: mapObj.getCenter(),
                    draggable: true,
                    cursor: 'move',
                    raiseOnDrag: false,
                    zIndex: 101
                });
                marker.setMap(mapObj);

                AMap.event.addListener(marker, "dragend", function(e) {
                    self.answer.lng = marker.getPosition().lng;
                    self.answer.lat = marker.getPosition().lat;
                    lnglatXY = [marker.getPosition().lng, marker.getPosition().lat];
                    var geocoder = new AMap.Geocoder({
                        radius: 1000,
                        extensions: "all"
                    });
                    geocoder.getAddress(lnglatXY, function(status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            var address = result.regeocode.formattedAddress; //返回地址描述
                            self.answer.description = address
                        }
                    });
                });
            }
        }
    },
    order: {
        template: `
                <div class="item item-order" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-orders">
                                <p class="option" v-for="option in options" :style="{ width: config.layout.width_percent }">
                                    <label :for="'item-' + id + 'option-' + option.option_id">
                                        <span>{{ option.option_content }}：</span>
                                        <input class="" type="number" :id="'item-' + id + 'option-' + option.option_id" :name="'item-' + id" v-model="option.number">
                                        <span>{{ option.price * option.option_number }}</span>
                                    </label>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {

        },
        methods: {

        },
        create: function(){
            for (let i = 0; i < this.options.length; i++){
                if (this.answer[i]){
                    this.answer[i].option_id = this.options[i].option_id;
                    this.answer[i].option_index = this.options[i].option_index;
                    this.answer[i].option_code = this.options[i].option_code;
                    this.answer[i].option_content = this.options[i].option_content;
                    this.answer[i].price = this.options[i].price;
                    this.answer[i].number = ''
                } else {
                    this.answer.push({
                        option_id: this.options[i].option_id,
                        option_index: this.options[i].option_index,
                        option_code: this.options[i].option_code,
                        option_content: this.options[i].option_content,
                        price: this.options[i].price,
                        number: ''
                    })
                }
            }
        },
        watch: {
            answer: {
                handler: function(value,old){
                    let pass = 1;
                    for (let i = 0; i < value.length; i++){
                        if (!value[i].number){
                            pass = 0
                        }
                    }
                    this.pass = pass
                },
                deep: true
            }
        },
    },
    linkage: {
        template: `
                <div class="item item-linkage" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-select" v-for="question in sub_question">
                                <select :name="'item-' + id">
                                    <option value="">请选择</option>
                                    <option v-for="option in question.options" :value="option.option_id">{{ option.option_content }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {

        },
        methods: {

        },
        create: function(){
            for (let i = 0; i < this.sub_questions.length; i++){
                if (this.answer[i]){
                    this.answer[i].question_id = this.options[i].question_id;
                    this.answer[i].question_index = this.options[i].question_index;
                    this.answer[i].option = {
                        option_content: '',
                        option_id: ''
                    }
                } else {
                    this.answer.push({
                        question_id: this.options[i].question_id,
                        question_index: this.options[i].question_index,
                        option: {
                            option_content: '',
                            option_id: ''
                        }
                    })
                }
            }
        },
        answer: {
            handler: function(value,old){
                let pass = 1;
                for (let i = 0; i < value.length; i++){
                    if (!value[i].option.option_id){
                        pass = 0
                    }
                }
                this.pass = pass
            },
            deep: true
        }
    },
    name: {
        template: `
                <div class="item item-blank" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-blank">
                                <p class="single-blank" v-if="config.the_class==='single'">
                                    <textarea></textarea>
                                    <span class="post" v-if="config.post">{{ config.post }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {

        },
        methods: {

        },
        watch: {
            answer: {
                handler: function(value,old){
                    if (this.config.the_class === 'single'){
                        if (value[0].answer){
                            this.pass += 1
                        } else {
                            this.pass = 0
                        }
                    } else {
                        let pass = true;
                        for (let i = 0; i < value.length; i++){
                            if (!value[i].answer){
                                pass = 0
                            }
                        }
                        this.pass = pass
                    }
                },
                deep: true
            }
        }
    },
    sex: {
        template: `
                <div class="item item-choice" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-options" v-if="config.layout.orientation === 'select'">
                                <select :name="'item-' + id">
                                    <option v-for="option in options" :value="option.option_id">{{ option.option_content }}</option>
                                </select>
                            </div>
                            <div class="item-options" v-else>
                                <p class="option" v-for="option in options" :style="{ width: config.layout.width_percent }">
                                    <label :for="'item-' + id + 'option-' + option.option_id">
                                        <input class="radio" type="radio" :id="'item-' + id + 'option-' + option.option_id" :name="'item-' + id">
                                        <span>{{ option.option_content }}</span>
                                        <input class="blank" type="text" v-if="option.blank" v-model="option.option_addition">
                                    </label>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {

        },
        methods: {

        },
        watch: {
            answer: {
                handler: function(value,old){
                    for (let i = 0; i < this.options.length; i++){
                        if (parseInt(value.option_id) === this.options[i].option_id){
                            let answer_option = this.options[i];
                            value.option_code = answer_option.option_code;
                            if (answer_option.blank){
                                value.option_addition = answer_option.option_addition
                            }
                        }
                    }
                    if (value.option_id !== ''){
                        this.pass += 1
                    }
                },
                deep: true
            },
            pass: function(value,old){
                if (value){
                    for (let i = 0; i < survey_template.logic.display_logic.length; i++){
                        let display_logic = survey_template.logic.display_logic[i];
                        for (let j = 0; j < display_logic.conditions.length; j++){
                            if (this.id === display_logic.conditions[j].id){
                                if (this.answer[0].option_id === display_logic.conditions[j].option){
                                    display_logic.conditions[j].correspond = display_logic.conditions[j].judgement === 'checked'
                                } else {
                                    display_logic.conditions[j].correspond = display_logic.conditions[j].judgement === 'unchecked'
                                }
                            }
                        }
                    }
                    for (let i = 0; i < survey_template.logic.jump_logic.length; i++){
                        let jump_logic = survey_template.logic.jump_logic[i];
                        for (let j = 0; j < jump_logic.conditions.length; j++){
                            if (this.id === jump_logic.conditions[j].id){
                                if (this.answer[0].option_id === jump_logic.conditions[j].option){
                                    jump_logic.conditions[j].correspond = jump_logic.conditions[j].judgement === 'checked'
                                } else {
                                    jump_logic.conditions[j].correspond = jump_logic.conditions[j].judgement === 'unchecked'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    age: {
        template: `
                <div class="item item-blank" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-blank">
                                <p class="single-blank" v-if="config.the_class==='single'">
                                    <input type="number">
                                    <span class="post" v-if="config.post">{{ config.post }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {

        },
        methods: {

        },
        watch: {
            answer: {
                handler: function(value,old){
                    if (this.config.the_class === 'single'){
                        if (value[0].answer){
                            this.pass += 1
                        } else {
                            this.pass = 0
                        }
                    } else {
                        let pass = 1;
                        for (let i = 0; i < value.length; i++){
                            if (!value[i].answer){
                                pass = 0
                            }
                        }
                        this.pass = pass
                    }
                },
                deep: true
            }
        }
    },
    company: {
        template: `
                <div class="item item-blank" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-blank">
                                <p class="single-blank" v-if="config.the_class==='single'">
                                    <textarea></textarea>
                                    <span class="post" v-if="config.post">{{ config.post }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {

        },
        methods: {

        },
        watch: {
            answer: {
                handler: function(value,old){
                    if (this.config.the_class === 'single'){
                        if (value[0].answer){
                            this.pass += 1
                        } else {
                            this.pass = 0
                        }
                    } else {
                        let pass = 1;
                        for (let i = 0; i < value.length; i++){
                            if (!value[i].answer){
                                pass = 0
                            }
                        }
                        this.pass = pass
                    }
                },
                deep: true
            }
        }
    },
    department: {
        template: `
                <div class="item item-blank" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-blank">
                                <p class="single-blank" v-if="config.the_class==='single'">
                                    <textarea></textarea>
                                    <span class="post" v-if="config.post">{{ config.post }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {

        },
        methods: {

        },
        watch: {
            answer: {
                handler: function(value,old){
                    if (this.config.the_class === 'single'){
                        if (value[0].answer){
                            this.pass += 1
                        } else {
                            this.pass = 0
                        }
                    } else {
                        let pass = 1;
                        for (let i = 0; i < value.length; i++){
                            if (!value[i].answer){
                                pass = 0
                            }
                        }
                        this.pass = pass
                    }
                },
                deep: true
            }
        }
    },
    address: {
        template: `
                <div class="item item-blank" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-blank">
                                <p class="single-blank" v-if="config.the_class==='single'">
                                    <textarea></textarea>
                                    <span class="post" v-if="config.post">{{ config.post }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {

        },
        methods: {

        },
        watch: {
            answer: {
                handler: function(value,old){
                    if (this.config.the_class === 'single'){
                        if (value[0].answer){
                            this.pass += 1
                        } else {
                            this.pass = 0
                        }
                    } else {
                        let pass = 1;
                        for (let i = 0; i < value.length; i++){
                            if (!value[i].answer){
                                pass = 0
                            }
                        }
                        this.pass = pass
                    }
                },
                deep: true
            }
        }
    },
    email: {
        template: `
                <div class="item item-blank" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-blank">
                                <p class="single-blank" v-if="config.the_class==='single'">
                                    <textarea></textarea>
                                    <span class="post" v-if="config.post">{{ config.post }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {

        },
        methods: {

        },
        watch: {
            answer: {
                handler: function(value,old){
                    if (this.config.the_class === 'single'){
                        if (value[0].answer){
                            this.pass += 1
                        } else {
                            this.pass = 0
                        }
                    } else {
                        let pass = 1;
                        for (let i = 0; i < value.length; i++){
                            if (!value[i].answer){
                                pass = 0
                            }
                        }
                        this.pass = pass
                    }
                },
                deep: true
            }
        }
    },
    telephone: {
        template: `
                <div class="item item-blank" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-blank">
                                <p class="single-blank" v-if="config.the_class==='single'">
                                    <textarea></textarea>
                                    <span class="post" v-if="config.post">{{ config.post }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {

        },
        methods: {

        },
        watch: {
            answer: {
                handler: function(value,old){
                    if (this.config.the_class === 'single'){
                        if (value[0].answer){
                            this.pass += 1
                        } else {
                            this.pass = 0
                        }
                    } else {
                        let pass = 1;
                        for (let i = 0; i < value.length; i++){
                            if (!value[i].answer){
                                pass = 0
                            }
                        }
                        this.pass = pass
                    }
                },
                deep: true
            }
        }
    },
    cellphone: {
        template: `
                <div class="item item-blank" v-if="correspond && config.exist && page === config.page_now">
                    <div class="present">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-blank">
                                <p class="single-blank" v-if="config.the_class==='single'">
                                    <textarea></textarea>
                                    <span class="post" v-if="config.post">{{ config.post }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                    </div>
                </div>
            `,
        data: {

        },
        methods: {

        },
        watch: {
            answer: {
                handler: function(value,old){
                    if (this.config.the_class === 'single'){
                        if (value[0].answer){
                            this.pass += 1
                        } else {
                            this.pass = 0
                        }
                    } else {
                        let pass = 1;
                        for (let i = 0; i < value.length; i++){
                            if (!value[i].answer){
                                pass = 0
                            }
                        }
                        this.pass = pass
                    }
                },
                deep: true
            }
        }
    }
};

export default survey_template
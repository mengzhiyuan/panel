import workspace from "./workspace";
import functions from "../common/functions";

const templates = {
    common: {
        choice: {//单选题
            template: `
                <div class="item item-choice" @mousedown="activeShift" @click="activeEdit" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <div class="item-func">
                                <span class="trigger" @click="switchFunc">设置</span>
                                <span class="bar">
                                    <span class="setting" :class="{ 'active': config.func_display }">
                                        <i class="coding">编码</i>
                                        <i class="advanced" @click="settingOptions">高级</i>
                                    </span>
                                </span>
                            </div>
                            <div class="item-options">
                                <p class="option" v-for="option in options" :index="option.index">
                                    <span class="option-ceiling"></span>
                                    <span class="option-shift glyphicon glyphicon-option-vertical" @mousedown="activeOptionShift(option,$event)"></span>
                                    <span class="option-content container rtf-container">
                                        <span class="rtf-target textarea" contenteditable="true" @focus="autoAppendOption($event,option)" @blur="changeOptionContent($event.target, option)"  v-html="option.option_content"></span>
							            <span class="rtf">
								            <i class="glyphicon glyphicon-picture" title="图片"></i>
								            <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							            </span>
                                    </span>
                                    <i class="option-delete glyphicon glyphicon-remove" @click="deleteOption($event.currentTarget,option)"></i>
                                    <b v-if="config.func_display"><input type="text" v-model="option.code"  tabindex="-1"></b>
                                    <span class="option-floor"></span>
                                </p>
                                <p class="about-option">
                                    <span class="append-batch" @click="batchOption">
                                        批量添加
                                    </span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class="recommend">
                                        <span @click="stretch_recommend">选项引用其他题目答案<b v-if="config.recommend.bool">第【{{ config.recommend.recommended }}】题</b></span>
                                        <span class="pull-down" v-show="recommend_stretched">
                                            <select v-model="config.recommend.recommended">
                                                <option value="">请选择</option>
                                                <option v-for="question in site_questions" v-if="question.index < index && (question.type==='check' || question.type==='sort')" :value="question.id">{{ question.number }}</option>
                                            </select>
                                        </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: 's1',
                name: '',
                remark: '',
                type: 'choice',
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
            },
            methods: {
                activeEdit: function(event){
                    functions.activeEdit(event,workspace)
                },
                switchEdit: function(event){
                    event.stopPropagation();
                    functions.switchEdit(this);
                    this.activeEdit(event);
                },
                rtfEdit: function(event){
                    functions.rtfEdit(event, this)
                },
                changeContent: function(target, key){
                    functions.changeContent(target, this, key)
                },
                changeOptionContent: function(target, option){
                    functions.changeOptionContent(this,target,option)
                },
                closeEditor: function(event,curtain,employer){
                    functions.closeEditor(event,curtain,employer)
                },
                preventClose: function(event){
                    functions.preventClose(event)
                },
                switchNeck: function(event){
                    functions.switchNeck(this)
                },
                activeShift: function(event){
                    functions.activeShift(event, this, workspace)
                },
                autoAppendOption: function(event,option){
                    functions.autoAppendOption(event,this,option)
                },
                switchFunc: function(event){
                    functions.switchFunc(event,this)
                },
                batchOption: function(event){
                    functions.batchOption(event,this);
                },
                deleteOption: function(target,option){
                    functions.deleteOption($(target).parents('.option')[0],option,this.options)
                },
                activeOptionShift: function(option,event){
                    functions.activeOptionShift(option,event,this.options)
                },
                stretch_recommend: function(event){
                    functions.stretch_recommend(this)
                },
                settingOptions: function(event){
                    functions.settingOptions(event,this)
                },
                triggerCollect: function(event){
                    functions.triggerCollect(event,this)
                },
                deleteItem: function(event){
                    functions.deleteItem(event, this)
                }
            }
        },
        check: {//多选题
            template: `
                <div class="item item-check" @mousedown="activeShift" @click="activeEdit" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                                        <input class="checkbox" type="checkbox" :id="'item-' + id + 'option-' + option.option_id" :name="'item-' + id">
                                        <span>{{ option.option_content }}</span>
                                        <input class="blank" type="text" v-if="option.blank" v-model="option.option_addition">
                                    </label>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <div class="item-func">
                                <span class="trigger" @click="switchFunc">设置</span>
                                <span class="bar">
                                    <span class="setting" :class="{ 'active': config.func_display }">
                                        <i class="coding">编码</i>
                                        <i class="advanced" @click="settingOptions">高级</i>
                                    </span>
                                </span>
                            </div>
                            <div class="item-options">
                                <p class="option" v-for="option in options" :index="option.index">
                                    <span class="option-ceiling"></span>
                                    <span class="option-shift glyphicon glyphicon-option-vertical" @mousedown="activeOptionShift(option,$event)"></span>
                                    <span class="option-content container rtf-container">
                                        <span class="rtf-target textarea" contenteditable="true" @focus="autoAppendOption($event,option)" @blur="changeOptionContent($event.target, option)"  v-html="option.option_content"></span>
							            <span class="rtf">
								            <i class="glyphicon glyphicon-picture" title="图片"></i>
								            <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							            </span>
                                    </span>
                                    <i class="option-delete glyphicon glyphicon-remove" @click="deleteOption($event.currentTarget,option)"></i>
                                    <b v-if="config.func_display"><input type="text" v-model="option.code"  tabindex="-1"></b>
                                    <span class="option-floor"></span>
                                </p>
                                <p class="about-option">
                                    <span class="append-batch" @click="batchOption">
                                        批量添加
                                    </span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class="recommend">
                                        <span @click="stretch_recommend">选项引用其他题目答案<b v-if="config.recommend.bool">第【{{ config.recommend.recommended }}】题</b></span>
                                        <span class="pull-down" v-show="recommend_stretched">
                                            <select v-model="config.recommend.recommended">
                                                <option value="">请选择</option>
                                                <option v-for="question in site_questions" v-if="question.index < index && (question.type==='check' || question.type==='sort')" :value="question.id">{{ question.number }}</option>
                                            </select>
                                        </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
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
            },
            methods: {
                activeEdit: function(event){
                    functions.activeEdit(event,workspace)
                },
                switchEdit: function(event){
                    event.stopPropagation();
                    functions.switchEdit(this);
                    this.activeEdit(event);
                },
                rtfEdit: function(event){
                    functions.rtfEdit(event, this)
                },
                changeContent: function(target, key){
                    functions.changeContent(target, this, key)
                },
                changeOptionContent: function(target, option){
                    functions.changeOptionContent(this,target,option)
                },
                closeEditor: function(event,curtain,employer){
                    functions.closeEditor(event,curtain,employer)
                },
                preventClose: function(event){
                    functions.preventClose(event)
                },
                switchNeck: function(event){
                    functions.switchNeck(this)
                },
                activeShift: function(event){
                    functions.activeShift(event, this, workspace)
                },
                autoAppendOption: function(event,option){
                    functions.autoAppendOption(event,this,option)
                },
                switchFunc: function(event){
                    functions.switchFunc(event,this)
                },
                batchOption: function(event){
                    functions.batchOption(event,this);
                },
                deleteOption: function(target,option){
                    functions.deleteOption($(target).parents('.option')[0],option,this.options)
                },
                activeOptionShift: function(option,event){
                    functions.activeOptionShift(option,event,this.options)
                },
                stretch_recommend: function(event){
                    functions.stretch_recommend(this)
                },
                settingOptions: function(event){
                    functions.settingOptions(event,this)
                },
                triggerCollect: function(event){
                    functions.triggerCollect(event,this)
                },
                deleteItem: function(event){
                    functions.deleteItem(event, this)
                }
            }
        },
        blank: {//填空题
            template: `
                <div class="item item-blank" @mousedown="activeShift" @click="activeEdit" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                                <div class="multi-blank" v-if="config.the_class==='multi'">
                                    <p class="branch-blank">
                                         <label v-for="question in sub_questions" :for="'item-' + id + 'sub_question-' + question.question_id">
                                            <b>{{ question.question_content }}</b>
                                            <input :id="'item-' + id + 'sub_question-' + question.question_id" type="text">
                                         </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <div class="item-branches" v-if="config.the_class==='multi'">
                                <p class="sub-question" v-for="question in sub_questions">
                                    <span class="question-ceiling"></span>
                                    <span class="question-shift glyphicon glyphicon-option-vertical" @mousedown="activeSubQuestionShift(question, $event)"></span>
                                    <span class="question-content container rtf-container">
                                        <span class="rtf-target textarea" contenteditable="true" @focus="autoAppendSubQuestion($event,question)" @blur="changeSubQuestionContent($event.target, question)"  v-html="question.question_content"></span>
							            <span class="rtf">
								            <i class="glyphicon glyphicon-picture" title="图片"></i>
								            <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							            </span>
                                    </span>
                                    <i class="question-delete glyphicon glyphicon-remove" @click="deleteSubQuestion($event.currentTarget,question)"></i>
                                    <span class="question-floor"></span>
                                </p>
                                <p class="about-sub-question">
                                    <span class="append-batch" @click="batchSubQuestion">批量添加</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class="recommend">
                                        <span @click="stretch_recommend">子问题引用其他题目答案<b v-if="config.recommend.bool">第【{{ config.recommend.recommended }}】题</b></span>
                                        <span class="pull-down" v-show="recommend_stretched">
                                            <select v-model="config.recommend.recommended">
                                                <option value="">请选择</option>
                                                <option v-for="question in site_questions" v-if="question.index < index && (question.type==='check' || question.type==='sort')" :value="question.id">{{ question.number }}</option>
                                            </select>
                                        </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
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
                sub_questions: [{
                    question_id: 0,
                    question_index: 1,
                    question_content: '第一子问题',
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
            methods: {
                activeEdit: function(event){
                    functions.activeEdit(event,workspace)
                },
                switchEdit: function(event){
                    event.stopPropagation();
                    functions.switchEdit(this);
                    this.activeEdit(event);
                },
                rtfEdit: function(event){
                    functions.rtfEdit(event, this)
                },
                changeContent: function(target, key){
                    functions.changeContent(target, this, key)
                },
                changeSubQuestionContent: function(target, question){
                    functions.changeSubQuestionContent(this,target,question)
                },
                closeEditor: function(event,curtain,employer){
                    functions.closeEditor(event,curtain,employer)
                },
                preventClose: function(event){
                    functions.preventClose(event)
                },
                switchNeck: function(event){
                    functions.switchNeck(this)
                },
                activeShift: function(event){
                    functions.activeShift(event, this, workspace)
                },
                autoAppendSubQuestion: function(event,question){
                    functions.autoAppendSubQuestion(event,this,question)
                },
                switchFunc: function(event){
                    functions.switchFunc(event,this)
                },
                batchSubQuestion: function(event){
                    functions.batchSubQuestion(event,this)
                },
                deleteSubQuestion: function(target,question){
                    functions.deleteOption($(target).parents('.sub_question')[0],question,this.sub_questions)
                },
                activeSubQuestionShift: function(question,event){
                    functions.activeSubQuestionShift(question,event,this.sub_questions)
                },
                stretch_recommend: function(event){
                    functions.stretch_recommend(this)
                },
                triggerCollect: function(event){
                    functions.triggerCollect(event,this)
                },
                deleteItem: function(event){
                    functions.deleteItem(event, this)
                }
            }
        },
        matrix: {//矩阵题
            template: `
                <div class="item item-matrix" @mousedown="activeShift" @click="activeEdit" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                                            <span v-if="question.the_class==='matrix_choice'"><input :name="'item-' + id + 'sub_question-' + question.question_id" type="radio"></span>
                                            <span v-if="question.the_class==='matrix_check'"><input :name="'item-' + id + 'sub_question-' + question.question_id" type="checkbox"></span>
                                            <span v-if="question.the_class==='matrix_blank'"><input :name="'item-' + id + 'sub_question-' + question.question_id" type="text"></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <table class="item-matrix">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th v-for="question in sub_questions" class="sub-question">
                                            <span class="question-content container rtf-container">
                                                <span class="rtf-target textarea" contenteditable="true" @blur="changeSubQuestionContent($event.target, question)"  v-html="question.question_content"></span>
							                    <span class="rtf">
								                    <i class="glyphicon glyphicon-picture" title="图片"></i>
								                    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							                    </span>
                                            </span>
                                            <span class="operate">
                                                <span class="trigger glyphicon glyphicon-triangle-bottom" @click="triggerSubQuestionOperate(question)"></span>
                                                <span class="menu" :class="{ 'open': question.scroll_open && !question.scroll_initial, 'close': !question.scroll_open && !question.scroll_initial }">
                                                <ul>
                                                    <li @click="deleteSubQuestion(question)">删除</li>
                                                    <li>
                                                        <select v-model="question.the_class" @change="changeSubQuestionClass(question)">
                                                            <option value="matrix_choice">矩阵单选</option>
										                    <option value="matrix_check">矩阵多选</option>
										                    <option value="matrix_blank">矩阵填空</option>
                                                        </select>
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" :checked="question.blank" @change="changeSubQuestionBlank($event, question)"><span>其他</span>
                                                    </li>
                                                </ul>
                                                </span>
                                            </span>
                                        </th>
                                        <th class="sub-question no-border">
                                            <span class="append glyphicon glyphicon-plus" @click="appendSubQuestion($event)"></span>
                                            <span class="append glyphicon glyphicon-menu-hamburger" @click="batchSubQuestion"></span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="option in options">
                                        <th class="option">
                                            <span class="option-content container rtf-container">
                                            <span class="rtf-target textarea" contenteditable="true" @blur="changeOptionContent($event.target, option)"  v-html="option.option_content"></span>
							                    <span class="rtf">
								                    <i class="glyphicon glyphicon-picture" title="图片"></i>
								                    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							                    </span>
                                            </span>
                                            <span class="operate">
                                                <span class="trigger glyphicon glyphicon-triangle-bottom" @click="triggerOptionOperate(option)"></span>
                                                <span class="menu" :class="{ 'open': option.scroll_open && !option.scroll_initial, 'close': !option.scroll_open && !option.scroll_initial }">
                                                <ul>
                                                    <li @click="deleteMatrixOption(option)">删除</li>
                                                </ul>
                                                </span>
                                            </span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th class="option no-border">
                                            <span class="append glyphicon glyphicon-plus" @click="appendOption($event)"></span>
                                            <span class="append glyphicon glyphicon-menu-hamburger" @click="batchOption"></span>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                            <p class="about-sub-question">
                                    <span class="recommend">
                                        <span @click="stretch_recommend">子问题引用其他题目答案<b v-if="config.recommend.bool">第【{{ config.recommend.recommended }}】题</b></span>
                                        <span class="pull-down" v-show="recommend_stretched">
                                            <select v-model="config.recommend.recommended">
                                                <option value="">请选择</option>
                                                <option v-for="question in site_questions" v-if="question.index < index && (question.type==='check' || question.type==='sort')" :value="question.id">{{ question.number }}</option>
                                            </select>
                                        </span>
                                    </span>
                                </p>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
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
                    the_class: 'matrix_choice',
                    question_content: '第一子问题',
                    scroll_open: false,
                    scroll_initial: true
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
            },
            methods: {
                activeEdit: function(event){
                    functions.activeEdit(event,workspace)
                },
                switchEdit: function(event){
                    event.stopPropagation();
                    functions.switchEdit(this);
                    this.activeEdit(event);
                },
                rtfEdit: function(event){
                    functions.rtfEdit(event, this, workspace)
                },
                changeContent: function(target, key){
                    functions.changeContent(target, this, key)
                },
                triggerSubQuestionOperate: function(question){
                    functions.triggerSubQuestionOperate(question)
                },
                triggerOptionOperate: function(option){
                    functions.triggerOptionOperate(option)
                },
                deleteMatrixSubQuestion: function(question){
                    functions.deleteMatrixSubQuestion(this.sub_questions,question)
                },
                deleteMatrixOption: function(option){
                    functions.deleteMatrixOption(this.options, option)
                },
                changeSubQuestionClass: function(question){
                    functions.changeSubQuestionClass(question)
                },
                changeSubQuestionBlank: function(event, question){
                    functions.changeSubQuestionBlank(event, question)
                },
                changeSubQuestionContent: function(target, question){
                    functions.changeSubQuestionContent(this,target,question)
                },
                changeOptionContent: function(target, option){
                    functions.changeOptionContent(this,target,option)
                },
                appendSubQuestion: function(event){
                    functions.pushSubQuestion(this.sub_questions)
                },
                appendOption: function(event){
                    functions.pushOption(this.options)
                },
                batchSubQuestion: function(event){
                    functions.batchSubQuestion(event,this)
                },
                batchOption: function(event){
                    functions.batchOption(event,this);
                },
                closeEditor: function(event,curtain,employer){
                    functions.closeEditor(event,curtain,employer)
                },
                preventClose: function(event){
                    functions.preventClose(event)
                },
                switchNeck: function(event){
                    functions.switchNeck(this)
                },
                activeShift: function(event){
                    functions.activeShift(event, this, workspace)
                },
                switchFunc: function(event){
                    functions.switchFunc(event,this)
                },
                deleteSubQuestion: function(target,question){
                    functions.deleteOption($(target).parents('.sub_question')[0],question,this.sub_questions)
                },
                activeSubQuestionShift: function(question,event){
                    functions.activeSubQuestionShift(question,event,this.sub_questions)
                },
                stretch_recommend: function(event){
                    functions.stretch_recommend(this)
                },
                triggerCollect: function(event){
                    functions.triggerCollect(event,this)
                },
                deleteItem: function(event){
                    functions.deleteItem(event, this)
                }
            }
        },
        score: {//打分题
            template: `
                <div class="item item-score" @mousedown="activeShift" @click="activeEdit" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="option-label">
                                <span class="left-label" v-html="config.left_label"></span>
                                <span class="right-label" v-html="config.right_label"></span>
                            </div>
                            <div class="item-options">
                                <p class="option score" v-for="option in options" :style="{ width: config.layout.width_percent }">
                                    <label class="score" :for="'item-' + id + 'option-' + option.option_id">
                                        <input class="radio" type="radio" :id="'item-' + id + 'option-' + option.option_id" :name="'item-' + id">
                                        <span>{{ option.option_content }}</span>
                                        <input class="blank" type="text" v-if="option.blank" v-model="option.option_addition">
                                    </label>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <div class="item-func">
                                <span class="trigger" @click="switchFunc">设置</span>
                                <span class="bar">
                                    <span class="setting" :class="{ 'active': config.func_display }">
                                        <i class="coding">编码</i>
                                        <i class="advanced" @click="settingOptions">高级</i>
                                    </span>
                                </span>
                            </div>
                            <div class="item-options">
                                <p class="option" v-for="option in options" :index="option.index">
                                    <span class="option-ceiling"></span>
                                    <span class="option-shift glyphicon glyphicon-option-vertical" @mousedown="activeOptionShift(option,$event)"></span>
                                    <span class="option-content container rtf-container">
                                        <span class="rtf-target textarea" contenteditable="true" @focus="autoAppendOption($event,option)" @blur="changeOptionContent($event.target, option)"  v-html="option.option_content"></span>
                                    </span>
                                    <i class="option-delete glyphicon glyphicon-remove" @click="deleteOption($event.currentTarget,option)"></i>
                                    <b v-if="config.func_display"><input type="text" v-model="option.code"  tabindex="-1"></b>
                                    <span class="option-floor"></span>
                                </p>
                                <p class="about-option">
                                    <span class="append-batch" @click="batchOption">
                                        批量添加
                                    </span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class="recommend">
                                        <span @click="stretch_recommend">选项引用其他题目答案<b v-if="config.recommend.bool">第【{{ config.recommend.recommended }}】题</b></span>
                                        <span class="pull-down" v-show="recommend_stretched">
                                            <select v-model="config.recommend.recommended">
                                                <option value="">请选择</option>
                                                <option v-for="question in site_questions" v-if="question.index < index && (question.type==='check' || question.type==='sort')" :value="question.id">{{ question.number }}</option>
                                            </select>
                                        </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
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
                    min_score: '',
                    max_score: '',
                    credit: 'satisfaction',
                    left_label: '非常不满意',
                    right_label: '非常满意'
                }
            },
            methods: {
                activeEdit: function(event){
                    functions.activeEdit(event,workspace)
                },
                switchEdit: function(event){
                    event.stopPropagation();
                    functions.switchEdit(this);
                    this.activeEdit(event);
                },
                rtfEdit: function(event){
                    functions.rtfEdit(event, this, workspace)
                },
                changeContent: function(target, key){
                    functions.changeContent(target, this, key)
                },
                changeOptionContent: function(target, option){
                    functions.changeOptionContent(this,target,option)
                },
                closeEditor: function(event,curtain,employer){
                    functions.closeEditor(event,curtain,employer)
                },
                preventClose: function(event){
                    functions.preventClose(event)
                },
                switchNeck: function(event){
                    functions.switchNeck(this)
                },
                activeShift: function(event){
                    functions.activeShift(event, this, workspace)
                },
                autoAppendOption: function(event,option){
                    functions.autoAppendOption(event,this,option)
                },
                switchFunc: function(event){
                    functions.switchFunc(event,this)
                },
                batchOption: function(event){
                    functions.batchOption(event,this);
                },
                deleteOption: function(target,option){
                    functions.deleteOption($(target).parents('.option')[0],option,this.options)
                },
                activeOptionShift: function(option,event){
                    functions.activeOptionShift(option,event,this.options)
                },
                stretch_recommend: function(event){
                    functions.stretch_recommend(this)
                },
                settingOptions: function(event){
                    functions.settingOptions(event,this)
                },
                triggerCollect: function(event){
                    functions.triggerCollect(event,this)
                },
                deleteItem: function(event){
                    functions.deleteItem(event, this)
                }
            }
        },
        sort: {//排序题
            template: `
                <div class="item item-sort" @mousedown="activeShift" @click="activeEdit" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <div class="item-func">
                                <span class="trigger" @click="switchFunc">设置</span>
                                <span class="bar">
                                    <span class="setting" :class="{ 'active': config.func_display }">
                                        <i class="coding">编码</i>
                                        <i class="advanced" @click="settingOptions">高级</i>
                                    </span>
                                </span>
                            </div>
                            <div class="item-options">
                                <p class="option" v-for="option in options" :index="option.index">
                                    <span class="option-ceiling"></span>
                                    <span class="option-shift glyphicon glyphicon-option-vertical" @mousedown="activeOptionShift(option,$event)"></span>
                                    <span class="option-content container rtf-container">
                                        <span class="rtf-target textarea" contenteditable="true" @focus="autoAppendOption($event,option)" @blur="changeOptionContent($event.target, option)"  v-html="option.option_content"></span>
							            <span class="rtf">
								            <i class="glyphicon glyphicon-picture" title="图片"></i>
								            <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							            </span>
                                    </span>
                                    <i class="option-delete glyphicon glyphicon-remove" @click="deleteOption($event.currentTarget,option)"></i>
                                    <b v-if="config.func_display"><input type="text" v-model="option.code"  tabindex="-1"></b>
                                    <span class="option-floor"></span>
                                </p>
                                <p class="about-option">
                                    <span class="append-batch" @click="batchOption">
                                        批量添加
                                    </span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class="recommend">
                                        <span @click="stretch_recommend">选项引用其他题目答案<b v-if="config.recommend.bool">第【{{ config.recommend.recommended }}】题</b></span>
                                        <span class="pull-down" v-show="recommend_stretched">
                                            <select v-model="config.recommend.recommended">
                                                <option value="">请选择</option>
                                                <option v-for="question in site_questions" v-if="question.index < index && (question.type==='check' || question.type==='sort')" :value="question.id">{{ question.number }}</option>
                                            </select>
                                        </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
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
            },
            methods: {
                activeEdit: function(event){
                    functions.activeEdit(event,workspace)
                },
                switchEdit: function(event){
                    event.stopPropagation();
                    functions.switchEdit(this);
                    this.activeEdit(event);
                },
                rtfEdit: function(event){
                    functions.rtfEdit(event, this, workspace)
                },
                changeContent: function(target, key){
                    functions.changeContent(target, this, key)
                },
                changeOptionContent: function(target, option){
                    functions.changeOptionContent(this,target,option)
                },
                closeEditor: function(event,curtain,employer){
                    functions.closeEditor(event,curtain,employer)
                },
                preventClose: function(event){
                    functions.preventClose(event)
                },
                switchNeck: function(event){
                    functions.switchNeck(this)
                },
                activeShift: function(event){
                    functions.activeShift(event, this, workspace)
                },
                autoAppendOption: function(event,option){
                    functions.autoAppendOption(event,this,option)
                },
                switchFunc: function(event){
                    functions.switchFunc(event,this)
                },
                batchOption: function(event){
                    functions.batchOption(event,this);
                },
                deleteOption: function(target,option){
                    functions.deleteOption($(target).parents('.option')[0],option,this.options)
                },
                activeOptionShift: function(option,event){
                    functions.activeOptionShift(option,event,this.options)
                },
                stretch_recommend: function(event){
                    functions.stretch_recommend(this)
                },
                settingOptions: function(event){
                    functions.settingOptions(event,this)
                },
                triggerCollect: function(event){
                    functions.triggerCollect(event,this)
                },
                deleteItem: function(event){
                    functions.deleteItem(event, this)
                }
            }
        },
        pictures: {//图片选择题
            template: `
                <div class="item item-pictures" @mousedown="activeShift" @click="activeEdit" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                                        <input class="radio" type="radio" :id="'item-' + id + 'option-' + option.option_id" :name="'item-' + id">
                                        <span>{{ option.option_content }}</span>
                                        <img :src="option.picture_path" :title="option.option_content" v-if="option.picture_path">
                                        <input class="blank" type="text" v-if="option.blank" v-model="option.option_addition">
                                    </label>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <div class="item-func">
                                <span class="trigger" @click="switchFunc">设置</span>
                                <span class="bar">
                                    <span class="setting" :class="{ 'active': config.func_display }">
                                        <i class="coding">编码</i>
                                        <i class="advanced" @click="settingOptions">高级</i>
                                    </span>
                                </span>
                            </div>
                            <div class="item-options">
                                <p class="option" v-for="option in options" :index="option.index">
                                    <span class="option-ceiling"></span>
                                    <span class="option-shift glyphicon glyphicon-option-vertical" @mousedown="activeOptionShift(option,$event)"></span>
                                    <span class="option-content container rtf-container">
                                        <input type="text" class="rtf-target textarea" @focus="autoAppendOption($event,option)" v-model="option.option_content">
                                        <span class="file-container textarea" @click="activeUpload">
                                            <span class="file-label">{{ option.option_url }}</span>
                                            <input type="file" @change="changeOptionUrl($event,option)">
                                        </span>
							            <!--<span class="rtf">-->
								            <!--<i class="glyphicon glyphicon-picture" title="图片"></i>-->
								            <!--<i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>-->
							            <!--</span>-->
                                    </span>
                                    <i class="option-delete glyphicon glyphicon-remove" @click="deleteOption($event.currentTarget,option)"></i>
                                    <b v-if="config.func_display"><input type="text" v-model="option.code"  tabindex="-1"></b>
                                    <span class="option-floor"></span>
                                </p>
                                <p class="about-option">
                                    <span class="append-batch" @click="batchOption">
                                        批量添加
                                    </span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class="recommend">
                                        <span @click="stretch_recommend">选项引用其他题目答案<b v-if="config.recommend.bool">第【{{ config.recommend.recommended }}】题</b></span>
                                        <span class="pull-down" v-show="recommend_stretched">
                                            <select v-model="config.recommend.recommended">
                                                <option value="">请选择</option>
                                                <option v-for="question in site_questions" v-if="question.index < index && (question.type==='check' || question.type==='sort')" :value="question.id">{{ question.number }}</option>
                                            </select>
                                        </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
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
                    option_url: '点击添加图片',
                    picture_path: '',
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
            },
            methods: {
                activeEdit: function(event){
                    functions.activeEdit(event,workspace)
                },
                switchEdit: function(event){
                    event.stopPropagation();
                    functions.switchEdit(this);
                    this.activeEdit(event);
                },
                rtfEdit: function(event){
                    functions.rtfEdit(event, this, workspace)
                },
                changeContent: function(target, key){
                    functions.changeContent(target, this, key)
                },
                changeOptionContent: function(target, option){
                    functions.changeOptionContent(this,target,option)
                },
                closeEditor: function(event,curtain,employer){
                    functions.closeEditor(event,curtain,employer)
                },
                preventClose: function(event){
                    functions.preventClose(event)
                },
                switchNeck: function(event){
                    functions.switchNeck(this)
                },
                activeShift: function(event){
                    functions.activeShift(event, this, workspace)
                },
                autoAppendOption: function(event,option){
                    functions.autoAppendOption(event,this,option)
                },
                switchFunc: function(event){
                    functions.switchFunc(event,this)
                },
                batchOption: function(event){
                    functions.batchOption(event,this);
                },
                deleteOption: function(target,option){
                    functions.deleteOption($(target).parents('.option')[0],option,this.options)
                },
                activeOptionShift: function(option,event){
                    functions.activeOptionShift(option,event,this.options)
                },
                stretch_recommend: function(event){
                    functions.stretch_recommend(this)
                },
                settingOptions: function(event){
                    functions.settingOptions(event,this)
                },
                activeUpload: function(event){
                    functions.activeUpload(event)
                },
                changeOptionUrl: function(event,option){
                    functions.changeOptionUrl(event, option)
                },
                triggerCollect: function(event){
                    functions.triggerCollect(event,this)
                },
                deleteItem: function(event){
                    functions.deleteItem(event, this)
                }
            }
        },
        description: {//描述说明题
            template: `
                <div class="item item-description" @mousedown="activeShift" @click="activeEdit" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
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
            },
            methods: {
                activeEdit: function(event){
                    functions.activeEdit(event,workspace)
                },
                switchEdit: function(event){
                    event.stopPropagation();
                    functions.switchEdit(this);
                    this.activeEdit(event);
                },
                rtfEdit: function(event){
                    functions.rtfEdit(event, this, workspace)
                },
                changeContent: function(target, key){
                    functions.changeContent(target, this, key)
                },
                changeOptionContent: function(target, option){
                    functions.changeOptionContent(this,target,option)
                },
                closeEditor: function(event,curtain,employer){
                    functions.closeEditor(event,curtain,employer)
                },
                preventClose: function(event){
                    functions.preventClose(event)
                },
                switchNeck: function(event){
                    functions.switchNeck(this)
                },
                activeShift: function(event){
                    functions.activeShift(event, this, workspace)
                },
                autoAppendOption: function(event,option){
                    functions.autoAppendOption(event,this,option)
                },
                switchFunc: function(event){
                    functions.switchFunc(event,this)
                },
                batchOption: function(event){
                    functions.batchOption(event,this);
                },
                deleteOption: function(target,option){
                    functions.deleteOption($(target).parents('.option')[0],option,this.options)
                },
                activeOptionShift: function(option,event){
                    functions.activeOptionShift(option,event,this.options)
                },
                stretch_recommend: function(event){
                    functions.stretch_recommend(this)
                },
                settingOptions: function(event){
                    functions.settingOptions(event,this)
                },
                triggerCollect: function(event){
                    functions.triggerCollect(event,this)
                },
                deleteItem: function(event){
                    functions.deleteItem(event, this)
                }
            }
        },
        paging: {//分页
            template: `
                <div class="item item-choice">
                    <div class="item-head">
                        <i class="index">
                            <b class="present"></b>
                            <input type="text" class="edit">
                        </i>
                    </div>
                    <div class="control"></div>
                </div>
            `,
            data: {

            }
        },
        break: {//分节
            template: `
                <div class="item item-choice">
                    <div class="item-head">
                        <i class="index">
                            <b class="present"></b>
                            <input type="text" class="edit">
                        </i>
                    </div>
                    <div class="control"></div>
                </div>
            `,
            data: {

            }
        }
    },
    advanced: {
        upload: {
            template: `
                <div class="item item-blank" @mousedown="activeShift" @click="activeEdit" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <div class="restrict">
                                <p class="restrict-all">
                                    <label>
                                        <input type="checkbox" :checked="config.restrict.all" @change="changeSuperRestrict">
                                        <span>限制文件类型</span>
                                    </label>
                                </p>
                                <p>
                                    <b>图片文件</b>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.image.all" @change="changeMiddleRestrict($event,'image')">
                                        <span>全选</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.image.gif" @change="changeMinorRestrict($event,'image','gif')">
                                        <span>.gif</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.image.png" @change="changeMinorRestrict($event,'image','png')">
                                        <span>.png</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.image.jpg" @change="changeMinorRestrict($event,'image','jpg')">
                                        <span>.jpg</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.image.jpeg" @change="changeMinorRestrict($event,'image','jpeg')">
                                        <span>.jpeg</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.image.bmp" @change="changeMinorRestrict($event,'image','bmp')">
                                        <span>.bmp</span>
                                    </label>
                                </p>
                                <p>
                                    <b>文档文件</b>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.document.all" @change="changeMiddleRestrict($event,'document')">
                                        <span>全选</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.document.doc" @change="changeMinorRestrict($event,'document','doc')">
                                        <span>.doc</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.document.docx" @change="changeMinorRestrict($event,'document','docx')">
                                        <span>.docx</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.document.pdf" @change="changeMinorRestrict($event,'document','pdf')">
                                        <span>.pdf</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.document.xls" @change="changeMinorRestrict($event,'document','xls')">
                                        <span>.xls</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.document.xlsx" @change="changeMinorRestrict($event,'document','xlsx')">
                                        <span>.xlsx</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.document.ppt" @change="changeMinorRestrict($event,'document','ppt')">
                                        <span>.ppt</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.document.pptx" @change="changeMinorRestrict($event,'document','pptx')">
                                        <span>.pptx</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.document.txt" @change="changeMinorRestrict($event,'document','txt')">
                                        <span>.txt</span>
                                    </label>
                                </p>
                                <p>
                                    <b>压缩文件</b>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.compressed.all" @change="changeMiddleRestrict($event,'compressed')">
                                        <span>全选</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.compressed.rar" @change="changeMinorRestrict($event,'compressed','rar')">
                                        <span>.rar</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.compressed.zip" @change="changeMinorRestrict($event,'compressed','zip')">
                                        <span>.zip</span>
                                    </label>
                                    <label class="type">
                                        <input type="checkbox" :checked="config.restrict.compressed.gzip" @change="changeMinorRestrict($event,'compressed','gzip')">
                                        <span>.gzip</span>
                                    </label>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
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
            },
            methods: {
                activeEdit: function(event){
                    functions.activeEdit(event,workspace)
                },
                switchEdit: function(event){
                    event.stopPropagation();
                    functions.switchEdit(this);
                    this.activeEdit(event);
                },
                rtfEdit: function(event){
                    functions.rtfEdit(event, this, workspace)
                },
                changeContent: function(target, key){
                    functions.changeContent(target, this, key)
                },
                changeSubQuestionContent: function(target, question){
                    functions.changeSubQuestionContent(this,target,question)
                },
                closeEditor: function(event,curtain,employer){
                    functions.closeEditor(event,curtain,employer)
                },
                preventClose: function(event){
                    functions.preventClose(event)
                },
                switchNeck: function(event){
                    functions.switchNeck(this)
                },
                activeShift: function(event){
                    functions.activeShift(event, this, workspace)
                },
                changeSuperRestrict: function(event){
                    let bool = $(event.currentTarget).prop('checked');
                    this.config.restrict.all = bool;
                    for (let k in this.config.restrict.image){
                        this.config.restrict.image[k] = bool;
                    }
                    for (let k in this.config.restrict.document){
                        this.config.restrict.image[k] = bool;
                    }
                    for (let k in this.config.restrict.compressed){
                        this.config.restrict.image[k] = bool;
                    }
                },
                changeMiddleRestrict: function(event,type){
                    let bool = $(event.currentTarget).prop('checked');
                    for (let k in this.config.restrict[type]){
                        this.config.restrict[type][k] = bool
                    }
                },
                changeMinorRestrict: function(event,type,sub_type){
                    this.config.restrict[type][sub_type] = $(event.currentTarget).prop('checked')
                },
                triggerCollect: function(event){
                    functions.triggerCollect(event,this)
                },
                deleteItem: function(event){
                    functions.deleteItem(event, this)
                }
            },
            watch: {
                'config.restrict': {
                    handler: function(value,old){
                        let all = true;
                        for (let k in value){
                            if (k !== 'all'){
                                let flag = true;
                                for (let h in value[k]){
                                    if (h !== 'all'){
                                        if (!value[k][h]){
                                            flag = false;
                                            break
                                        }
                                    }
                                }
                                value[k].all = flag;
                                if (!value[k].all){
                                    all = false;
                                    break
                                }
                            }
                        }
                        value.all = all
                    },
                    deep: true
                }
            }
        },
        geolocation: {
            template: `
                <div class="item item-choice">
                    <div class="present" v-show="!editing" @click="switchEdit">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="map" :id=" 'map-' + id"></div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-show="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
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
            },
            methods: {
                activeEdit: function(event){
                    functions.activeEdit(event,workspace)
                },
                switchEdit: function(event){
                    event.stopPropagation();
                    functions.switchEdit(this);
                    this.activeEdit(event);
                },
                rtfEdit: function(event){
                    functions.rtfEdit(event, this, workspace)
                },
                changeContent: function(target, key){
                    functions.changeContent(target, this, key)
                },
                changeSubQuestionContent: function(target, question){
                    functions.changeSubQuestionContent(this,target,question)
                },
                closeEditor: function(event,curtain,employer){
                    functions.closeEditor(event,curtain,employer)
                },
                preventClose: function(event){
                    functions.preventClose(event)
                },
                switchNeck: function(event){
                    functions.switchNeck(this)
                },
                activeShift: function(event){
                    functions.activeShift(event, this, workspace)
                },
                switchFunc: function(event){
                    functions.switchFunc(event,this)
                },
                triggerCollect: function(event){
                    functions.triggerCollect(event,this)
                },
                initialDefault: function(){
                    let self = this;
                    function onComplete(){}
                    function onError(){}
                    let map_obj = new AMap.Map('map-' + self.id);
                    map_obj.plugin('AMap.Geolocation', function () {
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
                        map_obj.addControl(geolocation);
                        geolocation.getCurrentPosition();
                        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
                        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
                    });
                },
                initialManual: function(){
                    let self = this;
                    let map_obj = new AMap.Map('map-' + self.id);
                    let marker = new AMap.Marker({
                        position: map_obj.getCenter(),
                        draggable: true,
                        cursor: 'move',
                        raiseOnDrag: false,
                        zIndex: 101
                    });
                    marker.setMap(self.config.map_obj);

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
                },
                deleteItem: function(event){
                    functions.deleteItem(event, this)
                }
            }
        },
        pictures: {
            template: `
                <div class="item item-choice">
                    <div class="item-head">
                        <i class="index">
                            <b class="present"></b>
                            <input type="text" class="edit">
                        </i>
                    </div>
                    <div class="control"></div>
                </div>
            `,
            data: {

            }
        },
        vote: {
            template: `
                <div class="item item-choice">
                    <div class="item-head">
                        <i class="index">
                            <b class="present"></b>
                            <input type="text" class="edit">
                        </i>
                    </div>
                    <div class="control"></div>
                </div>
            `,
            data: {

            }
        },
        nps: {
            template: `
                <div class="item item-choice">
                    <div class="item-head">
                        <i class="index">
                            <b class="present"></b>
                            <input type="text" class="edit">
                        </i>
                    </div>
                    <div class="control"></div>
                </div>
            `,
            data: {

            }
        },
        proportion: {
            template: `
                <div class="item item-choice">
                    <div class="present" v-if="!editing" @click="switchEdit">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <p class="item-name">{{ name }}</p>
                        </div>
                        <div class="item-neck">
                            <p class="item-remark" v-if="remark">{{ remark }}</p>
                        </div>
                        <div class="item-chest">
                            <div class="item-blank">
                                <div class="multi-blank">
                                    <p class="branch-blank">
                                         <label v-for="question in sub_questions" :for="'item-' + id + 'sub_question-' + question.question_id">
                                            <b>{{ question.question_content }}</b>
                                            <input :id="'item-' + id + 'sub_question-' + question.question_id" type="text">
                                         </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <div class="item-branches">
                                <p class="sub-question" v-for="question in sub_questions">
                                    <span class="question-ceiling"></span>
                                    <span class="question-shift glyphicon glyphicon-option-vertical" @mousedown="activeSubQuestionShift(question, $event)"></span>
                                    <span class="question-content container rtf-container">
                                        <span class="rtf-target textarea" contenteditable="true" @focus="autoAppendSubQuestion($event,question)" @blur="changeSubQuestionContent($event.target, question)"  v-html="question.question_content"></span>
							            <span class="rtf">
								            <i class="glyphicon glyphicon-picture" title="图片"></i>
								            <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							            </span>
                                    </span>
                                    <i class="question-delete glyphicon glyphicon-remove" @click="deleteSubQuestion($event.currentTarget,question)"></i>
                                    <span class="question-floor"></span>
                                </p>
                                <p class="about-sub-question">
                                    <span class="append-batch" @click="batchSubQuestion">批量添加</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class="recommend">
                                        <span @click="stretch_recommend">子问题引用其他题目答案<b v-if="config.recommend.bool">第【{{ config.recommend.recommended }}】题</b></span>
                                        <span class="pull-down" v-show="recommend_stretched">
                                            <select v-model="config.recommend.recommended">
                                                <option value="">请选择</option>
                                                <option v-for="question in site_questions" v-if="question.index < index && (question.type==='check' || question.type==='sort')" :value="question.id">{{ question.number }}</option>
                                            </select>
                                        </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: 's1',
                name: '比重题',
                remark: '',
                type: 'proportion',
                logic: {jump: [], display: []},
                editing: false,
                site_questions: [],
                sub_questions: [{
                    question_id: 0,
                    question_index: 1,
                    question_content: '第一子问题',
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
            }
        },
        random: {
            template: `
                <div class="item item-random" @mousedown="activeShift" @click="activeEdit" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
                        <div class="item-head">
                            <i class="index"><b class="present">{{ number }}</b></i>
                            <div class="name-branches">
                                <p class="item-name">{{ name }}</p>
                            </div>
                        </div>
                        <div class="item-chest">
                            <p class="item-description"></p>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-chest">
                            <div class="item-branches">
                                <div class="description">
                                    <p class="description">
                                        <input type="text">
                                    </p>
                                    <p class="container rtf-container">
                                        <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
                                        <span class="rtf">
                                            <i class="glyphicon glyphicon-picture" title="图片"></i>
                                            <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
                                        </span>
                                    </p>
                                    <i class="delete"></i>
                                </div>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: 's1',
                name: '',
                remark: '',
                type: 'choice',
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
            },
            methods: {
                activeEdit: function(event){
                    functions.activeEdit(event,workspace)
                },
                switchEdit: function(event){
                    event.stopPropagation();
                    functions.switchEdit(this);
                    this.activeEdit(event);
                },
                rtfEdit: function(event){
                    functions.rtfEdit(event, this, workspace)
                },
                changeContent: function(target, key){
                    functions.changeContent(target, this, key)
                },
                changeOptionContent: function(target, option){
                    functions.changeOptionContent(this,target,option)
                },
                closeEditor: function(event,curtain,employer){
                    functions.closeEditor(event,curtain,employer)
                },
                preventClose: function(event){
                    functions.preventClose(event)
                },
                switchNeck: function(event){
                    functions.switchNeck(this)
                },
                activeShift: function(event){
                    functions.activeShift(event, this, workspace)
                },
                autoAppendOption: function(event,option){
                    functions.autoAppendOption(event,this,option)
                },
                switchFunc: function(event){
                    functions.switchFunc(event,this)
                },
                batchOption: function(event){
                    functions.batchOption(event,this);
                },
                deleteOption: function(target,option){
                    functions.deleteOption($(target).parents('.option')[0],option,this.options)
                },
                activeOptionShift: function(option,event){
                    functions.activeOptionShift(option,event,this.options)
                },
                stretch_recommend: function(event){
                    functions.stretch_recommend(this)
                },
                settingOptions: function(event){
                    functions.settingOptions(event,this)
                },
                triggerCollect: function(event){
                    functions.triggerCollect(event,this)
                },
                deleteItem: function(event){
                    functions.deleteItem(event, this)
                }
            }
        },
        order: {
            template: `
                <div class="item item-order" @mousedown="activeShift" @click="activeEdit" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <div class="item-func">
                                <span class="trigger" @click="switchFunc">设置</span>
                                <span class="bar">
                                    <span class="setting" :class="{ 'active': config.func_display }">
                                        <i class="coding">编码</i>
                                        <i class="advanced" @click="settingOptions">高级</i>
                                    </span>
                                </span>
                            </div>
                            <div class="item-options">
                                <p class="option" v-for="option in options" :index="option.index">
                                    <span class="option-ceiling"></span>
                                    <span class="option-shift glyphicon glyphicon-option-vertical" @mousedown="activeOptionShift(option,$event)"></span>
                                    <span class="option-content container rtf-container">
                                        <input type="text" class="rtf-target textarea" @focus="autoAppendOption($event,option)" v-model="option.option_content">
                                        <input type="number" class="textarea" v-model="option.price">
                                    </span>
                                    <i class="option-delete glyphicon glyphicon-remove" @click="deleteOption($event.currentTarget,option)"></i>
                                    <b v-if="config.func_display"><input type="text" v-model="option.code"  tabindex="-1"></b>
                                    <span class="option-floor"></span>
                                </p>
                                <p class="about-option">
                                    <span class="append-batch" @click="batchOption">
                                        批量添加
                                    </span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span class="recommend">
                                        <span @click="stretch_recommend">选项引用其他题目答案<b v-if="config.recommend.bool">第【{{ config.recommend.recommended }}】题</b></span>
                                        <span class="pull-down" v-show="recommend_stretched">
                                            <select v-model="config.recommend.recommended">
                                                <option value="">请选择</option>
                                                <option v-for="question in site_questions" v-if="question.index < index && (question.type==='check' || question.type==='sort')" :value="question.id">{{ question.number }}</option>
                                            </select>
                                        </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
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
                    option_number: '',
                    price: 0,
                },{
                    option_id: 2,
                    option_index:2,
                    option_code: '',
                    option_content: '第二项',
                    option_number: '',
                    price: 0,
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
            },
            methods: {
                activeEdit: function(event){
                    functions.activeEdit(event,workspace)
                },
                switchEdit: function(event){
                    event.stopPropagation();
                    functions.switchEdit(this);
                    this.activeEdit(event);
                },
                rtfEdit: function(event){
                    functions.rtfEdit(event, this, workspace)
                },
                changeContent: function(target, key){
                    functions.changeContent(target, this, key)
                },
                changeOptionContent: function(target, option){
                    functions.changeOptionContent(this,target,option)
                },
                closeEditor: function(event,curtain,employer){
                    functions.closeEditor(event,curtain,employer)
                },
                preventClose: function(event){
                    functions.preventClose(event)
                },
                switchNeck: function(event){
                    functions.switchNeck(this)
                },
                activeShift: function(event){
                    functions.activeShift(event, this, workspace)
                },
                autoAppendOption: function(event,option){
                    functions.autoAppendOption(event,this,option)
                },
                switchFunc: function(event){
                    functions.switchFunc(event,this)
                },
                batchOption: function(event){
                    functions.batchOption(event,this);
                },
                deleteOption: function(target,option){
                    functions.deleteOption($(target).parents('.option')[0],option,this.options)
                },
                activeOptionShift: function(option,event){
                    functions.activeOptionShift(option,event,this.options)
                },
                stretch_recommend: function(event){
                    functions.stretch_recommend(this)
                },
                settingOptions: function(event){
                    functions.settingOptions(event,this)
                },
                activeUpload: function(event){
                    functions.activeUpload(event)
                },
                changeOptionUrl: function(event,option){
                    functions.changeOptionUrl(event, option)
                },
                triggerCollect: function(event){
                    functions.triggerCollect(event,this)
                },
                deleteItem: function(event){
                    functions.deleteItem(event, this)
                }
            }
        },
        linkage: {
            template: `
                <div class="item item-linkage" @mousedown="activeShift" @click="activeEdit" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
							    <span class="rtf">
								    <i class="glyphicon glyphicon-picture" title="图片"></i>
								    <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
							    </span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <div class="col-line" v-for="question in sub_question">
                                <div class="row-line" v-for="option in question.options">
                                    <input type="text" class="row-input" v-model="option.option_content">
                                </div>
                                <div class="row-line" @click="addRow(question)"><i class="glyphicon glyphicon-plus"></i></div>
                            </div>
                            <div class="col-line" @click="addCol"><i class="glyphicon glyphicon-plus"></i></div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
                id: 0,
                sub_id: '',
                index: 1,
                page: 1,
                break: 1,
                number: 's1',
                name: '',
                remark: '',
                type: 'choice',
                logic: {jump: [], display: []},
                editing: false,
                sub_question: [{
                    question_id: 0,
                    question_index: 1,
                    options: [{
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
            },
            methods: {
                activeEdit: function(event){
                    functions.activeEdit(event,workspace)
                },
                switchEdit: function(event){
                    event.stopPropagation();
                    functions.switchEdit(this);
                    this.activeEdit(event);
                },
                rtfEdit: function(event){
                    functions.rtfEdit(event, this, workspace)
                },
                changeContent: function(target, key){
                    functions.changeContent(target, this, key)
                },
                changeOptionContent: function(target, option){
                    functions.changeOptionContent(this,target,option)
                },
                closeEditor: function(event,curtain,employer){
                    functions.closeEditor(event,curtain,employer)
                },
                preventClose: function(event){
                    functions.preventClose(event)
                },
                switchNeck: function(event){
                    functions.switchNeck(this)
                },
                activeShift: function(event){
                    functions.activeShift(event, this, workspace)
                },
                triggerCollect: function(event){
                    functions.triggerCollect(event,this)
                },
                addRow: function(question){
                    let id = 0,
                        index = 0;
                    for (let i = 0; i < question.options.length; i++){
                        if (question.options[i].id > id){
                            id = question.options[i].id
                        }
                        if (question.options[i].index > index){
                            index = question.options[i].index
                        }
                    }
                    question.options.push({
                        option_content: '',
                        option_id: id + 1,
                        option_index: index + 1
                    })
                },
                addCol: function(){
                    let id = 0,
                        index = 0;
                    for (let i = 0; i < this.sub_question.length; i++){
                        if (this.sub_question[i].id > id){
                            id = this.sub_question[i].id
                        }
                        if (this.sub_question[i].index > index){
                            index = this.sub_question[i].index
                        }
                    }
                    this.sub_question.push({
                        question_id: id + 1,
                        question_index: index + 1,
                        options: [{
                            option_content: '',
                            option_id: 0
                        }]
                    })
                },
                deleteItem: function(event){
                    functions.deleteItem(event, this)
                }
            }
        }
    },
    quick: {
        name: {
            template: `
                <div class="item item-blank" @mousedown="activeShift" @click="activeEdit" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
						    </p>
                        </div>
                        <div class="item-chest">
                            
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
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
            },
            methods: {
                activeEdit: function(event){
                    functions.activeEdit(event,workspace)
                },
                switchEdit: function(event){
                    event.stopPropagation();
                    functions.switchEdit(this);
                    this.activeEdit(event);
                },
                rtfEdit: function(event){
                    functions.rtfEdit(event, this)
                },
                changeContent: function(target, key){
                    functions.changeContent(target, this, key)
                },
                closeEditor: function(event,curtain,employer){
                    functions.closeEditor(event,curtain,employer)
                },
                preventClose: function(event){
                    functions.preventClose(event)
                },
                switchNeck: function(event){
                    functions.switchNeck(this)
                },
                activeShift: function(event){
                    functions.activeShift(event, this, workspace)
                },
                switchFunc: function(event){
                    functions.switchFunc(event,this)
                },
                stretch_recommend: function(event){
                    functions.stretch_recommend(this)
                },
                triggerCollect: function(event){
                    functions.triggerCollect(event,this)
                },
                deleteItem: function(event){
                    functions.deleteItem(event, this)
                }
            }
        },
        sex: {
            template: `
                <div class="item item-choice" @mousedown="activeShift" @click="activeEdit" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
						    </p>
                        </div>
                        <div class="item-chest">
                            <div class="item-func">
                                <span class="trigger" @click="switchFunc">设置</span>
                                <span class="bar">
                                    <span class="setting" :class="{ 'active': config.func_display }">
                                        <i class="coding">编码</i>
                                        <i class="advanced" @click="settingOptions">高级</i>
                                    </span>
                                </span>
                            </div>
                            <div class="item-options">
                                <p class="option" v-for="option in options" :index="option.index">
                                    <span class="option-ceiling"></span>
                                    <span class="option-shift glyphicon glyphicon-option-vertical" @mousedown="activeOptionShift(option,$event)"></span>
                                    <span class="option-content container rtf-container">
                                        <span class="rtf-target textarea" contenteditable="true" @blur="changeOptionContent($event.target, option)"  v-html="option.option_content"></span>
                                    </span>
                                    <b v-if="config.func_display"><input type="text" v-model="option.code"  tabindex="-1"></b>
                                    <span class="option-floor"></span>
                                </p>
                            </div>
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
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
            },
            methods: {
                activeEdit: function(event){
                    functions.activeEdit(event,workspace)
                },
                switchEdit: function(event){
                    event.stopPropagation();
                    functions.switchEdit(this);
                    this.activeEdit(event);
                },
                rtfEdit: function(event){
                    functions.rtfEdit(event, this)
                },
                changeContent: function(target, key){
                    functions.changeContent(target, this, key)
                },
                changeOptionContent: function(target, option){
                    functions.changeOptionContent(this,target,option)
                },
                closeEditor: function(event,curtain,employer){
                    functions.closeEditor(event,curtain,employer)
                },
                preventClose: function(event){
                    functions.preventClose(event)
                },
                switchNeck: function(event){
                    functions.switchNeck(this)
                },
                activeShift: function(event){
                    functions.activeShift(event, this, workspace)
                },
                switchFunc: function(event){
                    functions.switchFunc(event,this)
                },
                activeOptionShift: function(option,event){
                    functions.activeOptionShift(option,event,this.options)
                },
                stretch_recommend: function(event){
                    functions.stretch_recommend(this)
                },
                settingOptions: function(event){
                    functions.settingOptions(event,this)
                },
                triggerCollect: function(event){
                    functions.triggerCollect(event,this)
                },
                deleteItem: function(event){
                    functions.deleteItem(event, this)
                }
            }
        },
        age: {
            template: `
                <div class="item item-blank" @mousedown="activeShift" @click="activeEdit" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
						    </p>
                        </div>
                        <div class="item-chest">
                            
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
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
            },
            methods: {
                activeEdit: function(event){
                    functions.activeEdit(event,workspace)
                },
                switchEdit: function(event){
                    event.stopPropagation();
                    functions.switchEdit(this);
                    this.activeEdit(event);
                },
                rtfEdit: function(event){
                    functions.rtfEdit(event, this)
                },
                changeContent: function(target, key){
                    functions.changeContent(target, this, key)
                },
                closeEditor: function(event,curtain,employer){
                    functions.closeEditor(event,curtain,employer)
                },
                preventClose: function(event){
                    functions.preventClose(event)
                },
                switchNeck: function(event){
                    functions.switchNeck(this)
                },
                activeShift: function(event){
                    functions.activeShift(event, this, workspace)
                },
                switchFunc: function(event){
                    functions.switchFunc(event,this)
                },
                stretch_recommend: function(event){
                    functions.stretch_recommend(this)
                },
                triggerCollect: function(event){
                    functions.triggerCollect(event,this)
                },
                deleteItem: function(event){
                    functions.deleteItem(event, this)
                }
            }
        },
        company: {
            template: `
                <div class="item item-blank" @mousedown="activeShift" @click="activeEdit" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
						    </p>
                        </div>
                        <div class="item-chest">
                            
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
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
            },
            methods: {
                activeEdit: function(event){
                    functions.activeEdit(event,workspace)
                },
                switchEdit: function(event){
                    event.stopPropagation();
                    functions.switchEdit(this);
                    this.activeEdit(event);
                },
                rtfEdit: function(event){
                    functions.rtfEdit(event, this)
                },
                changeContent: function(target, key){
                    functions.changeContent(target, this, key)
                },
                closeEditor: function(event,curtain,employer){
                    functions.closeEditor(event,curtain,employer)
                },
                preventClose: function(event){
                    functions.preventClose(event)
                },
                switchNeck: function(event){
                    functions.switchNeck(this)
                },
                activeShift: function(event){
                    functions.activeShift(event, this, workspace)
                },
                switchFunc: function(event){
                    functions.switchFunc(event,this)
                },
                activeSubQuestionShift: function(question,event){
                    functions.activeSubQuestionShift(question,event,this.sub_questions)
                },
                stretch_recommend: function(event){
                    functions.stretch_recommend(this)
                },
                triggerCollect: function(event){
                    functions.triggerCollect(event,this)
                },
                deleteItem: function(event){
                    functions.deleteItem(event, this)
                }
            }
        },
        department: {
            template: `
                <div class="item item-blank" @mousedown="activeShift" @click="activeEdit" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
						    </p>
                        </div>
                        <div class="item-chest">
                            
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
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
            },
            methods: {
                activeEdit: function(event){
                    functions.activeEdit(event,workspace)
                },
                switchEdit: function(event){
                    event.stopPropagation();
                    functions.switchEdit(this);
                    this.activeEdit(event);
                },
                rtfEdit: function(event){
                    functions.rtfEdit(event, this)
                },
                changeContent: function(target, key){
                    functions.changeContent(target, this, key)
                },
                closeEditor: function(event,curtain,employer){
                    functions.closeEditor(event,curtain,employer)
                },
                preventClose: function(event){
                    functions.preventClose(event)
                },
                switchNeck: function(event){
                    functions.switchNeck(this)
                },
                activeShift: function(event){
                    functions.activeShift(event, this, workspace)
                },
                switchFunc: function(event){
                    functions.switchFunc(event,this)
                },
                stretch_recommend: function(event){
                    functions.stretch_recommend(this)
                },
                triggerCollect: function(event){
                    functions.triggerCollect(event,this)
                },
                deleteItem: function(event){
                    functions.deleteItem(event, this)
                }
            }
        },
        ID_card: {
            template: ``,
            data: {}
        },
        pcc: {
            template: ``,
            data: {}
        },
        address: {
            template: `
                <div class="item item-blank" @mousedown="activeShift" @click="activeEdit" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
						    </p>
                        </div>
                        <div class="item-chest">
                            
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
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
            },
            methods: {
                activeEdit: function(event){
                    functions.activeEdit(event,workspace)
                },
                switchEdit: function(event){
                    event.stopPropagation();
                    functions.switchEdit(this);
                    this.activeEdit(event);
                },
                rtfEdit: function(event){
                    functions.rtfEdit(event, this)
                },
                changeContent: function(target, key){
                    functions.changeContent(target, this, key)
                },
                closeEditor: function(event,curtain,employer){
                    functions.closeEditor(event,curtain,employer)
                },
                preventClose: function(event){
                    functions.preventClose(event)
                },
                switchNeck: function(event){
                    functions.switchNeck(this)
                },
                activeShift: function(event){
                    functions.activeShift(event, this, workspace)
                },
                switchFunc: function(event){
                    functions.switchFunc(event,this)
                },
                stretch_recommend: function(event){
                    functions.stretch_recommend(this)
                },
                triggerCollect: function(event){
                    functions.triggerCollect(event,this)
                },
                deleteItem: function(event){
                    functions.deleteItem(event, this)
                }
            }
        },
        email: {
            template: `
                <div class="item item-blank" @mousedown="activeShift" @click="activeEdit" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
						    </p>
                        </div>
                        <div class="item-chest">
                            
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
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
            },
            methods: {
                activeEdit: function(event){
                    functions.activeEdit(event,workspace)
                },
                switchEdit: function(event){
                    event.stopPropagation();
                    functions.switchEdit(this);
                    this.activeEdit(event);
                },
                rtfEdit: function(event){
                    functions.rtfEdit(event, this)
                },
                changeContent: function(target, key){
                    functions.changeContent(target, this, key)
                },
                closeEditor: function(event,curtain,employer){
                    functions.closeEditor(event,curtain,employer)
                },
                preventClose: function(event){
                    functions.preventClose(event)
                },
                switchNeck: function(event){
                    functions.switchNeck(this)
                },
                activeShift: function(event){
                    functions.activeShift(event, this, workspace)
                },
                switchFunc: function(event){
                    functions.switchFunc(event,this)
                },
                stretch_recommend: function(event){
                    functions.stretch_recommend(this)
                },
                triggerCollect: function(event){
                    functions.triggerCollect(event,this)
                },
                deleteItem: function(event){
                    functions.deleteItem(event, this)
                }
            }
        },
        telephone: {
            template: `
                <div class="item item-blank" @mousedown="activeShift" @click="activeEdit" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
						    </p>
                        </div>
                        <div class="item-chest">
                            
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
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
            },
            methods: {
                activeEdit: function(event){
                    functions.activeEdit(event,workspace)
                },
                switchEdit: function(event){
                    event.stopPropagation();
                    functions.switchEdit(this);
                    this.activeEdit(event);
                },
                rtfEdit: function(event){
                    functions.rtfEdit(event, this)
                },
                changeContent: function(target, key){
                    functions.changeContent(target, this, key)
                },
                closeEditor: function(event,curtain,employer){
                    functions.closeEditor(event,curtain,employer)
                },
                preventClose: function(event){
                    functions.preventClose(event)
                },
                switchNeck: function(event){
                    functions.switchNeck(this)
                },
                activeShift: function(event){
                    functions.activeShift(event, this, workspace)
                },
                switchFunc: function(event){
                    functions.switchFunc(event,this)
                },
                stretch_recommend: function(event){
                    functions.stretch_recommend(this)
                },
                triggerCollect: function(event){
                    functions.triggerCollect(event,this)
                },
                deleteItem: function(event){
                    functions.deleteItem(event, this)
                }
            }
        },
        cellphone: {
            template: `
                <div class="item item-blank" @mousedown="activeShift" @click="activeEdit" v-if="config.exist && page === config.page_now">
                    <div class="present" v-if="!editing" @click="switchEdit">
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
                        <div class="control">
                            <ul>
                                <li><i class="glyphicon glyphicon-edit"></i></li>
                                <li @click="deleteItem"><i class="glyphicon glyphicon-ban-circle"></i></li>
                                <li :class="{ collected: config.collected }" @click="triggerCollect">
                                    <i class="glyphicon glyphicon-heart" v-if="config.collected"></i>
                                    <i class="glyphicon glyphicon-heart-empty" v-else></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="edit" v-if="editing">
                        <div class="item-head">
                            <i class="index">
                                <!--<b class="present">{{ id }}</b>-->
                                <input type="text" class="edit" v-model="number" >
                            </i>
                            <p class="item-name name-container container rtf-container">
                                <span class="item-name rtf-target textarea" contenteditable="true" @blur="changeContent($event.target, 'name')" v-html="name" ></span>
		        		        <span class="rtf">
							        <i class="glyphicon glyphicon-picture" title="图片"></i>
							        <i class="glyphicon glyphicon-font" title="高级" @click="rtfEdit"></i>
						        </span>
                            </p>
                        </div>
                        <div class="item-neck">
                            <div class="neck-trigger" @click="switchNeck">
                                <span>添加描述</span>
                            </div>
                            <p class="item-remark remark-container container rtf-container" :class="{ 'stretch': config.neck && !config.neck_initial }">
							    <span class="remark rtf-target textarea" contenteditable="true" :class="{ 'stretch': config.neck && !config.neck_initial, 'shrink': !config.neck && !config.neck_initial }" @blur="changeContent($event.target, 'remark')"  v-html="remark"></span>
						    </p>
                        </div>
                        <div class="item-chest">
                            
                        </div>
                        <div class="item-foot"></div>
                        <div class="item-floor"></div>
                        <div class="control">
                            <ul>
                                <li><b @click="switchEdit" class="glyphicon glyphicon-ok"></b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `,
            data: {
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
            methods: {
                activeEdit: function(event){
                    functions.activeEdit(event,workspace)
                },
                switchEdit: function(event){
                    event.stopPropagation();
                    functions.switchEdit(this);
                    this.activeEdit(event);
                },
                rtfEdit: function(event){
                    functions.rtfEdit(event, this)
                },
                changeContent: function(target, key){
                    functions.changeContent(target, this, key)
                },
                closeEditor: function(event,curtain,employer){
                    functions.closeEditor(event,curtain,employer)
                },
                preventClose: function(event){
                    functions.preventClose(event)
                },
                switchNeck: function(event){
                    functions.switchNeck(this)
                },
                activeShift: function(event){
                    functions.activeShift(event, this, workspace)
                },
                switchFunc: function(event){
                    functions.switchFunc(event,this)
                },
                stretch_recommend: function(event){
                    functions.stretch_recommend(this)
                },
                triggerCollect: function(event){
                    functions.triggerCollect(event,this)
                },
                deleteItem: function(event){
                    functions.deleteItem(event, this)
                }
            }
        },
        education: {
            template: ``,
            data: {}
        },
        industry: {
            template: ``,
            data: {}
        },
        grade: {
            template: ``,
            data: {}
        },
        experiment: {
            template: ``,
            data: {}
        },
        working_year: {
            template: ``,
            data: {}
        },
        commonly: {
            template: ``,
            data: {}
        },
        industry_evasion: {
            template: ``,
            data: {}
        },
        time: {
            template: ``,
            data: {}
        },
        date: {
            template: ``,
            data: {}
        },
        other: {

        }
    }
};

export default templates;
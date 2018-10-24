/**
 * Created by wangxiangyang on 2017/9/27.
 */

//模块html
var component = `
    <div class="inners" :id="'q' + item_id">
        <div class="inner choice" v-if="type==='choice'">
            <div class="display" v-show="!editing">
                <div class="question_head">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="description">{{ description }}</div>
                <div class="control">
                    <div class="button up" @click="moveUp">{</div>
                    <div class="button down" @click="moveDown">}</div>
                    <div class="button edit" @click="edit">W</div>
                    <div class="button delete" @click="deleteQ">#</div>
                    <div class="button logic" @click="logic">%</div>
                </div>
                <div class="answers">
                    <div class="input choice" v-for="option in options" :key="option.optionId">
                        <input :id="'radio_q' + item_id + '_op' + option.optionId" :name="'q' + item_id" type="radio" :value="option.value" @change="check">
                        <label :for="'radio_q' + item_id + '_op' + option.optionId">
                            <i class="icon"><span></span></i>
                            <span class="option_text">{{ option.value }}</span>
                        </label>
                        <span class="blank" contenteditable="true" v-show="option.fillable"></span>
                    </div>
                </div>
            </div>
            <div class="edit" v-show="editing">
                <div class="question_head">
                    <div class="question_title" placeholder="请输入问题标题" contenteditable="true" @input="editTitle"></div>
                    <span class="question_require">
                        <input type="checkbox" :id="'require_q' + item_id" :checked="required" @change="editRequired">
                        <label :for="'require_q' + item_id">
                            <i class="icon checked"></i>
                            <span>必答</span>
                        </label>
                    </span>
                </div>
               <span class="description_label">题目描述: </span>
                <div class="description" placeholder="请输入问题描述" contenteditable="true" @input="editDescription"></div>
                <div class="control">
                    <div class="button save" @click="save">3</div>
                    <div class="button cancel" @click="cancel">d</div>
                    <div class="button delete" @click="deleteQ">#</div>
                    <div class="button logic" @click="logic">%</div>
                </div>
                <div class="answers">
                    <div class="input choice" v-for="option in options" :key="option.optionId">
                        <i class="icon" :option_id="option.optionId" @click="deleteOption">*</i>
                        <div class="option_text" :option_id="option.optionId" placeholder="输入选项" contenteditable="true" @input="editOption"></div>
                        <span class="option_fillable">
                            <input type="checkbox" :id="'fillable_q' + item_id + '_op' + option.optionId" :option_id="option.optionId" :checked="option.fillable" @change="editFillable">
                            <label :for="'fillable_q' + item_id + '_op' + option.optionId">
                                <i class="icon"></i>
                                <span>开放</span>
                            </label>
                        </span>
                    </div>
                    <div class="input choice insert" @click=insertOption>
                        <i class="icon">&</i>
                    </div>
                </div>
            </div>
        </div>
        <div class="inner checks" v-if="type==='checks'">
            <div class="display" v-show="!editing">
                <div class="question_head">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="description">{{ description }}</div>
                <div class="control">
                    <div class="button up" @click="moveUp">{</div>
                    <div class="button down" @click="moveDown">}</div>
                    <div class="button edit" @click="edit">W</div>
                    <div class="button delete" @click="deleteQ">#</div>
                    <div class="button logic" @click="logic">%</div>
                </div>
                <div class="answers">
                    <div class="input checks" v-for="option in options" :key="option.optionId">
                        <input :id="'checks_q' + item_id + '_op' + option.optionId" :name="'q' + item_id" type="checkbox" :value="option.value" @change="check">
                        <label :for="'checks_q' + item_id + '_op' + option.optionId">
                            <i class="icon"><span></span></i>
                            <span class="option_text">{{ option.value }}</span>
                        </label>
                        <span class="blank" contenteditable="true" v-show="option.fillable"></span>
                    </div>
                </div>
            </div>
            <div class="edit" v-show="editing">
                <div class="question_head">
                    <div class="question_title" placeholder="请输入问题标题" contenteditable="true" @input="editTitle"></div>
                    <span class="question_require">
                        <input type="checkbox" :id="'require_q' + item_id" :checked="required" @change="editRequired">
                        <label :for="'require_q' + item_id">
                            <i class="icon checked"></i>
                            <span>必答</span>
                        </label>
                    </span>
                </div>
                <span class="description_label">题目描述: </span>
                <div class="description" placeholder="请输入问题描述" contenteditable="true" @input="editDescription"></div>
                <div class="control">
                    <div class="button save" @click="save">3</div>
                    <div class="button cancel" @click="cancel">d</div>
                    <div class="button delete" @click="deleteQ">#</div>
                    <div class="button logic" @click="logic">%</div>
                </div>
                <div class="answers">
                    <div class="input checks" v-for="option in options" :key="option.optionId">
                        <i class="icon" :option_id="option.optionId" @click="deleteOption">*</i>
                        <div class="option_text" :option_id="option.optionId" placeholder="输入选项" contenteditable="true" @input="editOption"></div>
                        <span class="option_fillable">
                            <input type="checkbox" :id="'fillable_q' + item_id + '_op' + option.optionId" :option_id="option.optionId" :checked="option.fillable" @change="editFillable">
                            <label :for="'fillable_q' + item_id + '_op' + option.optionId">
                                <i class="icon"></i>
                                <span>开放</span>
                            </label>
                        </span>
                    </div>
                    <div class="input checks insert" @click="insertOption">
                        <i class="icon">&</i>
                    </div>
                </div>
            </div>
        </div>
        <div class="inner blank" v-if="type==='blank'">
            <div class="display" v-show="!editing">
                <div class="question_head">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="description">{{ description }}</div>
                <div class="control">
                    <div class="button up" @click="moveUp">{</div>
                    <div class="button down" @click="moveDown">}</div>
                    <div class="button edit" @click="edit">W</div>
                    <div class="button delete" @click="deleteQ">#</div>
                    <div class="button logic" @click="logic">%</div>
                </div>
                <div class="answers single" v-show="form==='single'">
                    <div class="input blank">
                        <span class="blank" contenteditable="true"></span>
                        <span class="suffix">{{ suffix }}</span>
                    </div>
                </div>
                <div class="answers multi" v-show="form==='multi'">
                    <div class="input blank">
                        <div class="questions" v-for="question in sub_questions" :key="question.index">
                            <span class="sub_question">{{ question.title }}<i>:</i></span>
                            <span class="blank" contenteditable="true"></span>
                        </div>
                    </div>
                </div>
                <div class="answers textarea" v-show="form==='textarea'">
                    <div class="input blank">
                        <div class="blank" contenteditable="true"></div>
                    </div>
                </div>
                <div class="answers time" v-show="form==='time'">
                    <div class="input blank">
                        <span class="blank" contenteditable="true" v-show="need.time.indexOf('hour') >= 0"></span>
                        <span class="hour" v-show="need.time.indexOf('hour') >= 0">时</span>
                        <span class="blank" contenteditable="true" v-show="need.time.indexOf('minute') >= 0"></span>
                        <span class="hour" v-show="need.time.indexOf('minute') >= 0">分</span>
                        <span class="blank" contenteditable="true" v-show="need.time.indexOf('second') >= 0"></span>
                        <span class="hour" v-show="need.time.indexOf('second') >= 0">秒</span>
                    </div>
                </div>
                <div class="answers date" v-show="form==='date'">
                    <div class="input blank">
                        <span class="blank" contenteditable="true" v-show="need.date.indexOf('year') >= 0"></span>
                        <span class="hour" v-show="need.date.indexOf('year') >= 0">年</span>
                        <span class="blank" contenteditable="true" v-show="need.date.indexOf('month') >= 0"></span>
                        <span class="hour" v-show="need.date.indexOf('month') >= 0">月</span>
                        <span class="blank" contenteditable="true" v-show="need.date.indexOf('date') >= 0"></span>
                        <span class="hour" v-show="need.date.indexOf('date') >= 0">日</span>
                    </div>
                </div>
            </div>
            <div class="edit" v-show="editing">
                <div class="question_head">
                    <div class="question_title" placeholder="请输入问题标题" contenteditable="true" @input="editTitle"></div>
                    <span class="question_require">
                        <input type="checkbox" :id="'require_q' + item_id" :checked="required" @change="editRequired">
                        <label :for="'require_q' + item_id">
                            <i class="icon checked"></i>
                            <span>必答</span>
                        </label>
                    </span>
                </div>
                <span class="description_label">题目描述: </span>
                <div class="description" placeholder="请输入问题描述" contenteditable="true" @input="editDescription"></div>
                <div class="control">
                    <div class="button save" @click="save">3</div>
                    <div class="button cancel" @click="cancel">d</div>
                    <div class="button delete" @click="deleteQ">#</div>
                    <div class="button logic" @click="logic">%</div>
                </div>
                <div class="blank_switch">
                    <label :for="'type_q' + item_id">填空类型</label>
                    <select :id="'type_q' + item_id" :value="form" @change="changeForm">
                        <option value="single">单项填空</option>
                        <option value="multi">多项填空</option>
                        <option value="textarea">多行文本</option>
                        <option value="time">时间</option>
                        <option value="date">日期</option>
                    </select>
                </div>
                <div class="answers single" v-show="form==='single'">
                    <div class="suffix">
                        <span>单位/后缀</span>
                        <input type="text" :value="suffix" @change="editSuffix">
                    </div>
                </div>
                <div class="answers multi active" v-show="form==='multi'">
                    <div class="input blank" v-for="question in sub_questions" :key="question.index">
                        <i class="icon" :question_id="question.index" @click="deleteSubQuestion">*</i>
                        <div class="sub_question" :question_id="question.index" placeholder="输入子问题" contenteditable="true" @input="editSubQuestion"></div>
                    </div>
                    <div class="input blank insert" @click="insertSubQuestion">
                        <i class="icon">&</i>
                    </div>
                </div>
                <div class="answers textarea" v-show="form==='textarea'">
                </div>
                <div class="answers time" v-show="form==='time'">
                    <div class="require_time">
                        <input :id="'hour_q' + item_id" type="checkbox" @change="toggleHour"><label :for="'hour_q' + item_id">时</label>
                        <input :id="'minute_q' + item_id" type="checkbox" @change="toggleMinute"><label :for="'minute_q' + item_id">分</label>
                        <input :id="'second_q' + item_id" type="checkbox" @change="toggleSecond"><label :for="'second_q' + item_id">秒</label>
                    </div>
                </div>
                <div class="answers date" v-show="form==='date'">
                    <div class="require_time">
                        <input :id="'year_q' + item_id" type="checkbox" @change="toggleYear"><label :for="'year_q' + item_id">年</label>
                        <input :id="'month_q' + item_id" type="checkbox" @change="toggleMonth"><label :for="'month_q' + item_id">月</label>
                        <input :id="'date_q' + item_id" type="checkbox" @change="toggleDate"><label :for="'date_q' + item_id">日</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="inner matrix" v-if="type==='matrix'">
            <div class="display" v-show="!editing">
                <div class="question_head">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="description">{{ description }}</div>
                <div class="control">
                    <div class="button up" @click="moveUp">{</div>
                    <div class="button down" @click="moveDown">}</div>
                    <div class="button edit" @click="edit">W</div>
                    <div class="button delete" @click="deleteQ">#</div>
                    <div class="button logic" @click="logic">%</div>
                </div>
                <div class="answers matrix" v-if="form==='row'">
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th v-for="option in options" :key="option.optionId">{{ option.value }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="question in sub_questions" :key="question.index">
                            <td>{{ question.title }}</td>
                            <td v-for="option in options" :key="option.optionId">
                                <input :name="question.title" :value="option.value" type="checkbox" v-if="the_class==='multi'">
                                <input :name="question.title" :value="option.value" type="radio" v-if="the_class==='single' || the_class==='score'">
                                <input :name="question.title" :sbt="option.value" type="text" v-if="the_class==='blank'">
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="answers matrix" v-if="form==='col'">
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th v-for="question in sub_questions" :key="question.index">{{ question.title }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="option in options" :key="option.optionId">
                            <td>{{ option.value }}</td>
                            <td v-for="question in sub_questions" :key="question.index">
                                <input :name="question.title" :value="option.value" type="checkbox" v-if="the_class==='multi'">
                                <input :name="question.title" :value="option.value" type="radio" v-if="the_class==='single' || the_class==='score'">
                                <input :name="question.title" :value="option.value" type="text" v-if="the_class==='blank'">
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="edit" v-show="editing">
                <div class="question_head">
                    <div class="question_title" placeholder="请输入问题标题" contenteditable="true" @input="editTitle"></div>
                    <span class="question_require">
                        <input type="checkbox" :id="'require_q' + item_id" :checked="required" @change="editRequired">
                        <label :for="'require_q' + item_id">
                            <i class="icon checked"></i>
                            <span>必答</span>
                        </label>
                    </span>
                </div>
                <span class="description_label">题目描述: </span>
                <div class="description" placeholder="请输入问题描述" contenteditable="true" @input="editDescription"></div>
                <div class="control">
                    <div class="button save" @click="save">3</div>
                    <div class="button cancel" @click="cancel">d</div>
                    <div class="button delete" @click="deleteQ">#</div>
                    <div class="button logic" @click="logic">%</div>
                </div>
                <div class="matrix_switch">
                    <label :for="'class_q' + item_id">矩阵类型</label>
                    <select :id="'class_q' + item_id" :value="the_class" @change="changeClass">
                        <option value="single" selected>矩阵单选</option>
                        <option value="multi">矩阵多选</option>
                        <option value="blank">矩阵填空</option>
                        <option value="score">矩阵评分</option>
                    </select>
                </div>
                <div class="answers matrix" v-if="form==='row'">
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th class="delete-icon" v-for="option in options" :key="option.optionId"  :option_id="option.optionId" @click="deleteOption">*</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td></td>
                            <td class="inputs"></td>
                            <td class="inputs" placeholder="输入选项" contenteditable="true" v-for="option in options" :key="option.optionId" :option_id="option.optionId" @input="editOption"></td>
                            <td class="insert-icon" @click="insertOption">&</td>
                        </tr>
                        <tr v-for="question in sub_questions" :key="question.index">
                            <td class="delete-icon" @click="deleteSubQuestion" :question_id="question.index">*</td>
                            <td class="inputs" placeholder="输入子问题" contenteditable="true" :question_id="question.index" @input="editSubQuestion"></td>
                            <td v-for="option in options" :key="option.optionId">
                                <input :name="question.index" type="checkbox" v-if="the_class==='multi'">
                                <input :name="question.index" type="radio" v-if="the_class==='single' || the_class==='score'">
                                <input :name="question.index" type="text" v-if="the_class==='blank'">
                            </td>
                        </tr>
                        <tr class="insert">
                            <td></td>
                            <td class="insert-icon" @click="insertSubQuestion">&</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="answers matrix" v-if="form==='col'">
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th class="delete-icon" v-for="question in sub_questions" :key="question.index"  :question_id="question.index" @click="deleteSubQuestion">*</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="prefix" @mousedown="dragPrefix">
                        <td></td>
                        <td></td>
                        <td v-for="question in sub_questions" :key="question.index" :question_id="question.index" @input="editPrefix" class="edit-prefix"></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td class="inputs"></td>
                            <td class="inputs" placeholder="输入子问题" contenteditable="true" v-for="question in sub_questions" :key="question.index" :question_id="question.index" @input="editSubQuestion"></td>
                            <td class="insert-icon" @click="insertSubQuestion">&</td>
                        </tr>
                        <tr v-for="option in options" :key="option.optionId">
                            <td class="delete-icon" @click="deleteOption" :option_id="option.optionId">*</td>
                            <td class="inputs" placeholder="输入选项" contenteditable="true" :option_id="option.optionId" @input="editOption"></td>
                            <td v-for="question in sub_questions" :key="question.index">
                                <input :name="question.index" type="checkbox" v-if="the_class==='multi'">
                                <input :name="question.index" type="radio" v-if="the_class==='single' || the_class==='score'">
                                <input :name="question.index" type="text" v-if="the_class==='blank'">
                            </td>
                        </tr>
                        <tr class="insert">
                            <td></td>
                            <td class="insert-icon" @click="insertOption">&</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="inner score" v-if="type==='score'">
            <div class="display" v-show="!editing">
                <div class="question_head">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="description">{{ description }}</div>
                <div class="control">
                    <div class="button up" @click="moveUp">{</div>
                    <div class="button down" @click="moveDown">}</div>
                    <div class="button edit" @click="edit">W</div>
                    <div class="button delete" @click="deleteQ">#</div>
                    <div class="button logic" @click="logic">%</div>
                </div>
                <div class="answers score">
                    <div class="score" v-for="option in options" :key="option.optionId">
                        <input :id="'checks_q' + item_id + '_op' + option.optionId" :name="'q' + item_id" type="radio" :value="option.value" @change="mark">
                        <label :for="'checks_q' + item_id + '_op' + option.optionId">
                            <span>{{ option.value }}</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="edit" v-show="editing">
                <div class="question_head">
                    <div class="question_title" placeholder="请输入问题标题" contenteditable="true" @input="editTitle"></div>
                    <span class="question_require">
                        <input type="checkbox" :id="'require_q' + item_id" :checked="required" @change="editRequired">
                        <label :for="'require_q' + item_id">
                            <i class="icon checked"></i>
                            <span>必答</span>
                        </label>
                    </span>
                </div>
                <span class="description_label">题目描述: </span>
                <div class="description" placeholder="请输入问题描述" contenteditable="true" @input="editDescription"></div>
                <div class="control">
                    <div class="button save" @click="save">3</div>
                    <div class="button cancel" @click="cancel">d</div>
                    <div class="button delete" @click="deleteQ">#</div>
                    <div class="button logic" @click="logic">%</div>
                </div>
                <div class="score_switch">
                    <label :for="'form_q' + item_id">显示形式</label>
                    <select :id="'form_q' + item_id" :value="form" @change="changeForm">
                        <option value="number">分数</option>
                        <option value="text">文字描述</option>
                        <option value="img">图形</option>
                    </select>
                </div>
                <div class="answers score">
                    <div class="input score" v-for="option in options" :key="option.optionId">
                        <i class="icon" :option_id="option.optionId" @click="deleteOption">*</i>
                        <span class="title_prefix">文字描述</span>
                        <div class="score_title" placeholder="输入分数描述" contenteditable="true" :option_id="option.optionId" @input="editOption"></div>
                        <span class="number_prefix">分数</span>
                        <div :option_id="option.optionId" placeholder="分数" class="score_number" contenteditable="true" @input="editScore"></div>
                    </div>
                    <div class="input score insert" @click="insertOption">
                        <i class="icon">&</i>
                    </div>
                </div>
            </div>
        </div>
        <div class="inner sort" v-if="type==='sort'">
            <div class="display" v-show="!editing">
                <div class="question_head">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title">{{ title }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="description">{{ description }}</div>
                <div class="control">
                    <div class="button up" @click="moveUp">{</div>
                    <div class="button down" @click="moveDown">}</div>
                    <div class="button edit" @click="edit">W</div>
                    <div class="button delete" @click="deleteQ">#</div>
                    <div class="button logic" @click="logic">%</div>
                </div>
                <div class="answers sort" v-show="form === 'click'">
                    <div class="sort" v-for="option in options" :key="option.optionId">
                        <input :id="'checks_q' + item_id + '_op' + option.optionId" :name="'q' + item_id" type="checkbox" :value="option.value" @change="sort">
                        <label :for="'checks_q' + item_id + '_op' + option.optionId" class="first">
                            <span>{{ option.value }}</span>
                        </label>
                    </div>
                </div>
                <div class="answers sort" v-show="form === 'cols'">
                    <div class="to-sort">
                        <div class="sort" v-for="option in options" :key="option.optionId">
                            <input :id="'checks_q' + item_id + '_op' + option.optionId" :name="'q' + item_id" type="checkbox" :value="option.value" @change="sort">
                            <label :for="'checks_q' + item_id + '_op' + option.optionId" class="first">
                                <span>{{ option.value }}</span>
                            </label>
                        </div>
                    </div>
                    <div class="sorted">
                        <div class="sort" v-for="option in options" :value="option"></div>
                    </div>
                </div>
                <div class="answers sort" v-show="form === 'drag'">
                    <div class="sort" v-for="option in options" :key="option.optionId">
                        <input :id="'checks_q' + item_id + '_op' + option.optionId" :name="'q' + item_id" type="checkbox" :value="option.value" @change="sort">
                        <label :for="'checks_q' + item_id + '_op' + option.optionId" class="first">
                            <span>{{ option.value }}</span>
                        </label>
                    </div>
                </div>
                <div class="answers sort" v-show="form === 'mark'">
                    <div class="sort" v-for="option in options" :key="option.optionId">
                        <input :id="'checks_q' + item_id + '_op' + option.optionId" :name="'q' + item_id" type="checkbox" :value="option.value" @change="sort">
                        <label :for="'checks_q' + item_id + '_op' + option.optionId" class="first">
                            <span>{{ option.value }}</span>
                        </label>
                    </div>
                </div>
                <div class="answers sort" v-show="form === 'input'">
                    <div class="sort" v-for="option in options" :key="option.optionId">
                        <input :id="'checks_q' + item_id + '_op' + option.optionId" :name="'q' + item_id" type="checkbox" :value="option.value" @change="sort">
                        <label :for="'checks_q' + item_id + '_op' + option.optionId" class="first">
                            <span>{{ option.value }}</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="edit" v-show="editing">
                <div class="question_head">
                    <div class="question_title" placeholder="请输入问题标题" contenteditable="true" @input="editTitle"></div>
                    <span class="question_require">
                        <input type="checkbox" :id="'require_q' + item_id" :checked="required" @change="editRequired">
                        <label :for="'require_q' + item_id">
                            <i class="icon checked"></i>
                            <span>必答</span>
                        </label>
                    </span>
                </div>
                <span class="description_label">题目描述: </span>
                <div class="description" placeholder="请输入问题描述" contenteditable="true" @input="editDescription"></div>
                <div class="control">
                    <div class="button save" @click="save">3</div>
                    <div class="button cancel" @click="cancel">d</div>
                    <div class="button delete" @click="deleteQ">#</div>
                    <div class="button logic" @click="logic">%</div>
                </div>
                <div class="sort_switch">
                    <label :for="'form_q' + item_id">显示形式</label>
                    <select :id="'form_q' + item_id" :value="form" @change="changeForm">
                        <option value="click">点击</option>
                        <option value="cols">分栏</option>
                        <option value="drag">拖拽</option>
                        <option value="mark">打分</option>
                        <option value="input">输入</option>
                    </select>
                </div>
                <div class="answers sort">
                    <div class="input sort" v-for="option in options" :key="option.optionId">
                        <i class="icon" :option_id="option.optionId" @click="deleteOption">*</i>
                        <span class="sort_prefix">文字描述</span>
                        <div class="sort_title" placeholder="输入选项" contenteditable="true" :option_id="option.optionId" @input="editOption"></div>
                    </div>
                    <div class="input sort insert" @click="insertOption">
                        <i class="icon">&</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
`,
    message =
       `<div class="inners" :id="'q' + item_id" v-if="type instanceof Array">
            <div class="inner message name">

                <div class="question_head name display" v-if="type.indexOf('name') > -1" v-show="!editing">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="name">{{ title.name }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="question_head name edit" v-if="type.indexOf('name') > -1" v-show="editing">
                    <div class="question_title" contenteditable="true" @input="editTitle" name="name">请输入姓名</div>
                    <span class="question_require">
                        <input type="checkbox" :id="'require_q' + item_id" :checked="required" @change="editRequired">
                        <label :for="'require_q' + item_id">
                            <i class="icon checked"></i>
                            <span>必答</span>
                        </label>
                    </span>
                </div>
                <div class="answers name" v-if="type.indexOf('name') > -1">
                    <div class="input">
                        <span class="blank" contenteditable="true"></span>
                    </div>
                </div>

                <div class="question_head sex display" v-if="type.indexOf('sex') > -1" v-show="!editing">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="sex">{{ title.sex }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="question_head sex edit" v-if="type.indexOf('sex') > -1" v-show="editing">
                    <div class="question_title" contenteditable="true" @input="editTitle" name="sex">请输入性别</div>
                    <span class="question_require">
                        <input type="checkbox" :id="'require_q' + item_id" :checked="required" @change="editRequired">
                        <label :for="'require_q' + item_id">
                            <i class="icon checked"></i>
                            <span>必答</span>
                        </label>
                    </span>
                </div>
                <div class="answers sex" v-if="type.indexOf('sex') > -1">
                    <div class="input choice">
                        <input :id="'radio_q' + item_id + '_op1'" :name="'q' + item_id + 'sex'" type="radio" value="男" @change="check">
                        <label :for="'radio_q' + item_id + '_op1'">
                            <i class="icon"><span></span></i>
                            <span class="option_text">男</span>
                        </label>
                    </div>
                    <div class="input choice">
                        <input :id="'radio_q' + item_id + '_op2'" :name="'q' + item_id + 'sex'" type="radio" value="女" @change="check">
                        <label :for="'radio_q' + item_id + '_op2'">
                            <i class="icon"><span></span></i>
                            <span class="option_text">女</span>
                        </label>
                    </div>
                </div>

                <div class="question_head age display" v-if="type.indexOf('age') > -1" v-show="!editing">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="age">{{ title.age }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="question_head age edit" v-if="type.indexOf('age') > -1" v-show="editing">
                    <div class="question_title" contenteditable="true" @input="editTitle" name="age">请输入年龄</div>
                    <span class="question_require">
                        <input type="checkbox" :id="'require_q' + item_id" :checked="required" @change="editRequired">
                        <label :for="'require_q' + item_id">
                            <i class="icon checked"></i>
                            <span>必答</span>
                        </label>
                    </span>
                </div>
                <div class="answers age" v-if="type.indexOf('age') > -1">
                    <div class="input">
                        <span class="blank" contenteditable="true"></span>
                    </div>
                </div>

                <div class="question_head telephone display" v-if="type.indexOf('telephone') > -1" v-show="!editing">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="telephone">{{ title.telephone }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="question_head telephone edit" v-if="type.indexOf('telephone') > -1" v-show="editing">
                    <div class="question_title" contenteditable="true" @input="editTitle" name="telephone">请输入联系电话</div>
                    <span class="question_require">
                        <input type="checkbox" :id="'require_q' + item_id" :checked="required" @change="editRequired">
                        <label :for="'require_q' + item_id">
                            <i class="icon checked"></i>
                            <span>必答</span>
                        </label>
                    </span>
                </div>
                <div class="answers telephone" v-if="type.indexOf('telephone') > -1">
                    <div class="input">
                        <span class="blank" contenteditable="true"></span>
                    </div>
                </div>

                <div class="question_head email display" v-if="type.indexOf('email') > -1" v-show="!editing">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="email">{{ title.email }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="question_head email edit" v-if="type.indexOf('email') > -1" v-show="editing">
                    <div class="question_title" contenteditable="true" @input="editTitle" name="email">请输入电子邮箱</div>
                    <span class="question_require">
                        <input type="checkbox" :id="'require_q' + item_id" :checked="required" @change="editRequired">
                        <label :for="'require_q' + item_id">
                            <i class="icon checked"></i>
                            <span>必答</span>
                        </label>
                    </span>
                </div>
                <div class="answers email" v-if="type.indexOf('email') > -1">
                    <div class="input">
                        <span class="blank" contenteditable="true"></span>
                    </div>
                </div>

                <div class="question_head company display" v-if="type.indexOf('company') > -1" v-show="!editing">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="company">{{ title.company }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="question_head company edit" v-if="type.indexOf('company') > -1" v-show="editing">
                    <div class="question_title" contenteditable="true" @input="editTitle" name="company">请输入工作单位</div>
                    <span class="question_require">
                        <input type="checkbox" :id="'require_q' + item_id" :checked="required" @change="editRequired">
                        <label :for="'require_q' + item_id">
                            <i class="icon checked"></i>
                            <span>必答</span>
                        </label>
                    </span>
                </div>
                <div class="answers company" v-if="type.indexOf('company') > -1">
                    <div class="input">
                        <span class="blank" contenteditable="true"></span>
                    </div>
                </div>

                <div class="question_head job display" v-if="type.indexOf('job') > -1" v-show="!editing">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="job">{{ title.job }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="question_head job edit" v-if="type.indexOf('job') > -1" v-show="editing">
                    <div class="question_title" contenteditable="true" @input="editTitle" name="job">请输入所在职位</div>
                    <span class="question_require">
                        <input type="checkbox" :id="'require_q' + item_id" :checked="required" @change="editRequired">
                        <label :for="'require_q' + item_id">
                            <i class="icon checked"></i>
                            <span>必答</span>
                        </label>
                    </span>
                </div>
                <div class="answers job" v-if="type.indexOf('job') > -1">
                    <div class="input">
                        <span class="blank" contenteditable="true"></span>
                    </div>
                </div>

                <div class="question_head industry display" v-if="type.indexOf('industry') > -1" v-show="!editing">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="industry">{{ title.industry }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="question_head industry edit" v-if="type.indexOf('industry') > -1" v-show="editing">
                    <div class="question_title" contenteditable="true" @input="editTitle" name="industry">请输入所在行业</div>
                    <span class="question_require">
                        <input type="checkbox" :id="'require_q' + item_id" :checked="required" @change="editRequired">
                        <label :for="'require_q' + item_id">
                            <i class="icon checked"></i>
                            <span>必答</span>
                        </label>
                    </span>
                </div>
                <div class="answers industry" v-if="type.indexOf('industry') > -1">
                    <div class="input">
                        <span class="blank" contenteditable="true"></span>
                    </div>
                </div>

                <div class="question_head address display" v-if="type.indexOf('address') > -1" v-show="!editing">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="address">{{ title.address }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="question_head address edit" v-if="type.indexOf('address') > -1" v-show="editing">
                    <div class="question_title" contenteditable="true" @input="editTitle" name="address">请输入通讯地址</div>
                    <span class="question_require">
                        <input type="checkbox" :id="'require_q' + item_id" :checked="required" @change="editRequired">
                        <label :for="'require_q' + item_id">
                            <i class="icon checked"></i>
                            <span>必答</span>
                        </label>
                    </span>
                </div>
                <div class="answers address" v-if="type.indexOf('address') > -1">
                    <div class="input">
                        <span class="blank" contenteditable="true"></span>
                    </div>
                </div>

                <div class="question_head highschool display" v-if="type.indexOf('highschool') > -1" v-show="!editing">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="highschool">{{ title.highschool }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="question_head highschool edit" v-if="type.indexOf('highschool') > -1" v-show="editing">
                    <div class="question_title" contenteditable="true" @input="editTitle" name="highschool">请输入毕业院校</div>
                    <span class="question_require">
                        <input type="checkbox" :id="'require_q' + item_id" :checked="required" @change="editRequired">
                        <label :for="'require_q' + item_id">
                            <i class="icon checked"></i>
                            <span>必答</span>
                        </label>
                    </span>
                </div>
                <div class="answers highschool" v-if="type.indexOf('highschool') > -1">
                    <div class="input">
                        <span class="blank" contenteditable="true"></span>
                    </div>
                </div>

                <div class="question_head education display" v-if="type.indexOf('education') > -1" v-show="!editing">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="highschool">{{ title.highschool }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="question_head education edit" v-if="type.indexOf('highschool') > -1" v-show="editing">
                    <div class="question_title" contenteditable="true" @input="editTitle" name="highschool">请输入毕业院校</div>
                    <span class="question_require">
                        <input type="checkbox" :id="'require_q' + item_id" :checked="required" @change="editRequired">
                        <label :for="'require_q' + item_id">
                            <i class="icon checked"></i>
                            <span>必答</span>
                        </label>
                    </span>
                </div>
                <div class="answers education" v-if="type.indexOf('education') > -1">
                    <div class="input">
                        <span class="blank" contenteditable="true"></span>
                    </div>
                </div>

                <div class="question_head department display" v-if="type.indexOf('department') > -1" v-show="!editing">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="department">{{ title.department }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="question_head department edit" v-if="type.indexOf('department') > -1" v-show="editing">
                    <div class="question_title" contenteditable="true" @input="editTitle" name="department">请输入您所在的科室</div>
                    <span class="question_require">
                        <input type="checkbox" :id="'require_q' + item_id" :checked="required" @change="editRequired">
                        <label :for="'require_q' + item_id">
                            <i class="icon checked"></i>
                            <span>必答</span>
                        </label>
                    </span>
                </div>
                <div class="answers department" v-if="type.indexOf('department') > -1">
                    <div class="input">
                        <span class="blank" contenteditable="true"></span>
                    </div>
                </div>

                <div class="question_head hospitallevel display" v-if="type.indexOf('hospitallevel') > -1" v-show="!editing">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="hospitallevel">{{ title.hospitallevel }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="question_head hospitallevel edit" v-if="type.indexOf('hospitallevel') > -1" v-show="editing">
                    <div class="question_title" contenteditable="true" @input="editTitle" name="hospitallevel">请输入您所在医院的级别</div>
                    <span class="question_require">
                        <input type="checkbox" :id="'require_q' + item_id" :checked="required" @change="editRequired">
                        <label :for="'require_q' + item_id">
                            <i class="icon checked"></i>
                            <span>必答</span>
                        </label>
                    </span>
                </div>
                <div class="answers hospitallevel" v-if="type.indexOf('hospitallevel') > -1">
                    <div class="input">
                        <span class="blank" contenteditable="true"></span>
                    </div>
                </div>

                <div class="question_head titlelevel display" v-if="type.indexOf('titlelevel') > -1" v-show="!editing">
                    <span class="question_index">
                        <span class="index">{{ ordericon || index }}</span>.
                    </span>
                    <span class="question_title" name="titlelevel">{{ title.titlelevel }}</span>
                    <span class="question_require" v-show="required">*</span>
                </div>
                <div class="question_head titlelevel edit" v-if="type.indexOf('titlelevel') > -1" v-show="editing">
                    <div class="question_title" contenteditable="true" @input="editTitle" name="titlelevel">请输入您当前的职称级别</div>
                    <span class="question_require">
                        <input type="checkbox" :id="'require_q' + item_id" :checked="required" @change="editRequired">
                        <label :for="'require_q' + item_id">
                            <i class="icon checked"></i>
                            <span>必答</span>
                        </label>
                    </span>
                </div>
                <div class="answers titlelevel" v-if="type.indexOf('titlelevel') > -1">
                    <div class="input">
                        <span class="blank" contenteditable="true"></span>
                    </div>
                </div>

                <div class="control">
                    <div class="button up" @click="moveUp">{</div>
                    <div class="button down" @click="moveDown">}</div>
                    <div class="button save" @click="save" v-show="editing">3</div>
                    <div class="button edit" @click="edit" v-show="!editing">W</div>
                    <div class="button delete" @click="deleteQ">#</div>
                    <div class="button logic" @click="logic">%</div>
                </div>
            </div>
        </div>
    `;

Vue.component('node',{

    props:['index', 'ordericon','item_id','title','type','form','the_class','description','required','editing','options','words_restrict', 'suffix','sub_questions','need','jump','depend','quote','relate','evaluate'],

    template: component,

    methods: {

        moveUp: function(e){

            this.$emit('move_up',e)
        },
        moveDown: function(e){

            this.$emit('move_down',e)
        },
        edit: function(e){

            this.$emit('edit',e)
        },
        deleteQ: function(e){

            this.$emit('delete_q',e)
        },
        logic: function(e){

            this.$emit('logic',e)
        },
        save: function(e){

            this.$emit('save',e)
        },
        cancel: function(e){

            this.$emit('cancel',e)
        },
        editTitle: function(e){

            this.$emit('edit_title',e)
        },
        editRequired: function(e){

            this.$emit('edit_required',e)
        },
        editDescription: function(e){

            this.$emit('edit_description',e)
        },
        deleteOption: function(e){

            this.$emit('delete_option',e)
        },
        editOption: function(e){

            this.$emit('edit_option',e)
        },
        editFillable: function(e){

            this.$emit('edit_fillable',e)
        },
        insertOption: function(e){

            this.$emit('insert_option',e)
        },
        check: function(e){

            this.$emit('check',e)
        },
        sort: function(e){

            this.$emit('sort',e)
        },
        changeForm: function(e){

            this.$emit('change_form',e)
        },
        changeClass: function(e){

            this.$emit('change_class',e)
        },
        deleteSubQuestion: function(e){

            this.$emit('delete_sub_question',e)
        },
        editSuffix: function(e){
            this.$emit('edit_suffix', e)
        },
        editSubQuestion: function(e){

            this.$emit('edit_sub_question',e)
        },
        dragPrefix: function(e){
            this.$emit('drag_prefix',e)
        },
        editPrefix: function(e){
            this.$emit('edit_prefix',e)
        },
        insertSubQuestion: function(e){

            this.$emit('insert_sub_question',e)
        },
        toggleHour: function(e){

            this.$emit('toggle_hour',e)
        },
        toggleMinute: function(e){

            this.$emit('toggle_minute',e)
        },
        toggleSecond: function(e){

            this.$emit('toggle_second',e)
        },
        toggleYear: function(e){

            this.$emit('toggle_year',e)
        },
        toggleMonth: function(e){

            this.$emit('toggle_month',e)
        },
        toggleDate: function(e){

            this.$emit('toggle_date',e)
        },
        mark: function(e){

            this.$emit('mark',e)
        },
        editScore: function(e){

            this.$emit('edit_score',e)
        }
    }
});

Vue.component('message',{
    props: ['item_id','index', 'required', 'ordericon', 'editing', 'title','type','description', 'depend'],
    template: message,
    methods: {
        moveUp: function(e){

            this.$emit('move_up',e)
        },
        moveDown: function(e){

            this.$emit('move_down',e)
        },
        edit: function(e){

            this.$emit('edit',e)
        },
        save: function(e){

            this.$emit('save',e)
        },
        editTitle: function(e){

            this.$emit('edit_title',e)
        },
        editDescription: function(e){

            this.$eimt('edit_description',e)
        },
        editRequired: function(e){

            this.$emit('edit_required',e)
        },
        deleteQ: function(e){

            this.$emit('delete_q',e)
        },
        logic: function(e){

            this.$emit('logic',e)
        },
        check: function(e){

            this.$emit('check',e)
        }
    }
});
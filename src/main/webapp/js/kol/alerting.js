/**
 * Created by wangxiangyang on 2018/5/16.
 */
function simpleAlert(content, color='#000000', background='#ffffff', during=500){
    let alerting = $(`<div class="simple-alert"></div>`);
    alerting.text(content);
    alerting.css('color', color)
        .css('position', 'fixed')
        .css('left', ($(window).width()/2-25 + 'px'))
        .css('top', ($(window).height()/2-120 + 'px'))
        .css('display', 'none')
        .css('width', '240px')
        .css('height', '50px')
        .css('line-height', '50px')
        .css('background-color', background)
        .css('font-size', '14px')
        .css('text-align', 'center')
        .css('z-index', '1999')
        .css('-webkit-border-radius', '10px')
        .css('-moz-border-radius', '10px')
        .css('border-radius', '10px')
        .css('-webkit-box-shadow', '0 0 5px 0 #999')
        .css('-moz-box-shadow', '0 0 5px 0 #999')
        .css('box-shadow', '0 0 5px 0 #999');

    $('#root').append(alerting);
    alerting.fadeIn(during)
        .on('click',function(){
            alerting.fadeOut(during);
            setTimeout(function(){alerting.remove()},during)
        })
}
function InputAlert(title='',field='', confirm='', cancel='', color='#000000', background='#ffffff', during=500){
    let alerting = $(`<div class="input-alert"></div>`),
        title_node = $(`<div></div>`),
        input_node = $(`<div><input type="text" v-model="`+ field +`"></div>`),
        buttons_node = $(`<div>
            <button class="conceal btn btn-sm btn-success" @click="`+ confirm +`">确认</button>
            <button class="conceal btn btn-sm btn-danger" @click="`+ cancel +`">取消</button>
        </div>`);
    title_node.text(title);
    alerting.css('color', color)
        .css('position', 'fixed')
        .css('left', ($(window).width()/2-50 + 'px'))
        .css('top', ($(window).height()/2-120 + 'px'))
        .css('display', 'none')
        .css('width', '240px')
        .css('height', '100px')
        .css('line-height', '32px')
        .css('background-color', background)
        .css('font-size', '14px')
        .css('text-align', 'center')
        .css('z-index', '1999')
        .css('-webkit-border-radius', '10px')
        .css('-moz-border-radius', '10px')
        .css('border-radius', '10px')
        .css('-webkit-box-shadow', '0 0 5px 0 #999')
        .css('-moz-box-shadow', '0 0 5px 0 #999')
        .css('box-shadow', '0 0 5px 0 #999');

    input_node.find('input').css('line-height', '24px');
    buttons_node.find('button').css('margin', '0');

    alerting.append(title_node)
        .append(input_node)
        .append(buttons_node);
    $('#root').append(alerting);

    this.inputAlter = function(){
        $('.input-alert').fadeIn(during)
            .on('click', '.conceal',function(){
                $('.input-alert').fadeOut(during);
                //setTimeout(function(){
                //    $('.input-alert').remove()
                //},during)
            })
    }
}
function MultiInputAlert(obj){

    const title = obj.title,
          couples = obj.list || [],
          confirm = obj.confirm || '',
          color = obj.color || '#000000',
          background = obj.background || '#ffffff',
          during = obj.during || 500,
          height = 60 + couples.length*32;

    let alerting = $(`<div class="multi-input-alert"></div>`),
        title_node = $(`<div>`+ title +`</div>`),
        inputs_node = $(`<div></div>`),
        buttons_node = $(`<div>
            <button class="conceal btn btn-sm btn-success" @click="`+ confirm +`">确认</button>
            <button class="conceal btn btn-sm btn-info">取消</button>
        </div>`);

    alerting.css('color', color)
        .css('position', 'fixed')
        .css('left', ($(window).width()/2-120 + 'px'))
        .css('top', ($(window).height()/2-height + 'px'))
        .css('display', 'none')
        .css('width', '240px')
        .css('height', height+'px')
        .css('line-height', '24px')
        .css('background-color', background)
        .css('font-size', '14px')
        .css('text-align', 'center')
        .css('z-index', '1999')
        .css('-webkit-border-radius', '10px')
        .css('-moz-border-radius', '10px')
        .css('border-radius', '10px')
        .css('-webkit-box-shadow', '0 0 5px 0 #999')
        .css('-moz-box-shadow', '0 0 5px 0 #999')
        .css('box-shadow', '0 0 5px 0 #999');

    buttons_node.find('button').css('margin', '0');

    for (let i = 0; i < couples.length; i++){
        inputs_node.append(`<div>
            <label for="`+ couples[i].field +`_in_alerting">`+ couples[i].label +`</label>
            <input type="text" v-model="`+ couples[i].field +`" id="`+ couples[i].field +`_in_alerting">
        </div>`)
    }

    alerting.append(title_node)
        .append(inputs_node)
        .append(buttons_node);
    $('#root').append(alerting);

    this.alert = function(){
        $('.multi-input-alert').fadeIn(during)
            .on('click', '.conceal',function(){
                $('.multi-input-alert').fadeOut(during)
            })
    }
}
function BranchAlert(obj){

    //title,left,right,color='#000000',background='#ffffff',during=500

    const title = obj.title,
          left = obj.left || '',
          right = obj.right || '',
          left_text = obj.left_text || '',
          right_text = obj.right_text || '',
          color = obj.color || '#000000',
          background = obj.background || '#ffffff',
          during = obj.during || 500;

    let alerting = $(`<div class="branch-alert"></div>`),
        title_node = $(`<div></div>`),
        buttons_node = $(`<div>
            <button class="conceal btn btn-sm btn-success" @click="`+ left +`">`+ left_text +`</button>
            <button class="conceal btn btn-sm btn-info" @click="`+ right +`">`+ right_text +`</button>
        </div>`);
    title_node.text(title);
    alerting.css('color', color)
        .css('position', 'fixed')
        .css('left', ($(window).width()/2-50 + 'px'))
        .css('top', ($(window).height()/2-120 + 'px'))
        .css('display', 'none')
        .css('width', '240px')
        .css('height', '100px')
        .css('line-height', '32px')
        .css('background-color', background)
        .css('font-size', '14px')
        .css('text-align', 'center')
        .css('z-index', '1999')
        .css('-webkit-border-radius', '10px')
        .css('-moz-border-radius', '10px')
        .css('border-radius', '10px')
        .css('-webkit-box-shadow', '0 0 5px 0 #999')
        .css('-moz-box-shadow', '0 0 5px 0 #999')
        .css('box-shadow', '0 0 5px 0 #999');

    buttons_node.find('button').css('margin', '0');

    alerting.append(title_node)
        .append(buttons_node);
    $('#root').append(alerting);

    this.branchAlter = function(){
        $('.branch-alert').fadeIn(during)
            .on('click', '.conceal',function(){
                $('.branch-alert').fadeOut(during)
            })
    }
}
function TableAlert(obj){
    const title = obj.title,
          fields = obj.fields,
          data = obj.data,
          color = obj.color || '#000000',
          background = obj.background || '#ffffff',
          during = obj.during || 500;

    let alerting = $(`<div class="table-alert"></div>`),
        title_node = $(`<div></div>`),
        table_node = $(`<div>
            <table>
                <thead>
                <tr><th style="width: initial;word-break: keep-all" v-for="f in `+ fields +`">{{ f.value }}</th></tr>
                </thead>
                <tbody>
                <tr v-for="d in `+ data +`"><td style="width: initial;word-break: keep-all" v-for="f in `+ fields+ `">{{ d[f.key] }}</td></tr>
                </tbody>
            </table>
        </div>`);
    title_node.text(title);
    alerting.css('color', color)
        .css('position', 'fixed')
        .css('display', 'none')
        //.css('width', '240px')
        //.css('height', '100px')
        .css('line-height', '24px')
        .css('background-color', background)
        .css('font-size', '14px')
        .css('text-align', 'center')
        .css('z-index', '1999')
        .css('-webkit-border-radius', '10px')
        .css('-moz-border-radius', '10px')
        .css('border-radius', '10px')
        .css('-webkit-box-shadow', '0 0 5px 0 #999')
        .css('-moz-box-shadow', '0 0 5px 0 #999')
        .css('box-shadow', '0 0 5px 0 #999');

    alerting.append(title_node)
            .append(table_node);
    $('#root').append(alerting);

    alerting.css('left', ($(window).width()/2-50 + 'px'))
            .css('top', ($(window).height()/2-120 + 'px'));

    this.tableAlert = function(){
        let alert = $('.table-alert');
        alert.fadeIn(during);

        setTimeout(function(){
        	let w = alert[0].offsetWidth,
            h = alert[0].offsetHeight;
        	alert.css('left', ($(window).width()-w)/2 + 'px')
            .css('top', ($(window).height()-h)/2 + 'px')
            .on('click',function(){
               $('.table-alert').fadeOut(during)
           })
        },0)
    }
}
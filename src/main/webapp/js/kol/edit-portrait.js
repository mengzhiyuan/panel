/**
 * Created by wangxiangyang on 2018/6/5.
 */
$(function(){

    const empty_words = '未选择任何图片（.jpg/.jpeg/.png）',
          filled_words = '已选择图片文件  ',
          trigger = $('#trigger'),
          select = $('#select'),
          statement = $('#statement'),
          filename = $('#filename'),
          block = $('#block'),
          canvas = $('#canvas')[0],
          canvas_copy = $('#canvas-copy')[0],
          context  = canvas.getContext('2d'),
          context_copy = canvas_copy.getContext('2d'),
          target = $('#target')[0],
          context_target = target.getContext('2d'),
          image = new Image(),
          reader = new FileReader();

    target.width = 400;
    target.height = 400;
    $(target).css('width', '400px')
             .css('height', '400px');

    let copy_data,
        selected_data;

    trigger.on('click', function(){
        select.click()
    });
    select.on('change', dealWithInput);
    image.onload = drawCanvas;
    reader.onload = function(){
        image.src = this.result;
    };
    block.on('mousedown', startSelect);
    $('#save').on('click', save);

    function dealWithInput(){
        if (select.val()){
            statement.text(filled_words);
            filename.text(select.val());
            reader.readAsDataURL(this.files[0])
        } else {
            statement.text(empty_words);
            filename.text('')
        }
    }
    function drawCanvas(){
        let bigger,
            smaller,
            orientation;
        if (image.width >= image.height){
            bigger = image.width;
            smaller = image.height;
            orientation = 'landscape'
        } else {
            bigger = image.height;
            smaller = image.width;
            orientation = 'portrait'
        }
        if (smaller >= 400 && bigger <= 600){
            canvas.width = image.width;
            canvas.height = image.height;
            $(canvas).css('width', image.width)
                     .css('height', image.height);
        } else if (smaller >= 400 && bigger > 600){
            let solution = smaller * 600 / bigger;
            if (orientation === 'portrait') {
                canvas.height = 600;
                canvas.width = solution;
                $(canvas).css('width', solution)
                         .css('height', 600);
            } else {
                canvas.width = 600;
                canvas.height = solution;
                $(canvas).css('width', 600)
                         .css('height', solution);
            }
        } else if (smaller < 400){
            let solution = bigger * 400 / smaller;
            if (orientation === 'portrait'){
                canvas.width = 400;
                canvas.height = solution;
                $(canvas).css('width', 400)
                         .css('height', solution);
            } else {
                canvas.height = 400;
                canvas.width = solution;
                $(canvas).css('width', solution)
                         .css('height', 400);
            }
        }
        $(canvas_copy).css('width', canvas.width)
                      .css('height', canvas.height);
        canvas_copy.width = canvas.width;
        canvas_copy.height = canvas.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        context_copy.drawImage(image, 0, 0, canvas.width, canvas.height);
        copy_data = context_copy.getImageData(0, 0, canvas.width, canvas.height);
        coverShadow(block.position().left, block.position().top, block.position().left+400, block.position().top+400);
    }
    function startSelect(event){
        let start_x = event.pageX,
            start_y = event.pageY,
            offset_x = block.position().left,
            offset_y = block.position().top,
            position_x,
            position_y,
            diagonal_x,
            diagonal_y,
            flag = true;
        block.on('mousemove', function (event){

            let vector_x = event.pageX - start_x,
                vector_y = event.pageY - start_y;
            position_x = offset_x + vector_x;
            position_y = offset_y + vector_y;
            diagonal_x = position_x + 400;
            diagonal_y = position_y + 400;

            if (position_x < 0 || position_y < 0 || diagonal_x > canvas.width || diagonal_y >canvas.height) {
                flag = false;
                return
            } else {
                flag = true
            }

            block.css('left', position_x + 'px')
                .css('top', position_y + 'px');
        })
            .on('mouseup', function(){
                block.off('mousemove');
                if (flag){
                    coverShadow(position_x, position_y, diagonal_x, diagonal_y)
                }
            })
    }
    function coverShadow(start_x, start_y, end_x, end_y){

        //let image_data = context.getImageData(0, 0, canvas.width, canvas.height);
            selected_data = context_copy.getImageData(start_x, start_y, end_x, end_y);

        //image_copy.data =

        //for (let i = 0; i < copy_data.data.length; i += 4){
        //    image_data.data[i] = copy_data.data[i] * 0.7;
        //    image_data.data[i+1] = copy_data.data[i+1] * 0.7;
        //    image_data.data[i+2] = copy_data.data[i+2] * 0.7;
        //}
        //for (let i = 0; i < selected_data.data.length; i += 4){
        //    selected_data.data[i] = selected_data.data[i] * 1.25;
        //    selected_data.data[i+1] = selected_data.data[i+1] * 1.25;
        //    selected_data.data[i+2] = selected_data.data[i+2] * 1.25;
        //}

        //context.putImageData(image_data, 0, 0);
        //context.putImageData(selected_data, start_x, start_y, 0, 0, 400, 400);
    }
    function save(){
        context_target.putImageData(selected_data, 0, 0);
        let data64 = target.toDataURL();
        //document.write(data64);
        //let result = new Image();
        //result.src = data64;
        //$('#root').append(result);
        $.ajax({
            url: realPath + '/system/setImage',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            async: true,
            data: JSON.stringify({
                email: JSON.parse(sessionStorage.getItem('sysUser')).email,
                image_data: data64
            }),
            success: function(d){
                if (d[0].result > 0){
                    simpleAlert('保存完成', '#00db00');
                    window.location.href = '//www.kolpanel.net/login.html';
                    window.close()
                } else {
                    simpleAlert('操作失败', '#f56c6c')
                }
            },
            error: function(e){
                console.log(e);
                simpleAlert('操作失败', '#f56c6c')
            }
        })
    }
});
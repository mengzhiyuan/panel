/**
 * Created by wangxiangyang on 2017/7/9.
 */
//省市县三组联动
//$(function(){
function chainReact(){
    var len = provinces.length,
        str = "",
        i;
    for (i = 0; i < len; i++){
        str += '<option pro_id="' + provinces[i]["ProID"] + '">' + provinces[i]["name"] + '</option>'
    }
    $(".province").append(str);

    function provincesChange(event){
        var pro_id = $(this).find(":selected").attr("pro_id"),
            str = "",
            len = cities.length,
            i;
        for (i = 0; i < len; i ++){
            if (cities[i]["ProID"] == pro_id){
                str += '<option city_id=" ' + cities[i]["CityID"] + '">' + cities[i]["name"] + '</option>'
            }
        }
        $(".city").find("option:not(':first-child')").remove()
            .end().append(str);
        $(".district").find("option:not(':first-child')").remove();
    }

    function citiesChange(event){
        var city_id = $(this).find(":selected").attr("city_id"),
            str = "",
            len = districts.length,
            i;

        for (i = 0; i < len; i++){
            if (districts[i]["CityID"] == city_id){
                str += '<option id="' + districts[i]["Id"] +'">' + districts[i]["DisName"] + '</option>'
            }
        }
        $(".district").find("option:not(':first-child')").remove().end().append(str)
    }

    $(".province").on ("change", provincesChange);
    $(".city").on("change", citiesChange);
}
//});
chainReact();
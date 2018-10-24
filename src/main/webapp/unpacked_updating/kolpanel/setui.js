/**
 * Created by wangxiangyang on 2017/11/15.
 */


//var data = [{"questions":[{"form":"col","ordericon":"","index":1,"title":"尊敬的女士/先生：您好，我们是益普索公司医药市场研究团队的访问员。我公司是一家专门从事医药和医疗器械产品市场调研的公司。现正在开展特殊静脉/动脉/末梢采血产品市场研究，目的是想了解特殊静脉/动脉/末梢采血产品的市场现状及未来市场潜力。今天希望能占用您45分钟左右的时间来采访您，希望能得到您的配合。访问中所涉及的个人信息和资料将被严格保密，绝对不会泄露给第三方或者作为它用。请问您是否同意接受本次访问?","type":"choice","itemKey":933,"option":{"1":{"index":1,"optionId":1,"value":"是","fillable":false},"2":{"index":2,"optionId":2,"value":"否","fillable":false}}},{"form":"col","ordericon":"","index":2,"title":"所在城市选择","type":"choice","itemKey":934,"option":{"1":{"index":1,"optionId":1,"value":"北京","fillable":false},"2":{"index":2,"optionId":2,"value":"上海","fillable":false},"3":{"index":3,"optionId":3,"value":"广州","score":"","fillable":false},"4":{"index":4,"optionId":4,"value":"成都","score":"","fillable":false},"5":{"index":5,"optionId":5,"value":"长沙","score":"","fillable":false},"6":{"index":6,"optionId":6,"value":"重庆","score":"","fillable":false},"7":{"index":7,"optionId":7,"value":"其它","score":"","fillable":false}}},{"form":"single","ordericon":"","index":3,"title":"请输入您的姓名","type":"[\"name\"]","itemKey":963,"option":{}},{"form":"single","ordericon":"","index":4,"title":"请输入您的工作单位","type":"[\"company\"]","itemKey":964,"option":{}},{"form":"col","ordericon":"","index":5,"title":"请问您目前就职于以下哪种类型的医院?  【单选】","type":"choice","itemKey":935,"option":{"1":{"index":1,"optionId":1,"value":"三级综合医院","fillable":false},"2":{"index":2,"optionId":2,"value":"二甲综合医院","fillable":false},"3":{"index":3,"optionId":3,"value":"其他","score":"","fillable":false}}},{"form":"col","ordericon":"","index":6,"title":"请问您所在的科室部门是? 【单选】","type":"choice","itemKey":936,"option":{"1":{"index":1,"optionId":1,"value":"住院部儿科","fillable":false},"2":{"index":2,"optionId":2,"value":"住院部感染科","fillable":false},"3":{"index":3,"optionId":3,"value":"住院部呼吸科","score":"","fillable":false},"4":{"index":4,"optionId":4,"value":"急诊病房","score":"","fillable":false},"5":{"index":5,"optionId":5,"value":"麻醉科","score":"","fillable":false},"6":{"index":6,"optionId":6,"value":"其他","score":"","fillable":false}}},{"form":"col","ordericon":"","index":7,"title":"请问您的职务是?【单选】","type":"choice","itemKey":937,"option":{"1":{"index":1,"optionId":1,"value":"临床医生","fillable":false},"2":{"index":2,"optionId":2,"value":"其他","fillable":false}}},{"form":"col","ordericon":"","index":8,"title":"请问您的职务是?","type":"choice","itemKey":938,"option":{"1":{"index":1,"optionId":1,"value":"麻醉师（高年资医师）","fillable":false},"2":{"index":2,"optionId":2,"value":"其他","fillable":false}}},{"form":"col","ordericon":"","index":9,"title":"请问您是否操作过动脉采血? 【单选】","type":"choice","itemKey":939,"option":{"1":{"index":1,"optionId":1,"value":"是","fillable":false},"2":{"index":2,"optionId":2,"value":"否","fillable":false}}},{"sub_questions":{"1":{"index":1,"title":""},"2":{"index":2,"title":""}},"form":"single","ordericon":"","index":10,"title":"请问您目前平均每天的动脉采血人次数?【记录个数】","type":"blank","itemKey":940,"option":{}},{"form":"col","ordericon":"","index":11,"title":"请问您目前平均每天的动脉采血人次数?【圈选】","type":"choice","itemKey":941,"option":{"1":{"index":1,"optionId":1,"value":"2人次及以上","fillable":false},"2":{"index":2,"optionId":2,"value":"2人次以下","fillable":false}}},{"sub_questions":{"1":{"index":1,"title":""},"2":{"index":2,"title":""}},"form":"single","ordericon":"","index":12,"title":"请问您目前每天的采血开单量是多少（含静脉，动脉，末梢）?【记录个数】","type":"blank","itemKey":942,"option":{}},{"form":"col","ordericon":"","index":13,"title":"请问您目前每天的采血开单量是多少（含静脉，动脉，末梢）? 【圈选】","type":"choice","itemKey":943,"option":{"1":{"index":1,"optionId":1,"value":"20人次及以上","fillable":false},"2":{"index":2,"optionId":2,"value":"20人次以下","fillable":false}}},{"sub_questions":{"1":{"index":1,"title":""},"2":{"index":2,"title":""}},"form":"single","ordericon":"","index":14,"title":"请问您在所在科室临床工作的年限是多少? 【记录年限】","type":"blank","itemKey":944,"option":{}},{"form":"col","ordericon":"","index":15,"title":"请问您在所在科室临床工作的年限是多少?【圈选】","type":"choice","itemKey":945,"option":{"1":{"index":1,"optionId":1,"value":"5年以下","fillable":false},"2":{"index":2,"optionId":2,"value":"5年及以上","fillable":false}}},{"form":"col","ordericon":"","index":16,"title":"请问您所在科室过去12个月使用过下列哪些品牌的采血产品？","type":"choice","itemKey":946,"option":{"1":{"index":1,"optionId":1,"value":"BD/碧迪","fillable":false},"2":{"index":2,"optionId":2,"value":"KDL/康德莱","fillable":false},"3":{"index":3,"optionId":3,"value":"拱东","score":"","fillable":false},"4":{"index":4,"optionId":4,"value":"阳普","score":"","fillable":false},"5":{"index":5,"optionId":5,"value":"成都瑞琦","score":"","fillable":false},"6":{"index":6,"optionId":6,"value":"苏州施莱","score":"","fillable":false},"7":{"index":7,"optionId":7,"value":"Radiometer/雷度米特","score":"","fillable":false},"8":{"index":8,"optionId":8,"value":"威高/洁瑞","score":"","fillable":false},"9":{"index":9,"optionId":9,"value":"HTL/麦德伦斯","score":"","fillable":false},"10":{"index":10,"optionId":10,"value":"Smith/史密斯","score":"","fillable":false},"11":{"index":11,"optionId":11,"value":"其他","score":"","fillable":true}}},{"form":"col","ordericon":"","index":17,"title":"在最近3个月内您是否参加过任何关于此类医疗产品的市场调研活动?","type":"choice","itemKey":947,"option":{"1":{"index":1,"optionId":1,"value":"是","fillable":false},"2":{"index":2,"optionId":2,"value":"否","fillable":false}}},{"form":"col","ordericon":"","index":18,"title":"您在过去3个月内是否参加过任何形式的市场调查呢？","type":"choice","itemKey":948,"option":{"1":{"index":1,"optionId":1,"value":"是","fillable":false},"2":{"index":2,"optionId":2,"value":"否","fillable":false}}},{"form":"col","ordericon":"","index":19,"title":"请问您愿意参加这个调研活动吗?","type":"choice","itemKey":949,"option":{"1":{"index":1,"optionId":1,"value":"Yes","fillable":false},"2":{"index":2,"optionId":2,"value":"No","fillable":false}}},{"sub_questions":{"1":{"index":1,"title":"","prefix":""}},"form":"row","ordericon":"","index":20,"title":"请问您所在科室病床的总床位数_______张？；请问您所在科室的床位平均使用率是多少？ ；请问您所在科室的患者平均住院天数是多少？","type":"matrix","itemKey":950,"option":{"1":{"index":1,"optionId":1,"value":"总床位数（张）"},"2":{"index":2,"optionId":2,"value":"床位平均使用率（%）"},"3":{"index":3,"optionId":3,"value":"平均住院天数（天）"}}},{"sub_questions":{"1":{"index":1,"title":"病人类型1","prefix":""},"2":{"index":2,"title":"病人类型2","prefix":""},"3":{"index":3,"title":"病人类型3","prefix":""},"4":{"index":4,"title":"病人类型4","prefix":""}},"form":"row","ordericon":"","index":21,"title":"请问您所在科室，进行动脉采血的主要病人类型有哪些？；请问以上这些类型的病人在所有动脉采血病人中分别占多少比例？；请问以上每种类型的病人，平均每天进行动脉采血的频率是多少（次/天）？","type":"matrix","itemKey":951,"option":{"1":{"index":1,"optionId":1,"value":"主要病人类型"},"2":{"index":2,"optionId":2,"value":"占比（%）"},"3":{"index":3,"optionId":3,"value":"频率（次/天）"}}},{"sub_questions":{"1":{"index":1,"title":"总手术量","prefix":""},"2":{"index":2,"title":"需要麻醉的手术量","prefix":""},"3":{"index":3,"title":"需要动脉采血的手术量"}},"form":"row","ordericon":"","index":22,"title":"请问贵医院平均一天的手术量有__________台？；请问其中需要麻醉的手术量有__________台？；请问其中需要动脉采血的手术量有__________台？","type":"matrix","itemKey":952,"option":{"1":{"index":1,"optionId":1,"value":"台"}}},{"sub_questions":{"1":{"index":1,"title":"全麻手术","prefix":""},"2":{"index":2,"title":"半麻手术","prefix":""}},"form":"row","ordericon":"","index":23,"title":"请问在涉及动脉采血的手术中，全麻和半麻的比例分别有多少？；请问在全麻和半麻的手术中，平均分别需要进行几次动脉采血？","type":"matrix","itemKey":953,"option":{"1":{"index":1,"optionId":1,"value":"%"}}},{"sub_questions":{"1":{"index":1,"title":"手术类型1","prefix":""},"2":{"index":2,"title":"手术类型2","prefix":""},"3":{"index":3,"title":"手术类型3","prefix":""},"4":{"index":4,"title":"手术类型4"}},"form":"row","ordericon":"","index":24,"title":"请问您所在科室，进行动脉采血的主要手术类型有哪些（如心脏手术等）？；请问以上这些手术类型占所有动脉采血手术的比例分别是多少？；请问以上每种类型的手术病人，平均每台手术进行动脉采血的频率是多少？","type":"matrix","itemKey":954,"option":{"1":{"index":1,"optionId":1,"value":"手术类型"},"2":{"index":2,"optionId":2,"value":"占所有动脉采血手术比例（加合100%）"},"3":{"index":3,"optionId":3,"value":"进行动脉采血的频率（次/台）"}}},{"form":"col","ordericon":"","index":25,"title":"您所在的科室过去3年的动脉血检测量的变化情况，增加/减少的比例（%）","type":"checks","itemKey":955,"option":{"1":{"index":1,"optionId":1,"value":"增加","fillable":true},"2":{"index":2,"optionId":2,"value":"减少","fillable":true},"3":{"index":3,"optionId":3,"value":"不变","score":"","fillable":false}}},{"form":"col","ordericon":"","index":26,"title":"请问动脉血检测量增加的主要原因有哪些？","type":"choice","itemKey":956,"option":{"1":{"index":1,"optionId":1,"value":"分级诊疗导致危重病人的增加","fillable":false},"2":{"index":2,"optionId":2,"value":"科室引入自己的血气分析仪","fillable":false},"3":{"index":3,"optionId":3,"value":"环境污染导致呼吸系统疾病的病人量增多","score":"","fillable":false},"4":{"index":4,"optionId":4,"value":"人口老龄化，导致年老病人数增多","score":"","fillable":false},"5":{"index":5,"optionId":5,"value":"医院扩建/床位数增加导致病人量增加","score":"","fillable":false},"6":{"index":6,"optionId":6,"value":"其他原因","score":"","fillable":true}}},{"form":"col","ordericon":"","index":27,"title":"请问动脉血检测量减少的主要原因有哪些？","type":"choice","itemKey":957,"option":{"1":{"index":1,"optionId":1,"value":"病人量的减少，尤其是分级诊疗制度分流了病人","fillable":false},"2":{"index":2,"optionId":2,"value":"医院耗材控费","fillable":false},"3":{"index":3,"optionId":3,"value":"病人拒绝动脉血检测","score":"","fillable":false},"4":{"index":4,"optionId":4,"value":"其他原因","score":"","fillable":true}}},{"form":"col","ordericon":"","index":28,"title":"请问您所在科室，您使用的采血器具有哪些？","type":"choice","itemKey":959,"option":{"1":{"index":1,"optionId":1,"value":"自制带肝素的注射器","fillable":false},"2":{"index":2,"optionId":2,"value":"动脉留置针","fillable":false},"3":{"index":3,"optionId":3,"value":"安全型动脉采血器（即具备防针刺伤功能的动脉采血器）","score":"","fillable":false},"4":{"index":4,"optionId":4,"value":"普通型动脉采血器（即不具备防针刺伤功能的动脉采血器）","score":"","fillable":false}}},{"sub_questions":{"1":{"index":1,"title":"自制带肝素的注射器"},"2":{"index":2,"title":"动脉留置针"},"3":{"index":3,"title":"安全型动脉采血器（即具备防针刺伤功能的动脉采血器）"},"4":{"index":4,"title":"普通型动脉采血器（即不具备防针刺伤功能的动脉采血器）"}},"form":"multi","ordericon":"","index":29,"title":"请问您所在科室，这些采血器具的使用量占比分别是多少（%）？","type":"blank","itemKey":960,"option":{}},{"sub_questions":{"1":{"index":1,"title":"原因1"},"2":{"index":2,"title":"原因2"}},"form":"multi","ordericon":"","index":30,"title":"请问您所在科室使用的动脉留置针进行动脉采血的主要原因有哪些？","type":"blank","itemKey":961,"option":{}},{"form":"click","ordericon":"","index":31,"title":"请问，根据您的经验，您选择静脉采血针/动脉采血器/末梢采血针主要关注以下哪些方面？","type":"sort","itemKey":962,"option":{"1":{"index":1,"optionId":1,"value":"产品质量和可靠性","score":"","fillable":false},"2":{"index":2,"optionId":2,"value":"穿刺成功率","score":"","fillable":false},"3":{"index":3,"optionId":3,"value":"性价比","score":"","fillable":false},"4":{"index":4,"optionId":4,"value":"临床培训","score":"","fillable":false},"5":{"index":5,"optionId":5,"value":"售后服务","score":"","fillable":false},"6":{"index":6,"optionId":6,"value":"操作简便","score":"","fillable":false},"7":{"index":7,"optionId":7,"value":"安全性","score":"","fillable":false},"8":{"index":8,"optionId":8,"value":"出血量","score":"","fillable":false},"9":{"index":9,"optionId":9,"value":"穿刺疼痛性","score":"","fillable":false},"10":{"index":10,"optionId":10,"value":"临床应用经验","score":"","fillable":false}}}],"answers":[{"reason":null,"resultId":142,"availability":"0","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}]]},{"reason":null,"resultId":143,"availability":"3","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["2"],"values":["上海"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["孟志远"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["北京捷峰市场联合调查有限公司"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["2"],"values":["住院部感染科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["100"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["13"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["12"]}],[{"itemId":945,"type":"choice","codes":["2"],"values":["5年及以上"]}],[{"itemId":946,"type":"choice","codes":["6"],"values":["苏州施莱"]}],[{"itemId":947,"type":"choice","codes":["1"],"values":["是"]}]]},{"reason":null,"resultId":144,"availability":"1","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["3"],"values":["广州"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["郑纪川"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["jfc"]}],[{"itemId":935,"type":"choice","codes":["2"],"values":["二甲综合医院"]}],[{"itemId":936,"type":"choice","codes":["3"],"values":["住院部呼吸科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["50"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["38"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["5"]}],[{"itemId":945,"type":"choice","codes":["2"],"values":["5年及以上"]}],[{"itemId":946,"type":"choice","codes":["4"],"values":["阳普"]}],[{"itemId":947,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":948,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":949,"type":"choice","codes":["1"],"values":["Yes"]}],[{"itemId":950,"type":"matrix","form":"blank","values":[{"subtitle":"","option":"总床位数（张）","coordinate":"1-1","value":"58"},{"subtitle":"","option":"床位平均使用率（%）","coordinate":"1-2","value":"80"},{"subtitle":"","option":"平均住院天数（天）","coordinate":"1-3","value":"12"}]}],[{"itemId":951,"type":"matrix","form":"blank","values":[{"subtitle":"病人类型1","option":"主要病人类型","coordinate":"1-1","value":"身体不爽"},{"subtitle":"病人类型1","option":"占比（%）","coordinate":"1-2","value":"30"},{"subtitle":"病人类型1","option":"频率（次/天）","coordinate":"1-3","value":"5"}]}],[{"itemId":955,"type":"checks","codes":["1"],"values":["增加"]}],[{"itemId":956,"type":"choice","codes":["2"],"values":["科室引入自己的血气分析仪"]}],[{"itemId":959,"type":"choice","codes":["1"],"values":["自制带肝素的注射器"]}],[{"itemId":960,"type":"blank","form":"multi","codes":["1","2","3","4"],"values":["30","0","38","70"]}],[{"itemId":962,"type":"sort","values":["临床培训","安全性","出血量","售后服务","穿刺疼痛性","产品质量和可靠性"]}]]},{"reason":null,"resultId":145,"availability":"0","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}]]},{"reason":null,"resultId":146,"availability":"0","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}]]},{"reason":null,"resultId":147,"availability":"1","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["5"],"values":["长沙"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["11"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["长沙市第一医院"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["3"],"values":["住院部呼吸科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["10"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["100"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["50"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["15"]}],[{"itemId":945,"type":"choice","codes":["2"],"values":["5年及以上"]}],[{"itemId":946,"type":"choice","codes":["1"],"values":["BD/碧迪"]}],[{"itemId":947,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":947,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":948,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":949,"type":"choice","codes":["1"],"values":["Yes"]}],[{"itemId":950,"type":"matrix","form":"blank","values":[{"subtitle":"","option":"总床位数（张）","coordinate":"1-1","value":"80"},{"subtitle":"","option":"床位平均使用率（%）","coordinate":"1-2","value":"200%"},{"subtitle":"","option":"平均住院天数（天）","coordinate":"1-3","value":"10"}]}],[{"itemId":951,"type":"matrix","form":"blank","values":[{"subtitle":"病人类型1","option":"主要病人类型","coordinate":"1-1","value":"COPD"},{"subtitle":"病人类型2","option":"主要病人类型","coordinate":"2-1","value":"哮喘"},{"subtitle":"病人类型3","option":"主要病人类型","coordinate":"3-1","value":"感染"},{"subtitle":"病人类型4","option":"主要病人类型","coordinate":"4-1","value":"肺炎"},{"subtitle":"病人类型1","option":"占比（%）","coordinate":"1-2","value":"10"},{"subtitle":"病人类型1","option":"频率（次/天）","coordinate":"1-3","value":"5"},{"subtitle":"病人类型2","option":"占比（%）","coordinate":"2-2","value":"10"},{"subtitle":"病人类型2","option":"频率（次/天）","coordinate":"2-3","value":"5"},{"subtitle":"病人类型3","option":"占比（%）","coordinate":"3-2","value":"40"},{"subtitle":"病人类型3","option":"频率（次/天）","coordinate":"3-3","value":"10"},{"subtitle":"病人类型4","option":"占比（%）","coordinate":"4-2","value":"40"},{"subtitle":"病人类型4","option":"频率（次/天）","coordinate":"4-3","value":"10"}]}],[{"itemId":955,"type":"checks","codes":["1"],"values":["增加"]}],[{"itemId":956,"type":"choice","codes":["2"],"values":["科室引入自己的血气分析仪"]}],[{"itemId":959,"type":"choice","codes":["2"],"values":["动脉留置针"]}],[{"itemId":959,"type":"choice","codes":["2"],"values":["动脉留置针"]}],[{"itemId":960,"type":"blank","form":"multi","codes":["1","2","3","4"],"values":[null,"100"]}],[{"itemId":961,"type":"blank","form":"multi","codes":["1","2"],"values":["产品好"]}],[{"itemId":962,"type":"sort","values":["操作简便","售后服务","产品质量和可靠性","安全性","临床应用经验","性价比","临床培训","出血量","穿刺疼痛性","穿刺成功率"]}]]},{"reason":null,"resultId":148,"availability":"3","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["5"],"values":["长沙"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["问问"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["长沙人民医院"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["3"],"values":["住院部呼吸科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["30"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["15"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["10"]}],[{"itemId":945,"type":"choice","codes":["1"],"values":["5年以下"]}]]},{"reason":null,"resultId":149,"availability":"1","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["5"],"values":["长沙"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["wen"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["湖南省人民医院"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["3"],"values":["住院部呼吸科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["30"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["50"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["10"]}],[{"itemId":945,"type":"choice","codes":["2"],"values":["5年及以上"]}],[{"itemId":946,"type":"choice","codes":["1"],"values":["BD/碧迪"]}],[{"itemId":947,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":948,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":949,"type":"choice","codes":["1"],"values":["Yes"]}],[{"itemId":950,"type":"matrix","form":"blank","values":[{"subtitle":"","option":"总床位数（张）","coordinate":"1-1","value":"1000"},{"subtitle":"","option":"床位平均使用率（%）","coordinate":"1-2","value":"98"},{"subtitle":"","option":"平均住院天数（天）","coordinate":"1-3","value":"15"}]}],[{"itemId":951,"type":"matrix","form":"blank","values":[{"subtitle":"病人类型1","option":"主要病人类型","coordinate":"1-1","value":"COPD"},{"subtitle":"病人类型1","option":"占比（%）","coordinate":"1-2","value":"80"},{"subtitle":"病人类型1","option":"频率（次/天）","coordinate":"1-3","value":"20"},{"subtitle":"病人类型2","option":"主要病人类型","coordinate":"2-1","value":"哮喘"},{"subtitle":"病人类型2","option":"占比（%）","coordinate":"2-2","value":"20"},{"subtitle":"病人类型2","option":"频率（次/天）","coordinate":"2-3","value":"30"}]}],[{"itemId":955,"type":"checks","codes":["1"],"values":["增加"]}],[{"itemId":956,"type":"choice","codes":["3"],"values":["环境污染导致呼吸系统疾病的病人量增多"]}],[{"itemId":959,"type":"choice","codes":["2"],"values":["动脉留置针"]}],[{"itemId":960,"type":"blank","form":"multi","codes":["1","2","3","4"],"values":["50","20","20","10"]}],[{"itemId":961,"type":"blank","form":"multi","codes":["1","2"],"values":["咋地下室"]}],[{"itemId":962,"type":"sort","values":["售后服务","操作简便","安全性","性价比","穿刺疼痛性","出血量"]}]]},{"reason":null,"resultId":150,"availability":"0","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}]]},{"reason":null,"resultId":151,"availability":"3","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["一二三"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["二三四"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["1"],"values":["住院部儿科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["12"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["23"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["1"]}],[{"itemId":945,"type":"choice","codes":["1"],"values":["5年以下"]}]]},{"reason":null,"resultId":152,"availability":"3","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["3"],"values":["广州"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["sadsd"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["asdas"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["2"],"values":["住院部感染科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["2"],"values":["否"]}]]},{"reason":null,"resultId":153,"availability":"1","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["5"],"values":["长沙"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["wen"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["长沙市中心医院"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["5"],"values":["麻醉科"]}],[{"itemId":938,"type":"choice","codes":["1"],"values":["麻醉师（高年资医师）"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["20"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["20"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["5"]}],[{"itemId":945,"type":"choice","codes":["2"],"values":["5年及以上"]}],[{"itemId":946,"type":"choice","codes":["8"],"values":["威高/洁瑞"]}],[{"itemId":947,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":948,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":949,"type":"choice","codes":["1"],"values":["Yes"]}],[{"itemId":952,"type":"matrix","form":"blank","values":[{"subtitle":"总手术量","option":"台","coordinate":"1-1","value":"20"},{"subtitle":"需要麻醉的手术量","option":"台","coordinate":"2-1","value":"15"},{"subtitle":"需要动脉采血的手术量","option":"台","coordinate":"3-1","value":"15"}]}],[{"itemId":953,"type":"matrix","form":"blank","values":[{"subtitle":"全麻手术","option":"%","coordinate":"1-1","value":"50"},{"subtitle":"半麻手术","option":"%","coordinate":"2-1","value":"50"}]}],[{"itemId":954,"type":"matrix","form":"blank","values":[{"subtitle":"手术类型1","option":"手术类型","coordinate":"1-1","value":"肠胃手术"},{"subtitle":"手术类型1","option":"占所有动脉采血手术比例（加合100%）","coordinate":"1-2","value":"25"},{"subtitle":"手术类型2","option":"手术类型","coordinate":"2-1","value":"肺部手术"},{"subtitle":"手术类型2","option":"占所有动脉采血手术比例（加合100%）","coordinate":"2-2","value":"25"},{"subtitle":"手术类型3","option":"占所有动脉采血手术比例（加合100%）","coordinate":"3-2","value":"25"},{"subtitle":"手术类型4","option":"占所有动脉采血手术比例（加合100%）","coordinate":"4-2","value":"25"},{"subtitle":"手术类型3","option":"手术类型","coordinate":"3-1","value":"妇科手术"},{"subtitle":"手术类型4","option":"手术类型","coordinate":"4-1","value":"骨科手术"},{"subtitle":"手术类型1","option":"进行动脉采血的频率（次/台）","coordinate":"1-3","value":"5"},{"subtitle":"手术类型2","option":"进行动脉采血的频率（次/台）","coordinate":"2-3","value":"5"},{"subtitle":"手术类型3","option":"进行动脉采血的频率（次/台）","coordinate":"3-3","value":"5"},{"subtitle":"手术类型4","option":"进行动脉采血的频率（次/台）","coordinate":"4-3","value":"5"}]}],[{"itemId":955,"type":"checks","codes":["1"],"values":["增加"]}],[{"itemId":956,"type":"choice","codes":["1"],"values":["分级诊疗导致危重病人的增加"]}],[{"itemId":959,"type":"choice","codes":["1"],"values":["自制带肝素的注射器"]}],[{"itemId":960,"type":"blank","form":"multi","codes":["1","2","3","4"],"values":["100"]}],[{"itemId":962,"type":"sort","values":["安全性","临床培训","穿刺成功率","产品质量和可靠性","售后服务","操作简便","临床应用经验","穿刺疼痛性","性价比","出血量"]}]]},{"reason":null,"resultId":154,"availability":"1","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["5"],"values":["长沙"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["22"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["fenmin"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["1"],"values":["住院部儿科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["50"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["50"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["5"]}],[{"itemId":945,"type":"choice","codes":["2"],"values":["5年及以上"]}],[{"itemId":946,"type":"choice","codes":["2"],"values":["KDL/康德莱"]}],[{"itemId":947,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":948,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":949,"type":"choice","codes":["1"],"values":["Yes"]}],[{"itemId":950,"type":"matrix","form":"blank","values":[{"subtitle":"","option":"总床位数（张）","coordinate":"1-1","value":"11100"},{"subtitle":"","option":"床位平均使用率（%）","coordinate":"1-2","value":"80"},{"subtitle":"","option":"平均住院天数（天）","coordinate":"1-3","value":"10"}]}],[{"itemId":951,"type":"matrix","form":"blank","values":[{"subtitle":"病人类型1","option":"主要病人类型","coordinate":"1-1","value":"11"},{"subtitle":"病人类型1","option":"占比（%）","coordinate":"1-2","value":"100"},{"subtitle":"病人类型1","option":"频率（次/天）","coordinate":"1-3","value":"20"}]}],[{"itemId":955,"type":"checks","codes":["1"],"values":["增加"]}],[{"itemId":956,"type":"choice","codes":["3"],"values":["环境污染导致呼吸系统疾病的病人量增多"]}],[{"itemId":959,"type":"choice","codes":["2"],"values":["动脉留置针"]}],[{"itemId":960,"type":"blank","form":"multi","codes":["1","2","3","4"],"values":["100"]}],[{"itemId":961,"type":"blank","form":"multi","codes":["1","2"],"values":["56126"]}],[{"itemId":962,"type":"sort","values":["性价比","临床培训","售后服务","操作简便"]}]]},{"reason":null,"resultId":155,"availability":"1","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["2"],"values":["上海"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["郑纪川"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["北京捷峰咨询公司"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["5"],"values":["麻醉科"]}],[{"itemId":938,"type":"choice","codes":["1"],"values":["麻醉师（高年资医师）"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["30"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["50"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["5"]}],[{"itemId":945,"type":"choice","codes":["2"],"values":["5年及以上"]}],[{"itemId":946,"type":"choice","codes":["3"],"values":["拱东"]}],[{"itemId":947,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":948,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":949,"type":"choice","codes":["1"],"values":["Yes"]}],[{"itemId":952,"type":"matrix","form":"blank","values":[{"subtitle":"总手术量","option":"台","coordinate":"1-1","value":"50"},{"subtitle":"需要麻醉的手术量","option":"台","coordinate":"2-1","value":"20"},{"subtitle":"需要动脉采血的手术量","option":"台","coordinate":"3-1","value":"10"}]}],[{"itemId":953,"type":"matrix","form":"blank","values":[{"subtitle":"全麻手术","option":"%","coordinate":"1-1","value":"70"},{"subtitle":"半麻手术","option":"%","coordinate":"2-1","value":"20"}]}],[{"itemId":954,"type":"matrix","form":"blank","values":[{"subtitle":"手术类型1","option":"手术类型","coordinate":"1-1","value":"心脏手术"},{"subtitle":"手术类型1","option":"占所有动脉采血手术比例（加合100%）","coordinate":"1-2","value":"20"},{"subtitle":"手术类型1","option":"进行动脉采血的频率（次/台）","coordinate":"1-3","value":"3"},{"subtitle":"手术类型2","option":"手术类型","coordinate":"2-1","value":"骨科手术"},{"subtitle":"手术类型2","option":"占所有动脉采血手术比例（加合100%）","coordinate":"2-2","value":"30"},{"subtitle":"手术类型2","option":"进行动脉采血的频率（次/台）","coordinate":"2-3","value":"1"}]}],[{"itemId":955,"type":"checks","codes":["2"],"values":["减少"]}],[{"itemId":957,"type":"choice","codes":["2"],"values":["医院耗材控费"]}],[{"itemId":959,"type":"choice","codes":["3"],"values":["安全型动脉采血器（即具备防针刺伤功能的动脉采血器）"]}],[{"itemId":960,"type":"blank","form":"multi","codes":["1","2","3","4"],"values":[null,null,"30"]}],[{"itemId":962,"type":"sort","values":["临床培训","穿刺成功率","操作简便","出血量","产品质量和可靠性","穿刺疼痛性","安全性","售后服务"]}]]},{"reason":null,"resultId":156,"availability":"3","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["4"],"values":["成都"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["郑"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["北京医院"]}],[{"itemId":935,"type":"choice","codes":["3"],"values":["其他"]}]]},{"reason":null,"resultId":157,"availability":"1","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["3"],"values":["广州"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["jason"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["北京捷峰咨询有限公司"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["2"],"values":["住院部感染科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["30"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["50"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["30"]}],[{"itemId":945,"type":"choice","codes":["2"],"values":["5年及以上"]}],[{"itemId":946,"type":"choice","codes":["3"],"values":["拱东"]}],[{"itemId":947,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":948,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":949,"type":"choice","codes":["1"],"values":["Yes"]}],[{"itemId":950,"type":"matrix","form":"blank","values":[{"subtitle":"","option":"总床位数（张）","coordinate":"1-1","value":"40"},{"subtitle":"","option":"床位平均使用率（%）","coordinate":"1-2","value":"80"},{"subtitle":"","option":"平均住院天数（天）","coordinate":"1-3","value":"15"}]}],[{"itemId":951,"type":"matrix","form":"blank","values":[{"subtitle":"病人类型1","option":"主要病人类型","coordinate":"1-1","value":"建卡"},{"subtitle":"病人类型1","option":"占比（%）","coordinate":"1-2","value":"30"},{"subtitle":"病人类型1","option":"频率（次/天）","coordinate":"1-3","value":"3"},{"subtitle":"病人类型2","option":"主要病人类型","coordinate":"2-1","value":"放假啊风"},{"subtitle":"病人类型2","option":"占比（%）","coordinate":"2-2","value":"40"},{"subtitle":"病人类型2","option":"频率（次/天）","coordinate":"2-3","value":"2"}]}],[{"itemId":955,"type":"checks","codes":["3"],"values":["不变"]}],[{"itemId":959,"type":"choice","codes":["2"],"values":["动脉留置针"]}],[{"itemId":960,"type":"blank","form":"multi","codes":["1","2","3","4"],"values":["30","20","30","40"]}],[{"itemId":961,"type":"blank","form":"multi","codes":["1","2"],"values":["安全放心","环保经济实惠"]}],[{"itemId":962,"type":"sort","values":["售后服务","性价比","安全性","操作简便","临床培训","穿刺成功率","产品质量和可靠性","出血量","临床应用经验","穿刺疼痛性"]}]]},{"reason":null,"resultId":158,"availability":"3","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["dsafj "]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["dff"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["5"],"values":["麻醉科"]}],[{"itemId":938,"type":"choice","codes":["1"],"values":["麻醉师（高年资医师）"]}],[{"itemId":939,"type":"choice","codes":["2"],"values":["否"]}]]},{"reason":null,"resultId":159,"availability":"1","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["4"],"values":["成都"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["郑"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["捷峰咨询"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["5"],"values":["麻醉科"]}],[{"itemId":938,"type":"choice","codes":["1"],"values":["麻醉师（高年资医师）"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["50"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["45"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["30"]}],[{"itemId":945,"type":"choice","codes":["2"],"values":["5年及以上"]}],[{"itemId":946,"type":"choice","codes":["4"],"values":["阳普"]}],[{"itemId":947,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":948,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":949,"type":"choice","codes":["1"],"values":["Yes"]}],[{"itemId":952,"type":"matrix","form":"blank","values":[{"subtitle":"总手术量","option":"台","coordinate":"1-1","value":"50"},{"subtitle":"需要麻醉的手术量","option":"台","coordinate":"2-1","value":"20"},{"subtitle":"需要动脉采血的手术量","option":"台","coordinate":"3-1","value":"10"}]}],[{"itemId":953,"type":"matrix","form":"blank","values":[{"subtitle":"全麻手术","option":"%","coordinate":"1-1","value":"50"},{"subtitle":"半麻手术","option":"%","coordinate":"2-1","value":"40"}]}],[{"itemId":954,"type":"matrix","form":"blank","values":[{"subtitle":"手术类型1","option":"手术类型","coordinate":"1-1","value":"山东省非官方的"},{"subtitle":"手术类型2","option":"手术类型","coordinate":"2-1","value":"未亡人"},{"subtitle":"手术类型1","option":"占所有动脉采血手术比例（加合100%）","coordinate":"1-2","value":"30"},{"subtitle":"手术类型1","option":"进行动脉采血的频率（次/台）","coordinate":"1-3","value":"3"},{"subtitle":"手术类型2","option":"占所有动脉采血手术比例（加合100%）","coordinate":"2-2","value":"30"},{"subtitle":"手术类型2","option":"进行动脉采血的频率（次/台）","coordinate":"2-3","value":"2"}]}],[{"itemId":955,"type":"checks","codes":["1"],"values":["增加"]}],[{"itemId":956,"type":"choice","codes":["2"],"values":["科室引入自己的血气分析仪"]}],[{"itemId":959,"type":"choice","codes":["2"],"values":["动脉留置针"]}],[{"itemId":960,"type":"blank","form":"multi","codes":["1","2","3","4"],"values":[null,"90"]}],[{"itemId":961,"type":"blank","form":"multi","codes":["1","2"],"values":["双方各如果"]}],[{"itemId":962,"type":"sort","values":["临床培训","性价比","穿刺成功率","操作简便","售后服务","产品质量和可靠性","安全性","出血量","穿刺疼痛性","临床应用经验"]}]]},{"reason":null,"resultId":160,"availability":"1","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["李佳"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["捷峰"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["2"],"values":["住院部感染科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["60"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["300"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["5"]}],[{"itemId":945,"type":"choice","codes":["2"],"values":["5年及以上"]}],[{"itemId":946,"type":"choice","codes":["5"],"values":["成都瑞琦"]}],[{"itemId":947,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":948,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":949,"type":"choice","codes":["1"],"values":["Yes"]}],[{"itemId":950,"type":"matrix","form":"blank","values":[{"subtitle":"","option":"总床位数（张）","coordinate":"1-1","value":"1"},{"subtitle":"","option":"床位平均使用率（%）","coordinate":"1-2","value":"20"},{"subtitle":"","option":"平均住院天数（天）","coordinate":"1-3","value":"3"}]}],[{"itemId":955,"type":"checks","codes":["1"],"values":["增加"]}],[{"itemId":951,"type":"matrix","form":"blank","values":[{"subtitle":"病人类型1","option":"主要病人类型","coordinate":"1-1","value":"A"},{"subtitle":"病人类型2","option":"主要病人类型","coordinate":"2-1","value":"B"},{"subtitle":"病人类型3","option":"主要病人类型","coordinate":"3-1","value":"C"},{"subtitle":"病人类型4","option":"主要病人类型","coordinate":"4-1","value":"D"},{"subtitle":"病人类型1","option":"占比（%）","coordinate":"1-2","value":"20"},{"subtitle":"病人类型2","option":"占比（%）","coordinate":"2-2","value":"20"},{"subtitle":"病人类型3","option":"占比（%）","coordinate":"3-2","value":"30"},{"subtitle":"病人类型4","option":"占比（%）","coordinate":"4-2","value":"30"},{"subtitle":"病人类型1","option":"频率（次/天）","coordinate":"1-3","value":"1"},{"subtitle":"病人类型2","option":"频率（次/天）","coordinate":"2-3","value":"1"},{"subtitle":"病人类型3","option":"频率（次/天）","coordinate":"3-3","value":"1"},{"subtitle":"病人类型4","option":"频率（次/天）","coordinate":"4-3","value":"1"}]}],[{"itemId":956,"type":"choice","codes":["2"],"values":["科室引入自己的血气分析仪"]}],[{"itemId":959,"type":"choice","codes":["3"],"values":["安全型动脉采血器（即具备防针刺伤功能的动脉采血器）"]}],[{"itemId":960,"type":"blank","form":"multi","codes":["1","2","3","4"],"values":["20","30","50","0"]}],[{"itemId":962,"type":"sort","values":["临床培训","操作简便","安全性"]}]]},{"reason":"此问卷未打完","resultId":161,"availability":"0","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}]]},{"reason":"此问卷未打完","resultId":162,"availability":"0","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["4"],"values":["成都"]}]]},{"reason":"此问卷未打完","resultId":163,"availability":"0","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}]]},{"reason":null,"resultId":164,"availability":"1","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["薛佳"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["北京"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["3"],"values":["住院部呼吸科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["5"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["200ml"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["10"]}],[{"itemId":945,"type":"choice","codes":["2"],"values":["5年及以上"]}],[{"itemId":946,"type":"choice","codes":["1"],"values":["BD/碧迪"]}],[{"itemId":947,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":948,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":949,"type":"choice","codes":["1"],"values":["Yes"]}],[{"itemId":950,"type":"matrix","form":"blank","values":[{"subtitle":"","option":"总床位数（张）","coordinate":"1-1","value":"2000"},{"subtitle":"","option":"床位平均使用率（%）","coordinate":"1-2","value":"90"},{"subtitle":"","option":"平均住院天数（天）","coordinate":"1-3","value":"14"}]}],[{"itemId":951,"type":"matrix","form":"blank","values":[{"subtitle":"病人类型1","option":"主要病人类型","coordinate":"1-1","value":"糖尿病"},{"subtitle":"病人类型1","option":"占比（%）","coordinate":"1-2","value":"20"},{"subtitle":"病人类型1","option":"频率（次/天）","coordinate":"1-3","value":"2"},{"subtitle":"病人类型2","option":"主要病人类型","coordinate":"2-1","value":"高血脂"},{"subtitle":"病人类型2","option":"占比（%）","coordinate":"2-2","value":"40"},{"subtitle":"病人类型2","option":"频率（次/天）","coordinate":"2-3","value":"1"},{"subtitle":"病人类型3","option":"主要病人类型","coordinate":"3-1","value":"高血压"},{"subtitle":"病人类型3","option":"占比（%）","coordinate":"3-2","value":"5"},{"subtitle":"病人类型3","option":"频率（次/天）","coordinate":"3-3","value":"1"},{"subtitle":"病人类型4","option":"主要病人类型","coordinate":"4-1","value":"心脏瓣膜"},{"subtitle":"病人类型4","option":"占比（%）","coordinate":"4-2","value":"10"},{"subtitle":"病人类型4","option":"频率（次/天）","coordinate":"4-3","value":"1"}]}],[{"itemId":955,"type":"checks","codes":["1"],"values":["增加"]}],[{"itemId":956,"type":"choice","codes":["4"],"values":["人口老龄化，导致年老病人数增多"]}],[{"itemId":959,"type":"choice","codes":["3"],"values":["安全型动脉采血器（即具备防针刺伤功能的动脉采血器）"]}],[{"itemId":960,"type":"blank","form":"multi","codes":["1","2","3","4"],"values":["20","10","50","20"]}],[{"itemId":962,"type":"sort","values":["产品质量和可靠性","性价比","安全性","操作简便","穿刺疼痛性","临床应用经验","临床培训","穿刺成功率","售后服务","出血量"]}]]},{"reason":"此答案被真被甄别掉","resultId":165,"availability":"3","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["4"],"values":["成都"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["郑"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["北京捷峰"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["3"],"values":["住院部呼吸科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["20"]}],[{"itemId":941,"type":"choice","codes":["2"],"values":["2人次以下"]}]]},{"reason":"此问卷未打完","resultId":166,"availability":"0","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["3"],"values":["广州"]}]]},{"reason":"此问卷未打完","resultId":167,"availability":"0","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["2"],"values":["上海"]}]]},{"reason":"此答案被真被甄别掉","resultId":168,"availability":"3","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["4"],"values":["成都"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["万元户"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["东北大学校长"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["4"],"values":["急诊病房"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["99"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["10000"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["16"]}],[{"itemId":945,"type":"choice","codes":["1"],"values":["5年以下"]}]]},{"reason":"此答案被真被甄别掉","resultId":169,"availability":"3","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["孟志远"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["北京和事事件件"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["2"],"values":["住院部感染科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["19"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["18"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["20"]}],[{"itemId":945,"type":"choice","codes":["1"],"values":["5年以下"]}]]},{"reason":"此问卷未打完","resultId":170,"availability":"0","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":[""]}]]},{"reason":"此答案被真被甄别掉","resultId":171,"availability":"3","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["111"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["1"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["1"],"values":["住院部儿科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["200"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["200"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["10"]}],[{"itemId":945,"type":"choice","codes":["2"],"values":["5年及以上"]}],[{"itemId":946,"type":"choice","codes":["2"],"values":["KDL/康德莱"]}],[{"itemId":947,"type":"choice","codes":["1"],"values":["是"]}]]},{"reason":"此答案被真被甄别掉","resultId":172,"availability":"3","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["7"],"values":["其它"]}]]},{"reason":null,"resultId":173,"availability":"1","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["768798"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["hip"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["1"],"values":["住院部儿科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["7687980"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["908"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["87"]}],[{"itemId":945,"type":"choice","codes":["2"],"values":["5年及以上"]}],[{"itemId":946,"type":"choice","codes":["1"],"values":["BD/碧迪"]}],[{"itemId":947,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":948,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":949,"type":"choice","codes":["1"],"values":["Yes"]}],[{"itemId":950,"type":"matrix","form":"blank","values":[{"subtitle":"","option":"总床位数（张）","coordinate":"1-1","value":"56"},{"subtitle":"","option":"床位平均使用率（%）","coordinate":"1-2","value":"7"},{"subtitle":"","option":"平均住院天数（天）","coordinate":"1-3","value":"7"}]}],[{"itemId":951,"type":"matrix","form":"blank","values":[{"subtitle":"病人类型1","option":"主要病人类型","coordinate":"1-1","value":"21"},{"subtitle":"病人类型1","option":"占比（%）","coordinate":"1-2","value":"2"},{"subtitle":"病人类型1","option":"频率（次/天）","coordinate":"1-3","value":"21"},{"subtitle":"病人类型2","option":"主要病人类型","coordinate":"2-1","value":"12"},{"subtitle":"病人类型2","option":"占比（%）","coordinate":"2-2","value":"22"},{"subtitle":"病人类型2","option":"频率（次/天）","coordinate":"2-3","value":"3"},{"subtitle":"病人类型3","option":"主要病人类型","coordinate":"3-1","value":"1"},{"subtitle":"病人类型3","option":"占比（%）","coordinate":"3-2","value":"2"},{"subtitle":"病人类型3","option":"频率（次/天）","coordinate":"3-3","value":"2"},{"subtitle":"病人类型4","option":"主要病人类型","coordinate":"4-1","value":"1"},{"subtitle":"病人类型4","option":"占比（%）","coordinate":"4-2","value":"2"},{"subtitle":"病人类型4","option":"频率（次/天）","coordinate":"4-3","value":"32"}]}],[{"itemId":955,"type":"checks","codes":["1"],"values":["增加"]}],[{"itemId":956,"type":"choice","codes":["1"],"values":["分级诊疗导致危重病人的增加"]}],[{"itemId":959,"type":"choice","codes":["1"],"values":["自制带肝素的注射器"]}],[{"itemId":960,"type":"blank","form":"multi","codes":["1","2","3","4"],"values":["iu","io","io","ui"]}],[{"itemId":962,"type":"sort","values":["产品质量和可靠性","穿刺成功率","操作简便","售后服务","临床培训","性价比"]}]]},{"reason":"此答案被真被甄别掉","resultId":174,"availability":"3","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["王丽"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["第六中学"]}],[{"itemId":935,"type":"choice","codes":["3"],"values":["其他"]}]]},{"reason":"此答案被真被甄别掉","resultId":175,"availability":"3","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["王丽"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["中心医院"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["3"],"values":["住院部呼吸科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["20"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["10"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["1"]}],[{"itemId":945,"type":"choice","codes":["1"],"values":["5年以下"]}]]},{"reason":null,"resultId":176,"availability":"1","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["薛佳"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["北京"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["5"],"values":["麻醉科"]}],[{"itemId":938,"type":"choice","codes":["1"],"values":["麻醉师（高年资医师）"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["3"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["5"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["15"]}],[{"itemId":945,"type":"choice","codes":["2"],"values":["5年及以上"]}],[{"itemId":946,"type":"choice","codes":["8"],"values":["威高/洁瑞"]}],[{"itemId":947,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":948,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":949,"type":"choice","codes":["1"],"values":["Yes"]}],[{"itemId":952,"type":"matrix","form":"blank","values":[{"subtitle":"总手术量","option":"台","coordinate":"1-1","value":"10"},{"subtitle":"需要麻醉的手术量","option":"台","coordinate":"2-1","value":"8"},{"subtitle":"需要动脉采血的手术量","option":"台","coordinate":"3-1","value":"6"}]}],[{"itemId":953,"type":"matrix","form":"blank","values":[{"subtitle":"全麻手术","option":"%","coordinate":"1-1","value":"60"},{"subtitle":"半麻手术","option":"%","coordinate":"2-1","value":"40"}]}],[{"itemId":954,"type":"matrix","form":"blank","values":[{"subtitle":"手术类型1","option":"手术类型","coordinate":"1-1","value":"支架植入"},{"subtitle":"手术类型1","option":"占所有动脉采血手术比例（加合100%）","coordinate":"1-2","value":"40"},{"subtitle":"手术类型1","option":"进行动脉采血的频率（次/台）","coordinate":"1-3","value":"5"},{"subtitle":"手术类型2","option":"手术类型","coordinate":"2-1","value":"血运重建术"},{"subtitle":"手术类型2","option":"占所有动脉采血手术比例（加合100%）","coordinate":"2-2","value":"40"},{"subtitle":"手术类型2","option":"进行动脉采血的频率（次/台）","coordinate":"2-3","value":"8"},{"subtitle":"手术类型3","option":"手术类型","coordinate":"3-1","value":"心脏搭桥"},{"subtitle":"手术类型3","option":"占所有动脉采血手术比例（加合100%）","coordinate":"3-2","value":"10"},{"subtitle":"手术类型3","option":"进行动脉采血的频率（次/台）","coordinate":"3-3","value":"10"},{"subtitle":"手术类型4","option":"手术类型","coordinate":"4-1","value":"心脏薄膜置换"},{"subtitle":"手术类型4","option":"占所有动脉采血手术比例（加合100%）","coordinate":"4-2","value":"10"},{"subtitle":"手术类型4","option":"进行动脉采血的频率（次/台）","coordinate":"4-3","value":"5"}]}],[{"itemId":955,"type":"checks","codes":["1"],"values":["增加"]}],[{"itemId":956,"type":"choice","codes":["2"],"values":["科室引入自己的血气分析仪"]}],[{"itemId":959,"type":"choice","codes":["3"],"values":["安全型动脉采血器（即具备防针刺伤功能的动脉采血器）"]}],[{"itemId":960,"type":"blank","form":"multi","codes":["1","2","3","4"],"values":["10","20","30","20"]}],[{"itemId":962,"type":"sort","values":["产品质量和可靠性","性价比","操作简便","安全性","穿刺疼痛性","出血量","临床应用经验","售后服务","穿刺成功率","临床培训"]}]]},{"reason":"此答案被真被甄别掉","resultId":177,"availability":"3","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["7"],"values":["其它"]}]]},{"reason":null,"resultId":178,"availability":"1","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["2"],"values":["上海"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["11"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["11"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["5"],"values":["麻醉科"]}],[{"itemId":938,"type":"choice","codes":["1"],"values":["麻醉师（高年资医师）"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["100"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["11"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["20"]}],[{"itemId":945,"type":"choice","codes":["2"],"values":["5年及以上"]}],[{"itemId":946,"type":"choice","codes":["1"],"values":["BD/碧迪"]}],[{"itemId":947,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":948,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":949,"type":"choice","codes":["1"],"values":["Yes"]}],[{"itemId":952,"type":"matrix","form":"blank","values":[{"subtitle":"总手术量","option":"台","coordinate":"1-1","value":"20"},{"subtitle":"需要麻醉的手术量","option":"台","coordinate":"2-1","value":"2"},{"subtitle":"需要动脉采血的手术量","option":"台","coordinate":"3-1","value":"2"}]}],[{"itemId":953,"type":"matrix","form":"blank","values":[{"subtitle":"全麻手术","option":"%","coordinate":"1-1","value":"50"},{"subtitle":"半麻手术","option":"%","coordinate":"2-1","value":"50"}]}],[{"itemId":954,"type":"matrix","form":"blank","values":[{"subtitle":"手术类型1","option":"手术类型","coordinate":"1-1","value":"1"},{"subtitle":"手术类型2","option":"手术类型","coordinate":"2-1","value":"1"},{"subtitle":"手术类型3","option":"手术类型","coordinate":"3-1","value":"1"},{"subtitle":"手术类型4","option":"手术类型","coordinate":"4-1","value":"1"}]}],[{"itemId":955,"type":"checks","codes":["2","1"],"values":["减少","增加"]}],[{"itemId":955,"type":"checks","codes":["1","2","2"],"values":["增加","减少","减少"]}],[{"itemId":956,"type":"choice","codes":["3"],"values":["环境污染导致呼吸系统疾病的病人量增多"]}],[{"itemId":957,"type":"choice","codes":["2"],"values":["医院耗材控费"]}],[{"itemId":959,"type":"choice","codes":["2"],"values":["动脉留置针"]}],[{"itemId":960,"type":"blank","form":"multi","codes":["1","2","3","4"],"values":["1","1","1","1"]}],[{"itemId":961,"type":"blank","form":"multi","codes":["1","2"],"values":["1","1"]}],[{"itemId":962,"type":"sort","values":["性价比","售后服务"]}]]},{"reason":"此问卷未打完","resultId":179,"availability":"0","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["门户网站"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["还是不上班"]}],[{"itemId":935,"type":"choice","codes":["2"],"values":["二甲综合医院"]}],[{"itemId":936,"type":"choice","codes":["4"],"values":["急诊病房"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["29"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["18"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["8"]}],[{"itemId":945,"type":"choice","codes":["2"],"values":["5年及以上"]}],[{"itemId":946,"type":"choice","codes":["6"],"values":["苏州施莱"]}]]},{"reason":null,"resultId":180,"availability":"1","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["4"],"values":["成都"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["好好上班"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["好好的话都会"]}],[{"itemId":935,"type":"choice","codes":["2"],"values":["二甲综合医院"]}],[{"itemId":936,"type":"choice","codes":["2"],"values":["住院部感染科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["18"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["36"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["9"]}],[{"itemId":945,"type":"choice","codes":["2"],"values":["5年及以上"]}],[{"itemId":946,"type":"choice","codes":["1"],"values":["BD/碧迪"]}],[{"itemId":947,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":948,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":949,"type":"choice","codes":["1"],"values":["Yes"]}],[{"itemId":950,"type":"matrix","form":"blank","values":[{"subtitle":"","option":"总床位数（张）","coordinate":"1-1","value":"18"},{"subtitle":"","option":"床位平均使用率（%）","coordinate":"1-2","value":"50"},{"subtitle":"","option":"平均住院天数（天）","coordinate":"1-3","value":"27"}]}],[{"itemId":951,"type":"matrix","form":"blank","values":[{"subtitle":"病人类型1","option":"主要病人类型","coordinate":"1-1","value":"计算机技术"},{"subtitle":"病人类型1","option":"占比（%）","coordinate":"1-2","value":"39"},{"subtitle":"病人类型1","option":"频率（次/天）","coordinate":"1-3","value":"27"},{"subtitle":"病人类型2","option":"主要病人类型","coordinate":"2-1","value":"好多好多话"},{"subtitle":"病人类型2","option":"占比（%）","coordinate":"2-2","value":"36"},{"subtitle":"病人类型2","option":"频率（次/天）","coordinate":"2-3","value":"87"},{"subtitle":"病人类型3","option":"主要病人类型","coordinate":"3-1","value":"好多好多话"},{"subtitle":"病人类型3","option":"占比（%）","coordinate":"3-2","value":"7"},{"subtitle":"病人类型3","option":"频率（次/天）","coordinate":"3-3","value":"77"}]}],[{"itemId":955,"type":"checks","codes":["1"],"values":["增加"]}],[{"itemId":956,"type":"choice","codes":["1"],"values":["分级诊疗导致危重病人的增加"]}],[{"itemId":959,"type":"choice","codes":["2"],"values":["动脉留置针"]}],[{"itemId":960,"type":"blank","form":"multi","codes":["1","2","3","4"],"values":["27","29","5","67"]}],[{"itemId":961,"type":"blank","form":"multi","codes":["1","2"],"values":["间谍活动"]}],[{"itemId":962,"type":"sort","values":["产品质量和可靠性","穿刺成功率","性价比","售后服务","穿刺疼痛性","出血量","临床应用经验","操作简便","安全性","临床培训"]}]]},{"reason":null,"resultId":181,"availability":"1","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["4"],"values":["成都"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["李大大"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["北京人民医院"]}],[{"itemId":935,"type":"choice","codes":["2"],"values":["二甲综合医院"]}],[{"itemId":936,"type":"choice","codes":["2"],"values":["住院部感染科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["30"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["50"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["20"]}],[{"itemId":945,"type":"choice","codes":["2"],"values":["5年及以上"]}],[{"itemId":946,"type":"choice","codes":["5"],"values":["成都瑞琦"]}],[{"itemId":947,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":948,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":949,"type":"choice","codes":["1"],"values":["Yes"]}],[{"itemId":950,"type":"matrix","form":"blank","values":[{"subtitle":"","option":"总床位数（张）","coordinate":"1-1","value":"30"},{"subtitle":"","option":"床位平均使用率（%）","coordinate":"1-2","value":"90"},{"subtitle":"","option":"平均住院天数（天）","coordinate":"1-3","value":"15"}]}],[{"itemId":951,"type":"matrix","form":"blank","values":[{"subtitle":"病人类型1","option":"主要病人类型","coordinate":"1-1","value":"感染患者"},{"subtitle":"病人类型2","option":"主要病人类型","coordinate":"2-1","value":"病情严重患者"},{"subtitle":"病人类型3","option":"主要病人类型","coordinate":"3-1","value":"肿瘤患者"},{"subtitle":"病人类型1","option":"占比（%）","coordinate":"1-2","value":"40"},{"subtitle":"病人类型2","option":"占比（%）","coordinate":"2-2","value":"20"},{"subtitle":"病人类型3","option":"占比（%）","coordinate":"3-2","value":"60"},{"subtitle":"病人类型1","option":"频率（次/天）","coordinate":"1-3","value":"2"},{"subtitle":"病人类型2","option":"频率（次/天）","coordinate":"2-3","value":"1"},{"subtitle":"病人类型3","option":"频率（次/天）","coordinate":"3-3","value":"3"}]}],[{"itemId":955,"type":"checks","codes":["1"],"values":["增加"]}],[{"itemId":955,"type":"checks","codes":["1","1"],"values":["增加","增加"]}],[{"itemId":955,"type":"checks","codes":["1","1","1"],"values":["增加","增加","增加"]}],[{"itemId":956,"type":"choice","codes":["3"],"values":["环境污染导致呼吸系统疾病的病人量增多"]}],[{"itemId":959,"type":"choice","codes":["2"],"values":["动脉留置针"]}],[{"itemId":960,"type":"blank","form":"multi","codes":["1","2","3","4"],"values":[null,null,"30"]}],[{"itemId":961,"type":"blank","form":"multi","codes":["1","2"],"values":["病人量增加","使用安全放心"]}],[{"itemId":962,"type":"sort","values":["临床培训","穿刺成功率","产品质量和可靠性","安全性","穿刺疼痛性","售后服务","操作简便","临床应用经验","出血量","性价比"]}]]},{"reason":"此答案被真被甄别掉","resultId":182,"availability":"3","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["王盼盼"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["化妆师"]}],[{"itemId":935,"type":"choice","codes":["3"],"values":["其他"]}]]},{"reason":null,"resultId":183,"availability":"1","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["打家劫舍"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["急景凋年的"]}],[{"itemId":935,"type":"choice","codes":["2"],"values":["二甲综合医院"]}],[{"itemId":936,"type":"choice","codes":["1"],"values":["住院部儿科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["17"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["27"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["9"]}],[{"itemId":945,"type":"choice","codes":["2"],"values":["5年及以上"]}],[{"itemId":946,"type":"choice","codes":["5"],"values":["成都瑞琦"]}],[{"itemId":947,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":948,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":949,"type":"choice","codes":["1"],"values":["Yes"]}],[{"itemId":950,"type":"matrix","form":"blank","values":[{"subtitle":"","option":"总床位数（张）","coordinate":"1-1","value":"1"},{"subtitle":"","option":"床位平均使用率（%）","coordinate":"1-2","value":"26"},{"subtitle":"","option":"平均住院天数（天）","coordinate":"1-3","value":"7"}]}],[{"itemId":951,"type":"matrix","form":"blank","values":[{"subtitle":"病人类型1","option":"主要病人类型","coordinate":"1-1","value":"66"},{"subtitle":"病人类型1","option":"占比（%）","coordinate":"1-2","value":"6"},{"subtitle":"病人类型1","option":"频率（次/天）","coordinate":"1-3","value":"78"},{"subtitle":"病人类型2","option":"主要病人类型","coordinate":"2-1","value":"54"},{"subtitle":"病人类型2","option":"占比（%）","coordinate":"2-2","value":"76"},{"subtitle":"病人类型2","option":"频率（次/天）","coordinate":"2-3","value":"7"}]}],[{"itemId":955,"type":"checks","codes":["1"],"values":["增加"]}],[{"itemId":956,"type":"choice","codes":["2"],"values":["科室引入自己的血气分析仪"]}],[{"itemId":959,"type":"choice","codes":["2"],"values":["动脉留置针"]}],[{"itemId":960,"type":"blank","form":"multi","codes":["1","2","3","4"],"values":["电话电话","上海市","浑身解数","今生今世"]}],[{"itemId":961,"type":"blank","form":"multi","codes":["1","2"],"values":["上海市"]}],[{"itemId":962,"type":"sort","values":["穿刺成功率","产品质量和可靠性","性价比","售后服务","临床培训","操作简便","安全性","穿刺疼痛性","临床应用经验","出血量"]}]]},{"reason":"此答案被真被甄别掉","resultId":184,"availability":"3","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["索会楠"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["无业"]}],[{"itemId":935,"type":"choice","codes":["3"],"values":["其他"]}]]},{"reason":"此问卷未打完","resultId":185,"availability":"0","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["蔡成功"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["北京二院"]}],[{"itemId":935,"type":"choice","codes":["2"],"values":["二甲综合医院"]}],[{"itemId":936,"type":"choice","codes":["2"],"values":["住院部感染科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["10"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["5"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["5"]}]]},{"reason":null,"resultId":186,"availability":"1","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["普工"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["第九医院"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["2"],"values":["住院部感染科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["80"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["1234"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["22"]}],[{"itemId":945,"type":"choice","codes":["2"],"values":["5年及以上"]}],[{"itemId":946,"type":"choice","codes":["2"],"values":["KDL/康德莱"]}],[{"itemId":947,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":947,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":948,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":949,"type":"choice","codes":["1"],"values":["Yes"]}],[{"itemId":950,"type":"matrix","form":"blank","values":[{"subtitle":"","option":"总床位数（张）","coordinate":"1-1","value":"1000"},{"subtitle":"","option":"床位平均使用率（%）","coordinate":"1-2","value":"88"},{"subtitle":"","option":"平均住院天数（天）","coordinate":"1-3","value":"7"}]}],[{"itemId":951,"type":"matrix","form":"blank","values":[{"subtitle":"病人类型1","option":"主要病人类型","coordinate":"1-1","value":"我"},{"subtitle":"病人类型2","option":"主要病人类型","coordinate":"2-1","value":"我"},{"subtitle":"病人类型3","option":"主要病人类型","coordinate":"3-1","value":"我"},{"subtitle":"病人类型4","option":"主要病人类型","coordinate":"4-1","value":"我"},{"subtitle":"病人类型1","option":"占比（%）","coordinate":"1-2","value":"88"},{"subtitle":"病人类型2","option":"占比（%）","coordinate":"2-2","value":"是"},{"subtitle":"病人类型3","option":"占比（%）","coordinate":"3-2","value":"一"},{"subtitle":"病人类型4","option":"占比（%）","coordinate":"4-2","value":"在"},{"subtitle":"病人类型1","option":"频率（次/天）","coordinate":"1-3","value":"是"},{"subtitle":"病人类型2","option":"频率（次/天）","coordinate":"2-3","value":"在"},{"subtitle":"病人类型3","option":"频率（次/天）","coordinate":"3-3","value":"这"},{"subtitle":"病人类型4","option":"频率（次/天）","coordinate":"4-3","value":"这"}]}],[{"itemId":955,"type":"checks","codes":["1"],"values":["增加"]}],[{"itemId":956,"type":"choice","codes":["3"],"values":["环境污染导致呼吸系统疾病的病人量增多"]}],[{"itemId":959,"type":"choice","codes":["2"],"values":["动脉留置针"]}],[{"itemId":960,"type":"blank","form":"multi","codes":["1","2","3","4"],"values":["不","是","是","不"]}],[{"itemId":961,"type":"blank","form":"multi","codes":["1","2"],"values":["在乎过自己就","是的、在于"]}],[{"itemId":962,"type":"sort","values":["穿刺成功率","售后服务","性价比","操作简便"]}]]},{"reason":"此答案被真被甄别掉","resultId":187,"availability":"3","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["2"],"values":["上海"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["郑纪川"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["北京捷峰咨询"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["3"],"values":["住院部呼吸科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["2"],"values":["否"]}]]},{"reason":null,"resultId":188,"availability":"1","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["2"],"values":["上海"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["郑纪川"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["北京捷峰咨询"]}],[{"itemId":935,"type":"choice","codes":["2"],"values":["二甲综合医院"]}],[{"itemId":936,"type":"choice","codes":["5"],"values":["麻醉科"]}],[{"itemId":938,"type":"choice","codes":["1"],"values":["麻醉师（高年资医师）"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["20"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["30"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["30"]}],[{"itemId":945,"type":"choice","codes":["2"],"values":["5年及以上"]}],[{"itemId":946,"type":"choice","codes":["3"],"values":["拱东"]}],[{"itemId":947,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":948,"type":"choice","codes":["2"],"values":["否"]}],[{"itemId":949,"type":"choice","codes":["1"],"values":["Yes"]}],[{"itemId":952,"type":"matrix","form":"blank","values":[{"subtitle":"总手术量","option":"台","coordinate":"1-1","value":"60"},{"subtitle":"需要麻醉的手术量","option":"台","coordinate":"2-1","value":"30"},{"subtitle":"需要动脉采血的手术量","option":"台","coordinate":"3-1","value":"20"}]}],[{"itemId":953,"type":"matrix","form":"blank","values":[{"subtitle":"全麻手术","option":"%","coordinate":"1-1","value":"50"},{"subtitle":"半麻手术","option":"%","coordinate":"2-1","value":"38"}]}],[{"itemId":954,"type":"matrix","form":"blank","values":[{"subtitle":"手术类型1","option":"手术类型","coordinate":"1-1","value":"需手术病人"},{"subtitle":"手术类型1","option":"占所有动脉采血手术比例（加合100%）","coordinate":"1-2","value":"20"},{"subtitle":"手术类型1","option":"进行动脉采血的频率（次/台）","coordinate":"1-3","value":"5"},{"subtitle":"手术类型2","option":"手术类型","coordinate":"2-1","value":"手刺激你"},{"subtitle":"手术类型2","option":"占所有动脉采血手术比例（加合100%）","coordinate":"2-2","value":"90"},{"subtitle":"手术类型2","option":"进行动脉采血的频率（次/台）","coordinate":"2-3","value":"2"}]}],[{"itemId":955,"type":"checks","codes":["1"],"values":["增加"]}],[{"itemId":956,"type":"choice","codes":["3"],"values":["环境污染导致呼吸系统疾病的病人量增多"]}],[{"itemId":959,"type":"choice","codes":["3"],"values":["安全型动脉采血器（即具备防针刺伤功能的动脉采血器）"]}],[{"itemId":960,"type":"blank","form":"multi","codes":["1","2","3","4"],"values":[null,"30","20"]}],[{"itemId":962,"type":"sort","values":["穿刺成功率","产品质量和可靠性","性价比","出血量","临床应用经验","安全性","操作简便","临床培训","穿刺疼痛性"]}]]},{"reason":"此答案被真被甄别掉","resultId":189,"availability":"3","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}],[{"itemId":963,"type":"blank","form":"single","codes":[],"values":["薛佳"]}],[{"itemId":964,"type":"blank","form":"single","codes":[],"values":["北京"]}],[{"itemId":935,"type":"choice","codes":["1"],"values":["三级综合医院"]}],[{"itemId":936,"type":"choice","codes":["1"],"values":["住院部儿科"]}],[{"itemId":937,"type":"choice","codes":["1"],"values":["临床医生"]}],[{"itemId":939,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":940,"type":"blank","form":"single","codes":["1","2"],"values":["10"]}],[{"itemId":941,"type":"choice","codes":["1"],"values":["2人次及以上"]}],[{"itemId":942,"type":"blank","form":"single","codes":["1","2"],"values":["50"]}],[{"itemId":943,"type":"choice","codes":["1"],"values":["20人次及以上"]}],[{"itemId":944,"type":"blank","form":"single","codes":["1","2"],"values":["20"]}],[{"itemId":945,"type":"choice","codes":["2"],"values":["5年及以上"]}],[{"itemId":946,"type":"choice","codes":["6"],"values":["苏州施莱"]}],[{"itemId":947,"type":"choice","codes":["1"],"values":["是"]}]]},{"reason":"此问卷未打完","resultId":190,"availability":"0","list":[[{"itemId":933,"type":"choice","codes":["1"],"values":["是"]}],[{"itemId":934,"type":"choice","codes":["1"],"values":["北京"]}]]}]}];





//收集设置渲染
function renderCollectControl(){
    //问卷收集部分的选项
    if (!window.sets){
        window.sets = {
            total_top: 0,
            total_bottom: 0,
            time_question: {
                restrict: false,
                time: null
            },
            time_survey: {
                restrict: false,
                time:null
            },
            clientOnly: false,
            disposableForClient: false,
            disposableForIp: false,
            disposableForDevice: false,
            passwordNeeded: false,
            verificationCodeNeeded: false,
            allocations: {
                question_list: questions,
                summary_top: 0,
                summary_bottom: 0,
                allocate_top: 0,
                allocate_bottom: 0,
                collected: 0,
                allocatings: [
                    {
                        index: 0,
                        question_id: '',
                        question_title: '',
                        options: {},
                        sum_top: 0,
                        sum_bottom: 0,
                        allocate_option: [
                            {
                                op_index: 0,
                                value: '',
                                allocation_top: 0,
                                percent_top: 0,
                                allocation_bottom: 0,
                                percent_bottom: 0,
                                collected: 0
                            },{
                                op_index: 1,
                                value: '',
                                allocation_top: 0,
                                percent_top: 0,
                                allocation_bottom: 0,
                                percent_bottom: 0,
                                collected: 0
                            }
                        ]
                    }
                ]
            },
            allocation_cross: {
                question_list: questions,
                summary_top: 0,
                summary_bottom: 0,
                allocate_top: 0,
                allocate_bottom: 0,
                collected: 0,
                allocatings: [
                    {
                        index: 0,
                        options: {},
                        conditionString: '',
                        allocate_bottom: 0,
                        allocate_top: 0,
                        percent_bottom: 0,
                        percent_top: 0,
                        percent_average: 0
                    },{
                        index: 1,
                        options: {},
                        conditionString: '',
                        allocate_bottom: 0,
                        allocate_top: 0,
                        percent_bottom: 0,
                        percent_top: 0,
                        percent_average: 0
                    }
                ]
            }
        };
    }
    sets.allocations.summary_bottom = sets.allocation_cross.summary_bottom = sets.total_bottom;
    sets.allocations.summary_top = sets.allocation_cross.summary_top = sets.total_top;

    var setsV = new Vue({
        el: '#collect_control',
        data: sets,
        methods: {
            updateTotalTop: function(event){
                this.allocations.summary_top = parseInt($(event.target).val());
                this.allocation_cross.summary_top = parseInt($(event.target).val())
            },
            updateTotalBottom: function(event){
                this.allocations.summary_bottom = parseInt($(event.target).val());
                this.allocation_cross.summary_bottom = parseInt($(event.target).val())
            }
        }
    });
}

//点击到设置配额界面时,加载数据
function renderAllocateControl(){

        var allocationV = new Vue({
            el: '#allocate_basic',
            data: sets.allocations,
            methods: {
                updateSummaryBottom: function(event){
                    sets.total_bottom = this.summary_bottom = $(event.target).val()
                },
                updateSummaryTop: function(event){
                    sets.total_bottom = this.summary_top = $(event.target).val()
                },
                findTP: function(event){
                    let t = $(event.target),
                        p = t.parents('.allocation').attr('index');
                    return [t,p]
                },
                findTPG: function(event){
                    let t = $(event.target),
                        p = t.parents('tr').attr('op_index'),
                        g = t.parents('.allocation').attr('index');
                    return [t,p,g]
                },
                selectQuestion: function(event){
                    let [t,p] = this.findTP(event);
                    if (t.val() === 'deletethis'){
                        this.allocatings.splice(p,1)
                    } else {
                        this.allocatings[p].question_id = t.val();
                        for (let i = 0,l = questions.length; i < l; i++){
                            if (questions[i].itemKey == t.val()){
                                this.allocatings[p].options = questions[i].options ? questions[i].options : {}
                            }
                        }
                    }
                },
                selectOption: function(event){
                    let [t,p,g] = this.findTPG(event);
                    if (t.val() === 'deletethis'){
                        this.allocatings[g].allocate_option.splice(p,1)
                    } else {
                        this.allocatings[g].allocate_option[p].value = t.val()
                    }
                },
                editAllocationBottom: function(event){
                    let [t,p,g] = this.findTPG(event),
                        allocatings = this.allocatings,
                        options = allocatings[g].allocate_option,
                        sum_bottom = 0,
                        allocate_bottom = 0;

                    options[p].allocation_bottom = parseInt(t.val());

                    options[p].percent_bottom = Math.round(options[p].allocation_bottom * 100 / this.summary_bottom);

                    for (let i in options){
                        sum_bottom += options[i].allocation_bottom
                    }
                    allocatings[g].sum_bottom = sum_bottom;

                    for (let i in allocatings){
                        allocate_bottom += allocatings[i].sum_bottom
                    }
                    this.allocate_bottom = allocate_bottom

                },
                editAllocationTop: function(event){
                    let [t,p,g] = this.findTPG(event),
                        allocatings = this.allocatings,
                        options = allocatings[g].allocate_option,
                        sum_top = 0,
                        allocate_top = 0;

                    options[p].allocation_top = parseInt(t.val());

                    options[p].percent_top = Math.round(options[p].allocation_top * 100 / this.summary_top);

                    for (let i in options){
                        sum_top += options[i].allocation_top
                    }
                    allocatings[g].sum_top = sum_top;

                    for (let i in allocatings){
                        allocate_top += allocatings[i].sum_top
                    }
                    this.allocate_top = allocate_top
                },
                insertAllocation: function(event){
                    let [t,p] = this.findTP(event),
                        allocations = this.allocatings[p].allocate_option;
                    allocations.push({
                        op_index: allocations.length,
                        value: '',
                        allocation_top: 0,
                        percent_top: 0,
                        allocation_bottom: 0,
                        percent_bottom: 0,
                        collected: 0
                    })
                },
                deleteAllocation: function(event){
                    let [t,p,g] = this.findTPG(event),
                        options = this.allocatings[g].allocate_option,
                        option = options[p];
                    options.splice(options.indexOf(option),1);
                },
                insertTable: function(event){
                    let allocatings = this.allocatings,
                        t = event.target;
                    allocatings.push({
                        index: allocatings.length,
                        question_id: '',
                        question_title: '',
                        options: {},
                        sum_top: 0,
                        sum_bottom: 0,
                        allocate_option: [
                            {
                                op_index: 0,
                                value: '',
                                allocation_top: 0,
                                percent_top: 0,
                                allocation_bottom: 0,
                                percent_bottom: 0,
                                collected: 0
                            },{
                                op_index: 1,
                                value: '',
                                allocation_top: 0,
                                percent_top: 0,
                                allocation_bottom: 0,
                                percent_bottom: 0,
                                collected: 0
                            }
                        ]
                    });
                    setTimeout(function(){t.scrollIntoView(false)},100)
                }
            }
        });

        var allocation_cross = new Vue({
            el: '#allocate_cross',
            data: sets.allocation_cross,
            mounted: function(){
                $(this.$el).find('.writable').each(function(){
                    let v = $(this).text();
                    $(this).empty().text(v);
                })
            },
            methods: {
                findTP: function(event){
                    let t = $(event.target),
                        p = t.parents('tr').attr('index');
                    return [t,p]
                },
                moveToEnd: function(that){
                    if(document.all){
                        that.range=document.selection.createRange();
                        that.range.select();
                        that.range.moveStart("character",-1);
                    }else{
                        that.range=window.getSelection().getRangeAt(0);
                        that.offset = that.range.startOffset;

                        return that.offset;
                    }
                },
                middlePostion: function(event, char){
                    event.preventDefault();
                    let t = $(event.target),
                        p = t.parents('.conditions'),
                        g = t.parents('tr').attr('index');
                    if(document.all){
                        return;
                        //t.range=document.selection.createRange();
                        //t.range.select();
                        //t.range.moveStart("character",-1);
                    }else{
                        t.range = window.getSelection().getRangeAt(0);
                        t.index = Array.prototype.indexOf.call(t[0].childNodes, t.range.startContainer);
                        t.container = t.range.startContainer;
                        t.offset= t.range.startOffset;
                        let arr = t.text().split('');
                        arr.splice(c.offset,0,char);
                        let text = arr.join('');
                        t.text(text);
                        this.allocatings[g].conditionString = text;
                        t.focus();
                        t.range.setStart($(t.range.startContainer)[0].childNodes[t.index], t.offset+1);
                    }
                },
                editExpression: function(event){
                    let [t,p] = this.findTP(event),
                        v = t.text();
                    this.allocatings[p].conditionString = v;
                },
                keysFuncs: function(event){

                    let n = event.keyCode,
                        c = event.ctrlKey,
                        a = event.altKey,
                        m = event.metaKey,
                        s = event.shiftKey;

                    $(event.target).parents('.conditions').find('.questions-in-expression').hide();

                    if (n === 32){
                        let [t,p] = this.findTP(event);
                        event.preventDefault();
                        if (document.all){} else {

                            t.range = window.getSelection().getRangeAt(0);

                            if(/q$/.test(t.range.startContainer.data.slice(0,t.range.startOffset))){
                                this.chooseQuestion(event)

                            } else if (t.range.startContainer.data.slice(0,t.range.startOffset).match(/q(\d+)=$/)){
                                this.chooseAnswer(event, t.range.startContainer.data.slice(0,t.range.startOffset).match(/q(\d+)=$/)[1])
                            }
                        }
                    } else if (n === 40 || n === 65288){
                        this.openBracket(event)
                    } else if (n === 41 || n === 65289){
                        this.closeBracket(event)
                    } else if (n === 61){
                        //this.chooseAnswer(event)
                    } else if (n === 38){
                        this.insertAnd(event)
                    } else if (n === 124){
                        this.insertOr(event)
                    } else if (n === 33 || n === 65281){
                        this.insertNot(event)
                    }
                },
                chooseQuestion: function(event){
                    $(event.target).parents('.conditions').find('.questions-in-expression').show()
                },
                pickQuestion: function(event){
                    let t = $(event.target),
                        question_id = t.attr('item_id'),
                        l = question_id.length,
                        p = t.parents('.conditions'),
                        c = p.find('.express'),
                        g = t.parents('tr').attr('index');

                    t.parents('.questions-in-expression').hide();

                    if(document.all){
                        return;
                        //t.range=document.selection.createRange();
                        //t.range.select();
                        //t.range.moveStart("character",-1);
                    }else{
                        c.range = window.getSelection().getRangeAt(0);
                        c.index = Array.prototype.indexOf.call(c[0].childNodes, c.range.startContainer);
                        c.offset= c.range.startOffset;
                        let arr = c[0].childNodes[c.index].data.split('');
                        arr.splice(c.offset,0,question_id);
                        let text = arr.join('');
                        c[0].childNodes[c.index].data = text;
                        this.allocatings[g].conditionString = c.html();
                        c.focus();
                        c.range.setStart(c[0].childNodes[c.index], c.offset+parseInt(l));
                    }
                },
                openBracket: function(event){
                    this.middlePostion(event,'(')
                },
                closeBracket: function(event){
                    this.middlePostion(event, ')')
                },
                chooseAnswer: function(event, itemid){
                    this.allocatings[$(event.target).parents('tr').attr('index')].options = this.question_list[itemid-1].options;
                    $(event.target).parents('.conditions').find('.options-in-expression').show()
                },
                pickAnswer: function(event){
                    if (event.type === 'keypress'){
                        if (event.keyCode !== 13){
                            $(event.target).attr('title', $(event.target).text());
                            return
                        }
                    }
                    let t = $(event.target),
                        v = t.attr('title'),
                        l = v.length,
                        p = t.parents('.conditions'),
                        c = p.find('.express'),
                        g = t.parents('tr').attr('index');

                    t.parents('.options-in-expression').hide();

                    if(document.all){
                        return;
                        //t.range=document.selection.createRange();
                        //t.range.select();
                        //t.range.moveStart("character",-1);
                    }else{
                        c.range = window.getSelection().getRangeAt(0);
                        c.index = Array.prototype.indexOf.call(c[0].childNodes, c.range.startContainer);
                        c.offset= c.range.startOffset;
                        let arr = c[0].childNodes[c.index].data.split('');
                        arr.splice(c.offset,0,v);
                        let text = arr.join('');
                        c[0].childNodes[c.index].data = text;
                        this.allocatings[g].conditionString = c.html();
                        c.focus();
                        c.range.setStart(c[0].childNodes[c.index], c.offset+parseInt(l));
                    }
                },
                insertAnd: function(event){
                    event.preventDefault();
                    this.insertRelation(event, '&&')
                },
                insertOr: function(event){
                    event.preventDefault();
                    this.insertRelation(event, '||')
                },
                insertNot: function(event){
                    event.preventDefault();
                    this.insertRelation(event, ' !')
                },
                insertRelation: function(event, char){
                    let t = $(event.target),
                        p = t.parents('tr').attr('index'),
                        nodes = t[0].childNodes,
                        l = nodes.length + 1;
                    nodes[l-2].data += ' ';
                    t.append(`<b>` + char + `</b>`)
                        .append(document.createTextNode(' q'));
                    this.allocatings[p].conditionString = t.html();
                    t.range = window.getSelection().getRangeAt(0);
                    t.range.setStart(nodes[l],2);
                },
                editEdge: function(event){
                    let t = $(event.target),
                        cls = t.className,
                        al = this.allocatings[t.parents('tr').attr('index')];

                    al['allocate_'+ cls] = t.val();
                    al['percent_' + cls] = Math.round(al['allocate_'+ cls] * 100 / this['summary_' + cls]);

                    if (al.percent_bottom === 0){
                        al.precent_average = al.percent_top
                    } else if (al.percent_top === 0){
                        al.percent_average = al.percent_bottom
                    } else {
                        al.percent_average = Math.round((al.percent_bottom + al.percent_top) / 2)
                    }
                },
                insertCondition: function(event){
                    let allocatings = this.allocatings,
                        index = allocatings.length;
                    allocatings.push({
                        index: index,
                        options: {},
                        conditionString: '',
                        allocate_bottom: 0,
                        allocate_top: 0,
                        percent_bottom: 0,
                        percent_top: 0,
                        percent_average: 0
                    })

                }
            }
        });
    //}
}

function prepareForProgressControl(){

    let surveyName = sessionStorage.getItem('surveyName');
    fillOptions(surveyName)
}

function prepareForQualityControl(){

    let surveyName = sessionStorage.getItem('surveyName');

    fillOptions(surveyName)
}

function fillOptions(surveyName){

    $.ajax({
        url: realPath + '/questionnaire/searchWjTitle',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        async: true,
        data: JSON.stringify({
            email: surveyName
        }),
        success: function(data){
            let options = `<option value="">请选择</option>`,
                ql = data[0].result;
            for (let i = 0, l = ql.length; i < l; i++){
                options += `<option value="`+ ql[i].wjId +`" title="`+ ql[i].title +`">`+ ql[i].wjId + `. ` + ql[i].title.slice(0,5) +`...</option>`;
            }
            $('.select_survey_by_name').html(options)
        }
    });
}

//进度控制
function renderProgressControl(event){

    let surveyId = $(event.target).parent().siblings('.select_survey_by_name').val();//取问卷id

    function displayProgress(data){

        $('#set_ui').find('.set.progress').css('display','block');

        let progressSumVue = new Vue({
            el: '#progress_basic',
            data: data[0].allocations
        }),
            progressCrossVue = new Vue({
                el: '#progress_cross',
                data: data[0].allocation_cross
            })
    }

    //请求数据
    $.ajax({
        url: realPath + '/questionnaire/progress',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        async: true,
        data: JSON.stringify({survey: surveyId}),
        success: function(data){
            displayProgress(data)
        }
    })
}

//质量控制
function renderQualityControl(){

    $('#set_ui').find('.set.quality').css('display','block');

    let surveyId = $(event.target).parent().siblings('.select_survey_by_name').val(),//取问卷id
        width = 0;

    function arrangeQuestion(data){
        var top_label = new Vue({
            el: '#toptable',
            data: {
                question_list: data
            }
        });
        for (let i = 0, l = data.length; i < l; i++){

            if (data[i].type=='checks'||data[i].type=='sort'){
                for (let j in data[i].option){
                    width +=202
                }
            } else if (data[i].type=='matrix'){
                for (let j in data[i].sub_questions){
                    for (let k in data[i].option){
                        width += 202
                    }
                }
            } else if (data[i].type=='blank'&&data[i].form=='multi'){
                for (let j in data[i].sub_questions){
                    width += 202
                }
            } else {
                width += 202
            }
        }
    }
    //根据itemKey向answer中插入index
    function insertIndexToAnswers(data){

        let questions = data[0].questions,
            answers = data[0].answers,
            l = questions.length,
            newAnswer = new Array(answers.length);

        for (let i = 0; i < l; i++){

            let index = questions[i].index,
                itemKey = questions[i].itemKey,
                type = questions[i].type,
                option = questions[i].option,
                sub_questions = questions[i].sub_questions;

            for (let j = 0, ln = answers.length; j < ln; j++){

                if (!newAnswer[j]){

                    newAnswer[j] = {};
                    newAnswer[j].resultId = answers[j].resultId;
                    newAnswer[j].availability = answers[j].availability;
                    newAnswer[j].reason = answers[j].reason;
                    newAnswer[j].list = new Array(l)
                }

                for (let k = 0, len = newAnswer[j].list.length; k < len; k++){
                    if (answers[j].list[k]){
                        if(j == 2 && answers[j].list[k][0].itemId == 952){
                            console.log('parse' + ':' + answers[j].list[k][0].itemId)
                        }
                        if (answers[j].list[k][0].itemId == itemKey){
                            newAnswer[j].list[index-1] = answers[j].list[k];
                            newAnswer[j].list[index-1][0].index = index;
                            newAnswer[j].list[index-1][0].option = [];
                            newAnswer[j].list[index-1][0].sub_questions = [];

                            if (answers[j].list[k][0].type=='sort'){
                                for (let o in option){
                                    newAnswer[j].list[index-1][0].option.push('' + option[o].value)
                                }
                            } else {
                                for (let o in option){
                                    newAnswer[j].list[index-1][0].option.push('' + option[o].index)
                                }
                            }
                            for (let p in sub_questions){
                                newAnswer[j].list[index-1][0].sub_questions.push('' + sub_questions[p].index)
                            }
                        }
                    } else {

                        if (!newAnswer[j].list[index-1]){

                            if(j == 2 && index == 22){
                                console.log('parse')
                            }

                            newAnswer[j].list[index-1] = [{
                                index: index,
                                itemId: itemKey,
                                type: type,
                                codes: [],
                                option: [],
                                sub_questions: [],
                                values: []
                            }];

                            if (questions[i].type=='sort'){
                                for (let o in option){
                                    newAnswer[j].list[index-1][0].option.push('' + option[o].value)
                                }
                            } else {
                                for (let o in option){
                                    newAnswer[j].list[index-1][0].option.push('' + option[o].index)
                                }
                            }
                            for (let p in sub_questions){
                                newAnswer[j].list[index-1][0].sub_questions.push('' + sub_questions[p].index)
                            }
                        }
                    }
                }
            }
        }
        data[0].answers = newAnswer;
    }

    function fillAnswers(data){
        window.result_list = data;
        var main = new Vue({
            el: '#answers',
            data: {
                results: data
            }
        })
    }
    function programmingTable(){
        //最后整理框架样式
        //如果边框宽度一样，则宽度+1个右边框
        //否则要宽度+左边框宽度+右边框宽度-本身边框宽度
        var marginLeft = parseInt($("#toplefttbl").css('width').match(/\d+/g)[0]) + parseInt($("#toplefttbl").css("border-right-width").match(/\d+/g)[0]);
        var marginTop = parseInt($("#toplefttbl").css('height').match(/\d+/g)[0]) + parseInt($("#toplefttbl").css("border-bottom-width").match(/\d+/g)[0]);
        $("#toptable").css("margin-left", marginLeft + "px") //设置顶部栏距左距离
            .css('width', width + 'px');
        //$("#lefttable").css("margin-top", marginTop + "px"); //设置左边栏距上距离
        //设置内容表格距左距上距离
        $("#datatable").css("margin-left", marginLeft + "px")
            .css("margin-top", marginTop + "px")
            .css('width', width + 'px');
        //顶部栏外层DIV宽度为 总容器宽度-滚动轴宽度(16为滚动轴宽度)
        $("#topdv").css("width", $("#container").width() - 16);
        $("#leftdv").css("height", $("#container").height() - 16);
        //容器滚动事件
        $("#container").scroll(function () {
            var currentScrollTop = $(this).scrollTop();
            var currentScrollLeft = $(this).scrollLeft();
            $("#topdv").find(".table-mask").css("left", -currentScrollLeft + "px");
            $("#leftdv").find(".table-mask").css("top", -currentScrollTop + "px");

        });
    }

    $.ajax({
        url: realPath + '/questionnaire/qualityControl',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        async: true,
        data: JSON.stringify({survey: surveyId}),
        success: function(data){
            arrangeQuestion(data[0].questions);
            insertIndexToAnswers(data);
            fillAnswers(data[0].answers);
            programmingTable();
        }
    });
    //var questions = {
    //    question_list: [
    //        {index: 1,title: '第一题'},
    //        {index: 2,title: '第二题'},
    //        {index: 3,title: '第三题'},
    //        {index: 4,title: '第四题'}
    //    ]
    //},
    //    results = {
    //        results: [
    //            {
    //                resultId: 1,
    //                availability: 1,
    //                reason: '',
    //                list: [23,34,43,21]
    //            },{
    //                resultId: 2,
    //                availability: 0,
    //                reason: '甄别题没过',
    //                list: [54,234,654,3]
    //            },{
    //                resultId: 3,
    //                availability: 1,
    //                reason: '',
    //                list: [15,63,84,412]
    //            }
    //        ]
    //    };
    //arrangeQuestion(questions);
    //fillAnswers(results);
    //programmingTable();
}
$('#download_data').on('click', function(event){
    var data = {};
    data.survey = $('.quality-control .select_survey_by_name').val();
    $.ajax({
        url : "" + realPath + "/questionnaire/answerExceport",
        type : "post",
        dataType : "json",
        contentType : "application/JSON;charset=utf-8",
        async : true,
        data : JSON.stringify(data),
        success : function(data) {
            console.log(realPath + data[0]['path']);
            window.open(realPath + data[0]['path']);
        },
        error : function(d1, d2, d3) {
            console.log(d1);
            console.log(d2);
            console.log(d3);
        }
    });
});

//暴露接口
//module.exports.renderCollectControl = renderCollectControl;
//module.exports.renderAllocateControl = renderAllocateControl;
//module.exports.prepareForProgressControl = prepareForProgressControl;
//module.exports.renderProgressControl = renderProgressControl;
//module.exports.prepareForQualityControl = prepareForQualityControl;
//module.exports.renderQualityControl = renderQualityControl;
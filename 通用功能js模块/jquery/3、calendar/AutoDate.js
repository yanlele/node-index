/*
	input日期插件：<div class="aa"></div>

	调用方式:
	var AutoDate = require("../AutoDate.js");
	var use = new AutoDate({
		container   : ".aa",
		minDate     : "2017-10-10",
		maxDate     : "2017-11-05",
		afterRender : function(){}
	});
	
	配置:
	container       : 需要渲染的div容器
	minDate         : 最小日期,格式"yyyy-MM-dd"
	maxDate         : 最大日期
	afterRender     : 回调函数

	方法:
	use.init()		: 初始化组件
	use.holdDate()  : 获取年月日
*/

function AutoDate(options){
	this.options=$.extend({},AutoDate.dafult,options)
	this.init();
}

AutoDate.dafult={
	maxDate:"9999-12-31",
	minDate:"0000-01-01"
}

//10月时，获取month为9
//getDay():0为周日

$.extend(AutoDate.prototype,{
	init:function(){
		var options=this.options;

		this.container=options.container+" ";
		this.year=new Date().getFullYear();
		this.month=new Date().getMonth();
		this.date=new Date().getDate();

		this.renderContainer();
		this.setDate();//设置日期
		this.showDateBox();//初始时，显示日期
		
		this.setInput();//设置input框的值
		this.domeClick();//绑定点击事件

		options.afterRender && options.afterRender.call(this);
	},
	renderContainer:function(){
		var container=this.container;
		$(container).html(
		'<div class="ppshow"><input type="text" readonly="readonly"></div>'
		+'<div class="pphide">'
			+'<div class="sele">'
				+'<a href="javascript:;" class="lastYear">上一年</a>'
				+'<a href="javascript:;" class="nextYear">下一年</a>'
				+'<a href="javascript:;" class="lastMonth">上一月</a>'
				+'<a href="javascript:;" class="nextMonth">下一月</a>'
				+'<a href="javascript:;" class="aYear"></a>'
				+'<a href="javascript:;" class="aMonth"></a>'
			+'</div>'
			+'<div class="rBox">'
				+'<ul class="kDate_title">'
					+'<li>一</li>'
					+'<li>二</li>'
					+'<li>三</li>'
					+'<li>四</li>'
					+'<li>五</li>'
					+'<li>六</li>'
					+'<li>日</li>'
				+'</ul>'
				+'<ul class="kYear"></ul>'
				+'<ul class="kMonth"></ul>'
				+'<ul class="kDate"></ul>'
			+'</div>'
		+'</div>')
	},
	domeClick:function(){
		var self=this;
		var container=this.container;
		$(document).click(function(){
			$(container+".pphide").hide();
		})
		$(container).click(function(e){
			e.stopPropagation();
		})
		// 点击日期input框
		$(container+".ppshow input").click(function(){
			$(container+".pphide").toggle();
		})
		// 点击年份
		$(container+".aYear").click(function(){
			self.setYear();
			self.showYearBox();
		})
		// 点击年份列表
		$(container+".kYear a").click(function(){
			if($(this).hasClass("disable"))return;
			self.year=Number($(this).text());
			self.setDate();
			self.showDateBox();
			self.setInput();
		})
		// 点击月份	
		$(container+".aMonth").click(function(){
			self.setMonth();
			self.showMonthBox();
		})
		// 点击月份列表
		$(container+".kMonth a").click(function(){
			if($(this).hasClass("disable"))return;
			self.month=Number($(this).text())-1;
			self.setDate();
			self.showDateBox();
			self.setInput();
		})
		// 点击日期
		$(container+".kDate a").click(function(){
			if($(this).hasClass("disable"))return;
			$(container+".kDate a").removeClass("cur");
			$(this).addClass("cur");

			self.date=Number($(this).text());
			self.setInput();
			$(container+".pphide").hide();
		})
		// 点击上一年
		$(container+".lastYear").click(function(){
			self.lastYear();
		})
		// 点击下一年
		$(container+".nextYear").click(function(){
			self.nextYear();
		})
		// 点击上一月
		$(container+".lastMonth").click(function(){
			$(container+".nextMonth").removeClass("disable");
			self.lastMonth();
		})
		// 点击下一月
		$(container+".nextMonth").click(function(){
			self.nextMonth();
		})
	},
	setYear:function(){
		var self=this;
		var container=this.container;
		var str=self.getYearDom();//获取年份dome

		$(container+".kYear").html(str);
	},
	getYearDom:function(){//获取年份dome
		var maxDateArr=this.options.maxDate.split("-");
		var maxiYear=Number(maxDateArr[0]);

		var minDateArr=this.options.minDate.split("-");
		var miniYear=Number(minDateArr[0]);

		var self=this;
		var str="";

		for(var i=this.year-6;i<this.year+6;i++){
			if(i<=maxiYear && i>=miniYear){
				if(i==this.year){
					// 当前年份添加cur
					str+='<li><a href="javascript:;" class="cur">'+i+'</a></li>';
				}else{
					str+='<li><a href="javascript:;" class="">'+i+'</a></li>';
				}
			}else{
				str+='<li><a class="disable">'+i+'</a></li>';
			}
		}
		return str;
	},
	setMonth:function(){
		var self=this;
		var container=this.container;
		
		var str=self.getMonthDom();//获取月份dome
		$(container+".kMonth").html(str);
	},
	getMonthDom:function(){//获取月份dome
		var maxDateArr=this.options.maxDate.split("-");
		var maxiMonth=Number(maxDateArr[1]);

		var minDateArr=this.options.minDate.split("-");
		var miniMonth=Number(minDateArr[1]);

		var self=this;
		var str="";

		for(var i=1;i<=12;i++){
			if(i<=maxiMonth && i>=miniMonth){
				if(i==(self.month+1)){
					// 给当前月份添加cur状态
					str+='<li><a href="javascript:;" class="cur">'+i+'</a></li>';
				}else{
					str+='<li><a href="javascript:;" class="">'+i+'</a></li>';
				}
			}else{
				str+='<li><a class="disable">'+i+'</a></li>';
			}
		}
		return str;
	},
	setDate:function(){
		var container=this.container;

		$(container+".kDate").html("");
		var str=this.getDateDom();
		$(container+".kDate").html(str);
	},
	getDateDom:function(){
		var year=this.year;
		var month=this.month;		
		var date=this.date;
		var container=this.container;

		var options=this.options;

		var nowMonth_startDate=1;//本月第一天日期
		var nowMonth_endDate=new Date(year,month+1,0).getDate();//本月最后一天日期
		var nowMonth_startDay=new Date(year,month,1).getDay();//本月第一天是周几？
		var nowMonth_endDay=new Date(year,month,nowMonth_endDate).getDay();//本月最后一天是周几？
		var lastMonth_endDate=new Date(year,month,0).getDate();//上个月最后一天日期

		var startStr="",
			contentStr="",
			endStr="",
			allStr="";

		// 设置开始字符串
		for(var i=1;i<nowMonth_startDay;i++){
			startStr='<li><a class="disable">'+lastMonth_endDate+'</a></li>'+startStr;
			lastMonth_endDate--;
		}

		// 设置中间字符串
		var maxDateArr=this.options.maxDate.split("-");
		var maxiYear=Number(maxDateArr[0]);
		var maxiMonth=Number(maxDateArr[1]);
		var maxiDate=Number(maxDateArr[2]);

		var minDateArr=this.options.minDate.split("-");
		var miniYear=Number(minDateArr[0]);
		var miniMonth=Number(minDateArr[1]);
		var miniDate=Number(minDateArr[2]);

		for(var i=0;i<nowMonth_endDate;i++){

			// 判断依据：本月日期<=最大日期
			var lessThanMax=new Date(year,month,i+1).getTime()<=new Date(maxiYear,maxiMonth-1,maxiDate).getTime();
			// 判断依据：本月日期>=最小日期
			var moreThanMin=new Date(year,month,i+1).getTime()>=new Date(miniYear,miniMonth-1,miniDate).getTime();
				
			if(lessThanMax && moreThanMin){	
				if(i==this.date-1){
					// 给当前日期添加cur状态
					contentStr=contentStr+'<li><a href="javascript:;" class="cur">'+nowMonth_startDate+'</a></li>';
				}else{				
					contentStr=contentStr+'<li><a href="javascript:;" class="">'+nowMonth_startDate+'</a></li>';
				}
			}else{
				contentStr=contentStr+'<li><a class="disable">'+nowMonth_startDate+'</a></li>';
			}
			
			nowMonth_startDate++;
		}

		// 设置末尾字符串
		var endNum=1;
		for(var i=0;i<(7-nowMonth_endDay);i++){
			endStr=endStr+'<li><a class="disable">'+endNum+'</a></li>';
			endNum++;
		}

		return allStr=startStr+contentStr+endStr;	
	},
	lastYear:function(){
		this.year--;
		this.setYear();
		this.setDate();
		this.setInput();
	},
	nextYear:function(){
		this.year++;
		this.setYear();
		this.setDate();
		this.setInput();
	},
	lastMonth:function(){
		var container=this.container;
		$(container+".nextMonth").removeClass("disable");//设置下一个月可以点击
		if(this.month<=0){//1月时，上一个月不可点
			return;
		}
		this.month--;
		if(this.month<=0){
			$(container+".lastMonth").addClass("disable");
		}
		this.setMonth();
		this.setDate();
		this.setInput();
	},
	nextMonth:function(){
		var container=this.container;
		$(container+".lastMonth").removeClass("disable");//设置上一个月可以点击
		if(this.month>=11){//12月时，下一个月不可点
			return;
		}
		this.month++;
		if(this.month>=11){
			$(container+".nextMonth").addClass("disable");
		}
		this.setMonth();
		this.setDate();
		this.setInput();
	},
	showYearBox:function(){
		var self=this;
		var container=this.container;
		$(container+".kYear").show().siblings("ul").hide();//显示年份
	},
	showMonthBox:function(){
		var self=this;
		var container=this.container;
		$(container+".kMonth").show().siblings("ul").hide();//显示月份
	},
	showDateBox:function(){
		var self=this;
		var container=this.container;
		$(container+".kDate").show().siblings("ul").hide();//显示日期
		$(container+".kDate_title").show();
	},
	setInput:function(){
		$(this.container+".aYear").text(this.year);
		$(this.container+".aMonth").text(this.month+1);
		$(this.container+".ppshow input").val(this.holdDate());
		$(this.container+".ppshow input").trigger("change");
	},
	holdDate:function(){//获取年-月-日
		return this.year+"-"+(this.month+1)+"-"+this.date;
	}
})

module.exports=AutoDate;
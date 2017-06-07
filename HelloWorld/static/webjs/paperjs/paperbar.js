//底部bar图的加载
function barRender(jsondata){
	var timeline = {
		height:document.getElementById('bar').offsetHeight,
		width:document.getElementById('bar').offsetWidth
	}
	render(timeline,jsondata);
}

function render(size,json){
	var margin = {
		left:20,
		right:20,
		top:20,
		bottom:25
	}
	console.log("传入bar图的初始数据",json);

	//解析传入的数据
	var logs = json['log'];
	console.log("log data",logs);

	var datakv = [];
	var appcates = [];
	for(var i = 0; i < logs.length;i++){
		var logdata = logs[i];	
		var tempdata = {};
		var appcate = logdata["AppCate"];
		appcates.push(appcate);
		var aprs = logdata["Aprs"];

		tempdata["appcate"] = appcate;
		tempdata["aprs"] = aprs;
		datakv.push(tempdata);
	}
	console.log("解析后的APPcate，aprs",datakv);
	console.log("appcates",appcates);
	
	
	var svg = d3.select("#bar")
		.append("svg")
		.attr("width",size.width)
		.attr("height",size.height);

	//找出最大值,以便定义y的比例尺
	var max = 0;
	for(var j = 0;j < datakv.length;j++){
		if(datakv[j]["aprs"] > max){
			max = datakv[j]["aprs"];
		}
	}
	console.log("max aprs",max);

	var ySacle = d3.scale.linear()
					.domain([0,max + 0.001])
					.range([size.height - margin.bottom,0]);

	//定义X轴以及相关的比例尺
	var xScale = d3.scale.ordinal()
				.domain(appcates)
				.rangeRoundBands([margin.left,size.width-margin.right],0.1);

	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.tickValues(appcates)
		.outerTickSize(1);

	var xaxisy = size.height - margin.bottom;
	svg.append("g").attr("class","axis")
		.attr("transform","translate("+0+","+ xaxisy+")")
		.call(xAxis);

	var rects = svg.selectAll(".barRect")
					.data(datakv)
					.enter()
					.append("rect")
					.attr("class","barRect")
					.attr("fill","rgba(0, 166, 160, 0.5372550)")
					.attr("transform",function(d,i){
						return "translate("+xScale(d["appcate"])+","+ 0+")"
					})
					.attr("x",function(d,i){
						return xScale.rangeBand()/4;
					})  
					.attr("y",function(d,i){
						return ySacle(d["aprs"]);
					})
					.attr("width",xScale.rangeBand()/2)
					.attr("height",function(d,j){
						return size.height - margin.bottom - ySacle(d["aprs"]);
					})
					.on("mouseover",function(d,i){
						d3.select(this).style("cursor","pointer");
					})
					.on("mouseout",function(d,i){
						d3.select(this).style("cursor","");
						//延迟10微妙恢复正常
						setTimeout(function(){barmoveout(d);},1);
					})
					.on("click",function(d,i){
						console.log("ddd");
					});
    //加上text
    var rects = svg.selectAll(".barText")
					.data(datakv)
					.enter()
					.append("text")
					.attr("class","barText")
					.attr("fill","gray")
					.attr("text-anchor","middle")
					.attr("transform",function(d,i){
						return "translate("+xScale(d["appcate"])+","+"-23"+")"
					})
					.attr("x",function(d,i){
						return xScale.rangeBand()/4;
					})  
					.attr("y",function(d,i){
						return ySacle(d["aprs"]);
					})
					.attr("dx",xScale.rangeBand()/4)
					.attr("dy",function(d,j){
						return 20;
					})
					.style("font-size", 10 + "px")
					.text(function(d,i){
						return d["aprs"];
					});
}

function barmoveout(p){
	return 0;
}
function userlineRender(jsondata){
	console.log("jim mmmmmmmmmmmmmmmmmm",jsondata);
	var width = document.getElementById('userline').offsetWidth; 
	var height = document.getElementById('userline').offsetHeight;
	console.log('userline width',width);
	console.log('userline height',height);

	console.log("userlog data: ",jsondata);

	var dataarray = [];
	//构造ID为0的值
	var tempdata = {};
	tempdata["logid"] = 0;
	tempdata["uprs"] = 0;
	dataarray.push(tempdata);

	//解析数据，构造输入数据
	var logs = jsondata["log"];
	var maxid = 0;
	var maxuprs = 0;
	for(var i = 0; i < logs.length; i++){
		var logdata = logs[i];
		var log_id = logdata['Id'];
		var uprs = logdata["Uprs"];

		var tempdata = {};
		tempdata["logid"] = log_id;
		tempdata["uprs"] = uprs;

		dataarray.push(tempdata);
		if(log_id > maxid){
			maxid = log_id;
		}

		if(uprs > maxuprs){
			maxuprs = uprs;
		}
	}
	console.log("parse logdata for usrlineeeeeeeeeeeeeeeeee",dataarray,maxid,maxuprs);
	console.log("max id",maxid);
	console.log("max uprs",maxuprs);


	var dataset=[  
	    {  
	        country:"china",  
	        uprsarray:dataarray 
	    }
	];  
	  
	var padding={top:50, right:50, bottom: 50, left:50};

	
	//define the ascale and yscale
	var xScale=d3.scale.linear()  
	            .domain([0,maxid])  
	            .range([0,width-padding.left-padding.right]);  
	  
	var yScale=d3.scale.linear()  
	            .domain([0,maxuprs*1.1])  
	            .range([height-padding.bottom-padding.top,0]);  
	  
	var linePath=d3.svg.line()//创建一个直线生成器  
	                .x(function(d){  
	                    return xScale(d['logid']);  
	                })  
	                .y(function(d){  
	                    return yScale(d['uprs']);  
	                })  
	                .interpolate("basis")//插值模式  
	                ;  
	  
	//定义两个颜色  
	var colors=[d3.rgb(0,255,0),d3.rgb(0,0,255)];
	  
	var svg=d3.select("#userline")  
	                .append("svg")  
	                .attr("width",width)  
	                .attr("height",height);  
	  
	svg.selectAll("path")  
	    .data(dataset)  
	    .enter()  
	    .append("path")  
	    .attr("transform","translate("+padding.left+","+padding.top+")")  
	    .attr("d",function(d){  
	        return linePath(d.uprsarray);  
	        //返回线段生成器得到的路径  
	    })  
	    .attr("fill","none")  
	    .attr("stroke-width",1)  
	    .attr("stroke",function(d,i){  
	        return colors[i];  
	    });

	var xAxis=d3.svg.axis()  
	            .scale(xScale)  
	            .ticks(5)  
	            .tickFormat(d3.format("d"))  
	            .orient("bottom");  
	  
	var yAxis=d3.svg.axis()  
	            .scale(yScale)  
	            .orient("left");  
	  
	//添加一个g用于放x轴  
	svg.append("g")  
	    .attr("class","axis")  
	    .attr("transform","translate("+padding.left+","+(height-padding.top)+")")  
	    .call(xAxis);  
	  
	svg.append("g")  
	    .attr("class","axis")  
	    .attr("transform","translate("+padding.left+","+padding.top+")")  
	    .call(yAxis);
}
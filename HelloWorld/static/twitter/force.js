
function smallforceRender(subjects,nodes,links) {
	var height = document.getElementById("smallpath").offsetHeight;
	var width = document.getElementById("smallpath").offsetWidth;
	console.log("forcechart height",height);
	console.log("forcechart width",width);

	var force = d3.layout.force()
					.gravity(1)
	    			.linkDistance(400)
	    			.charge(-300)
	    			.size([width, height]);

	console.log("subjects:",subjects);
	markMainPoint(subjects,nodes,height,width);


  	console.log("loading nodes",nodes);
  	console.log("loading links",links);


	force.nodes(nodes).links(links).start();
	//绘制一个svg
	$("#smallpath").empty();
	console.log("clean");
	var svg = d3.select("#smallpath").append("svg")
				.attr("width", width)
				.attr("height", height); 

	//设置游标形状
	svg.style("cursor","move");




	//对点node和线条links进行分组，以便缩放
	var svgg = svg.append("g");
//					.attr("transform", "translate(" + width/20 + "," + height/15 + ")");  //把力道图定位在中心点
	//对缩放进行处理
	var zoom = d3.behavior.zoom()
	                .scaleExtent([1,10])
	                .on("zoom",zoomed);
	//定义zoomed函数,放大和缩小
	function zoomed(){
	   d3.select(this).attr("transform","translate(" + d3.event.translate  + ")" + "scale(" + d3.event.scale + ")");
	}
	//进行缩放处理
	zoom(svgg);


		var defs = svg.append("defs");
		var arrowMarker = defs.append("marker")
								.attr("id","arrow")
								.attr("markerUnits","strokeWidth")
							    .attr("markerWidth","60")
		                        .attr("markerHeight","60")
		                        .attr("viewBox","0 0 12 12") 
		                        .attr("refX","6")
		                        .attr("refY","6")
		                        .attr("orient","auto");

		var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";
								
		arrowMarker.append("path")
					.attr("d",arrow_path)
					.attr("fill","white");			






    //绘制连接线
	var forcelinks = svgg.selectAll(".forcelink")
		                .data(links)
		                .enter()
		                .append("line")
		                .attr("class","forcelink")
		                .attr("stroke", "#AAAAAA")
		                .attr("stroke-width",0.3)
		                .attr("marker-end","url(#arrow)");


	console.log("forceLinks:",forcelinks);
	//绘制节点
	var forcenodes = svgg.selectAll(".forcenode")
	                        .data(nodes)
	                        .enter()
	                        .append("circle")
		                	.attr("class","forcenode")
	                        .style("fill", "green")
         					.attr("r",function(d){
         						return d["nodeSize"];
         					})
	                        .call(force.drag);

	console.log("forcenodes:",forcenodes);


	// change the cursor and show the tooltip
	forcenodes.on( "mouseover",function(d){
	               // console.log("mouseover log",d);
	                //change the cursor
	                d3.select(this).style("cursor","pointer");

	                // show the tooltip
	                //对tooltip的内容进行设置,在鼠标移入时，显示悬浮框的信息
	                var tooltipString = "";
	//                console.log("name:",d["name"],"nnnd:",d,"NND:",d3.selectAll(this));
	                if (d["name"])
	                	tooltipString+=d["name"];
	                //console.log("tooltipString",tooltipString)
	                //在鼠标移入时，显示悬浮框的信息
	                d3.select("#tooltip")
	                		.html("<p>"+tooltipString+"</p>")
	                        .style("left",(d3.event.pageX) + "px")
	                        .style("top",(d3.event.pageY) + "px")
	                        .style("z-index",999)
	                        .style("opacity",1.0);   

	                //node相关的边高亮
	                onnodelinks(d);
	                function onnodelinks(node){
		                	var lines = d3.selectAll(".forcelink").filter(function(d){
		                		return d.source.index==node.index || d.target.index==node.index;
		                	});
		                	lines.attr("stroke", "#00648D").attr("stroke-width",0.8);
	                }


			
              	})
              .on("mouseout",function(d){
		            d3.select(this).style("cursor","");
		            d3.select("#tooltip")
		            	.html("")
		            	.style("opacity",0.0);
		       
		            //移出鼠标后，links恢复正常
	                outnodelinks(d);
	                function outnodelinks(node){
		                var lines  = d3.selectAll(".forcelink");
		                lines.attr("stroke", "#AAAAAA").attr("stroke-width",0.3);
	                }

    		    })
              .on("click",function(d){
              	console.log(d);
              });

    //按照力布局的节拍移动线和点的位置，直到收敛  @jim  force 一起有三种时间监听器：start，end, tick
    force.on("tick", function() {
	    // update the position of link
	    forcelinks.attr("x1", function(d) { return d.source.x; })
	        .attr("y1", function(d) { return d.source.y; })
	        .attr("x2", function(d) { return d.target.x; })
	        .attr("y2", function(d) { return d.target.y; });
	    
	    // updata the position of node  
	    forcenodes.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	    

	    forcelinks.each(function(d) {
				var x1 = d.source.x;
				var y1 = d.source.y;
				var x2 = d.target.x;
				var y2 = d.target.y;

				var l=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
				var l1=20;//箭头方向缩短的长度
				var x3 = x1+((l-l1)/(l+0.001))*(x2-x1);
				var y3 = y1+((l-l1)/l)*(y2-y1);
				d3.select(this)
				.attr("x2", x3)
				.attr("y2", y3);
			});
    });


}



function markMainPoint(subjects,nodes,height,width) {
	var pointPositions = [];
	pointPositions.push([width/5,height/2]);
	pointPositions.push([width-width/5,height/2]);
	pointPositions.push([width/2,height/4]);
	pointPositions.push([width/2,height-height/7]);
	console.log(subjects,"subjectsLength:",subjects.length);
	if (subjects.length>1){
		for (var i=0; i<subjects.length; i++){
			var nodeIndex = getIndex(nodes,subjects[i]);
//			console.log(nodeIndex,"is ",pointPositions[i][0]);
			nodes[nodeIndex].x = pointPositions[i][0];
			nodes[nodeIndex].y = pointPositions[i][1];
			nodes[nodeIndex].fixed = true;
			nodes[nodeIndex].nodeSize = 20;
			nodes[nodeIndex].isNotMainPoint = 0;
		}

	} else if (subjects.length == 1) {
		var node1Index = getIndex(nodes,subjects[0]);
		nodes[node1Index].nodeSize = 20;
		nodes[node1Index].isNotMainPoint = 0;
	}
}


// 将数据解析成节点
function parseNodesData(data) {
	var total = 0;
	var nodes = [];
	// 解析数据
	for (var i=0; i<data.length; i++){
		for (var j of data[i]){
			var flag = 1;
			for (var k=0; k<nodes.length; k++)
				if (j == nodes[k].name){
					flag = 0 ;
					break;
				}
			if (flag == 1){
				var node = new Object();
				node.name = j;
				node["nodeSize"] = 10;
				node.isNotMainPoint = 1;
				nodes.push(node);
			}
		}
	}

	return nodes;
}

// 解析出节点的连边
function parseLinks(nodes,paths){
	var links = new Array();

	for (var path of paths){
		for (var j=1 ; j<path.length; j++){
			link = new Object();
			console.log(path[j-1],path[j])
			link.source = getIndex(nodes,path[j-1]);
			link.target = getIndex(nodes,path[j]);
			links.push(link);
		}
	}
	return links;
}

function getIndex(nodes,name) {
	for (var i=0; i<nodes.length; i++)
		if (nodes[i].name == name)
			return i;
	return -1;
}

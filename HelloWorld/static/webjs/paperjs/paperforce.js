//render forcechart
function forceRender(jsondata){
	// get the force chart height and width
	var height = document.getElementById("force").offsetHeight;
	var width = document.getElementById("force").offsetWidth;
	console.log("forcechart height",height);
	console.log("forcechart width",width);
	console.log("render loading data",jsondata);

	//从papersinfo中解析出nodes
	var nodes = parsenodes(jsondata);
	var links = parselinks(jsondata,nodes);

	// define the force layout
	var force = d3.layout.force()
					.gravity(1)
	    			.linkDistance(60)
	    			.charge(-300)
	    			.size([width, height]);

	force.nodes(nodes).links(links).start();

  	console.log("loading nodes",nodes);
  	console.log("loading links",links);

	//绘制一个svg
	var svg = d3.select("#force").append("svg")
				.attr("width", width)
				.attr("height", height); 

	//对点node和线条links进行分组，以便缩放
	var svgg = svg.append("g")
					.attr("id","zoomforce")
					.attr("transform", "translate(" + width/17 + "," + height/12 + ")");  //把力道图定位在中心点
	//对缩放进行处理
	var zoom = d3.behavior.zoom()
	                .scaleExtent([2,10])
	                .on("zoom",zoomed);
	  //定义zoomed函数,放大和缩小
	function zoomed(){
	   // console.log("here", d3.event.translate, d3.event.scale);
	   d3.select(this).attr("transform","translate(" + d3.event.translate  + ")" + "scale(" + d3.event.scale + ")");
	}
	//进行缩放处理
	zoom(svgg);

    //绘制连接线
	var forcelinks = svgg.selectAll(".forcelink")
		                .data(links)
		                .enter()
		                .append("line")
		                .attr("class","forcelink")
		                .attr("stroke", "#AAAAAA")
		                .attr("sourceindex",function(d){return "tag" + d["source"].index})
		                .attr("sourcename",function(d){return "tag" + d["source"].name})
		                .attr("targetindex",function(d){return "tag" + d["target"].index})
		                .attr("targetname",function(d){return "tag" + d["target"].name})
		                .attr("stroke-width",0.25);

	//绘制节点
	var forcenodes = svgg.selectAll(".forcenode")
	                        .data(nodes)
	                        .enter()
	                        .append("image")
	                        .attr("xlink:href", function(d){
	                        	if(d.type === 1)
				                  return  "./images/author_default.png";
				                else if(d.type === 2)
				                  return  "./images/strain_default.png";
	                        })
	                        .attr("class","forcenode")
	                        .attr("name",function(d){ return d.name})
	                        .attr("x", -5)
         					.attr("y", -5)
					        .attr("width", function(d){
									return 10;
							})
					        .attr("height", function(d){
									return 10;
							})
	                        .call(force.drag);


	//为了三个区域交互套的一层圆形
	var forcecircles = svgg.selectAll(".forcecircles")
	                        .data(nodes)
	                        .enter()
	                        .append("circle")
	                        .attr("class","forcecircles")
	                        .attr("name",function(d){ return d.name})
	                        .attr("r",5)
					        .style("fill","none")
					        .style("stroke","none")
					        .style("stroke-width",2)
	                        .call(force.drag);

	// change the cursor and show the tooltip
	forcenodes.on( "mouseover",function(d){
	                //change the cursor
	                d3.select(this).style("cursor","pointer");

	                // show the tooltip
	                var tooltipString = d["name"];
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
	                	if(node.type === 1){
	                		var sourceindex = "line[sourceindex = tag"+ node.index + "]";
		                	console.log("tagindex",sourceindex);
		                	var lines  = d3.selectAll(sourceindex);
		                	lines.attr("stroke", "#00648D").attr("stroke-width",0.75);
	                	}
	                	else {
	                		var targetindex = "line[targetindex = tag"+ node.index + "]";
		                	console.log("tagindex",targetindex);
		                	var lines  = d3.selectAll(targetindex);
		                	lines.attr("stroke", "#00648D").attr("stroke-width",0.75);
		                	}	                	
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
	                	if(node.type === 1){
	                		var sourceindex = "line[sourceindex = tag"+ node.index + "]";
		                	//console.log("tagindex",sourceindex);
		                	var lines  = d3.selectAll(sourceindex);
		                	lines.attr("stroke", "#AAAAAA").attr("stroke-width",0.25);
	                	}
	                	else {
	                		var targetindex = "line[targetindex = tag"+ node.index + "]";
		                	//console.log("tagindex",targetindex);
		                	var lines  = d3.selectAll(targetindex);
		                	lines.attr("stroke", "#AAAAAA").attr("stroke-width",0.25);
		                	}
	                }
    		    })
              .on("click",function(d){
	          		if(d.type === 1){
	          			console.log("user infooooooooooooooooooooooooo",d)
	          		}
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
	    // updata the position of circle  
	    forcecircles.attr("cx", function(d) { return d.x; }).attr("cy", function(d) { return d.y; });
    });
}

//对userinfo进行处理，以便生成nodes和links
function parsenodes(userinfo){
	console.log("userinfo",userinfo);
	var nodes = [];
  	for(var i = 0; i < userinfo.length; i ++){
    	var userinfonode = userinfo[i];

	    //usernode
	    var username = userinfonode["UserName"];
	    if(!isExist(username,nodes)){
	      var usernode = {};
	      usernode.name = username;
	      usernode.user_id =  userinfonode["UserId"];
	      usernode.type = 1;
	      nodes.push(usernode);
	    }

    	//解析UserApp字段，生成appnode
    	var apps = userinfonode["UserApp"];
    	for (var j = 0; j < apps.length; j++) { 
      		var appname = apps[j]["appName"]
	      	if(!isExist(appname,nodes)){
		        var appnode = {};
		        appnode.name =appname;
		        appnode.app_id = apps[j]["app_id"]
		        appnode.type = 2;
		        nodes.push(appnode);
	     	}
	    }
    }
  //log 
  console.log("force logout ndoes",nodes);
  return nodes;
}

//对userinfo解析，解析出links
function parselinks(userinfo,nodes){
	//构建links
  	var links = [];
  	for (var i = 0; i < userinfo.length; i++) {
	    var userinfonode = userinfo[i];

	    var username = userinfonode["UserName"];
	    var userindex = searchindex(username,nodes);

	    //user-app links
	    var apps = userinfonode["UserApp"];
	    for (var j = 0; j < apps.length; j++) {

	      var appname = apps[j]["appName"];
	      var appindex = searchindex(appname,nodes);
	      var link = {};
	      link.source = userindex;
	      link.target = appindex;
	      links.push(link);
	    }
	}
  console.log("force layout links",links);
  return links;
}

//返回nodes的index
function indexnodes(testname,nodes){
	var index =  -1;
	for( var i = 0; i < nodes.length;i++){
	  var nodename = nodes[i].name;
	  if(testname === nodename) {
	    index = i;
	    return index;
	  }
	}
	return index;
}

//定义一个检查是否已经在nodes中的函数,based on name 
function isExist(testname,nodes){
	var flag = false;
	for( var i = 0; i < nodes.length;i++){
	  var nodename = nodes[i].name;
	  if(testname === nodename) {
	    flag = true;
	    return flag;
	  }
	}
	return flag;
}

//查找出index
function searchindex(nodename,nodes){
	var index = 0;
    for (var i = 0; i < nodes.length; i++) {
      if(nodename === nodes[i].name){
        index = i;
      }
    }
	return index;
}
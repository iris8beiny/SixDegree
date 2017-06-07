function smalldraw(){ 
	var text= $.getJSON("/static/twitter/bigtwitter1500.json",function(data){
	console.log("total data",data)
	var smallgraph = smalldata2Graph(data); 
	smalldrawGraph(smallgraph); 
    });	
} 
	
function smalldata2Graph(data) { 
	var graph = {} ;
	var vertices = {} ;
	var links = []; 
	for (var i = 0; i < data.length; i++) { 
		var s = String(data[i][0]); 
		var t = String(data[i][1]); 
		var v = 1; 
		vertices[s] = s; 
		vertices[t] = t; 
		links.push({'source' : s, 'target' : t, 'value' : 1}); 
	} 
	var nodes = []; 
	$.each(vertices, function(k, v) { 
		nodes.push({'name' : v, 'value' : v}); 
	}); 
	graph['links'] = links; 
	graph['data'] = nodes; 
	return graph; 
} 
	
function smalldrawGraph(graph) {
	var myChart = echarts.init(document.getElementById("smallforce")); 
	var option = { 		
		backgroundColor: 'rgba(0,0,0,1)',	
		tooltip: {}, 
		series : [ 
			{ 
				type: 'graph', 
				layout: 'force', 
				symbolSize: 30, 
				edgeSymbol: ['none', 'arrow'], 
				data: graph.data, 
				links: graph.links, 
				roam: true, 
				label: { 
					normal: { 
						show: true, 
						formatter: function (e) { 
							return e['data']['value']; 
						} 
					} 
				}, 
				edgeLabel: { 
					normal: { 
						show: false, 
						position: 'middle' 
					} 
				}, 
				force: { 
					repulsion: 1000, 
					edgeLength: 200 
				} 
			} 
		] 
	}; 
	myChart.setOption(option); 
} 

function smalLineDraw(){
	var myChart = echarts.init(document.getElementById('smallline')); 
        var option = {        	
            tooltip: {
                show: true
            },
            grid:{
                x:50
            },
            xAxis : [
                {
                    type : 'category',
                    name:"",
                    nameTextStyle:{
                        color:['#FFFFFF']
                    },
                    nameLocation:'start',
                    data : ["1","2","3","4","5"],
                    axisLabel:{
                    	show:true,
                    	textStyle:{
                    		color:'#FFFFFF'
                    	}
                    }                
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name:"条数",
                    nameTextStyle:{
                        color:['#FFFFFF']
                    },
                    nameLocation:'end',
                    min: 0,
                    max: 1400,
                    interval: 400,
                    axisLabel:{
                    	show:true,
                    	textStyle:{
                    		color:'#FFFFFF'
                    	}
                    } 
                }
            ],
            series : [
                {
                    "name":"条数",
                    "type":"bar",
                    "data":[0, 12, 1397, 0, 0]
                }
            ]
        };

        // 为echarts对象加载数据 
        myChart.setOption(option); 

}

function smallsearch(){
	if(document.sform.snode.value==""){
	    document.getElementById("showNopath").innerHTML="Source node can't be null!";
		sform.snode.focus();
	}
	if(document.sform.dnode.value==""){
		document.getElementById("showNopath").innerHTML="Destination node can't be null!";
		sform.dnode.focus();
	}
        var snode =document.sform.snode.value;
	var dnode =document.sform.dnode.value;
	
	var text=$.getJSON("/static/twitter/bpath.json",function(data){
		var flag=false;
		var temp=[];
		var path=[];
		for (var i=0; i<data.length; i++){
			temp = data[i];
			if(temp[0]==snode){
				if(temp[temp.length-1]==dnode){						
					flag=true;
					document.getElementById("showNopath").innerHTML ="";
					var s=null;
					var d=null;
					for(var j=0;j<temp.length-1;j++){
						s=temp[j];
						d=temp[j+1];
						path.push([s,d]);
					}
					var smallpath = smalldata2Graph(path); 
					smalldrawPath(smallpath); 
        			break;
        		}      	     			
			}
		} 
		if(flag==false) {
			document.getElementById("showNopath").innerHTML = "NO path between node '"+snode+"' and node '"+dnode+"'!";
			var gdata=$.getJSON("/static/twitter/bigtwitter2000.json",function(data2){
				for (var k = 0; k < data2.length; k++) {				
					temp=data2[k];
					var s=null;
					var d=null;
					if(temp[0]==snode){
						s=temp[0];
						d=temp[1];
						path.push([s,d]);
					}		
					if(temp[1]==dnode){
						s=temp[0];
						d=temp[1];
						path.push([s,d]);
					}
				}
				var smallpath = smalldata2Graph(path); 
				smalldrawPath(smallpath,snode,dnode);
			});		
			
		}
      	});
}

function smalldrawPath(graph,snode,dnode) {
	var myChart = echarts.init(document.getElementById("smallpath")); 
	var option = { 		
		backgroundColor: 'rgba(0,0,0,1)',	
		tooltip: {}, 
		series : [ 
			{ 
				type: 'graph', 
				layout: 'force', 
				symbolSize: 30, 
				edgeSymbol: ['none', 'arrow'], 
				data: graph.data, 
				links: graph.links, 
				roam: true, 
				label: { 
					normal: { 
						show: true, 
						formatter: function (e) { 
							return e['data']['value']; 
						} 
					} 
				}, 
				edgeLabel: { 
					normal: { 
						show: false, 
						position: 'middle' 
					} 
				}, 
				force: { 
					repulsion: 1000, 
					edgeLength: 200 
				} ,
				itemStyle:{
					normal:{
						show: true,
						nodeStyle:{
							color:'rgba(0,255,0,1)'
						}
					}
				}
			} 
		] 
	}; 
	myChart.setOption(option); 
} 
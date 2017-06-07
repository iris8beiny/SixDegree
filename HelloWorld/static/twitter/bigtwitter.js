
function bigdraw(){
	var text= $.getJSON("/static/twitter/smalltwitter1000.json",function(data){
	console.log("total data",data)
	var graph = bigdata2Graph(data);
	bigdrawGraph(graph); 
    });	
} 
	
function bigdata2Graph(data) { 
	var graph = {} ;
	var vertices = {} ;
	var links = []; 
	for (var i = 0; i < data.length; i++) { 
		var s = String(data[i][0]); 
		var t = String(data[i][1]); 
		var v = 1; 
		vertices[s] = s; 
		vertices[t] = t; 
		links.push({'source' : s, 'target' : t, 'value' : v}); 
	} 
	var nodes = []; 
	$.each(vertices, function(k, v) { 
		nodes.push({'name' : v, 'value' : v}); 
	}); 
	graph['links'] = links; 
	graph['data'] = nodes; 
	return graph; 
} 
	
function bigdrawGraph(graph) {
	var myChart = echarts.init(document.getElementById("bigforce")); 
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

function bigLineDraw(){
	var myChart = echarts.init(document.getElementById('bigline')); 
        var option = {        	
            tooltip: {
                show: true
            },   
            xAxis : [
                {
                    type : 'category',
                    data : ["1","2","3","4","5","6"],
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
                    name:"条数（k）",
                    nameTextStyle:{
                        color:['#FFFFFF']
                    },
                    nameLocation:'end',
                    min: 0,
                    max: 400,
                    interval: 100,
                    axisLabel:{
                    	show:true,
                    	textStyle:{
                    		color:'#FFFFFF',
                    		align:'right',
                    		fontSize :'10px'
                    	}
                    } 
                }
            ],
            series : [
                {
                    "name":"条数",
                    "type":"bar",
                    "data":[19.826, 210.457, 391.392, 113.668, 9.667,0.054]
                }
            ]
        };

        // 为echarts对象加载数据 
        myChart.setOption(option); 

}

function bigsearch(){
	if(document.bform.snode.value==""){
		alert("Source node can't be null!");
		bform.snode.focus();
	}
	if(document.bform.dnode.value==""){
		alert("Source node can't be null!");
		bform.dnode.focus();
	}
	var snode =document.bform.snode.value;
	var dnode =document.bform.dnode.value;
	
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
					var bigpath = bigdata2Graph(path); 
					bigdrawPath(bigpath,snode,dnode); 
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
				var bigpath = bigdata2Graph(path);
				bigdrawPath(bigpath);
			});		
			
		}
      	});
}

function bigdrawPath(graph) {
	var myChart = echarts.init(document.getElementById("bigpath")); 
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
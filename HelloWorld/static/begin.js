// load data and render the charts
function bbegin()
{   
    bigLineDraw();
    bigdraw();


}
function sbegin()
{
	smalldraw();
	smalLineDraw();
}
function ubegin()
{
	undirectdraw();
	// unLineDraw();
}

function btwSearchPath(){
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
	alert("sonde"+sonde);
	alert("dnode"+dnode);	
}

function ssearch(){
    alert(" in ssearch!!!")
	if(document.sform.snode.value==""){
		alert("Source node can't be null!");
		sform.snode.focus();
	}
	if(document.sform.dnode.value==""){
		alert("Source node can't be null!");
		sform.dnode.focus();
	}
	var snode =document.sform.snode.value;
	var dnode =document.sform.dnode.value;
	
	var text=$.getJSON("./twitter/spath.json",function(data){
		var flag=false;
		var temp=[];
		var path=[];
		var source=[];
		for (var i=0; i<data.length; i++){
			temp = data[i];
			if(temp[0]==snode){
				if(temp[temp.length-1]==dnode){					
					flag=true;
					console.log("path:",temp);					
					source.push(snode);
					source.push(dnode);
					path.push(temp);				
					var nodesData = parseNodesData(path);					
        			var linksData = parseLinks(nodesData,path);  
        			smallforceRender(source,nodesData,linksData);
        			break;
        		}      	     			
			}
		} 
		if(flag==false) {
			alert("No path between "+snode+" and "+dnode+"!!!")

		}
      	});
}
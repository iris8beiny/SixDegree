

// load data and render the charts
function bioloadchart(){

	 $.getJSON("/static/data.json",function(data){
        console.log("total data",data);

        var nodesData = parseNodesData(data.paths);
        var linksData = parseLinks(nodesData,data.paths);
        
        forceRender(data.subjects,nodesData,linksData);
    });    

}



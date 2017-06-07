//render cloudchart
function cloudRender(jsondata){
    //解析jsondata,获得words
    var words = json2words(jsondata);
   
    //对关键词个数进行判断，大于50个的，进行排序，取最大的50个
    if(words.length > 50){
        words.sort(function(word1,word2){
            if(word1.size > word2.size){
                return -1;
            } else if(word1.size === word2.start){
                return 0;
            } else{
                return 1;
            }
        });
        console.log("wordssssssssssssss",words);
    } 
    words50 = words.slice(0,50);  //去前50个数据
    words = words50;//  交换数据

    //对字符云大小定义一个线性比例尺
    var sizes = [];
    for(var i =0; i < words.length;i++){
        var  wordsize = words[i].size;
        sizes.push(wordsize);
    }
    var wordscale = d3.scale.linear()
                        .domain([d3.min(sizes),d3.max(sizes)])
                        .range([15,35]);

	// get the force chart height and width
	var height = document.getElementById("cloud").offsetHeight;
	var width = document.getElementById("cloud").offsetWidth;
	console.log("cloudchart height",height);
	console.log("cloudchart width",width);

	var color = ["red","green","black","yellow"];
    var layout = d3.layout.cloud().size([width, height])
            .words(words)
            .padding(10)
            .spiral("rectangular")
            .fontSize(function(d) { return d.size; })
            .on("end", draw);
    layout.start();


    function draw(words) {
        // loading data 时处理的@jim
        var svgg = d3.select("#cloud").append("svg")
                .style("cursor","move")
                .attr("width", width)
                .attr("height", height)
                .attr("class", "wordcloud")
                .append("g")
                .attr("transform", "translate(" + layout.size()[0] * 0.5 + "," + layout.size()[1] * 0.5 + ")scale("+ 1 + "," + 1 + ")");

        //对字符的显示进行处理
        svgg.selectAll("text")
            .data(words)
            .enter().append("text")
            .attr("class","wordtext")
            .style("font-size", function(d) { return wordscale(d.size) + "px"; })
            .style("fill", function(d, i) { return "gray"; })
            .attr("text-anchor", "middle")
            .attr("papernames",function(d){ return d.papernames})
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + 0 + ")";
            })
            .text(function(d) { return d.text; });

        //对鼠标操作的处理函数@jim
        d3.select("body").selectAll(".wordtext")
            .on("mouseover",function(d){       //对鼠标移动以后的处理@jim
                d3.select(this)
                    .style("cursor","pointer")
                    .style("fill","rgb(255, 60, 160)")
                    .style("font-size", function(d) { return  35 + "px"; })

                //移入选择后，其他的text点变暗
                var textname = d.text;
                console.log("textname",textname);
                d3.selectAll(".wordtext")
                    .filter(function(d,i){
                        return  d.text !== textname
                    })
                    .style("opacity",0.325);
            })
            .on("mouseout",function(d){
                d3.select(this)
                    .style("fill","gray")
                    .style("font-size", function(d) { return wordscale(d.size) + "px"; });

                //移出text后，其他的点恢复正常
                var textname = d.text;
                console.log("textname",textname);
                d3.selectAll("text")
                    .filter(function(d,i){
                        return  d.text !== textname
                    })
                    .style("opacity",1.0);
            })
            .on("click",function(d){
                console.log(d);
            });
    }
}

//从jsondata中解析出words格式的数据
function json2words(jsondata){
    console.log("cloud jsondata jjjjjjjjjjjjjjjjjjjjjj",jsondata);
    var  userlogs = jsondata.log;
    console.log("test words jjjjjjjjjjjjjjjjjjjjjj",userlogs);

    var  words = [];
    for (var i = 0; i < userlogs.length; i++) {
         var userlog = userlogs[i];
         var pvalue = userlog["Pvalue"];
         var appname = userlog["AppName"];
         console.log("appnameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",appname);
         var pitem = userlog["Pitem"];

         var topics = [];
         topics.push(pvalue);
         topics.push(appname);
         topics.push(pitem);

         //对topics循环遍历计数
         for (var j= 0;  j< topics.length; j++) {
            var topic = topics[j];
            if(wordExist(words,topic)){
                var index = wordindex(words,topic);
                words[index]["size"] = words[index]["size"] + 1;
            }
            else{
                var word = {};
                word["text"] = topic;
                word["size"] = 1;
                words.push(word);
            }
         }
    }
    console.log("解析出来的words",words);
    return words;
}
//对words进行遍历，看已经是否存在
function wordExist(words,topic){
    var flag = false;
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if(word["text"] === topic) {
            flag = true;
            return flag;
        }
    }
   return flag;
}
//对words遍历，找出index
function wordindex(words,topic){
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if(word["text"] === topic) {
            return i;
        }
    }
}


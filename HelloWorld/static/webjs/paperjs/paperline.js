function Matrix(){
    var table=document.createElement("table");
    table.setAttribute("class","zebra");
    var a=1;
    var f=0;
    var d=['姓名','年龄','出生年月','证件','性别','...','银行卡','交易账单','身高','体重','资产'];
    var b="log";
    var c=" ";
    var s="...";
    //获取行数值
    var line=12;

    //document.getElementById("line").value;
    //获取列数值
    var list=15 ;
    //document.getElementById("list").value;
    for(var i=0;i<line;i++){
        if(i==0){
            var tr=document.createElement("tr");
            var th=document.createElement("th"); 
            th.appendChild(document.createTextNode (c)); 
            tr.appendChild(th);
            for(var j=1;j<list;j++){
            //alert(list);
            //创建td
            if(j==8){
                var th=document.createElement("th"); 
                th.appendChild(document.createTextNode (s)); 
                tr.appendChild(th);
            }
            else{
            var th=document.createElement("th"); 
            th.appendChild(document.createTextNode (b)); 
            tr.appendChild(th);
            }
            table.appendChild(tr);
            }
        }
        else if (i==6) {
            var tr=document.createElement("tr");
            for(var j=0;j<list;j++){
            //alert(list);
            //创建td
                    var td=document.createElement("td"); 
                    td.appendChild(document.createTextNode (s)); 
                    tr.appendChild(td);
            }
            table.appendChild(tr);
            f++;
        }
        
        else if(i!=6&&i!=0){
        //alert(line);
        //创建tr
            var tr=document.createElement("tr");
            for(var j=0;j<list;j++){
            //alert(list);
            //创建td
                if(j==0){
                    var td=document.createElement("td"); 
                    td.appendChild(document.createTextNode (d[f])); 
                    tr.appendChild(td);
                    f++;
                }
                else if(j==8){
                    var td=document.createElement("td"); 
                    td.appendChild(document.createTextNode (s)); 
                    tr.appendChild(td);
                }
                else{
                      var td=document.createElement("td"); 
                        td.appendChild(document.createTextNode (a)); 
                        tr.appendChild(td);
                }
            }
            table.appendChild(tr);
        }
    } 
        document.getElementById("d1").appendChild(table);
 } 

 module.exports.table=function(html){
    console.error("In tables function");
    var DomParser = require('dom-parser');
    var parser = new DomParser();
    var fs=require('fs');

    var obj={};
    var tableArr=[];
    var final_obj=[];
    var dom = parser.parseFromString(html);

    var table =dom.getElementsByTagName('table');
    var inputList2 = Array.prototype.slice.call(table);
    console.log("input list of tables tags are :",inputList2.length);
    inputList2.forEach(ShowResults2);
    function ShowResults2(value, index, ar) {
      tableArr.push(value.innerHTML)
    }

    for(l=0;l<tableArr.length;l++){
        var finalRows=[]
    var heading=[];
    var str=tableArr[l];
    var count = (str.match(/<tr>/g)).length;
    if(count>1&&count<7){
        str=str.replace(/<[a-z]{1,2}>/g,'').replace(/<\/[a-z]{1,2}>/g,'').replace(/\s{2,}/g,'')
    var table_head=str.split(/<\/strong>/g);
    for(i=0;i<table_head.length;i++){
        regex=/<strong>/gmi
        if(table_head[i].match(regex)){
            var head=table_head[i].replace(regex,'')
            heading.push(head)
        }
    }

    var tr_array=[]
    var td_array=[]
    str=tableArr[l]
    str=str.replace(/<[a-z]{3,}>/g,'').replace(/<\/[a-z]{3,}>/g,'').replace(/\s{2,}/g,'').replace(/<[a-z]>/g,'').replace(/<\/[a-z]>/g,'').replace(/\n/gm,'')
    tr_array=str.split(/<\/tr>/g);
    tr_array.shift()
    tr_array.pop();

    for(i=0;i<tr_array.length;i++){
        tr_array[i]=tr_array[i].replace(/<tr>/,'').replace(/<td>/g,'').replace(/<td colspan="\d">/g,'').replace(/<td rowspan="\d">/g,'');
        td_array[i]=tr_array[i].split(/<\/td>/);
        td_array[i].pop();
        finalRows.push(td_array[i])
    }

    var regex=[];
    regex[0]=/examination|degree|education|qualification/i
    regex[1]=/board|university/i
    regex[2]=/institute|school|college|institution/i
    regex[3]=/mark(s|)|cgpa(s|)|%|percentage(s|)|score(s|)|grade(s|)/i
    regex[4]=/year|passout/i
    for(n=0;n<heading.length;n++){
        for(j=0;j<regex.length;j++){
            if(heading[n].match(regex[j])){
                break;
            }
        }
        if(j==0){
            heading[n]="examination";
        }
        else if(j==1){
            heading[n]="board";
        }
        else if(j==2){
            heading[n]="institute";
        }
        else if(j==3){
            heading[n]="marks";
        }
        else if(j==4){
            heading[n]="year";
        }
        else{
            heading[n]=""
        }
    }
console.error(heading)
    if(heading.length==finalRows[0].length)
    {
        for(i=0;i<finalRows.length;i++){
            var flag=0;
            for(j=0;j<heading.length;j++)
            {
                if(finalRows[i].length==1){
                    flag=1;
                    break;
                }
                else{
                    if(heading[j]){
                            obj[heading[j]]=finalRows[i][j];
                        }
                        else{
                            flag=1;
                            break;
                        }
                }
            }
            if(flag==0){
                var {examination=null,board=null,institute=null,marks=null,year=null}=obj;
                final_obj[i]=Object.assign({},{examination,board,institute,marks,year})
            }
        }
    }
    }
}

console.error(final_obj)
return final_obj
}

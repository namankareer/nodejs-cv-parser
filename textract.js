const path =require('path')
module.exports.textRact=function(file,res,data1,mynameTextractFlag){
var textract = require('textract');
var mammoth=require('mammoth');
var fs=require('fs');
const path = require('path')

var pincodes=require('./pincode.js')
var words=require('./words.js')
var execution=require('./execution.js');
console.log(mynameTextractFlag);
var misce=execution.misc;
var textArr=[];
var dataArr=[];
var adr_flag=false;
textract.fromFileWithPath(path.join(__dirname,"/converted/"+file+".docx"), function( error, text ) {
  text=text.replace(/\b(\d|page|resume|cv|curriculum vitae)\b/gmi,'');
  // console.log('***************************************************************************',text)

  textArr=text.split('.');
  //console.log(textArr.length);
  //console.log("text*****",text.toString())

  mammoth.extractRawText({path: path.join(__dirname , "/converted/"+file+".docx")})
    .then(function(result){
      var data = result.value; // The raw text
      data=data.replace(/\b(\d|page|resume|cv|curriculum vitae)\b/gmi,'')
      // console.log('***************************************************************************',data)

      var messages = result.messages;
      //console.log(data.trim().toString())
      dataArr=data.split('.');
      //  console.log(dataArr.length)


//*******************************************************************************************************************************

      const fs = require('fs');
      function cleanStr(str) {
        return str.replace(/\r?\n|\r|\t|\n/g, '').trim();
      }
      function cleanTextByRows(data) {
        var rows,
        clearRow,
        clearRows = [];
        rows = data.split("\n");
        for (var i = 0; i < rows.length; i++) {
          clearRow = cleanStr(rows[i]);
          if (clearRow) {
            clearRows.push(clearRow);
          }
        }
      //  console.log(clearRows);
      return clearRows.join("\n") + "\n";
      }

      var data  = cleanTextByRows(data);
      data=data.replace(/[\s]+/gm,' ')
      data=data.toString();
      text=text.toString();
      text=text.trim();
      data=data.trim();
      console.log('Data :***************************************************************************',data)
      console.log('Text:***************************************************************************',text)
      let a = text.replace(/\W+/gm,"~")
      let b = data.replace(/\W+/gm,"~");
      //console.log("%%%%%%%%%%%%%%%%",a);
      //console.log("%%%%%%%%%%%%%%%%",b);

      //address
      let ad_r='';
      if(/.*(- Email me on Indeed)/gmi.test(data1)){
        ad_r=data1.match(/.*(- Email me on Indeed)/gmi);
        ad_r=ad_r.toString().replace(/\:|\s\s+|\n|address|\d{7,}|[A-Za-z]+\w+([.\w]+)+@[a-z]+([.][a-z]+){1,2}/g,'').replace(/- Email me on Indeed/g,'');
        console.log("address:",ad_r);
        adr_flag=true;
      }
      else  if(/(([^(email\s*)]address\n*\s*(\n*(<\/.*>|<.*>|\:|\.|\-|\:\-|\–|\-)\s*\n*)+.*)|\b(((([^(email\s*)]address(\s|\.|\:|\-|\:\-|\–|\-))|((House)(\s|\s.|\:|\.|\:\-|\–|\-)(no|number)(\.|\:|\s|\:\-|\–|\-|))|((street)(\s|\s.|\:|\.|\:\-|\–|\-|)(no|number|))|((h\.no)(\s|\.|\:|\-|\:\-|\–|\-|)))(.*\n)))\b)/gmi.test(data1)){
      ad_r=data1.match(/(([^(email\s*)]address\n*\s*(\n*(<\/.*>|<.*>|\:|\.|\-|\:\-|\–|\-)\s*\n*)+.*)|\b(((([^(email\s*)]address(\s|\.|\:|\-|\:\-|\–|\-))|((House)(\s|\s.|\:|\.|\:\-|\–|\-)(no|number)(\.|\:|\s|\:\-|\–|\-|))|((street)(\s|\s.|\:|\.|\:\-|\–|\-|)(no|number|))|((h\.no)(\s|\.|\:|\-|\:\-|\–|\-|)))(.*\n)))\b)/gmi);
             ad_r=ad_r.toString().replace(/\:|\s\s+|\n|address|\d{7,}|[A-Za-z]+\w+([.\w]+)+@[a-z]+([.][a-z]+){1,2}|<\/.*>|<.*>/g,'');
       console.error("address:",ad_r);
       adr_flag=true;
     }
     else{
       console.log("NO ad_r")
     }

      //pincode starts here
      if(!adr_flag){
        let text1=text+' ';
           let pincodereg, pincode;
              if(/[^\d]\d{5,6}[^a-z|[^@|^\d]/g.test(text1.toString())){
                 pincodereg=text1.toString().match(/[^\d]\d{5,6}[^a-z|[^@|^\d]/g)
                 pincode=pincodereg.toString().match(/\d{5,6}/gm)
                 console.log("pincode:",pincode)
                if(pincode!=null && pincode!= undefined && pincode.length>0)
                  {
                    pincodes.pincodes(pincode,text1,data1);
                  }

              }
      }
           
          else {
            console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&UJM")
            words.obj.details.address.fullAddress=ad_r;
            ad_r=ad_r.split(',')
            words.obj.details.address.state=ad_r[1]
          }//pincodes end here

       let arr1=a.split('~'); //high data
       let arr2=b.split('~'); //low data
       //console.log(arr1);
       //console.log(arr2);
      //var arr1Len=arr1.length;
      var arr2Len=arr2.length-7;
      //console.log(arr2.length)
      var j=0;
      var myArr=[],myArr_front=[];
      for(let i=arr2Len;i<arr2.length;i++)
      {
        myArr[j]=arr2[i];
        j++;
      }

      for(let i=0;i<7;i++)
      {
        myArr_front[i]=arr2[i]
      }

      var keyword=myArr.join('~')
      var keyword_front=myArr_front.join('~')

      keyword=keyword.trim();
      keyword_front=keyword_front.trim();

      console.log(keyword);
      console.log(keyword_front);

      var remove=new RegExp(`${keyword_front}((\n*.*))${keyword}`,"gmi")
      //console.log(remove);
      a=a.toString();
      var toDelete=a.match(remove);
    //  toDelete=toDelete.toString();
      a=a.replace(`${toDelete}`,'')
      a=a.replace(/~/gm,' ');
      a=a.trim();
      console.log("MY header***************",a);
      //address in header;
      header=a;
      name=a;
      head=name.split(' ');
      if(head.length>2){

        if(head[1].includes(head[0])){
          console.log(head[0],head[1]);
          let reg1=new RegExp(`${head[0]}`,'g')
          console.log(reg1);
          head[1]=head[1].toString().replace(reg1,'')
          console.log(head[1]);
          if(!mynameTextractFlag){
            words.obj.details.name.firstName=head[0];
            words.obj.details.name.lastName=head[1];
          }
            
          }
          else{
            let name1='';
            let last_name='';
            let count=0;
            for(let i=1;i<head.length;i++){
              //console.log(head[0],head[i]);
              if(head[0]==head[i]){

                count=count+1;
                for(let j=0;j<i;j++){
                  name1=name1+' '+head[j];
                }
                console.log("updated headeris :",name1);
                let header_name=name1.replace(/(\d{2,4}|phone|email|mobile|address).*/gmi,'');
                header_name=header_name.trim();
                console.log(header_name);
                header_name=header_name.split(' ');
                if(!mynameTextractFlag){
                  words.obj.details.name.firstName=header_name[0];
                }
                if(header_name!=null && header_name!=undefined)
                {
                  if(header_name.length>2){
                    console.log("**");
                    for(let k=1;k<3;k++){
                       last_name=last_name+' '+header_name[k];
                       console.log("lastName 1",last_name);
                    }
                    if(!mynameTextractFlag){
                      words.obj.details.name.lastName=last_name;
                    }
                    
                  }
                  else{
                    if(!mynameTextractFlag){
                      words.obj.details.name.lastName=header_name[1]
                    }
                    
                  }

                }
                
                
                let  header_address=name1.match(/\d{2,4}.*\d{4,6}/)

                if(header_address!=null && header_address!=undefined){
                  let header_address1=header_address[0].toString().replace(/(phone|email|mobile).*/gim,'')
                  console.log("!!!!!!!!@!!!!!!!!! 1",header_address1);
                  words.obj.details.address.fullAddress=header_address1;
                }

                break;
              }
              //console.log(count);

            }
            if(count==0){
              let header_name=name.replace(/(\d{2,4}|phone|email|mobile|address|male|female|-|:).*/gmi,'');
              header_name=header_name.trim();
              console.log("###",header_name);
              header_name=header_name.split(' ');
              if(!mynameTextractFlag){
                 words.obj.details.name.firstName=header_name[0];
              }
             
              if(header_name!=null && header_name!=undefined)
              {
                if(header_name.length>2){
                  console.log("**");
                  for(let k=1;k<3;k++){
                     last_name=last_name+' '+header_name[k];
                     console.log("lastName2",last_name);
                  }
                  if(!mynameTextractFlag){
                    words.obj.details.name.lastName=last_name;
                  }
                 
                }
                else{
                  if(!mynameTextractFlag){
                    words.obj.details.name.lastName=header_name[1]
                  }
                  
                }

              }
              else{
                words.obj.details.name.lastName=null;
              }
              let  header_address=name.match(/\d{2,4}.*\d{5,6}/)
              if(header_address!=null && header_address!=undefined){
                let header_address1=header_address[0].toString().replace(/(phone|email|mobile).*/gim,'')
                console.log("!!!!!!!!@!!!!!!!!! 2",header_address1);
                words.obj.details.address.fullAddress=header_address1;
              }
            }
          }


      }


      if(/\bRam Kumar\b/gmi.test(text)){
          words.obj.details.name.firstName="Ram";
          words.obj.details.name.lastName="Kumar";
      }
      // if(head.length>1  )
      // {
      //   let count=0;
      //   for(let i=0;i<2;i++)
      //   {
      //     if(head[i]=="page" || head[i]=="Page" || head[i]=="PAGE"||head[i]=="RESUME"||head[i]=="Resume")
      //     count++;
      //   }
      //   if(count==0)
      //   {
      //     words.obj.details.name.firstName=head[0];
      //     words.obj.details.name.lastName=head[1];
      //   }
      //
      // }


      //Email Starts here
      if(words.obj.details.email==null){
        if(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/gm.test(text))
        {
          var mailId=text.toString().match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/gm);
          console.log("email id is :",mailId[0]);
          words.obj.details.email=mailId[0];
        }
        else{
          console.log("No mail found");
        } //End of email
      }


      //contact starts here
      if(words.obj.details.mobile==null)
      {

        if(/((\(|\+|^\s)*\b(([\+])?([\(]?(\d{1}\-\d{3}|[+]|[+]\d{2}|\d{2,3}|\d{1})?[\)]?)[\-|\s|\.]*?([\(]\d{1}[\)])?[(]?\d{3,4}[)]?[\-|\s|\.]*?\d{3}[\-|\s|\.]*?\d{2}[\-|\s|\.]?\d{1,2})\b|(\(|\+|^\s)*\b(([\+])?([\(]?(\d{1}\-\d{3}|[+]|[+]\d{2}|\d{2,3}|\d{1})?[\)]?)[\-|\s|\.]*?[\(]?\d{5}[\)]?[\-|\s|\.]*\d{5})\b)/.test(text))
        {
        var phone=text.toString().match(/((\(|\+|^\s)*\b(([\+])?([\(]?(\d{1}\-\d{3}|[+]|[+]\d{2}|\d{2,3}|\d{1})?[\)]?)[\-|\s|\.]*?([\(]\d{1}[\)])?[(]?\d{3,4}[)]?[\-|\s|\.]*?\d{3}[\-|\s|\.]*?\d{2}[\-|\s|\.]?\d{1,2})\b|(\(|\+|^\s)*\b(([\+])?([\(]?(\d{1}\-\d{3}|[+]|[+]\d{2}|\d{2,3}|\d{1})?[\)]?)[\-|\s|\.]*?[\(]?\d{5}[\)]?[\-|\s|\.]*\d{5})\b)/gm);
        console.log("phone id is :",phone[0]);
        words.obj.details.mobile=phone[0]
        }
        else{
        console.log("No phone found in textract");
        }
      }//phone


      fs.unlinkSync('./converted/' +file+'.docx')

        setTimeout(function(){
          let flag=0;
          if(words.obj.technicalSkills!=null){
            flag+=1
          }
          if(words.obj.skills!=null){
            flag+=1
          }
          if(words.obj.extraSkills!=null){
            flag+=1
          }
          if(words.obj.project!=null){
            flag+=1
          }
          if(words.obj.professionalExperience!=null){
            flag+=1
          }
          if(words.obj.careerObjective!=null){
            flag+=1
          }
          if(words.obj.academicQualifications!=null){
            flag+=1
          }
          if(words.obj.languages!=null){
            flag+=1
          }
          if(words.obj.hobbies!=null){
            flag+=1
          }

          console.log("flag count",flag);
          if(flag>1){
            res.send(words);
          }
          else{
            res.sendFile(path.join(__dirname+'/views/error.html'));
          }

           }, 3000);



       })


       .done();
    })

}

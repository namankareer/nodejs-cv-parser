module.exports.pincodes=function(pincode,text,data)
{
      const request = require('request');
      const words1=require('./words.js');
      console.log("0",pincode[0]);
      console.log("1",pincode[1]);
      let up_ad=[],arrStr = [],address_long=[],countArr=[],address_up=[];
      let address1="";
      let count=0,k2,add,reg,add1;


     for(let j=0;j<pincode.length;j++){

     request({url:`https://maps.googleapis.com/maps/api/geocode/json?address=${pincode[j]}&key=AIzaSyATAf58891KC6ohOJPsWL4561cUbsqz2qg`,
             json:true
             },(error,response,body)=>{
             if(error){
             console.log("unable to connect forecast.io ")
            }else if(response.statusCode ==400){
            console.log("unable to fetch data ")
            }else if(response.statusCode ==200){

            if(body.results[0].address_components.length!=null && body.results[0].address_components.length!= undefined && body.results[0].address_components.length>0)
            {
              for(let i=0;i<body.results[0].address_components.length;i++){
                            address1=address1+' '+body.results[0].address_components[i].long_name;
                            address_long.push(body.results[0].address_components[i].long_name);
                              count++;
                          }
                          countArr.push(count);


             }

       console.log("new array",address1);
          console.log("started");

               console.log("!!!!!!!!!!!!!!!!!!!!!");
                let str=body.results[0].formatted_address+" ";
                let tempStr='';
                let len = str.length;
               for(let k=0;k<len;k++){
                  if(str.charAt(k)==' '||str.charAt(k)==','){
                   arrStr.push(tempStr);
                   tempStr ='';}
              else{
                  tempStr += str.charAt(k);
                  }
                  }

                  arrStr=arrStr.filter((ele)=>{
                    if(isNaN(ele)){
                      if(ele!=undefined) return ele}
                    });

             //console.log("array list to compare",arrStr);

                 if(arrStr.length>0)
                       for(let l=0;l<arrStr.length;l++) {
                           m1=arrStr[l];
                        r=`(\\b)${m1}(\\b)`;
                           console.log("array regex ",r);
                           let keys1 = new RegExp(r, 'gm')
                              console.log("array keys1 ",keys1);

                           let abc=text.match(keys1)
                           console.log("my abc is",abc);
                          if(keys1.test(text)) {
                          let formatedAddress=body.results[0].formatted_address;
                            if(address1!=null||address1!=undefined)
                            up_ad=address1.split(' ');
                            up_ad=up_ad.filter((ele)=>{
                              if(ele!=undefined||ele!=''||ele!=null) return ele
                              });
                            console.log("3<",up_ad);
                                   reg=new RegExp(`.*${up_ad[0]}((\\,)\\s[a-z]+)?`,"gmi")
                                  console.error(reg)
                                   add=data.match(reg)
                                  if(add!==null && add!=undefined){
                                     add=add.map((ele)=>ele.replace(/<[a-z]+>|<\/[a-z]+>|\t|\n|address/gmi,'').replace(/\-/g,',').trim());
                                     add1=add.toString().split(',');
                                    console.log("length",add1,add1.length);}

                          if(add1!==null && add1!=undefined && add1.length<3)
                                   {
                                    reg=new RegExp(`(((address)(\s|\.|\:|\-|\:\-|\–|\-))|((Flat)(no|number|\s|\.)(\s|\.|\:|\-|\:\-|\–|\-|))|((House)(no|number|\s|\.)(\s|\.|\:|\-|\:\-|\–|\-|))|((street)(no|number|\s|\.|\:|\-|\:\-|\–|\-|))|((landmark)(\s|\.|\:|\-|\:\-|\–|\-))|((locality)(\s|\.|\:|\-|\:\-|\–|\-))|((h\.no)(\s|\.|\:|\-|\:\-|\–|\-|)))((.*\n)*)?.*${up_ad[0]}((\\,)\\s[a-z]+)?`,"gmi");
                                    add=data.match(reg)
                                   if(add!==null && add!=undefined){
                                     add=add.map((ele)=>ele.replace(/<[a-z]+>|<\/[a-z]+>|\t|\n|\:|\s\s+|address/gmi,'').trim())
                                     console.log("one ",add);}
                                     else{
                                       add=add1.toString();
                                     }
                               }
                                     console.log("another ",add);
                            words1.obj.details.address.pincode=up_ad[0];
                              console.log("address long",address_long);
                              console.log("count arr",countArr);
                               for(let k=0;k<address_long.length;k++){
                              if(address_long[k]==up_ad[0])
                                  k1=k;
                                }

                            for(let i1=0;i1<countArr.length;i1++){
                              if(k1==0 && i1==0)
                              { k2=i1;
                                break;
                              }

                              else if(k1==countArr[i1-1])
                              { k2=i1;
                                break;
                              }
                            }

                            address_up=address_long.slice(k1,countArr[k2]);

                            console.log("update aaddress",address_up);

                             if(address_up.length>2)
                             {
                               words1.obj.details.address.state=address_up[address_up.length-2];
                               words1.obj.details.address.country=address_up[address_up.length-1];
                             }
                             else {
                               words1.obj.details.address.state=null;
                               words1.obj.details.address.country=address_up[1];
                             }

                            if(add!==null && add!=undefined){
                              console.log("add is",add);
                          words1.obj.details.address.fullAddress=add;
                            }else{
                          //  words1.obj.details.address.fullAddress=formatedAddress;
                          }
                          arrStr.length=0;
                          pincode.length=0;

                          }

                            }


address1="";

   }})

}







}

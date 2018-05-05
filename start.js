var start=new Date();
console.log(start);
const path= require('path')
var htmlBeautify = require("html-beautify");
var DomParser = require('dom-parser');
var parser = new DomParser();
var mammoth = require("mammoth");
var fs=require('fs');
var logic=require("./logic.js");
var textRact=require('./textract.js');
var words=require("./words.js")

console.log('::Starts::');

function check(file,res){
  console.log(" in check function");
  mammoth.convertToHtml({path: path.join(__dirname , "/converted/"+file+".docx")})
    .then(function(result){

      words.obj.details.name.firstName=null;
      words.obj.details.name.lastName=null;
      words.obj.details.gender=null;
      words.obj.details.dob=null;
      words.obj.details.email=null;
      words.obj.details.mobile=null;
      words.obj.details.address.fullAddress=null;
      words.obj.details.address.country=null;
      words.obj.details.address.state=null;
      words.obj.details.address.pincode=null;
      words.obj.details.fatherName=null;
      words.obj.details.motherName=null;
      words.obj.details.martialStatus=null;
      words.obj.details.nationality=null;
      words.obj.details.uniqueID=null;
      words.obj.details.licenseNumber=null;
      words.obj.details.passportNumber=null;
      words.obj.details.panNumber=null;
      words.obj.details.visaStatus=null;
      words.obj.project=null;
      words.obj.technicalSkills=null;
      words.obj.skills=null;
      words.obj.extraSkills=null;
      words.obj.professionalExperience=null;
      words.obj.careerObjective=null;
      words.obj.academicQualifications=null;
      words.obj.languages=null;
      words.obj.hobbies=null;
      words.obj.miscellaneous=null;

      var j=0;
      var strongArr=[],h1Arr=[];

      var html = result.value; // The generated HTML
      // fs.writeFileSync('./data.txt',html);
      html=html.replace(/(<p>)?\n*\s*<img[\n*|\s*]+.*\/>\s*[a-z\s]+\s*\n*(<\/p>)?/gm,"").replace(/^(\s*<p>)\n*\s*(Page\s*\d*)(\n*\s*<\/p>)|^\s*<a\s*id="page[\d*]">/gm,"");
    //  html=html.replace(/\s*<a[\n*|\s*].*(\/)?>\s*\n*.*\s*\n*<\/a>/gmi,"")
      //console.log(html);
      var messages = result.messages; // Any messages, such as warnings during conversion
      var data=htmlBeautify(html).toString();
      // fs.writeFileSync('./data.txt',data)
      //console.log("1st",data);
        data=data.replace(/(<p>)?\n*\s*<img[\n*|\s*]+.*\/*>\s*[a-z\s]+\s*\n*(<\/p>)?/gmi,"").replace(/^(\s*<p>)\n*\s*(Page\s*\d*)(\n*\s*<\/p>)|^\s*<a\s*id="page[\d*]">|\|\|\►|<(strong|h[1-6]|p)>\n*\s*(\.)?<\/(strong|h[1-6]|p)>|\s\s+&amp;|<br\s*\/>/gm,"");
        data=data.replace(/<a\s*href=(".*?")>|<\/a>|<\/strong><strong>/gmi,'')
        //making each and every line as a seperate string and storing in an array named arr
      var arr=[];
      arr=data.split('\n');
      for(i=0;i<arr.length;i++){
        arr[i]=arr[i].trim();
      }
      fs.writeFileSync('./data.txt',data)
      // var namedictio=fs.readFileSync('./nameregex.txt');
      // var regexname=new RegExp(`${namedictio}`,'gmi')
      // namedictio=data.toString().replace(regexname,"")
      // fs.writeFileSync('./nameregex1.txt',namedictio)
        console.log("1st ",arr[1]);

      var dom = parser.parseFromString(html);
      //  console.log( dom.getElementsByTagName('p')); //in this case,it will return total num of p tags as an empty objects
      //  console.log( "1st element in h1",dom.getElementsByTagName('h1')[0].innerHTML.trim());

      var strong =dom.getElementsByTagName('strong');
      var inputList = Array.prototype.slice.call(strong);
      //console.log("input list of strong tags are :",inputList.length);
      inputList.forEach(ShowResults);

      var h1 =dom.getElementsByTagName('h1');
      var inputList1 = Array.prototype.slice.call(h1);
      //console.log("input1 list of h1 tags are :",inputList1.length);
      inputList1.forEach(ShowResults1);

      //console.log(h1Arr);
      logic.logic(strongArr,arr,h1Arr,html,data);
      var mynameTextractFlag=logic.mynameFlag;
      textRact.textRact(file,res,data,mynameTextractFlag);
      html=null;
      data=null;
      strongArr=null;
      h1Arr=null;
      console.log("ccccccc",new Date()-start,logic.mynameFlag );


      function ShowResults(value, index, ar) {
        strongArr.push(value.innerHTML)
      }

      function ShowResults1(value, index, ar) {
        h1Arr.push(value.innerHTML)
      }
    })
    .done();
      }

module.exports={ check }

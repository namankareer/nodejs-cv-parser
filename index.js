const path =require('path')
const express = require('express')
const port=process.env.PORT ||5000;
const app = express()
const fs = require('fs')
const upload1 = require('./start')
const multer = require('multer')
const words = require('./words')
// var jsonxml = require('jsontoxml');
const dir = path.join(__dirname,'./uploads');
const converter=require('./converter')
var i=0;
var flag=0;

// console.log=function(){}

//gZvyWhVAKC-gpeLmPXpad9a3gpOuQYib7HoZpheTyVEFjiVyhHFiUwUVAkWJXdZssTdZVG63I1L44BDV6Da1YQ
// console.log=function(){};
const cloudconvert = new (require('cloudconvert'))('J0B3zjoBX93F8fo3M4B7iIh7e5c8IwWt7aaRLJaBIVuPzLzuUZ1LJKoQwS_yA5wM2hopOvveWIZUPSf6nI0kAQ');
var sampleFile=""
var moveFile = (file, dir2,new_name,res)=>{
        //include the fs, path modules
        var path1 = require('path');

        //gets file name and adds it to dir2
        var f = path1.basename(file);
        var dest = path1.resolve(dir2, f);

        fs.rename(file, dest, (err)=>{
          if(err) throw err;
          else {//console.log('Successfully moved')
          upload1.check(new_name,res)
        };
        });
      };

let storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,'./uploads/'))
    },
    filename: function (request, file, callback) {
        //console.log(file);
        callback(null, file.originalname)
      }
})

const upload = multer({storage})

app.use(express.static(path.join(__dirname ,'./views')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/views/upload.html'));
})


app.post('/',upload.single('sample'),(req,res)=>{
    //console.log(req.body,req.file)
    fs.readdir(dir, (err, files) => {
        // files.forEach(file=>{
            for(i=0;i<files.length;i++){
          //  console.log("file is",files[i]);
            var new_name="";
            if(files[i].includes('.pdf')){
                new_name=files[i].replace('.pdf','')
                converter.convert(files[i],new_name,'pdf',res)
                // re.send(words)
            }
            else if(files[i].includes('.docx')){
                new_name=files[i].replace('.docx','')
                moveFile(path.join(__dirname,'./uploads/'+files[i]), './converted',new_name,res);
                // res.send(words)
                flag++;
              //  console.log('in docx')

            }
            else{
                new_name=files[i].replace('.doc','')
                converter.convert(files[i],new_name,'doc',res)
                // res.send(words)
                // fs.unlinkSync(dir+'/'+file)
                // check(new_name)

            }}
        // })
      });
    //   if(flag==0){
        // setTimeout(()=>res.send(words),15000)
    //   }
    //   else{
    //     setTimeout(()=>res.send(words),0)
    //   }
})
app.listen(port,()=>{
    console.log('started..!')
})

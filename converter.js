const fs = require('fs');
const express=require('express');
const mammoth = require('mammoth')
const start=require('./start')
const path = require('path')
cloudconvert = new (require('cloudconvert'))('IqOdtZsGcSZU3b91jDy_XVYOMvFDszyt2GPebgeN2AyXe9dlVKPNRiynbDyWb0Y3A9iYyfc6hAim5XcUQI95uQ');

 function convert(file,new_name,format,res){
     if(format=='doc'||format=='pdf'){
// create the process. see https://cloudconvert.com/apidoc#create
cloudconvert.createProcess({inputformat: format, outputformat: 'docx'}, function(err, conversionProcess) {

    if(err) {
        console.error('CloudConvert Process creation failed: ' + err);
    } else {

        // start the process. see https://cloudconvert.com/apidoc#create
        conversionProcess.start({
            outputformat: 'docx',
            input: 'upload'
        }, function (err, conversionProcess) {

            if (err) {
                console.error('CloudConvert Process start failed: ' + err);
            } else {

                // upload the input file. see https://cloudconvert.com/apidoc#upload
                conversionProcess.upload(fs.createReadStream(path.join(__dirname,'./uploads/'+file)), null, function (err, conversionProcess) {

                    if (err) {
                        console.error('CloudConvert Process upload failed: ' + err);
                    } else {
                        // wait until the process is finished (or completed with an error)
                        conversionProcess.wait(function (err, conversionProcess) {
                            if (err) {
                                fs.unlinkSync(path.join(__dirname,'./uploads/'+file))
                                res.redirect('/')
                                console.error('CloudConvert Process failed: ' + err);
                            } else {
                              //  console.log('Done: ' + conversionProcess.data.message);

                                // download it
                                conversionProcess.download(fs.createWriteStream("./converted/"+new_name+".docx"), null, function (err, conversionProcess) {
                                    if (err) {
                                        console.error('CloudConvert Process download failed: ' + err);
                                    } else {
                                      //  console.log('Downloaded to converted');
                                        fs.unlinkSync(path.join(__dirname,'./uploads/'+file))
                                        start.check(new_name,res);
                                        // fs.unlinkSync('./converted/' +new_name+'.docx')
                                        // mammoth.convertToHtml({path: __dirname + "/converted1.docx"})
                                        // .then(function(result){
                                        //       console.log(result.value);
                                        //     }) //end of mammoth
                                        //     .done();
                                    }
                                });
                            }

                        });
                    }
                });


            }
        });
    }

});
     }
 }
 module.exports={convert}

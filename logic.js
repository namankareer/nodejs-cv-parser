module.exports.logic = function (strongArr, arr, h1Arr, html, data) {
  console.log("in logic tables");

  var textRact = require("./textract.js");
  var pincodes = require('./pincode.js');
  var words = require('./words.js');
  var skill1 = require('./skills.js');
  var dateChanger = require("./dob.js");
  var new_arr = [];
  var myName;
  var mynameFlag=false;


  var logicregex = `(Marital\\s*Status\\s*(\:|\:\-|\–|\\-)|Phone\\s+(num|no|number)|Birtday|DOB|Date\\s*of\\s*birth|Email|mail|Phone|Contact|Mobile|(mother(('|’|)s)?\\s*name\\s*(:|:-|–|\\-))|(father(('|’|)s)?\\s*name\\s*(:|:-|–|\\-))|passport\\s*(no|num|number|)\\s*(:|:-|–|\\-)|pan\\s*(card)?\\s*(no|num|number|)\\s*(:|:-|–|\\-)|License\\s*(no|num|number|)\\s*(:|:-|–|\\-)|(Nationality\\s*(:|:-|–|\\-))|(Visa\\s*Status\\s*(:|:-|–|\\-))|(unique\\s*(id|identity|identification)\\s*(:|:-|–|\\-)))`
  // var xyz=new RegExp(`${logicregex}`,'gmi')
  for (i = 0; i < strongArr.length; i++) {
    strongArr[i] = strongArr[i].toString().replace(/<[a-z]+>/gm, "").replace(/<\/[a-z]+/gm, "").replace(/\<.*\>/gm, "");
    strongArr[i] = strongArr[i].trim();
  }

  for (i = 0; i < h1Arr.length; i++) {
    h1Arr[i] = h1Arr[i].toString().replace(/<[a-z]+>/gm, "").replace(/<\/[a-z]+/gm, "").replace(/\<.*\>/gm, "");
    h1Arr[i] = h1Arr[i].trim();
  }
  // console.log(data);
  //console.log("Array would be :",arr);
  console.log("strong array would be :", strongArr);
  //console.log("h1 array would be:",h1Arr);

  var new_arr = arr.join('')
  //console.log(new_arr);
  new_arr = new_arr.replace(/<[a-z0-3]+>/gmi, '').replace(/<\/[a-z0-3]+>/gmi, '\n')
  var update_arr = new_arr.split('\n');
  //console.log(update_arr);
  for (let i = 0; i < update_arr.length; i++) {
    update_arr[i] = update_arr[i].replace(/<[a-z]+>/gm, '').replace(/<\/[a-z]+>/gm, '').replace(/\<.*\>/gm, "").replace(/\t/gm, '').replace(/\s{2,}/gm, '').replace(/<a id="page\d">/gm, '')
    update_arr[i] = update_arr[i].trim()
  }
  //console.log("My updated array after removing image tag is : ",update_arr)


  var update_arr = update_arr.filter(function (x) {
    return (x !== (undefined || null || ''));
  });
  //console.log(arr);
  console.log(update_arr);

  function foo(update_arr) {
    myName = update_arr;
    var name = [];
    update_arr = update_arr.trim();
    name = update_arr.split(' ');

    if (name.length == 1) {
      words.obj.details.name.firstName = name[0];
      console.log("1",name[0]);
    }
    else if(name.length == 2) {
      words.obj.details.name.firstName = name[0];
      words.obj.details.name.lastName = name[1];
      console.log("1",name[0]);
      console.log("2",name[1]);
    }
    else{
      words.obj.details.name.firstName = name[0];
      words.obj.details.name.lastName = name[1]+' '+name[2];
      console.log("1",name[0]);
      console.log("2",name[1]);
    }
  }

  //for finding name
  if (/(^\s*(<[a-z]+>)?\s*(name)\s*\n*(\n*(<\/.*>|<.*>|\:|\.|\-|\:\-|\–|\-)\s*\n*)+.*)|^\s*(<[a-z]+>)?\s*name\s*(\:|\:\-|\–|\-).*/gmi.test(data)) {
    var fn = data.toString().match(/(^\s*(<[a-z]+>)?\s*(name)\s*\n*(\n*(<\/.*>|<.*>|\:|\.|\-|\:\-|\–|\-)\s*\n*)+.*)|^\s*(<[a-z]+>)?\s*name\s*(\:|\:\-|\–|\-).*/gmi);
    console.log("name is : ", fn[0]);
    let ffn = fn[0].toString().replace(/.*(name\s*(\W)?)|<.*>|<\/.*>|<.*>/gmi, '')
    console.log("name is : ", ffn);
    ffn = ffn.trim();
    //ffn = ffn.replace(/(\t{1,}|Birthday|Gender|mobile|phone|email|(mobile|phone)\s+(num|no|number)|visa(\s+status)?|nationality|dob|date of birth)(.*)/, "❌$1")
    ffn = ffn.replace(/❌.*/, '').replace(/(Mr\s*(.)?|Ms(.)?)/gmi,'')
    console.log(ffn)

    foo(ffn)
    mynameFlag=true;
  }
  else if (h1Arr != null && h1Arr.length > 0) {
    if (h1Arr[0].toLowerCase().trim() != "cv" && h1Arr[0].toLowerCase().trim() != "resume" && h1Arr[0].toLowerCase().trim() != "name" && h1Arr[0].toLowerCase().trim() != "curriculum vitae" && h1Arr[0].toLowerCase().trim() != "engineering cv") {
      console.log("Name is in h1:", update_arr[0]);
      foo(update_arr[0]);

    }
    else {
      console.log("Name is in h1 :", update_arr[1])
      foo(update_arr[1]);
    }
  }

  else if (strongArr != null && strongArr.length > 0) {

    if (strongArr[0].toLowerCase().trim() != "cv" && strongArr[0].toLowerCase().trim() != "resume" && strongArr[0].toLowerCase().trim() != "curriculum vitae" && strongArr[0].toLowerCase().trim() != "engineering cv" && strongArr[0].toLowerCase().trim() != "name") {
      console.log("Name is in strong :", update_arr[0]);
      foo(update_arr[0]);
    }
    else {
      console.log("Name is in strong :", update_arr[1])
      foo(update_arr[1]);
    }
  }
  else {
    console.log("Name is :", update_arr[0])
    foo(update_arr[0]);
  }

  //end of name
  //console.log("**************",arr[0]);

  //Start for Gender
  var gend1 = /\bmale/i;
  var gend2 = /\bfemale/i;
  if (gend1.test(arr)) {
    console.log("Gender : male");
    words.obj.details.gender = "Male";
  }
  else if (gend2.test(arr)) {
    console.log("Gender : female");
    words.obj.details.gender = "Female";
  }
  else {
    console.log("NO gender found")
  }//End of Gender


  //Email Starts here
  if (/[A-Za-z]+\w+([.\w]+)+@[a-z]+([.][a-z]+){1,2}/.test(arr)) {
    var mailId = arr.toString().match(/[A-Za-z]+\w+([.\w]+)+@[a-z]+([.][a-z]+){1,2}/);
    console.log("email id is :", mailId[0]);
    words.obj.details.email = mailId[0];
  }
  else {
    console.log("No mail found");
  } //End of email


  // console.log(":::::::::::::::::::::::::::::::",myName);

  //father's name starts here
  if (/((father(('|’|)s)?\s*name\s*\n*(\n*(<\/.*>|<.*>|\:|\.|\-|\:\-|\–|\-)\s*\n*)+.*)|father(('|’|)s)?\s*name\s*(\:|\:\-|\–|\-)).*/gmi.test(data)) {
    var fn = data.toString().match(/((father(('|’|)s)?\s*name\s*\n*(\n*(<\/.*>|<.*>|\:|\.|\-|\:\-|\–|\-)\s*\n*)+.*)|father(('|’|)s)?\s*name\s*(\:|\:\-|\–|\-)).*/gmi);
    console.log("fatherName is : ", fn[0]);
    let ffn = fn[0].toString().replace(/(father(('|’|)s)?\s*name\s*(\W)?)|<.*>|<\/.*>|<.*>/gmi, '')

    ffn = ffn.trim();
    ffn = ffn.replace(/(\t{1,}|Birthday|Gender|mobile|phone|email|(mobile|phone)\s+(num|no|number)|visa(\s+status)?|nationality|dob|date of birth)(.*)/, "❌$1")
    ffn = ffn.replace(/❌.*|(\\n|\s\s+|<p>|<?\/.*>)/, '')
    console.log(ffn)

    words.obj.details.fatherName = ffn.trim();
  }
  else {
    console.log("no fathers name found");
  } //father's name ends here

  //mother's's name starts here
  if (/(mother(('|’|)s)?\s*name\s*(\:|\:\-|\–|\-)).*/gmi.test(data)) {
    var mn = data.toString().match(/(mother(('|’|)s)?\s*name\s*(\W)?).*/gmi);
    console.log("motherName is : ", mn[0]);
    let mmn = mn[0].toString().replace(/(mother(('|’|)s)?\s*name\s*(\W)?)|<.*>/gmi, '')
    mmn = mmn.trim();
    mmn = mmn.replace(/(\t{1,}|Birthday|Gender|mobile|phone|email|(mobile|phone)\s+(num|no|number)|visa(\s+status)?|nationality|dob|date of birth)(.*)/, "❌$1")
    mmn = mmn.replace(/❌.*/, '')
    console.log(mmn)
    words.obj.details.motherName = mmn.trim();
  }
  else {
    console.log("no mother's name found");
  } //mother's name ends here

  //passport starts here
  if (/(passport\s*(no|num|number|)\s*(\:|\:\-|\–|\-).*)/gmi.test(data)) {
    var passport = data.toString().match(/(passport\s*(no|num|number|)\s*(\:|\:\-|\–|\-).*)/gmi);
    console.log("passport is : ", passport[0]);
    let pass = passport[0].toString().replace(/(passport\s*(no|num|number|)\s*(\:|\:\-|\–|\-))|<.*>|/gmi, '')
    pass = pass.trim();
    pass = pass.replace(/(\t{1,}|Birthday|Gender|mobile|phone|email|(mobile|phone)\s+(num|no|number)|visa(\s+status)?|nationality|dob|date of birth)(.*)/i, "❌$1")
    pass = pass.replace(/❌.*/, '')
    console.log(pass)
    words.obj.details.passportNumber = pass.trim();
  }
  else {
    console.log("no passport found");
  } //passport ends here

  //licnese starts here
  if (/(License\s*(no|num|number|)\s*(\:|\:\-|\–|\-).*)/gmi.test(data)) {
    var license = data.toString().match(/(License\s*(no|num|number|)\s*(\:|\:\-|\–|\-).*)/gmi);
    console.log("license is : ", license[0]);
    let lic = license[0].toString().replace(/(License\s*(no|num|number|)\s*(\:|\:\-|\–|\-))|<.*>|/gmi, '')
    lic = lic.trim();
    lic = lic.replace(/(\t{1,}|Birthday|Gender|mobile|phone|email|(mobile|phone)\s+(num|no|number)|visa(\s+status)?|nationality|dob|date of birth)(.*)/i, "❌$1")
    lic = lic.replace(/❌.*/, '')
    console.log(lic)
    words.obj.details.licenseNumber = lic.trim();
  }
  else {
    console.log("no license found");
  } //license ends here

  //panNumber starts here
  if (/(pan\s*(card)?\s*(no|num|number|)\s*(\:|\:\-|\–|\-).*)/gmi.test(data)) {
    var pan = data.toString().match(/(pan\s*(card)?\s*(no|num|number|)\s*(\:|\:\-|\–|\-).*)/gmi);
    console.log("pan is : ", pan[0]);
    let pa = pan[0].toString().replace(/(pan\s*(card)?\s*(no|num|number|)\s*(\:|\:\-|\–|\-))|<.*>|/gmi, '')
    pa = pa.trim();
    pa = pa.replace(/(\t{1,}|Birthday|Gender|mobile|phone|email|(mobile|phone)\s+(num|no|number)|visa(\s+status)?|nationality|dob|date of birth)(.*)/i, "❌$1")
    pa = pa.replace(/❌.*/, '')
    console.log(pa)
    words.obj.details.panNumber = pa.trim();
  }
  else {
    console.log("no pan found");
  } //pan ends here

  //uniqueID starts here
  if (/(unique\s*(id|identity|identification)\s*(\:|\:\-|\–|\-).*)/gmi.test(data)) {
    var unique_id = data.toString().match(/(unique\s*(id|identity|identification)\s*(\:|\:\-|\–|\-).*)/gmi);
    console.log("unique id  is : ", unique_id[0]);
    let ui = unique_id[0].toString().replace(/(unique\s*(id|identity|identification)\s*(\:|\:\-|\–|\-))|<.*>|/gmi, '')
    ui = ui.trim();
    ui = ui.replace(/(\t{1,}|Birthday|Gender|mobile|phone|email|(mobile|phone)\s+(num|no|number)|visa(\s+status)?|nationality|dob|date of birth)(.*)/i, "❌$1")
    ui = ui.replace(/❌.*/, '')
    console.log(ui)
    words.obj.details.uniqueID = ui.trim();
  }
  else {
    console.log("no unique id is found");
  } //uniqueID ends here

  //visaStatus starts here
  if (/(Visa\s*Status\s*(\:|\:\-|\–|\-)).*/gmi.test(data)) {
    var visa = data.toString().match(/(Visa\s*Status\s*(\:|\:\-|\–|\-)).*/gmi);
    console.log("visa id  is : ", visa[0]);
    let visaa = visa[0].toString().replace(/(Visa\s*Status\s*(\:|\:\-|\–|\-))|<.*>|/gmi, '')
    visaa = visaa.trim();
    visaa = visaa.replace(/(\t{1,}|Birthday|Gender|mobile|phone|email|(mobile|phone)\s+(num|no|number)|visa(\s+status)?|nationality|dob|date of birth)(.*)/i, "❌$1")
    visaa = visaa.replace(/❌.*/, '')
    console.log(visaa)
    words.obj.details.visaStatus = visaa.trim();
  }
  else {
    console.log("no unique id is found");
  } //visaStatus ends here

  //Nationality Starts here
  if (/(Nationality\s*(\:|\:\-|\–|\-)).*/gmi.test(data)) {
    var nationalityy = data.toString().match(/(Nationality\s*(\:|\:\-|\–|\-)).*/gmi);
    console.log("nationality   is : ", nationalityy[0]);
    let nation = nationalityy[0].toString().replace(/(Nationality\s*(\:|\:\-|\–|\-))|<.*>|/gmi, '')
    nation = nation.trim();
    nation = nation.replace(/(\t{1,}|Birthday|Gender|mobile|phone|email|(mobile|phone)\s+(num|no|number)|visa(\s+status)?|nationality|dob|date of birth)(.*)/i, "❌$1")
    nation = nation.replace(/❌.*/, '')
    console.log(nation)
    words.obj.details.nationality = nation.trim();
  }
  else {
    console.log("no nationality is found");
  } //nationality ends here

  //Martial Status starts here
  if (/(Marital\s*Status\s*(\:|\:\-|\–|\-)).*(\\t)?/gmi.test(data)) {
    var martial = data.toString().match(/(Marital\s*Status\s*(\:|\:\-|\–|\-)).*(\\t)?/gmi);
    console.log("martial   is : ", martial[0]);
    let ms = martial[0].toString().replace(/(Marital\s*Status\s*(\:|\:\-|\–|\-))|<.*>|/gmi, '')
    ms = ms.trim();
    ms = ms.replace(/(\t{1,}|Birthday|Gender|mobile|phone|email|(mobile|phone)\s+(num|no|number)|visa(\s+status)?|nationality|dob|date of birth)(.*)/i, "❌$1")
    ms = ms.replace(/❌.*/, '')
    console.log(ms)
    words.obj.details.martialStatus = ms.trim();
  }
  else {
    console.log("no nationality is found");
  } //martial status ends here



  skill1.skill1(data, strongArr, h1Arr, update_arr, myName);


  //DOB starts here
  if (/((\d{1,2}(,|<sup>th<\/sup>|<em>rd<\/em>|<em>th<\/em>|<em>nd<\/em>|<sup>rd<\/sup>|<sup>nd<\/sup>|th|nd|rd|st|\s|,)(\s)?(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)(\s)?(,)?(\s)?\d{4})|((jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)\s*\d{1,2}(,|<sup>th<\/sup>|<em>rd<\/em>|<em>th<\/em>|<em>nd<\/em>|<sup>rd<\/sup>|<sup>nd<\/sup>|th|nd|rd|st|\s|,)(\s)?(,)?(\s)?\d{4})|(\d{1,4}[\/|-]\d{2}[|\/|-]\d{1,4})|\d{1,2}(th|nd|rd|st|\s|,)*(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)(\s|\,)*\d{4})/gmi.test(skill1.misdata)) {

    var dob1 = [];
    var dob1 = skill1.misdata.toString().match(/((\d{1,2}(,|<sup>th<\/sup>|<em>rd<\/em>|<em>th<\/em>|<em>nd<\/em>|<sup>rd<\/sup>|<sup>nd<\/sup>|th|nd|rd|st|\s|,)(\s)?(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)(\s)?(,)?(\s)?\d{4})|((jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)\s*\d{1,2}(,|<sup>th<\/sup>|<em>rd<\/em>|<em>th<\/em>|<em>nd<\/em>|<sup>rd<\/sup>|<sup>nd<\/sup>|th|nd|rd|st|\s|,)(\s)?(,)?(\s)?\d{4})|(\d{1,4}[\/|-]\d{2}[|\/|-]\d{1,4})|\d{1,2}(th|nd|rd|st|\s|,)*(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)(\s|\,)*\d{4})/gmi);

    if (dob1 != null && dob1 !== undefined && dob1.length > 0) {

      dob1[0] = dob1[0].replace(/<(\/)?[a-z]+>/gm, '')
      console.log("DOB : ", dob1[0]);
      var re = dateChanger.dateChanger(dob1[0])

      console.log("re is", re);
      words.obj.details.dob = re;
    }
    // else if(dob2 != null && dob2.length > 0)
    // {
    //   console.log("DOB : ",dob2[0]);
    //   words.obj.details.dateOfBirth=dob2[0];
    // }
  }
  else {
    console.log("No DOB found");
  } //End of DOB

  //contact starts here
  if (/((\(|\+|^\s)*\b(([\+])?([\(]?(\d{1}\-\d{3}|[+]|[+]\d{2}|\d{2,3}|\d{1})?[\)]?)[\-|\s|\.]*?([\(]\d{1}[\)])?[(]?\d{3,4}[)]?[\-|\s|\.]*?\d{3}[\-|\s|\.]*?\d{2}[\-|\s|\.]?\d{1,2})\b|(\(|\+|^\s)*\b(([\+])?([\(]?(\d{1}\-\d{3}|[+]|[+]\d{2}|\d{2,3}|\d{1})?[\)]?)[\-|\s|\.]*?[\(]?\d{5}[\)]?[\-|\s|\.]*\d{5})\b)/.test(skill1.misdata)) {
    var phone = skill1.misdata.match(/((\(|\+|^\s)*\b(([\+])?([\(]?(\d{1}\-\d{3}|[+]|[+]\d{2}|\d{2,3}|\d{1})?[\)]?)[\-|\s|\.]*?([\(]\d{1}[\)])?[(]?\d{3,4}[)]?[\-|\s|\.]*?\d{3}[\-|\s|\.]*?\d{2}[\-|\s|\.]?\d{1,2})\b|(\(|\+|^\s)*\b(([\+])?([\(]?(\d{1}\-\d{3}|[+]|[+]\d{2}|\d{2,3}|\d{1})?[\)]?)[\-|\s|\.]*?[\(]?\d{5}[\)]?[\-|\s|\.]*\d{5})\b)/gm);
    console.log("phone id is :", phone[0]);
    words.obj.details.mobile = phone[0].trim();
  }
  else {
    console.log("No phone found");
  }//phone

  if (/(- Email me on Indeed).*\n*\s*((<\/.*>)|<.*>)?\n*\s*(<\/.*>|<.*>)?\n*\s*.*\d/gmi.test(skill1.misdata)) {
    var mailId = skill1.misdata.toString().match(/(- Email me on Indeed).*\n*\s*((<\/.*>)|<.*>)?\n*\s*(<\/.*>|<.*>)?\n*\s*.*\d/gmi)
    console.log(mailId)
    mailId = mailId.toString().replace(/(- Email me on Indeed:|\n|\s\s+|<.*>|<\/.*>)/gmi, '')
    console.log("email id is :", mailId);
    words.obj.details.email = mailId;

  }
  else {
    console.log("no mail");
  }


module.exports.mynameFlag=mynameFlag;

}

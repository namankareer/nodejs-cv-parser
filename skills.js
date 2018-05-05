module.exports.skill1 = function (data, strongArr, h1Arr, update_arr, myName) {
  var maindata = data
  var misdata = data
  var execu = require("./execution.js")
  let count = 0;
  let count1 = 0;
  //console.log(data);
  let keyUpgrade = `${myName}|RESEARCH INTERESTS|WORK\`	EXPERIENCE|CERTAIN HIGHLIGHTS|INTERPERSONAL SKILLS|Summary of Qualification(|s)|Employment / Experience Record:|ACADEMIC RECORD|IT  SKILLS|CO‐CURRICULAR ACTIVITIES AND ACHIEVEMENTS |COMPUTER PROFICIENCY|Extra Curriculum achievements|CERTIFICATIONS\/LICENSES|KEY SKILLS\\s*(AND)?\\s*COMPETENCIES|PERSONAL SUMMARY|KEY SKILLS &amp; COMPETENCIES|PROJECTS UNDERTAKEN|WORKSHOPS/CERTIFICATIONS/SEMINARS|EXTRA CIRRICULAR ACTIVITIES|AWARDS/HONOURS|LANGUAGES KNOWN|HOBBIES\\s*(\/|&amp;)\\s*INTERESTS|Subject Based Academic Projects|REFERENCES|PROFESSIONAL TRAINING(|&amp;) PROJECTS|Qualitative Skill(|s)|Additional Skill(|s)|Campus Activitie(|s)|ACADEMIC CREDENTIAL(|S)|career summary|key project(|s)|Technical Skill(|s)|ACADEMIC QUALIFICATION(|S)|Professional Summary|PROFESSIONAL TRAINING & PROJECTS|Summary|Professional Objective|Employment Objective|Car(e|r)er Objective|Objective|Career Goal|Five Year Plan|Interests (|and) (|Hobbies)|Employment History|PROFESSIONAL DOSSIER|Work History|Work Experience|(Professional Experience(|s))|JOB PROFILE|Professional Background|Preference(|s)|Additional Experience|Career Related Experience|Related Experience|Industry Experience|Accounting Experience|Freelance Experience|Freelance|Army Experience|Military Experience|Strength(|s)|Military Background|Experience|Academic Background|Academic Experience|Program(|s)|Related Course(|s)|Course(|s)|Education and Training|Education|Educational Background|Educational Qualification(|s)|Educational Training|Academic Training|Professional Training|Training|Course Project Experience|Related Course Project(|s)|Internship Experience|Internship(|s)|Apprenticeship(|s)|College Activitie(|s)|Certification(|s)|Special Training|Training|Activities and Honor(|s)|Affiliation(|s)|Professional Affiliation(|s)|Professional Association(|s)|Association(|s)|Professional Membership(|s)|Membership(|s)|Athletic Involvement|Community Involvement|Civic Activitie(|s)|Extra-Curricular Activitie(|s)|POSITIONS OF RESPONSIBILITY|Reporting|EXTRA CURRICULAR (|ACHIEVEMENT(|s)|Activities)|Extra\\-?curricular|Professional Activitie(|s)|Volunteer Work|Volunteer Experience|Publication(|s)|CAREER HIGHLIGHTS|PROFESSIONAL QUALIFICATIONS AND AFFILIATIONS|Presentation(|s)|Convention(|s)|Credential(|s)|Skills (|&|and) Expertise|Areas of Experience|Areas of Expertise|Areas of Knowledge|Career Related Skill(|s)|Professional Skill(|s)|Specialized Skill(|s)|Computer Skill(|s)|Computer Knowledge|Software|Technologie(|s)|Technical Experience|Proficiencie(|s)|Language Competencies and Skill(|s)|Programming Language(|s)|Relevant Skills|Technology Skill(|s)|About Me|Skill(|s)|Academic Honor(|s)|Academic(|s)|Honor(|s)|Professional Development|Internship and Research Projects|Accolade(|s)|Endorsement(|s)|Achievement(|s)|Award(|s)|Distinction(|s)|Fellowship(|s)|Scholarship(|s)|Hobbie(|s)|Personal Interest(|s)|Strength(|s)|Interest(|s)|Miscellaneou(|s)|personal project(|s)|Procedures|group project(|s)|other project(|s)|project(|s)|(Language(|s)\\s*Proficiency)|Languages to|personal detail(|s)|Accomplishment(|s)|personal information|SAP HCM SKILLS|OTHER EDUCATIONAL QUALIFICATION DETAILS|Declaration|Awards|Honors and Awards|profile|introduction|Career Profile|Key Skills|Voluntary Experience|Referees|\bLanguage(|s)\b`

  // console.log("Data is ********",data);
  // console.log("My strong arr is *******",strongArr);
  // console.log("My h1 array would be ******",h1Arr);
  // console.log("My upated array would be",update_arr);
  var blocks = [];
  var myKeys = [];
  const fs = require('fs')
  var addSkill = [], addCareer = [], addProject = [], addExp = [], addEdu = [], addLang = [], addSkillextra = [], addHobbie = [], addreskill = [];

  let finalKeys = new RegExp(`(\s*([^\\w*]<strong>|[^\\w*]<p>|[^\\w*]?\s*<h[1|3|2]\>)(\\n*|\\s*|\\t*)(${keyUpgrade})((\\W){1,4})*(\\n*|\\s*\\t*)(<\/strong>|<\/p>|<\/h[1|2|3]>)(\\n*))`, 'gim')
  myKeys = data.match(finalKeys);
  // console.error("my cv keywords array would be ***",myKeys);
  if (myKeys != null && myKeys != undefined) {
    myKeys = myKeys.map(element => element.trim().replace(/\s+|\n+/g, '\\n*\\s*'))
    console.error("my updated cv keys are : ", myKeys);
    var block_array = block(data, myKeys);
  }

  function block(data, myKeys) {
    //  data1=data
    var block_array1 = [];
    for (let i = 0; i < myKeys.length; i++) {
      let j = i;
      blocks = null;
      let match1, match2, block_regex;
      match1 = myKeys[j];
      match2 = myKeys[++j];
      if (j == myKeys.length) {
        //console.log("ifhello")
        blocks = data.match(new RegExp(`${match1}\\n?(.*\\n*)+`, 'gmi'));
        // console.error("&&&&&&&&&&&&&&& in if",blocks);
        // data=removedata(data,blocks)

        if (blocks != null && blocks != undefined) {
          block_array1 = block_array1.concat(blocks);
          data = removedata(data, blocks)
        }

      }
      else {
        //console.log("elsehello")
        block_regex = `(${match1})\\n?(.*\\n)+(\\s*${match2})`
        let keys1 = new RegExp(block_regex, 'gmi')
        if (keys1.test(data)) {

          blocks = data.match(keys1);
          //console.log("ifhello")
          // console.error("&&&&&&&&&&&&&&& in if",blocks);
          // console.error(data)
          // console.error("&&&&&&&&&&&&&&& in else",data);
          if (blocks != null && blocks != undefined) {
            block_array1 = block_array1.concat(blocks);
            //console.log("ifhello")
            data = removedata(data, blocks, match2)
            //console.log(data);

          }

        }
      }
    }
    // console.log("hello")
    return block_array1;
  }
  var block_array = block_array.filter(function (x) {
    return (x !== null);
  });
   console.error(block_array);
  let proFlag = false, skillFlag = false, extraskillFlag = false, careerFlag = false, expFlag = false, eduFlag = false, langFlag = false, hobbieFlag = false;
  for (let i = 0; i < block_array.length; i++) {
    let skillFuc = [], careerFuc = [], projectFuc = [], eduFuc = [], expFuc = [], langFuc = [], extraskillFuc = [], hobbieFuc = [];

    let innerArray = block_array[i].split('\n');

    if (skillFuc == null || skillFuc == undefined || skillFuc.length == 0) {
      let skillreg = ['technical skills', 'technology skills', 'key skills', 'relevant skills', 'it  skills', 'it skills'];
      skillFuc = search(skillreg, innerArray);
      // if (skillFuc.length > 0) {
      //   skillFlag = true;
      // }
      addSkill = addSkill.concat(skillFuc);
    }

    if (extraskillFuc == null || extraskillFuc == undefined || extraskillFuc.length == 0) {
      let extraskillreg = ['certification', 'qualitative skills', 'interpersonal', 'additional skills', 'areas of expertise', 'strength', 'extra', 'achievement'];
      extraskillFuc = search(extraskillreg, innerArray);
      // if (extraskillFuc.length > 0) {
      //   // console.error("skill fun",extraskillFuc)
      //   extraskillFlag = true;
      // }
      addSkillextra = addSkillextra.concat(extraskillFuc);
    }

    if (careerFuc == null || careerFuc == undefined || careerFuc.length == 0) {
      let careerreg = ['objective', 'career', 'summary', 'profile', 'introduction', 'about me'];
      careerFuc = search(careerreg, innerArray);
      if (careerFuc.length > 0) {
        careerFlag = true;
      }
      addCareer = addCareer.concat(careerFuc);
    }

    if ((projectFuc == null || projectFuc == undefined || projectFuc.length == 0) && proFlag == false) {
      let projectreg = ['project', 'training'];
      projectFuc = search(projectreg, innerArray);
      if (projectFuc.length > 0) {
        proFlag = true;
      }
      addProject = addProject.concat(projectFuc);
    }

    if (expFuc == null || expFuc == undefined || expFuc.length == 0) {
      let expreg = ['experience'];
      expFuc = search(expreg, innerArray);
      if (expFuc.length > 0) {
        expFlag = true;

        addExp = addExp.concat(expFuc);


      }


    }

    if (eduFuc == null || eduFuc == undefined || eduFuc.length == 0) {
      let edureg = ['academic ', 'education']
      eduFuc = search(edureg, innerArray);
      if (eduFuc.length > 0) {
        eduFlag = true;
      }
      addEdu = addEdu.concat(eduFuc);
      fs.writeFileSync('./expdata.txt', addEdu)
    }

    if (langFuc == null || langFuc == undefined || langFuc.length == 0) {

      let langreg = ['language']
      langFuc = search(langreg, innerArray);
      if (langFuc.length > 0) {
        langFlag = true;
      }
      addLang = addLang.concat(langFuc);
    }
    if (hobbieFuc == null || hobbieFuc == undefined || hobbieFuc.length == 0) {

      let hobbiereg = ['hobbie', 'interest']
      hobbieFuc = search(hobbiereg, innerArray);
      if (hobbieFuc.length > 0) {
        hobbieFlag = true;
      }
      addHobbie = addHobbie.concat(hobbieFuc);
    }
  }

  // console.error(misdata)
  misskill(misdata, myKeys)
  module.exports.misdata = misdata
  function misskill(misdata, myKeys1) {
    // console.error("~~~~~~~",misdata)
    let reskillFlag = false;
    // console.error(myKeys1)
    var misblock_arr = block(misdata, myKeys)
    //  console.error(misblock_arr)
    var misblock_arr = misblock_arr.filter(function (x) {
      return (x !== null);
    });



    for (let i = 0; i < misblock_arr.length; i++) {
      let innerArray = misblock_arr[i].split('\n');
      let reskillFuc = [];
      if (reskillFuc == null || reskillFuc == undefined || reskillFuc.length == 0) {
        let reskillreg = ['skill']
        reskillFuc = search(reskillreg, innerArray);
        if (reskillFuc.length > 0) {
          reskillFlag = true;
        }
        addreskill = addreskill.concat(reskillFuc);
      }
    }
  }

  //  console.error("AAAAAAAAAAA",addreskill);
  // console.log(addCareer);
  //  console.log(addProject);
  //console.log(addExp);
  // console.log(addEdu);
  // console.log(addLang);
  // console.log(addSkillextra);
  //  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",addHobbie);

  function search(arrayArg, targetArr) {
    var answer = [];
    var length = arrayArg.length;
    //console.log("length of array",length)
    for (let i = 0; i < length; i++) {

      console.log("####",targetArr[0]);
      if ((targetArr[0]).toLowerCase().includes(arrayArg[i])) {
        // console.error("AA????",targetArr)
        misdata = mis(misdata, targetArr)
        // console.error("DDDDDD??",misdata)
        answer = answer.concat(targetArr);
        break;
      }
      else if ((targetArr[1]).toLowerCase().includes(arrayArg[i])) {
        console.log(targetArr[1]);

        misdata = mis(misdata, targetArr)
        // console.error("BB????",targetArr)
        // console.log("hello")
        answer = answer.concat(targetArr);
        break;
      }
    }
    //console.log('returned answer',answer);


    return answer;
  }
  function mis(fulldata, data1) {
    // console.error("@@@@@@@@@@@@#############",data1);
    let str1 = ''
    for (let i = 0; i < data1.length; i++) {
      str1 = str1 + " " + data1[i]
    }
    data1 = str1
    if (data1 != null && data1 != undefined) {
      // console.error("ASSS>>>",data1)
      for (let i = 0; i < myKeys.length; i++) {
        let reg = new RegExp(`${myKeys[i]}`, 'gmi')

        // console.error("AAAAA",reg,"SSSSs",myKeys[i])
        data1 = data1.replace(reg, '')
        // console.error('SSSSSS',data1)
      }
      let regdata = data1.trim().replace(/\s+|\n+|\t/g, '\\n*\\s*').replace(/\(/gm, '\\(').replace(/\)/gm, '\\)').replace(/\//gmi, '\\/').replace(/\+/gmi, '\\+').replace(/\$/gmi, '\\$').replace(/\?/gmi, '\\?').replace(/\]/gmi, '\\]').replace(/\[/gmi, '\\[')
      let reg = new RegExp(`${regdata}`, 'gmi')
      // console.error("::::????????>>>>>>",reg)
      // console.error("LLLLLLLLLLLLLLLLL",misdata)
      // console.error("LLLLLLLLLLLLLLLLL",fulldata)
      return fulldata.replace(reg, '')


    }
  }

  function removedata(fulldata, block, match2) {

    data1 = block.join('\n')
    //console.log("in remove1")
    // console.error("BBBBBBBBBBBBBBBB",data1);
    if (data1 != null && data1 != undefined) {
      // console.error("ASSS>>>",data1)
      //console.log("in remove2")
      let reg1 = new RegExp(`${match2}`, 'mi')
      // console.error("AAAAA",reg,"SSSSs",myKeys[i])
      data1 = data1.replace(reg1, '')
      // console.error('SSSSSS',data1)

      let regdata = data1.trim().replace(/\s+|\n+|\t/g, '\\n*\\s*').replace(/\(/gm, '\\(').replace(/\)/gm, '\\)').replace(/\//gmi, '\\/').replace(/\+/gmi, '\\+').replace(/\$/gmi, '\\$').replace(/\?/gmi, '\\?').replace(/\[/gmi, '\\[').replace(/\]/gmi, '\\]')
      let reg = new RegExp(`${regdata}`, 'gmi')
      // console.error("::::????????>>>>>>", regdata)

      //console.error("::::????????>>>>>>", reg)
      // console.error("LLLLLLLLLLLLLLLLL",misdata)
      // console.error("LLLLLLLLLLLLLLLLL",fulldata)
      // console.log(fulldata)
      fulldata = fulldata.replace(reg, '')
      //console.log(fulldata);
      return fulldata
    }
  }

  execu.execu(maindata, addSkill, addSkillextra, addCareer, addLang, addProject, addExp, addEdu, addHobbie, addreskill, myKeys, misdata);
}

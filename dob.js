module.exports.dateChanger=function(str){
  let dude=str.toString();
  console.log("dude is",dude);
var x=dude;
var str;
var count;
var a=[];


if(x.includes('/'))
  {
    var key='/'
foo()
  }
else if(x.includes('-'))
  {
    var key='-'
    foo()
  }
else
  foo1();

function foo()
{
  arr=x.split(`${key}`)
console.log(arr)

for(let i=0;i<arr.length;i++)
  {
    if(arr[i].length==4)
      {
        a.push(arr[i])
        count=i
      }


  }

a.push(arr[1]);
  if(count==0)
a.push(arr[2]);
  if(count==2)
    a.push(arr[0])
a=a.join('/')

}


function foo1(){
  x=x.replace(/rd|th|st|nd|,/g,'')
console.log("after replacing nd st th",x)

arr=x.split(' ')
console.log(arr)
var regex=/jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december/i

for(let i=0;i<arr.length;i++)
  {
    if(regex.test(arr[i])){
      console.log("lopala")
      str=arr[i].toLowerCase()
      switch(true)
      {

          case (str=="january"||str=="jan"):
          arr[i]=1;
          console.log(arr[i])
          break;
          case (str=="february"||str=="feb"):
          arr[i]=2;
          console.log(arr[i])
          break;
          case (str=="march"||str=="mar"):
          arr[i]=3;
          console.log(arr[i])
          break;
          case (str=="april"||str=="apr"):
          arr[i]=4;
          console.log(arr[i])
          break;
          case (str=="may"):
          arr[i]=5;
          console.log(arr[i])
          break;
          case (str=="june"||str=="jun"):
          arr[i]=6;
          console.log(arr[i])
          break;
          case (str=="july"||str=="jul"):
          arr[i]=7;
          console.log(arr[i])
          break;
          case (str=="august"||str=="aug"):
          arr[i]=8;
          console.log(arr[i])
          break;
          case (str=="september"||str=="sept"||str=="sep"):
          arr[i]=9;
          console.log(arr[i])
          break;
          case (str=="october"||str=="oct"):
          arr[i]=10;
          console.log(arr[i])
          break;
          case (str=="november"||str=="nov"):
          arr[i]=11;
          console.log(arr[i])
          break;
          case (str=="december"||str=="dec"):
          arr[i]=12;
          console.log(arr[i])
          break;
      }
    }
  }
console.log(arr)
for(let i=0;i<arr.length;i++)
  {
    if(arr[i].length==4)
      {
        a.push(arr[i])
        count=i
      }


  }

a.push(arr[1]);
  if(count==0) //month
a.push(arr[2]);
  if(count==2) //date
    a.push(arr[0])
a=a.join('/')
console.log("!!!!",a)

}
return a;
}

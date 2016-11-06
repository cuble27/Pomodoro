// $(document).ready(function() {
var minute=25;
var second=0;
var state=0; //0=idle/stopped; 1=paused; 2=running

var theMinutes=document.getElementsByClassName("minutes")[0];
var theSeconds=document.getElementsByClassName("seconds")[0];

var plus= document.getElementsByClassName("plus")[0];
var minus= document.getElementsByClassName("minus")[0];

var start= document.getElementsByClassName("start")[0];
var reset= document.getElementsByClassName("reset")[0];

plus.onmousedown= function(){
   state= 1;
   second=0;
   theSeconds.innerHTML= "00";

   if(minute >= 90){
      return;
   }

   if(minute%5 != 0){
      minute-= minute%5;
      minute+= 5;
   }else{
      minute+= 5;
   }
   theMinutes.innerHTML= minute;
};

minus.onmousedown= function(){
   state= 1;
   second=0;
   theSeconds.innerHTML= "00";

   if (minute <= 5) {
      return;
   }else if(minute%5 != 0){
      minute -= minute%5;
   }else{
      minute-= 5;
   }
   theMinutes.innerHTML= minute;
};

start.onclick= function(){
   timeFlies();
   if (state == 2){
      state= 1;

   }else{
      state= 2;
   }

};


reset.onclick= function(){
   state= 1;
   minute= 25;
   second= 0;
   theSeconds.innerHTML= "00";
   theMinutes.innerHTML= minute;
};

function timeFlies(){
   var run= setInterval(function(){
      // var start= performance.now();
      if (state == 1){
         clearInterval(run);
         return;
      }

      if(second == 0){
         if(minute <= 0){
            clearInterval(run);
            alert("stop");
            return;
         }

         second= 60;
         minute--;
         theMinutes.innerHTML = minute;
      }
      second--;
      theSeconds.innerHTML = second;

      // var finish= performance.now();
      // console.log(finish-start);
   }, 1000);
}


// });

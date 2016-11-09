var minute=25;
var second=0;
var state=0; //0=idle/stopped; 1=paused; 2=running
var run; //Global variable for the Interval
var water= $('.water');

var theMinutes=document.getElementsByClassName("minutes")[0];
var theSeconds=document.getElementsByClassName("seconds")[0];

var plus= document.getElementsByClassName("plus")[0];
var minus= document.getElementsByClassName("minus")[0];

var start= document.getElementsByClassName("start")[0];
var reset= document.getElementsByClassName("reset")[0];

function resetClock(){
   clearInterval(run);
   state= 0; //Stop the timer
   water.stop(); //Stop the animation
   water.css('top', '0px');
   second= 0;
   theSeconds.innerHTML= "00";
}

plus.onmousedown= function(){
   if(state != 0){
      resetClock(); //Reset the clock
   }
   state= 0;
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
   if(state != 0){
      resetClock(); //Reset the clock
   }
   state= 0;
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
   if (state == 2){
      state= 1; //PAUSE the timer and the animation
      water.pause();
   }else if(state == 1){
      state= 2; //RESUME the timer and the animation
      water.resume();
   }else{
      state= 2; //START the timer and the animation
      water.animate({top: '280px'}, (minute*60)*1000);
      console.log((minute*60)*1000);  //DELETE after completion
   }
   timeFlies();

};

reset.onclick= function(){
   resetClock();
   minute= 25;
   theMinutes.innerHTML= minute;
};

function timeFlies(){
   if (state != 2){
      clearInterval(run);
      water.pause();
      return;
   }
   run= setInterval(function(){
      // var start= performance.now();  //Test the speed of this function

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
      if(second > 9){
         theSeconds.innerHTML = second;
      }else{
         theSeconds.innerHTML = "0" + second;
      }


      // var finish= performance.now();
      // console.log(finish-start);
   }, 1000);
}

$(document).ready(function() {
   // $('.water').fadeOut('1000', function() {
   // });

   // $('.water').animate({top: '+='+x+'px'}, 2800);


});

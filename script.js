var minute=0;
var second=0;
var sessionTime=25;
var breakTime=5;
var state=0; //0=idle/stopped; 1=paused; 2=running; 3=break;
var run; //Global variable for the Interval

var water= $('.water');

var theMinutes=document.getElementsByClassName("minutes")[0];
var theSeconds=document.getElementsByClassName("seconds")[0];

var plusSession= document.getElementsByClassName("plusSession")[0];
var minusSession= document.getElementsByClassName("minusSession")[0];
var minuteSession= document.getElementsByClassName("sessionTime")[0];

var plusBreak= document.getElementsByClassName("plusBreak")[0];
var minusBreak= document.getElementsByClassName("minusBreak")[0];
var minuteBreak= document.getElementsByClassName("breakTime")[0];

var start= document.getElementsByClassName("startStop")[0];
var reset= document.getElementsByClassName("resetButton")[0];


plusBreak.onmousedown= function(){
   if(breakTime >= 30 || breakTime >= sessionTime){
      return;
   }

   breakTime+= 5;
   minuteBreak.innerHTML= breakTime;

};

minusBreak.onmousedown= function(){
   if (breakTime <= 5) {
      return;
   }

   breakTime-= 5;
   minuteBreak.innerHTML= breakTime;
};


plusSession.onmousedown= function(){
   if(sessionTime >= 90){
      return;
   }

   if(sessionTime%5 != 0){
      sessionTime-= sessionTime%5;
      sessionTime+= 5;

   }else{
      sessionTime+= 5;
   }

   minuteSession.innerHTML= sessionTime;
   if (state == 0) {
      theMinutes.innerHTML= sessionTime;
   }
};

minusSession.onmousedown= function(){
   if (sessionTime <= 5) {
      return;

   }else if(sessionTime%5 != 0){
      sessionTime -= sessionTime%5;

   }else{
      sessionTime-= 5;
   }

   if(sessionTime < breakTime){
      breakTime = sessionTime;
      minuteBreak.innerHTML= breakTime;
   }

   minuteSession.innerHTML= sessionTime;
   if (state == 0) {
      theMinutes.innerHTML= sessionTime;
   }
};

start.onclick= function(){
   if (state == 3) {
      return;
   }
   timeFlies();
};

function resetthethetheClock(){

}

reset.onclick= function(){
   clearInterval(run);
   state= 0; //Stop the timer

   water.stop(); //Reset the animation
   water.animate({top: '0px'}, 350);

   second= 0;
   theSeconds.innerHTML= "00";

   minute= 25;
   theMinutes.innerHTML= 25;

   sessionTime= 25;
   minuteSession.innerHTML= 25;

   breakTime= 5;
   minuteBreak.innerHTML= 5;
};



function timeFlies(){
   if (state == 2){
      state= 1; //PAUSE the timer and the animation
      clearInterval(run);
      water.stop();
      return;

   }else if(state == 1){
      state= 2; //RESUME the timer and the animation
      water.animate({top: '280px'}, (minute*60)*1000);

   }else{
      state= 2; //START the timer and the animation
      minute= sessionTime;
      water.animate({top: '280px'}, (minute*60)*1000);
   }

   run= setInterval(function(){
      // var startTest= performance.now();  //Test the speed of this function
      if(second == 0){
         if(minute <= 0){ //True if time runs out

            if(confirm("Time for a break!\nPress cancel if you want 5 more minutes.")){
               clearInterval(run);
               state=3;
               takeBreak();
            }else{
               minute=5;
               water.animate({top: '0px'}, 350);
               water.animate({top: '280px'}, (5*60)*1000);
            }
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
      // var finishTest= performance.now();
      // console.log(finishTest-startTest);
   }, 1000);
}


function takeBreak(){
   water.css('background', 'rgb(251, 232, 30)');
   water.animate({top: '0px'}, (breakTime*60)*1000);

   minute=breakTime;
   run= setInterval(function(){
      // var startTest= performance.now();  //Test the speed of this function
      if(second == 0){
         if(minute <= 0){ //True if time runs out
            clearInterval(run);
            state= 0;

            if(confirm("Back to work!")){
               water.css('background', 'rgb(0, 210, 93)');
               minute=sessionTime;
               timeFlies();

            }else{
               alert("Nice try, back to work!");
               water.css('background', 'rgb(0, 210, 93)');
               minute=sessionTime;
               timeFlies();
            }
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
      // var finishTest= performance.now();
      // console.log(finishTest-startTest);
   }, 1000);

}


$(document).ready(function() {

});

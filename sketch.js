				var canvas,loc,div,loc,size,avg , dev,color,high,alpha,dead,score,able;
var blocks = [];
var pipes =[];



function setup(){
  able = false;
  high = getCookie("high");
  alpha=255;
  score=0;
  color = 0;
div = document.getElementById("cvs");
canvas=createCanvas(windowWidth,500);
background(100);
noStroke();
blocks[0]={
  hacc:0,
  vacc:0.5,
  hspd:0,
  vspd:0,
  xpos:100,
  ypos:900,
  color:255,
  side:10
};
avg = 3000;//milliseconds
dev = 20;//in percent
gen();
}

function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^${}()|\[\]\/\\])/g, '\\$1'); };
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}


function gen(){
 pipes[pipes.length]={
wi:max(random(100,200-pipes.length),50),
hi:random(300,height-300),
x:width,
thick:10,
value: true,
color: (pipes.length*10)%100

 };
 setTimeout(gen, avg*(1+(random(-dev,dev)/100)));
}


function windowResized(){
  resizeCanvas(windowWidth, 500);
  background(255);
}
/*
function mousePressed(){
  blocks[blocks.length]={
    hacc:0,
    vacc:1,
    hspd:0,
    vspd:0,
    xpos:mouseX,
    ypos:mouseY+loc.top,
    color:255,
    side: random(10,100)
  };
}
*/

function draw(){
background(255);
fill(17, 77, 238);
textSize(200);
strokeWeight(2);

text('Game Over',170,300);
textSize(80);
text('Score:'+score,500,370);

canvas.parent('cvs');
loc = div.getBoundingClientRect();

if(dead){
  alpha-=5;
  if(alpha < -100){
    score=0;
    alpha=255;
    pipes = [];
    dead=false;
  }
}
background(255,255,255,alpha);
strokeWeight(1);

fill(17, 77, 238,alpha);
//draw the pipes
for(var p=0;p<pipes.length;p++){
  fill(	17, 77, 238,alpha);
rect(pipes[p].x,pipes[p].hi+pipes[p].wi, pipes[p].thick , height);
rect(pipes[p].x,pipes[p].hi-pipes[p].wi, pipes[p].thick , -height);
pipes[p].x-=max(sqrt(pipes.length),5);
}

fill(	38,38,38);

//calculate physics and display block
for (i=0; i<blocks.length;i++){
  blocks[i].hacc+= -.1*blocks[i].hspd;
  blocks[i].hspd += blocks[i].hacc;
  blocks[i].vspd+=blocks[i].vacc;
  while(blocks[i].ypos+blocks[i].vspd>loc.top+height-blocks[i].side){
    blocks[i].vspd--;
  }
  while(blocks[i].ypos+blocks[i].vspd<loc.top){
    blocks[i].vspd++;
  }
  while(blocks[i].xpos+blocks[i].hspd<loc.left){
    blocks[i].hspd++;
  }
  while(blocks[i].xpos+blocks[i].hspd>loc.left+width-blocks[i].side){
    blocks[i].hspd--;
  }
  blocks[i].ypos=blocks[i].ypos+blocks[i].vspd;
  blocks[i].xpos=blocks[i].xpos+blocks[i].hspd;

  rect(blocks[i].xpos,blocks[i].ypos-loc.top,blocks[i].side,blocks[i].side);
  for(var g = max(pipes.length - 10,0); g<pipes.length; g++){
    if((pipes[g].x < blocks[i].xpos+blocks[i].side) && (pipes[g].x + pipes[g].thick > blocks[i].xpos)){
      if ((blocks[i].ypos - loc.top + blocks[i].side) > (pipes[g].hi + pipes[g].wi) || (blocks[i].ypos - loc.top)  < (pipes[g].hi - pipes[g].wi)){
      dead = true;
    }
    else{
      if(pipes[g].value){
        pipes[g].value = false;
        score++;
      }
    }

}
}
  }



if(score > high) {
  high = score;
  document.cookie = "high="+high+";";
}
textSize(20);
strokeWeight(2);
text('current score: ' + score+ '     high score: ' + high,20,20)


}

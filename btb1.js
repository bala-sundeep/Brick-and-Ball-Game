var xt=[],yt=[],bmax_x=690,bmax_y=480,bmin_x=15,bmin_y=15,id,curtop=455,curleft=343,dir="nill",test=0,p=0;
var basey=bmax_y,basex=Math.floor(bmax_x/2),score=0;
var arr;
function createTable(){
    var ele=document.getElementById('playground');
    //generating bricks
   for(var i=0;i<30;i++){
    var y=Math.floor(Math.random()*(200-15)+15);
    var x=Math.floor(Math.random()*(655-15)+15);
    if(i==0){
            xt[xt.length]=x;
            yt[yt.length]=y;
    }
    else{
        for(j=0;j<xt.length;j++){
            if(Math.abs(x-xt[j])<30 && Math.abs(y-yt[j])<17){
                i--;
                break;
            }
        }
        if(j!=xt.length){
            continue;
        }else{
            xt[xt.length]=x;
            yt[yt.length]=y;
        }
    }
    var brick=document.createElement('div');
    brick.setAttribute('class','brick');
    ele.appendChild(brick);
    brick.style.left=x+'px';
    brick.style.top=y+'px';
    brick.style.backgroundColor="brown";
   }
   
   var base=document.createElement('div');
    base.setAttribute('id','base');
    ele.appendChild(base);
    base.style.backgroundColor="brown";
    base.style.width="40px";
    base.style.height="15px";
    //generating base
    createBase();

    arr=document.getElementsByClassName('brick'); //retrieving the created divs' into arr

    //game loop
    id=setInterval(game,10 ); //299 208 //282 191
}


function createBase(){
    document.getElementById('base').style.left=basex+'px';
    document.getElementById('base').style.top=basey+'px';

}


function game(){
    var i;
    var base=document.getElementById('base');
    var baseObj=base.getBoundingClientRect(); //coordinates of base
    var ball=document.getElementById('ball');
    var ballObj=ball.getBoundingClientRect(); //coordinates of ball
    var center1=ballObj.top+6;
    var center2=ballObj.left+6;
    console.log(ballObj);
if(dir==="left-up"){
        for(i=0;i<xt.length;i++){
            var brOb=arr[i].getBoundingClientRect();
            if(  brOb.bottom>=ballObj.top && brOb.bottom<=center1 && 
                center2>=brOb.left && center2<=brOb.right   )  //hitting the brick from bottom
            {
                dir="left-down"; 
                test=1; 
                break; 
            }
            else if(  ballObj.left<=brOb.right && center2>=brOb.right &&
                      center1<=brOb.bottom && center1>=brOb.top  )  //hitting the brick from right
            {
                dir="right-up"; 
                test=1; 
                break;
            }
        }
   if(test!=1){
       test=0;
    if(curtop==0)
    dir="left-down";
    else if(curleft==0)
    dir="right-up";
    else{
        curtop--;
        curleft--;
        balldir(curtop,curleft);
    }
}else{
    test=0; score++; document.getElementById('score').innerText=score;
    arr[i].style.backgroundColor="white";
    document.getElementById('playground').removeChild(arr[i]);
    xt.splice(i,1);
    yt.splice(i,1);
    if(xt.length==0)
    endGame();
}
}
else if(dir==="right-up"){
    for(i=0;i<xt.length;i++){
        var brOb=arr[i].getBoundingClientRect();
    if(  ballObj.top<=brOb.bottom && brOb.bottom>=center1 && ballObj.bottom-brOb.bottom<=12 &&
        ballObj.bottom-brOb.bottom>=0 && center2>=brOb.left && center2<=brOb.right )  
    {
        dir="right-down"; 
        test=1; 
        break;
    }
    else if(ballObj.right>=brOb.left && brOb.left>=center2 &&
            center1<=brOb.bottom && center1>=brOb.top )
    {dir="left-up"; test=1; break;}
    }
    if(test!=1){
    if(curtop==0)
    dir="right-down";
    else if(curleft==bmax_x)
    dir="left-up";
    else{
        curtop--;
        curleft++;
        balldir(curtop,curleft);
    }
}else{
    test=0; score++; document.getElementById('score').innerText=score;
    arr[i].style.backgroundColor="white";
    document.getElementById('playground').removeChild(arr[i]);
    xt.splice(i,1);
    yt.splice(i,1);
    if(xt.length==0)
    endGame();
}
}
else if(dir==="right-down"){
    for(i=0;i<xt.length;i++){
        var brOb=arr[i].getBoundingClientRect();
    if(ballObj.bottom>=brOb.top && brOb.top>=center1 && center2>=brOb.left && center2<=brOb.right  )
    {dir="right-up"; test=1; break;}
    else if(ballObj.right>=brOb.left && brOb.left>=center2 &&
        center1<=brOb.bottom && center1>=brOb.top  )
    {dir="left-down"; test=1; break;}
    }
    if(test!=1){
    if(ballObj.right>=baseObj.left && ballObj.left<=baseObj.right  && ballObj.bottom==baseObj.top )
    dir="right-up";
    else if(curleft==bmax_x)
    dir="left-down";
    else if(curtop==bmax_y)
    endGame();
    else{
        curtop++;
        curleft++;
        balldir(curtop,curleft);
    }
}else{
    test=0; score++; document.getElementById('score').innerText=score;
    arr[i].style.backgroundColor="white";
    document.getElementById('playground').removeChild(arr[i]);
    xt.splice(i,1);
    yt.splice(i,1);
    if(xt.length==0)
    endGame();
}
}
else if(dir==="left-down"){
    for(i=0;i<xt.length;i++){
        var brOb=arr[i].getBoundingClientRect();
    if(ballObj.bottom>=brOb.top && brOb.top>=center1 && center2>=brOb.left && center2<=brOb.right  )
    {dir="left-up"; test=1; break;}
    else if(ballObj.left<=brOb.right && center2>=brOb.right &&
        center1<=brOb.bottom && center1>=brOb.top  )
    {dir="right-down"; test=1; break;}
    }
    if(test!=1){
    if(ballObj.right>=baseObj.left && ballObj.left<=baseObj.right  && ballObj.bottom==baseObj.top )
    dir="left-up";
    else if(curleft==0)
    dir="right-down";
    if(curtop==bmax_y)
    endGame();
    else{
        curtop++;
        curleft--;
        balldir(curtop,curleft);
    }
}else{
    test=0; score++; document.getElementById('score').innerText=score;
    arr[i].style.backgroundColor="white";
    document.getElementById('playground').removeChild(arr[i]);
    xt.splice(i,1);
    yt.splice(i,1);
    if(xt.length==0)
    endGame();
}
}
}

function balldir(t,l){
    document.getElementById('ball').style.top=t+'px';
    document.getElementById('ball').style.left=l+'px';
}

function endGame(){
    clearInterval(id);
    setTimeout(function(){
        if(xt.length==0)
        {document.getElementById('score').innerText='you won!!';alert("Game over!! You won!!");}
        else
        {alert("Game over!! & score: "+score);}
        document.location="D:\\JSpractise\\BTB\\btb.html";
    });
}
document.addEventListener('keydown',function(){
    var key=event.which || event.keyCode;
    if(key==32){
        p++;
        if(p%2==0)
        id=setInterval(game,10);
        else
        clearInterval(id);
    }
    if(key==37 && basey!=0)
    {  
        if(basex>5){
        basex-=8;
        if(dir=="nill")
        dir="right-up";
        createBase();}
    }
    else if(key==39 && basey!=14){
        if(basex<650){
        basex+=8;
        if(dir=="nill")
        dir="left-up";
        createBase();}
    }
});
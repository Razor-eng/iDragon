score=0;
cross=true;

audio=new Audio('music.mp3');
audiogo=new Audio('gameover.mp3');
setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown=function(e){
    console.log("key code is: ",e.keyCode)
    if(e.keyCode==38){
        dino=document.querySelector(".dino");
        dino.classList.add('animateDino');
        setTimeout(()=>{
            dino.classList.remove('animateDino');
        },700);
    }
    if(e.keyCode==39){
        dino=document.querySelector(".dino");
        dinoX=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left=dinoX+150+"px";
    }
    if(e.keyCode==37){
        dino=document.querySelector(".dino");
        dinoX=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left=dinoX-(150)+"px";
    }
}

setInterval(()=>{
    dino=document.querySelector(".dino");
    gameOver=document.querySelector(".gameOver");
    obstacle=document.querySelector(".obstacle");
    
    dx=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    dy=parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));

    ox=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    oy=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));

    offsetx=Math.abs(dx-ox);
    offsety=Math.abs(dy-oy);

    if(offsetx<73&&offsety<52){
        gameOver.innerHTML = 'Game Over - Reload to play again';
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(() => {
            dino=document.querySelector(".dino");
            dinoX=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
            audiogo.pause();
            audio.pause();
            setTimeout(() => {
                dino.style.bottom=-(200)+"px";
            }, 1000);
        }, 1000);
    }
    else if(offsetx<145 && cross){
        score+=1;
        updateScore(score);
        cross=false;
        setTimeout(()=>{
            cross=true;
        },1000);
        setTimeout(()=>{
            aniDur = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
            newDur = aniDur-0.2;
            obstacle.style.animationDuration = newDur + 's';
        },500);
    }
},10);

function updateScore(score){
    scoreCont.innerHTML="Your Score: " + score
}
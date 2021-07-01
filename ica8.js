let imageName = ['I am Exhuasted','I am Excited','I am trolling','I am laughing','I am disgusted','I am arguing'];
let images = [];
let PicFrameArr= [];
let currentDisplay = 0;
let autoFlag = false;
let timerId = 0;
let showCounter = 0;
let fadeVal = 0;
let timerVal = 0;
let slideStyle = 0;
function PicFrame(name,imageNum)
{
    this.name = name;
    this.viewCount = 0;
    this.image = new Image();
    this.image.src = `../images/ica7_Photos/MEME_${imageNum}.jpg`;
}


function showPic()
{   

    fadeVal = ($('input[type="radio"]:checked').val()/2);
    if(isNaN(fadeVal))
        fadeVal = 300;
    timerVal = (fadeVal*2)+500;
    slideStyle = $('#select').val();

    if(slideStyle == '1')
    {
    if(showCounter == 0)
    {
        $("#mainPhoto").prop("src",PicFrameArr[currentDisplay].image.src);
        $("#mainPhoto").fadeIn(fadeVal);
        $("#Caption").prop("innerHTML",`${PicFrameArr[currentDisplay].name}, View Count = ${PicFrameArr[currentDisplay].viewCount+1}`);
    }
    else{
        $("#mainPhoto").fadeOut(fadeVal, () =>{
        $("#mainPhoto").prop("src",PicFrameArr[currentDisplay].image.src);
        $("#mainPhoto").fadeIn(fadeVal);
        $("#Caption").prop("innerHTML",`${PicFrameArr[currentDisplay].name}, View Count = ${PicFrameArr[currentDisplay].viewCount+1}`);   
        PicFrameArr[currentDisplay].viewCount++; 
        })
    }
    
    }
    else
    {
    if(showCounter == 0)
    {
        $("#mainPhoto").prop("src",PicFrameArr[currentDisplay].image.src);
        $("#mainPhoto").slideDown(fadeVal);
        $("#Caption").prop("innerHTML",`${PicFrameArr[currentDisplay].name}, View Count = ${PicFrameArr[currentDisplay].viewCount+1}, ${currentDisplay}`);
    }
    else
    {
        $("#mainPhoto").slideUp(fadeVal, () =>{
        $("#mainPhoto").prop("src",PicFrameArr[currentDisplay].image.src);
        $("#mainPhoto").slideDown(fadeVal);
        $("#Caption").prop("innerHTML",`${PicFrameArr[currentDisplay].name}, View Count = ${PicFrameArr[currentDisplay].viewCount+1}, ${currentDisplay}`);   
        PicFrameArr[currentDisplay].viewCount++; 
        })
    }
    }
    showCounter++;
}

function fInit()
{
   for(let i = 0; i<6;i++)
   {      
       images[i] = new Image();
       images[i].src = `../images/ica7_Photos/MEME_${i+1}.jpg`;
       PicFrameArr[i] = new PicFrame(imageName[i],i+1);
   }
   showPic();
}

function FNext()
{
    
    currentDisplay++;
    if(currentDisplay>5)
        currentDisplay = 0;
    showPic();
}

function FPrev()
{
    currentDisplay--;
    if(currentDisplay<0)
        currentDisplay = 5;
    showPic();
}

function FAuto()
{
    if(timerId > 0) 
    {
        window.clearInterval(timerId);
        timerId = 0;
        //document.getElementById('playP').src = `../images/ica7_Photos/play.png`;
        $("#playP").prop("src",`../images/ica7_Photos/play.png`);
        autoFlag = false;
    }
    else
    {
        if(!autoFlag)
        {
            timerId = window.setInterval(FNext,timerVal);
            //document.getElementById('playP').src = `../images/ica7_Photos/pause.png`;
            $("#playP").prop("src",`../images/ica7_Photos/pause.png`);
            autoFlag = true;
            PicFrameArr[currentDisplay].viewCount++;  
        }
    }
}

$(document).ready(() => 
{
    fInit();
    $("#next").on("click",FNext);
    $("#previous").on("click",FPrev);
    $("#playP").on("click",FAuto);
})
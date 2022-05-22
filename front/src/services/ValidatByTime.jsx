export default function ValidatByTime(time, timeBefore,callback){
    let timeValid
    console.log("To olhando")
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;

    function actionAfterInactivity(){
        callback()
    }

    function actionBeforeInactivity(){
        
    }

    function resetTimer(){
        clearTimeout(timeValid)
        timeValid = setTimeout(actionAfterInactivity,time)
    }
}
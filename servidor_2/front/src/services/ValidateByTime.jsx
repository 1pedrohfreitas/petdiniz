export default function ValidateByTime(time, timeBefore,callback){
    let timeValid
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
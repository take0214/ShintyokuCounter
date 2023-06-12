let hour = 0;
let minute = 0;
let second = 0;

let interval;

function displayTime(){
    const time = document.getElementById("time");
    time.textContent = ( '00' + hour ).slice( -2 ) 
    + 'h' + ( '00' + minute ).slice( -2 )
    + 'm' + ( '00' + second ).slice( -2 ) + 's';
}

function timer(){
    second = second + 1;
    if(second == 60){
        minute = minute + 1;
        second = second = 0;
    }
    if(minute == 60){
        hour = hour + 1;
        minute = minute = 0;
    }

    displayTime();
}

function startTimer(){
    interval = setInterval(timer, 1000);
    document.getElementById('start').disabled = true;
    document.getElementById('reset').disabled = true;
}

function stopTimer(){
    clearInterval(interval);
    document.getElementById('start').disabled = false;
    document.getElementById('reset').disabled = false;
}

function resetTimer(){
    if (true === confirm("時間をリセットしますか？")){
        hour = 0;
        minute = 0;
        second = 0;
    
        displayTime();
    }
}

function addTable(){
    if (true === confirm("内容を表に反映しますか？")){
        const table = document.getElementById('table');
    
        const tr = document.createElement('tr');
    
        const date = document.createElement('td');
        const today = new Date();
        date.append(`${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`);
    
        const prob = document.createElement('td');
        prob.append(document.getElementById("prob").value);
    
        const content = document.createElement('td');
        content.append(document.getElementById("content").value);
    
        const time = document.createElement('td');
        time.append(( '00' + hour ).slice( -2 ) 
        + 'h' + ( '00' + minute ).slice( -2 )
        + 'm' + ( '00' + second ).slice( -2 ) + 's');
    
        tr.append(date);
        tr.append(prob);
        tr.append(content);
        tr.append(time);
    
        table.append(tr);
    }
}

window.onload = function(){
    displayTime();

    document.getElementById("start").onclick = startTimer;
    document.getElementById("stop").onclick = stopTimer;
    document.getElementById("reset").onclick = resetTimer;
    
    document.getElementById("confirm").onclick = addTable;
};

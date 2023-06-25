let hour = 0;
let minute = 0;
let second = 0;

let interval;

function displayTime() {

    const html = `${('00' + hour).slice(-2)}h${('00' + minute).slice(-2)}m${('00' + second).slice(-2)}s`

    document.getElementById("timeDiv").innerText = html;
}

function timer() {
    second = second + 1;
    if (second == 60) {
        minute = minute + 1;
        second = second = 0;
    }
    if (minute == 60) {
        hour = hour + 1;
        minute = minute = 0;
    }

    displayTime();
}

function startTimer() {
    interval = setInterval(timer, 1000);
    document.getElementById('start').disabled = true;
    document.getElementById('reset').disabled = true;
    document.getElementById('confirm').disabled = true;
}

function stopTimer() {
    clearInterval(interval);
    document.getElementById('start').disabled = false;
    document.getElementById('reset').disabled = false;
    document.getElementById('confirm').disabled = false;
}

function resetTimer() {
    if (true === confirm("時間をリセットしますか？")) {
        hour = 0;
        minute = 0;
        second = 0;

        displayTime();
    }
}

function editTime() {
    hour = parseInt(prompt("時間を入力してください(h)",hour), 10);
    minute = parseInt(prompt("分を入力してください(m)",minute), 10);
    second = parseInt(prompt("秒を入力してください(s)",second), 10);

    displayTime();
}

function displayTable() {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:8080/getJson');

    xhr.onload = () => {
        console.log(xhr.status);
        console.log("success!");
    };
    xhr.onerror = () => {
        console.log(xhr.status);
        console.log("error!");
    };

    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const obj = JSON.parse(xhr.responseText);
            console.log(obj);
            document.getElementById('table').innerHTML =
                `<thead>
            <tr>
                <th>日付</th>
                <th>課題</th>
                <th>作業内容</th>
                <th>作業時間</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                ${createTbody(obj)}
            </tbody>`;
        }
    }
}

function createTbody(obj) {
    let tbody = '';

    let i = 0;
    for (let line of obj) {
        tbody += `
        <tr>
        <td>${line.date}</td>
        <td>${line.prob}</td>
        <td>${line.content}</td>
        <td>${line.time}</td>
        <td><button onclick="deleteTableLine(${i})">削除</td>
        </tr>`

        i++;
    }

    return tbody;
}

function createJson() {

    if (true === confirm("表に反映しますか？")) {
        const today = new Date();
        const obj = {
            date: `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`,
            prob: `${document.getElementById("prob").value}`,
            content: `${document.getElementById("content").value}`,
            time: `${('00' + hour).slice(-2)
                + 'h' + ('00' + minute).slice(-2)
                + 'm' + ('00' + second).slice(-2) + 's'}`
        }

        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'http://localhost:8080/postJson');
        xhr.setRequestHeader('content-type', 'application/json');

        xhr.onload = () => {
            console.log(xhr.status);
            console.log("success!");
        };
        xhr.onerror = () => {
            console.log(xhr.status);
            console.log("error!");
        };

        xhr.send(JSON.stringify(obj));

        displayTable();
    };
}

function deleteTableLine(lineNum) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/deleteTableLine');
    xhr.setRequestHeader('content-type', 'text/plain');

    xhr.onload = () => {
        console.log(xhr.status);
        console.log("success!");
    };
    xhr.onerror = () => {
        console.log(xhr.status);
        console.log("error!");
    };

    xhr.send(lineNum);

    displayTable();
}

window.onload = function () {
    displayTime();
    displayTable();

    document.getElementById("editTime").onclick = editTime;
    document.getElementById("start").onclick = startTimer;
    document.getElementById("stop").onclick = stopTimer;
    document.getElementById("reset").onclick = resetTimer;
    document.getElementById("confirm").onclick = createJson;


};

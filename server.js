const http = require("http");
const fs = require("fs")

function readFile(file, response) {
  fs.readFile(`./${file}`, (errors, data) => {
    if (errors) {
      console.log("Error reading the file...");
    }
    response.end(data);
  });
}

const server = http.createServer((request, response) => {

  console.log(request.url);

  if (request.url === "/" && request.method === "GET") {
    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    readFile("shintyoku.html", response);

  } else if (request.url === "/shintyoku.js" && request.method === "GET") {
    response.writeHead(200, {
      "Content-Type": "text/plain"
    });
    readFile("shintyoku.js", response);

  } else if (request.url === "/shintyoku.css" && request.method === "GET") {
    response.writeHead(200, {
      "Content-Type": "text/css"
    });
    readFile("shintyoku.css", response);

  } else if (request.url === "/postJson" && request.method === "POST") {

    request.on('data', function (chunk) {
      let data = '';
      data += chunk;
      console.log(data);
      
      let obj;
      if (fs.existsSync("./jsonFile.json")) {
        obj = JSON.parse(fs.readFileSync('./jsonFile.json', 'utf8'));
        obj.push(JSON.parse(data));
      }
      else {
        obj = [JSON.parse(data)];
      }

      fs.writeFileSync('./jsonFile.json', JSON.stringify(obj));
    })

    response.writeHead(200, {
      "Content-Type": "text/plain"
    });
    response.end();

  } else if (request.url === "/getJson" && request.method === "GET") {
    response.writeHead(200, {
      "Content-Type": "text/plain"
    });
    readFile("jsonFile.json", response);

  } else if (request.url === "/deleteTableLine" && request.method === "POST") {
    request.on('data', function (chunk) {
      let data = '';
      data += chunk;
      console.log(data);

      let obj = JSON.parse(fs.readFileSync('./jsonFile.json', 'utf8'));
      obj.splice( data, 1 );

      fs.writeFileSync('./jsonFile.json', JSON.stringify(obj));

      response.writeHead(200, {
        "Content-Type": "text/plain"
      });
      response.end();
    })

  } else {
    response.writeHead(404, {
      "Content-Type": "text/html"
    });
    response.end(`Not found : ${request.url}`);
    console.log();
  }
});

server.listen(8080);
console.log("server listen...");

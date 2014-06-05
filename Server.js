console.log("Server logs: [this session]")
process.stdin.resume()
process.stdin.setEncoding("utf8");
var url = require("url"),
    fs = require("fs"),
    mime = require("mime"),
    http = require("http"),
    path = require("path");
console.log("js>"), process.stdin.on("data", function (text) {
    console.log("->" + eval(text)), console.log("js>")
});
var server = http.createServer(function (request, response) {
    var path = __dirname + "/public_html" + request.url;
    fs.existsSync(path) ? (fs.lstatSync(path).isDirectory() && (path += "index.html"), response.writeHead(200, {
        "Content-Type": mime.lookup(path)
    }), fs.readFile(path, function (e, r) {
        if (e) throw e;
        response.end(r)
    })) : (response.writeHead(404, {
        "Content-Type": "text/plain"
    }), response.end("Cannot GET " + request.url + "."))
});
try {
    server.listen(80, "localhost"), console.log("[LOG] Server start")
} catch (e) {
    console.log("[ERROR] Server cound not start"), server.close(), process.close()
}

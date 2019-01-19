//http module is present in node js
const http = require('http');

//fs= file system module fs is abuild in node module.
// fs gives node access to THIS computers file system
const fs = require('fs');

//http module comes with with a create server method
//it takes 1 arg
//1 arg is a callback function which takes 2 arg req,res.

const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url === '/') {
        //the user wants homepage as the req.url has '/' as its value
        // res object in our way to respond to the requester
        // response has three layers
        // 1.start line - status code node take cares of it
        // 2.heders - we have to specify the header
        // 3.body - provide html, image , mp4 , media, json etc
        // writehead take two arg , 1. status code 2. an object for the mimetype
        res.writeHead(200, { 'content-type': 'text/html' });
        //res.write is the body of the response.
        // res.write('<h1>This is the Homepage...!!</h1>');
        const homePageHTML = fs.readFileSync('node.html');
        // console.log(homePageHTML);
        res.write(homePageHTML);
        //closing the connection
        res.end();
    }
    else if(req.url === '/node.png'){
        res.writeHead(200, { 'content-type': 'image/png' });
        //res.write is the body of the response.
        const image = fs.readFileSync('node.png');
        res.write(image);
        //closing the connection
        res.end();
    }
    else if(req.url==='/styles.css'){
        res.writeHead(200, { 'content-type': 'text/css' });
        //res.write is the body of the response.
        const styles = fs.readFileSync('styles.css');
        res.write(styles);
        //closing the connection
        res.end();
    }
    else{
        res.writeHead(404, { 'content-type': 'text/html' });
        //res.write is the body of the response.
        res.write('<h4>Sorry this page is not available</h4>');
        //closing the connection
        res.end();
    }

});

// createServer returns an object with a listen method
// listen takes 1 arg:
// 1. port to listen for http traffic 

server.listen(3000);
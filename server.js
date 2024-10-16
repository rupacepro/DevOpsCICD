const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 8080;
const directory = __dirname; // Serve files from the current directory
app.use(express.static(directory));

app.get('*', (req, res) => {
    let filePath = path.join(directory, req.url === '/' ? 'index.html' : req.url);

    fs.stat(filePath, (err, stats) =>{
        if(err || !stats.isFile()){
            res.status(404).send('<html><body><h1 style="color:red;">The page you requested is not available</h1></body></html>');
        }
        else{
            fs.readFile(filePath, (err, data) =>{
                if(err){
                    res.status(500).send('<html><body><h1 style="color:red;">Internal Server Error</h1></body></html>');
                }
                else{
                    res.status(200).send(data);
                }
            })
        }
    })
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}/`);
});

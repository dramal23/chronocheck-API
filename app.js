const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sqlite = require('sqlite3').verbose();
const url = require('url');
let sql;
const db = new sqlite.Database('./watches.db', sqlite.OPEN_READWRITE, (err)=>
{
    if(err) return console.error()
});

app.use(bodyParser.json);

app.get("/watches",(req,res)=> {
    sql = "SELECT * FROM watches";
    try {
        const queryObject = url.parse(req.url, true).query // query parameters
        if(queryObject.field && queryObject.type) sql += ` WHERE ${queryObject.field} LIKE '%${queryObject.type}%'`
        db.all(sql,[],(err,rows)=>{
            if(err) return res.json({status : 300, success: false, error: err})
            if(rows.length<1) return res.json({status : 300, success: false, error: "No match"});
            return res.json({status : 200, data : rows, success : true});
        });
    } catch (error) {
        return res.json({
            status : 400, success : false,
        });
    }
});

app.get('/', (req, res) => {
    res.json({msg: 'Hello world!!!'});
});

const PORT = 3000;
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})
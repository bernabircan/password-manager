const { response } = require("express");
const express = require("express");
const app =express();
const mysql = require("mysql");
const cors=require('cors');
const port=3001;

app.use(cors());
app.use(express.json());

const db =mysql.createConnection({
    user:'root',
    host: 'localhost',
    password: '123',
    database: 'passwordmanager',

});
//database bağlantısını kontrol için
db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.code);
      return;
    }
});

app.get("/showpasswords",(req,res)=>{
    db.query("SELECT * FROM passwords", (err,result)=>{
        if(err) {
        console.log("Show password err");
        }else{ 
            res.send(result);
        }
    });
});

app.post("/addpassword",(req,res)=>{
    const{password,lab,name,address}= req.body;
    db.query(
        "INSERT INTO passwords (lab,name,address,password) VALUES (?,?,?,?)",
        [lab,name,address,password],
        (err,result)=>{
            if(err){
                console.log("Add err",err);
            }else{
                
                res.send("Success");
            }
        }
    );
});

app.delete("/deletepassword/:id",(req,res)=>{
    const id = req.params.id;
    db.query(
        "DELETE FROM passwords WHERE id=?",
        [id],
        (err,result)=>{
            if(err){
                console.log("Delete err",err);
            }else{
                res.send("Success");

            }
        }
    );
});

app.put("/updatepassword/:id",(req,res)=>{
    const{password,lab,name,address}= req.body;
    const id = req.params.id;
    db.query(
        "UPDATE passwords SET lab=?,name=?,address=?,password=? WHERE id=?",
        [lab,name,address,password,id],
        (err,result)=>{
            if(err){
                console.log("Update err",err);
            }else{
                res.send("Success");
            }
        }
    );
});


app.get("/search/:searchText",(req,res)=>{
    const searchText= req.params.searchText;
    const text= '' + searchText + '%';
    db.query(
       "SELECT * FROM passwords  WHERE lab LIKE ? OR name LIKE ?",
       [text,text],
       (err,result)=>{
           if(err){
               console.log("Search err",err);
           }else{
               res.send(result);
            }
        }
    );
});


app.listen(port,()=>{
    console.log("Succesfull")
});

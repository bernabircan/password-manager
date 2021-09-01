const { response } = require("express");
const express = require("express");
const app =express();
const mysql = require("mysql");
const cors=require('cors');
const port=3001;

const{encrypt,decrypt} = require("./EncryptionHandler");
//bu filedeki encrypt ve decrypt metotlarına ulaşmamızı saglıyor

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
  
    //console.log('connected as id ' + db.threadId);
  });




app.get("/showpasswords",(req,res)=>{
    
    db.query("SELECT * FROM passwords", (err,result)=>{
        if(err) {
        //console.log(err);
        }else{ 
            res.send(result);
        }
    });
     

});


app.post("/decryptpassword",(req,res)=>{
    
    res.send(decrypt(req.body));
    
});


app.post("/addpassword",(req,res)=>{
    
    const{password,lab,name,address}= req.body;
    
    
    db.query(
        "INSERT INTO passwords (lab,name,address,password) VALUES (?,?,?,?)",
        
        [lab,name,address,password],
        (err,result)=>{
            if(err){
                
                console.log("err");
            }else{
                
                console.log(lab);
                res.send("Success");

            }
        }
    );
});

app.delete("/deletepassword/:id",(req,res)=>{
    //console.log("deletepas");
    const id = req.params.id;
    //console.log("request", req.params.id);
    
    //console.log("id",id);
    
    db.query(
        "DELETE FROM passwords WHERE id=?",
        
        [id],
        (err,result)=>{
            if(err){
                
                console.log("err");
            }else{
               console.log(result);
                res.send("Success");

            }
        }
    );
});

app.put("/updatepassword/:id",(req,res)=>{
     //console.log("update");
     //const{password}= req.body;
     //const hashedPassword= encrypt(password);
     const{password,lab,name,address}= req.body;
     //const hashedPassword= encrypt(password);
     const id = req.params.id;
     
   
    
    
   db.query(
        "UPDATE passwords SET lab=?,name=?,address=?,password=? WHERE id=?",
        
        [lab,name,address,password,id],
        (err,result)=>{
            if(err){
                
                console.log("err");
            }else{
                console.log(result);
                res.send("Success");

            }
        }
    );
});


app.get("/search/:searchText",(req,res)=>{
    const searchText= req.params.searchText;
    
    
    const text= '' + searchText + '%';
    //SELECT * FROM passwords WHERE lab LIKE 'a%';
   
    db.query(
       "SELECT * FROM passwords  WHERE lab LIKE ? OR name LIKE ?",
       
       [text,text],
       (err,result)=>{
           if(err){
               
               console.log("err");
           }else{
               console.log('searchText123: ', text);
               
               console.log(result);
               res.send(result);
              

           }
       }
   );
     
   
});


app.listen(port,()=>{
    console.log("Succesfull")
});

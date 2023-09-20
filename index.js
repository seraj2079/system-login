const express = require("express");
const mysql = require("mysql");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const PORT=8081;

const db =mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database:"signup"
})
   
console.log("connection success",db);
// =================report=================
app.get('/home',(req,res)=>{
    const sql ="SELECT * FROM login";
    db.query(sql, (err, result)=>{
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

// ======================SignUp=========================

app.post('/signup',(req,res)=>{
    const sql ="INSERT INTO login (`name`,`email`,`password`) VALUES(?)";
    const values =[
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values],(err,data)=>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})

// =================Login=========================

app.post('/login',(req,res)=>{
    const sql ="SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    
    db.query(sql, [req.body.email,req.body.password],(err,data)=>{
        if(err){
            return res.json("Error");
        }
        if(data.length > 0) {
            return res.json("Success");
        }
        else{
            return res.json("Fail");
        }
    })
})

// ===================View====================

app.get('/view/:id',(req,res)=>{
    const sql ="SELECT * FROM login WHERE id =?";
    const id = req.params.id;
    db.query(sql,[id], (err, result)=>{
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

// =================Update=======================

app.put('/update/:id',(req,res)=>{
    const sql='UPDATE login SET `name`=?,`email`=?,`password`=? WHERE id=?';
    const id=req.params.id;
    db.query(sql,[req.body.name, req.body.email, req.body.password, id],(err,result)=>{
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})


// ====================Delete============================

app.delete('/delete/:id',(req,res)=>{
    const sql = "DELETE FROM login WHERE id=?";
    const id=req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.listen(PORT,()=>{
    console.log("listening"+PORT);
})

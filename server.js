const express=require("express");
const cors=require("cors")
const mysql=require("mysql")

const app=express()
app.use(express.json())
app.use(cors())

const app1=express()
app1.use(express.json())
app1.use(cors())

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"lms"
})

app.get("/",(req,res)=>{
    const sql="SELECT * FROM signup"
    db.query(sql,(data,err)=>{
        if(data) return res.json(data);
        else return res.json(err);
    })
})


app1.post('/create',(req,res)=>{
    const sql="INSERT INTO books(`bname`,`author`,`pdate`,`subject`,`rating`) VALUES (?)";
    const values=[
        req.body.bookn,
        req.body.author,
        req.body.pdate,
        req.body.genre,
        req.body.rating
    ]
    db.query(sql,[values],(err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.post('/login',(req,res)=>{
    const sql="INSERT INTO signup(`username`,`pw`) VALUES (?)";
    const values=[
        req.body.email,
        req.body.password,
    ]
    db.query(sql,[values],(err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app1.get("/",(req,res)=>{
    const sql="SELECT * FROM books"
    db.query(sql,(data,err)=>{
        if(data) return res.json(data);
        else return res.json(err);
    })
})

app1.delete('/delete/:id', (req, res) => {
    const bookId = req.params.id;

    const sql = "DELETE FROM books WHERE bookid = ?";
    db.query(sql, [bookId], (err, data) => {
        if (err) {
            console.error('Error deleting record:', err);
            return res.json('Error');
        } else {
            return res.json(data);
        }
    });
});

app1.listen(8080,()=>{
    console.log("listening 8080")
})

app.listen(8081,()=>{
    console.log("listening 8081");
})
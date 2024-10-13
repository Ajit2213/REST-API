const express=require("express");
const app=express();
const port=8080;

//unique id generator
const { v4: uuidv4 } = require('uuid');
const path=require("path");
//templete 
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));

//express reading unlearn data
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//styling in web page
app.use(express.static(path.join(__dirname,"public")));

//for delete patch put using in html for override 
var methodOverride = require('method-override')

app.use(methodOverride('_method'))
let data=[
    {
        id:uuidv4(),
        username:"aman",
        content:"hey pritam"

    },
    {
        id:uuidv4(),
        username:"suman",
        content:"jai hind"

    },
    {
        id:uuidv4(),
        username:"rajsthani",
        content:"slowly"

    }

]


app.listen(port,()=>{
    console.log("its listing");
})

app.get("/post",(req,res)=>{

    res.render("main.ejs",{data});
})

//view single data
app.get("/post/new",(req,res)=>{
    res.render("new.ejs")
})

app.post("/post",(req,res)=>{
    
    let {username,content}=req.body;
    let id=uuidv4();
   data.push({id,username,content});
   res.redirect("/post")
   
})

app.get("/post/:id",(req,res)=>{
    
    let {id}=req.params;
    let post=data.find((p)=>p.id===id);
   
    res.render("unique.ejs",{post})
})

//edit
app.get("/post/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=data.find((p)=>p.id===id);
    res.render("edit.ejs",{post});
})


//patch
app.patch("/post/:id",(req,res)=>{
let{id}=req.params;
console.log(id);
let newcontent=req.body.content;
let post=data.find((p)=>p.id===id);
post.content=newcontent;
res.redirect("/post")
})




//delete
app.delete("/post/:id/del",(req,res)=>{
    let{id}=req.params;
     data=data.filter((p)=>p.id!==id);
   
   res.redirect("/post");
})
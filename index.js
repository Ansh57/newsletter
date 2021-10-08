
const express=require('express');
const bodyParser = require('body-parser');
const request=require("request");
const https=require("https");
const { url } = require('inspector');
const { STATUS_CODES } = require('http');
const { response } = require('express');

const app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/signup.html');
})
app.post('/',(req,res)=>{
    const firstName=req.body.first;
    const lastName=req.body.last;
    const email=req.body.email;


const data = {
members:[
    {
        email_address:email,
        status:"subscribed",
        merge_fields:{
            FNAME:firstName,
            LNAME:lastName
        }
    }
]
};
const jsonData=JSON.stringify(data);

const url="https://us17.api.mailchimp.com/3.0/lists/b0257fcfb9";

const options={
    method:"POST",
    auth:"ansh01:e59f5c44d68aec74b8a792b6dd8358ac-us17"
};

const request=https.request(url,options, (response)=>{
  //  console.log(response.statusCode);
    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    
    }
response.on("data",(data)=>{
  // console.log(JSON.parse(data));
});
});

request.write(jsonData);

request.end();
});
app.post("/failure",(req,res)=>{
res.redirect("/")
});
app.listen(process.env.PORT || 3000,()=>{
console.log("server started");
});

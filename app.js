const express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

const app = express();
app.set('view engine', 'pug')

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/',function(req, res){
     res.sendFile(__dirname+"/signup.html")
    });

app.post("/",function(req,res){
   var fname=req.body.fname;
   var lname=req.body.lname;
   var email=req.body.email

var data={
    members: [
        {email_address: email,
        status:"subscribed",
        merge_fields:{
            FNAME: fname,
            LNAME: lname
        }
     }
    ]
}
    var jsonData=JSON.stringify(data);

   var options = {
       url:'https://us4.api.mailchimp.com/3.0/lists/d12bda5c1d',
       method:"POST",
       headers: {
           "Authorization":"rigel1 28712355893087537b2bb7a726aec18f-us4"
       },
       body: jsonData
   }
   request(options, function(error, response, body){
    if(error){
        res.sendFile(__dirname + "/failure.html");
    }else{
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/success.html")
        }
    }
   });
});

app.post("/failure",function(req,res){
   res.redirect("/");
});

app.listen(process.env.PORT || 3000,function (){
     console.log(`Example app listening on port 3000`)
    })

    //API KEY //
    /// 28712355893087537b2bb7a726aec18f-us4 ///

    //LIST ID //
    ///   d12bda5c1d   ///
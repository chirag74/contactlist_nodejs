const express = require('express');
const path=require('path');
const port= 8000;

const db=require('./config/mongoose');

const Contact=require('./models/contact');

const app=express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));





var contactList=[
    {
        name:"chirag",
        phone:"7988093838"
    },
    {
        name:"gautam",
        phone:"9896704299"
    },
    {
        name:"dev",
        phone:"7015464588"
    }
]



app.get('/', function(req,res)
{

    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching contact');
            return;
        }

    return res.render('home', {title: "CHIRAG LIST", contact_list: contacts
    });    
 });
});

app.get('/practice',function(req,res)
{
    return res.render('practice', {title:"PRACTICE LIST"});
});

app.post('/create-contact',function(req,res)
{
  //  contactList.push({
        //name:req.body.name,
      //  phone: req.body.phone
    //});
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    }, function(err,newContact)
    {
        if(err){
            console.log('error in creating a contact');
            return;

        }
        console.log('******',newContact);
       return res.redirect('back')
    });

  //  return res.redirect('/');
  //console.log(req.body.name)
  //contactList.push(req.body);
});

app.get('/delete-contact',function(req,res){
    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object');
            return;
        }
          
    return res.redirect('back');
    });

});




app.listen(port, function(err)
{
if(err){
    console.log('error on running server',err);
}
console.log('yup!this is running on port:',port);
});
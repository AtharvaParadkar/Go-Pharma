const express =require("express");
const app=express();
const path=require("path");
const mongoose = require('mongoose');
const connection = require('./db/cons');
const hbs=require("hbs");
app.use('/assets',express.static('assets'))
const port=process.env.PORT || 3000;
require("./db/cons");
app.use(express.json());


/*schemas*/
const Register =require("./models/registers");
const covidBooking =require("./models/covidBooking");
const orders=require("./models/orders");
const contactReq=require("./models/contact");
const packBooking=require("./models/packBooking");
const testBooking=require("./models/test");
/*schemas*/

connection();

const static_path=path.join(__dirname,"../public");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));


/*Render Index*/
app.get("/",(req,res)=>{
	res.render("index");
});

/*Render Registration*/
app.get("/register",(req,res)=>{
	res.render("register");
});

/*Render Login Page*/

app.get("/login",(req,res)=>{
	res.render("login");
});

/*Render Covid Booking*/
app.get("/covid",(req,res)=>{
	res.render("covid");
	
});

app.get("/order",(req,res)=>{
	res.render("order");
	
});

app.get("/contact",(req,res)=>{
	res.render("contactus");
	
});

app.get("/package",(req,res)=>{
	res.render("package");
	
});

app.get("/test",(req,res)=>{
	res.render("test");
	
});


/*Get Data from Registration and store in DB*/

app.post("/register",async (req,res)=>{
	try{

		const password=req.body.password;
		const confirmpassword=req.body.confirmpassword;

		if(password==confirmpassword){
				const userRegister=new Register({
					username : req.body.username,
					email : req.body.email,
					password : password,
					confirmpassword : confirmpassword
				});
				console.log("Registration Success")
				const registered=await userRegister.save();
				res.redirect('./public/index.html');
				res.json({status: 'ok', data: "success"});

		}else{
			res.send("Password Not Matched");
		}

	}catch(err){
		res.status(400).send("Password Not Matched");
	}
})


/*covid booking*/


app.post("/covid",async (req,res)=>{

	try{

		const covidRegister=new covidBooking({
					firstname : req.body.firstname,
					lastname : req.body.lastname,
					gender : req.body.gender,
					email : req.body.email,
					mobile :req.body.mobile ,
					city : req.body.city
				});
				console.log("Covid Test Registered")
				const covidRegistered=await covidRegister.save();
				res.sendFile('./public/covidRegis.html', {root: __dirname });
		}catch(err){
		console.log(err);
		res.status(400).send(err);
	}
})




app.post("/test",async (req,res)=>{
	try{

		const testRegister=new testBooking({
					name : req.body.name,
					Blood : req.body.Blood,
					Tests : req.body.Tests,
					slot:req.body.slot,
					email : req.body.email,
					mobile :req.body.mobile ,
					city : req.body.city
				});
				console.log("Test Booked")
				const testRegisterd=await testRegister.save();
				res.sendFile('./public/testbooked.html' , {root: __dirname});
		}catch(err){
		res.status(400).send(err);
	}
})
  
app.post("/package",async (req,res)=>{
	try{

		const packRegister=new packBooking({
					firstname : req.body.firstname,
					lastname : req.body.lastname,
					packages : req.body.packages,
					plan:req.body.plan,
					email : req.body.email,
					mobile :req.body.mobile ,
					city : req.body.city
				});
				console.log("Package Registered")
				const packRegisterd=await packRegister.save();
				res.sendFile('./public/packageConfirm.html');
		}catch(err){
		res.status(400).send(err);
	}
})


app.post("/order",async (req,res)=>{
	try{

		const orderRegister=new orders({
					firstname : req.body.firstname,
					lastname : req.body.lastname,
					email : req.body.email,
					address : req.body.address,
					mobile :req.body.mobile ,
					state : req.body.state,
					pincode : req.body.pincode,
					shipping : req.body.shipping,
					paymentMethod : req.body.paymentMethod,
					cardName : req.body.cardName,
					cardNum :req.body.cardNum ,
					validUpto : req.body.validUpto,
					cvv : req.body.cvv,
				});
				console.log("New Order")
				const orderRegisterd=await orderRegister.save();
				res.sendFile('./public/orderconfirm.html' , {root: __dirname});
		}catch(err){
		res.status(400).send(err);
	}
})


/*Login Authentication*/

app.post("/login",async (req,res)=>{
	try{
		const username=req.body.username;
		const password=req.body.password;

		const user=await Register.findOne({username:username});
				if(user.password==password){
					res.sendFile("./public/index.html");
				}else{
					res.send("Incorrect Login Details");
				}

	}catch(err){
		res.status(400).send("Invalid Login");
	}
});

app.post("/contact",async (req,res)=>{
	try{
		const contactRequest=new contactReq({
				fullname:req.body.fullname,
				state:req.body.state,
				subject:req.body.subject,
				mobile:req.body.mobile,
		})
		console.log("New Contact Request");
		const contactRequests=await contactRequest.save();
		res.sendFile('./public/confirmfeed.html' , {root: __dirname});

	}catch(err){
		res.status(201).send("Unable to Process Details at this Moment");
	}
})

app.listen(4000, () => console.log('server running on port 4000'));

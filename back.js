var express = require("express")
var bodyParser = require("body-parser")
var mySql = require("mysql")


var con = mySql.createConnection({
	host:"localhost",
	user:"root",
	password:"nothing",
	database:"ponovo_radi_bioskop"
})

con.connect(function(err){
	if(err) throw err
	console.log("connected to DB")
})



var app = express()
var port = 3000

var users = [
	{
		username:"rade",
		password: "123",
		userLevel:1,
		fullName: "rade guberinic"
	}
]

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended:true
}))


app.use((req,res,next) => {
	res.append("Access-Control-Allow-Origin", ["*"])
	res.append("Access-control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE")
	res.append("Access-Control-Allow-Headers", "Content-Type")
	next()
})


app.post("/login",function(req,res){
	let username = req.body.username
	let password = req.body.password
	let date = req.body.date
	console.log(date)
	if(username == undefined || password == undefined){
		console.log("something is missing")
	}
	con.query("SELECT kor_username,kor_lvl,kor_id FROM korisnici WHERE kor_username=? AND kor_password=?",[username,password],function(err,result,field){
		if(result.length>0){
			if(err) throw err
				console.log(result)
				res.json({
					result:"OK",
					data:result
				})
			 con.query("INSERT INTO activity_log(fk_kor_id,activity,act_date) VALUES(?,?,?)",[result[0].kor_id,"has logged in",date])	
		}
		if(result.length==0){
			res.json({
				result:"Invalid credentials"
			})
			return
		}
	})

})


app.post("/logOut",function(req,res){
	let korId = req.body.korId
	let date = req.body.date
	console.log(korId,date)

	con.query("INSERT INTO activity_log(fk_kor_id,activity,act_date) VALUES(?,?,?)",[korId,"has logged out",date])
})


app.post("/newMember",function(req,res){
	var username = req.body.username
	var email = req.body.email
	var password = req.body.password
	var currentNum = null
	
	
	con.query("SELECT * FROM korisnici WHERE kor_username=? OR kor_email=?",[username,email], function(err,result,field){
		console.log(result)
		if(result.length > 0){
			res.json({
				result:"Username or Email already taken"
			})
		}
		else{
			con.query("SELECT * from korisnici", function(err,result,field){
				currentNum = result.length
				console.log(currentNum)
			})
	
			con.query("INSERT INTO korisnici(kor_username,kor_email,kor_password,kor_lvl) VALUES(?, ?, ?, ?) ",[username,email,password,2],function(err,result,field){
				if(err) throw err
    			console.log("1 user inserted")

			})
	
			con.query("SELECT * from korisnici", function(err,result,field){
				console.log("result length is",result.length)
				console.log("currentNum",currentNum)
				if(currentNum < result.length){
					res.json({
						result:"OK"
					})
				}
			})
		}
	})
	
 })


app.post("/comment",function(req,res){
	let username = req.body.username
	let userId = req.body.userId
	let comment = req.body.comment
	let date = req.body.date

	con.query("INSERT INTO komentari(kor_username,kor_id,komentar) VALUES(?, ?, ?) ",[username,userId,comment],function(err,result,field){
		
	})

	con.query("INSERT INTO activity_log(fk_kor_id,activity,act_date) VALUES(?,?,?)",[userId,"has posted a comment",date],function(err,result,field){

	})
	
	if(username||userId||comment == undefined){
		con.query("SELECT * FROM komentari", function(err,result,field){

			res.json({
				result:result
			})
		})
	}
	
})

app.post("/commentRemove",function(req,res){
	let kom_id = req.body.kom_id
	console.log(kom_id)

	con.query("DELETE FROM komentari WHERE kom_id = ?", [kom_id],function(err,result,field){
		if(err){
			throw err
		}
		res.json({
			result:"deleted!"
		})
	})
})

app.post("/tickets",function(req, res){

	let korId = req.body.korId;
	
	if (!korId) {
		res.status(400).send("Oh uh, something went wrong");
		return;
	}
	
	let seatIds = req.body.sedista
	let movieId = req.body.movieId
	let date = req.body.datum
	console.log(date)
	
	for (const seat of seatIds) {
		con.query("INSERT INTO prodata_sedista(kor_id, sed_id, prs_datum, film_id) VALUES(?, ?, ?, ?)", [korId, seat.id, seat.date, movieId], function(err, result, field) {
			console.error(err);
		});
	}

	 con.query("INSERT INTO activity_log(fk_kor_id,activity,act_date) VALUES(?,?,?)",[korId,"has bought ticket(s)",date])

	
	res.status(200).send("Yay");
				  
})

app.get("/tickets",function(req,res){
	let id = req.query.id

	if(!id) {
		con.query("SELECT * FROM prodata_sedista",function(err,result,field){
			res.json({
				result:result
			})
		})
		return
	}

	console.log(id)
	con.query("SELECT * FROM prodata_sedista WHERE film_id=?",id,function(err,result,field){
		res.json({
			result:result
		})
	})
})



app.post("/ticketsRemove",function(req, res){
	let prs_id = req.body.brojKarte
	console.log(prs_id)

	con.query("DELETE FROM prodata_sedista WHERE prs_id=?",[prs_id],function(err,result,field){
		if(err) throw err
			
		res.json({
			result:"obrisan!!"
		})
	})
})


app.get("/activity",function(req,res){
	con.query("SELECT * FROM activity_log",function(err,result,field){
		if(err) throw err
		
		res.json({
			result:result
		})
	})
})


app.post("/removeActivity",function(req,res){
	let actId = req.body.act_id
	con.query("DELETE FROM activity_log WHERE act_id = ?",[actId],function(err,result,field){
		if(err) throw err
		
		res.json({
			result:"obrisan!!"
		})
	})
})




app.listen(port,function(){
	console.log("aplikacija radi na portu "+port)
})


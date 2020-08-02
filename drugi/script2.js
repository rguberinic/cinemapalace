var container = document.querySelector(".container")
var seats = document.querySelectorAll(".row .seat:not(.occupied)")
var count = document.getElementById("count")
var total = document.getElementById("total")
var movieSelect = document.getElementById("movies")
var currentChosenSeats = []


function Sediste(id,korId,date,movieId){
	this.id = id
	this.korId = korId
	this.date = date
	this.movieId = movieId
}

function updateSelectedCount() {
	var selectedSeats = document.querySelectorAll(".row .seat.selected")
	var selectedSeatsCount = selectedSeats.length
	count.innerHTML = selectedSeatsCount
	total.innerHTML = selectedSeatsCount * movieSelect.value
}


movieSelect.addEventListener("change", (e) => {
	ticketPrice = e.target.value
	updateSelectedCount()
})
							 
							 

container.addEventListener("click", (e) => {
	if(e.target.classList.contains("seat") && 
	  !e.target.classList.contains("occupied")) {
		e.target.classList.toggle("selected")
		
		
		
		let korisnik = JSON.parse(localStorage.getItem("logged-user"))
		let date = new Date()
		let year = date.getFullYear().toString()
		let month = date.getMonth().toString()
		let day = date.getDay().toString()
		let hours = date.getHours().toString()
		let minutes = date.getMinutes().toString()
		let seconds = date.getSeconds().toString()
		
		let seatId = e.target.id
		let korId = korisnik[0].kor_id
		let dateTimeFormat = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
		let movieId = movieSelect.options[movieSelect.selectedIndex].id
		
		let probnaKarta = new Sediste(seatId,korId,dateTimeFormat,movieId)
		currentChosenSeats.push(probnaKarta)
		console.log(currentChosenSeats)
		
		
		//console.log(korId)
		//console.log(e.target.id)
		console.log(movieSelect.options[movieSelect.selectedIndex].id)
		
		updateSelectedCount()
	}
})




var container = document.querySelector(".container")
var seats = document.querySelectorAll(".row .seat:not(.occupied)")
var count = document.getElementById("count")
var total = document.getElementById("total")
var movieSelect = document.getElementById("movies")

var ticketPrice = +movieSelect.value

function updateSelectedCount() {
	var selectedSeats = document.querySelectorAll(".row .seat.selected")
	var selectedSeatsCount = selectedSeats.length
	count.innerHTML = selectedSeatsCount
	total.innerHTML = selectedSeatsCount * ticketPrice
}


movieSelect.addEventListener("change", (e) => {
	ticketPrice = e.target.value
	updateSelectedCount()
})
							 
							 

container.addEventListener("click", (e) => {
	if(e.target.classList.contains("seat") && 
	  !e.target.classList.contains("occupied")) {
		e.target.classList.toggle("selected")
		updateSelectedCount()
	}
})

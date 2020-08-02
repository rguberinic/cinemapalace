

//Ovo je sto se tice WELCOME pozdrava
const welcome = document.getElementById("welcome")
const introContainer = document.getElementById("intro-container")
const nav = document.getElementById("nav")
const carousel = document.getElementById("carousel")
const ticketLink = document.querySelectorAll(".ticket")
const sideLeft = document.getElementById("side-left")
const bottom = document.getElementById("bottom")
const foot = document.getElementById("foot")
const logo = document.getElementById("logo")
const login = document.getElementById("login")
const member = document.getElementById("member")
const logsign = document.getElementById("logsign")
const logout = document.getElementById("logout")
const errormsg1 = document.getElementById("errormsg1")
const smallUsername = document.getElementById("smallUsername")
const smallEmail = document.getElementById("smallEmail")
const smallPass = document.getElementById("smallPass")
const smallPass2 = document.getElementById("smallPass2")
const newPassword = document.getElementById("newPassword")
const newPassword2 = document.getElementById("newPassword2")
const comments = document.getElementById("comments")
const commentContainer = document.getElementById("comment_container")
const tickets = document.getElementById("tickets")

const container = document.querySelector(".container")
const seats = document.querySelectorAll(".row .seat:not(.occupied)")
const count = document.getElementById("count")
const total = document.getElementById("total")
const movieSelect = document.getElementById("movies")
const btnBuyTickets = document.getElementById("buyTickets")
const adminPanel = document.getElementById("admin-panel")
const adminPanelContainer = document.getElementById("admin-panel-container")
let currentChosenSeats = [];
let dataArr = []
let ticketsFromDB = []
let activitiesArr = []
let menjam = false



// localStorage.removeItem("current")


setTimeout(() => {
    if (welcome.classList.contains("zoomOut") || welcome.classList.contains("hidden")) {
        return
    }
    welcome.className = "welcome flicker"
}, 3200)


function stopWelcomeFlicker() {
    if (welcome.classList.contains("zoomOut") || welcome.classList.contains("hidden")) {
        return
    }
    welcome.classList.remove("animated", "flicker", "infinite")
}

function continueWelcomeFlicker() {
    if (welcome.classList.contains("zoomOut") || welcome.classList.contains("hidden")) {
        return
    }
    welcome.classList.add("animated", "flicker", "infinite")
}

function zoomOut() {
    menjam = true
    welcome.classList.remove("flicker")
    welcome.classList.add("animated", "zoomOut")
    setTimeout(() => {
        welcome.className = "hidden"
    }, 700)
    introContainer.classList.add("black")
    setTimeout(() => {
        nav.className = "nav animated slideInDown slow"
        sideLeft.className = "side-left animated bounceInLeft slower"
        if (!logout.classList.contains("hidden")) {
            comments.className = "comments animated bounceInRight slower"
        }
        $(document).ready(() => {
            carousel.classList.add("carousel", "animated", "slideInUp", "slow")
            $(".carousel").slick({
                autoplay: true,
                autoplaySpeed: 1000,
                speed: 1000,
                prevArrow: false,
                nextArrow: false
            })

        })
    }, 2000)


    setTimeout(() => {
        foot.className = "foot animated slideInUp fast"
        if(localStorage.getItem("logged-user")){
            if(JSON.parse(localStorage.getItem("logged-user"))[0].kor_lvl == 1) {
                adminPanel.classList.remove("hidden")
            }
        }
            
    }, 3150)

    setTimeout(() => {
        menjam = false
    }, 4000)

}


function clearCanvasForLogin() {
    if (menjam) {
        return
    }
    carousel.classList.add("invisible")
    nav.classList.add("invisible")
    sideLeft.classList.add("invisible")
    foot.classList.add("invisible")
    login.className = "login"

}

function clearCanvasForAMember() {
    if (menjam) {
        return
    }
    carousel.classList.add("invisible")
    nav.classList.add("invisible")
    sideLeft.classList.add("invisible")
    foot.classList.add("invisible")
    member.className = "member"
}

function clearCanvasForMovies() {
    if (menjam) {
        return
    }

    carousel.classList.add("invisible")
    sideLeft.classList.add("invisible")
    foot.classList.add("invisible")

}

function buyTickets() {
    if (!loggedUser) {
        return 
    }
    tickets.className = "tickets"
}



function returnMain() {
    carousel.classList.remove("invisible")
    nav.classList.remove("invisible")
    sideLeft.classList.remove("invisible")
    foot.classList.remove("invisible")
    login.classList.add("hidden")
    member.classList.add("hidden")
    tickets.className = "hidden"
    if (!logout.classList.contains("hidden")) {
        comments.className = "comments animated bounceInRight slower"
    }
}

//ovde se zavrsava sve sto se tice WELCOME pozdrava i inicijalizacije glavne strane



//ovde sam pisao animaciju za linkove koji se prikazuju na hover, a vode do rezervacija i komentara

function animateTicketLink(e) {
    if (e.target.className == "ticket" || e.target.className == "comment") {
        e.target.classList.add("animated", "pulse", "slow", "infinite")
        console.log(e.target.classList)
    }
}

function stopAnimateTicketLink(e) {
    if (e.target.classList.contains("ticket") || e.target.classList.contains("comment")) {
        e.target.classList.remove("animated", "pulse", "slow", "infinite")
    }
}

introContainer.addEventListener("mouseover", animateTicketLink)
introContainer.addEventListener("mouseout", stopAnimateTicketLink)

//ovde je kraj toga




//login funkcije i muke na mene vaskolike

function logInMember() {
    var username = document.getElementById("usernameMember").value.trim()
    var password = document.getElementById("passwordMember").value.trim()
    var rememberMe = document.getElementById("rememberMe").checked
    let date = getFormattedDate()
    console.log(date)
    axios.post("http://localhost:3000/login", {
        username: username,
        password: password,
        date:date
    })
        .then(function (response) {
            console.log(response.data)
            if (response.data.result == "OK") {
                successfulLogin(response.data.data, rememberMe)
                if(response.data.data[0].kor_lvl == 1){
                    adminPanel.classList.remove("hidden") 
                }
                returnMain()
                return
            }
            if (response.data.result == "Invalid credentials") {
                showError()
               
            }
        })
        .catch(function (error) {
            console.log(error)
        })
}


function successfulLogin(user, rememberMe) {
    loggedUser = true
    var currentUser = user
    localStorage.setItem("current", JSON.stringify(user))
    console.log(currentUser)
    logsign.classList.add("hidden")
    logout.classList.remove("hidden")
     
    if (rememberMe) {
         localStorage.setItem("logged-user", JSON.stringify(user))
     }

}

function logOut() {

    let korId =  JSON.parse(localStorage.getItem("current"))[0].kor_id
    let date = getFormattedDate()


    logsign.classList.remove("hidden")
    logout.classList.add("hidden")
    localStorage.removeItem("logged-user")
    localStorage.removeItem("current")
    adminPanel.classList.add("hidden") 
    comments.className = "comments animated bounceOutRight slower"
    loggedUser = false

    

    axios.post("http://localhost:3000/logOut",{
        korId:korId,
        date:date
    })
    .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

}

function checkLogin() {
    var rememberedUser = localStorage.getItem("logged-user")
    if (rememberedUser != null) {
        rememberedUser = JSON.parse(rememberedUser)
        successfulLogin(rememberedUser, false)
    }
}

function showError() {
    errormsg1.classList.remove("hidden")
    errormsg1.innerHTML = "Invalid credentials"
    setTimeout(() => {
        errormsg1.classList.add("hidden")
    }, 2000)
}

checkLogin()

//ovo gore se sve ticalo samo logina(uzmi to malo ispregledaj zakomplikovao si ga)

function newMember() {
    let check = true
    var username = document.getElementById("newUsername").value.trim()
    var password = document.getElementById("newPassword").value
    var password2 = document.getElementById("newPassword2")
    var email = document.getElementById("newEmail").value.trim()
    if (username.length < 8) {
        check = false
        smallUsername.classList.remove("hidden")
        smallUsername.innerHTML = "Username should be at least 8 characters long"
    }

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
        check = false
        smallEmail.classList.remove("hidden")
        smallEmail.innerHTML = "Email is not valid"
    }

    if (password.length < 8) {
        check = false
        smallPass.classList.remove("hidden")
        smallPass.innerHTML = "Password should be at least 8 characters long"
    }
    console.log(password.value, password2.value)
    if (newPassword.value != newPassword2.value) {
        check = false
        smallPass2.classList.remove("hidden")
        smallPass2.innerHTML = "Passwords should match"
    }

    setTimeout(() => {
        smallUsername.classList.add("hidden")
        smallEmail.classList.add("hidden")
        smallPass.classList.add("hidden")
        smallPass2.classList.add("hidden")
    }, 3000)

    if (check) {
        axios.post("http://localhost:3000/newMember", {
            username: username,
            email: email,
            password: password
        })
            .then(function (response) {
                console.log(response.data.result)
                if (response.data.result == "OK") {
                    returnMain()
                }
                if (response.data.result == "Username or Email already taken") {
                    smallPass2.classList.remove("hidden")
                    smallPass2.innerHTML = "Username or Email already taken"
                }

            })
            .catch(function (error) {
                console.log(error)
            })
    }

}

//bravo Guberinicu idemo dalje


//komentari

function Komentar(username, text, id) {
    this.username = username
    this.text = text
    this.id = id
    this.prikaziSe = function () {
        var container = document.createElement("div")
        var user = document.createElement("p")
        var text = document.createElement("div")
        user.innerHTML = this.username
        text.innerHTML = this.text

        container.appendChild(user)
        container.appendChild(text)
        container.className = "rendered_comment"
        commentContainer.append(container)

    }
}

let sviKomentari = []


function postComment() {
    let user = JSON.parse(localStorage.getItem("current"))
    let username = user[0].kor_username
    let userId = user[0].kor_id
    let date = getFormattedDate()
    let text = document.getElementById("cmntText").value
    console.log(userId, username, text)
    axios.post("http://localhost:3000/comment", {
        username: username,
        comment: text,
        userId: userId,
        date:date
    })
        .then(function (response) {

        })
        .catch(function (error) {
            console.log(error)
        })
}

function fetchComments() {
    sviKomentari = []
    axios.post("http://localhost:3000/comment", {})
        .then(function (response) {
            commentContainer.innerHTML = ""
             dataArr = response.data.result
            for (let i = 0; i < dataArr.length; i++) {
                sviKomentari.unshift(new Komentar(dataArr[i].kor_username, dataArr[i].komentar,dataArr[i].kom_id))

            }
            for (let i = 0; i < sviKomentari.length; i++) {
                sviKomentari[i].prikaziSe()
            }
        })
        .catch(function (error) {
            console.log(error)
        })
        
}


fetchComments()
setInterval(fetchComments,3000)

function Sediste(id, date) {
    this.id = id;
    this.date = date;
}

//e a sad kupovina karata, nek ti je Bog u pomoci
function Rezervacija(korId, movieId, sedista,datum) {
    this.korId = korId
    this.movieId = movieId
    this.sedista = sedista
    this.datum = datum

    this.setSeats = function (sedista) {
        this.sedista = sedista;
    }
}

function updateSelectedCount() {
    var selectedSeats = document.querySelectorAll(".row .seat.selected")
    var selectedSeatsCount = selectedSeats.length
    count.innerHTML = selectedSeatsCount
    total.innerHTML = selectedSeatsCount * movieSelect.value
}


movieSelect.addEventListener("change", (e) => {
    ticketPrice = e.target.value
    let selectedMovieId = e.target.options[movieSelect.selectedIndex].id
    let boughtTickets = null
    axios.get("http://localhost:3000/tickets", {
        params: {
            id: selectedMovieId
        }
    })
        .then(function (response) {
            console.log(response.data.result)
            boughtTickets = response.data.result


            for (let j = 1; j <= 48; j++) {
                let id = j.toString()
                document.getElementById(id).classList.remove("occupied")
                document.getElementById(id).classList.remove("selected")

            }
            for (let i = 0; i < boughtTickets.length; i++) {
                let seatId = boughtTickets[i].sed_id.toString()
                let seatOccupied = document.getElementById(seatId).classList.add("occupied")
            }
        })
        .catch(function (error) {
            console.error(error);
        })
    updateSelectedCount()

})

function getLoggedInUserId() {
    const currentUser = localStorage.getItem("current");

    const loggedUser = localStorage.getItem("logged-user");
    
    // if (loggedUser == null || currentUser == null) {
    //     throw new Error("User could not be determined!");
    // }

    if (loggedUser) {
        return JSON.parse(loggedUser)[0].kor_id;
    } else {
        return JSON.parse(currentUser)[0].kor_id;
    }

    
}

function getFormattedDate() {
    const date = new Date()
    const year = date.getFullYear().toString()
    const month = date.getMonth().toString()
    const day = date.getDay().toString()
    const hours = date.getHours().toString()
    const minutes = date.getMinutes().toString()
    const seconds = date.getSeconds().toString()
    const dateTimeFormat = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
	return dateTimeFormat;
}


container.addEventListener("click", (e) => {
    if (e.target.classList.contains("seat") &&
        !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected")

        if (e.target.classList.contains("selected")) {
            const seatId = e.target.id;
            currentChosenSeats.push(new Sediste(seatId, getFormattedDate()));
            console.log(currentChosenSeats)


        }

    }
    if (!e.target.classList.contains("selected") && !e.target.classList.contains("occupied")) {
        for (let i = 0; i < currentChosenSeats.length; i++) {
            if (currentChosenSeats[i].id == e.target.id) {
                currentChosenSeats.splice(i, 1)
                console.log(currentChosenSeats)
            }
        }
        console.log(currentChosenSeats)
    }
    updateSelectedCount()
});




function postTickets() {
    // Ako je niz parazan, ne saljemo nista
    if (!currentChosenSeats||document.getElementById("movies").options[movieSelect.selectedIndex].id==0) {
        return;
    }
	
	for (const seat of currentChosenSeats) {
		const domElement = document.getElementById(seat.id);
		
		if (!domElement){
			console.error("Could not find domElement");
			continue;
		}
		
		domElement.classList.remove("selected");
		domElement.classList.add("occupied");
		count.innerHTML = 0;
		count.innerHTML = 0 + "$";
	}
		
    const movieId = movieSelect.options[movieSelect.selectedIndex].id
    let datum = getFormattedDate()

    axios.post("http://localhost:3000/tickets", (new Rezervacija(getLoggedInUserId(), movieId, currentChosenSeats, datum)))
        .then(function (response) {
            if (!response.ok) {
                console.error(response.statusCode);
            }
        })
        .catch(function (error) {
            console.error(error)
        })
    currentChosenSeats = []
    console.log(currentChosenSeats)

}



//e dobro, jos admin panel i miran si



function Activity(brojAktivnosti, korId, aktivnost,datum) {
    this.brojAktivnosti = brojAktivnosti
    this.korId = korId
    this.aktivnost = aktivnost
    this.datum = datum

    this.prikazi = function() {
        let activityContainer = document.createElement("div")
        let brojAktivnosti = document.createElement("span")
        let korId = document.createElement("span")
        let aktivnost = document.createElement("span")
        let datum = document.createElement("span")
        let dugmeObrisi = document.createElement("button")

        brojAktivnosti.innerHTML = "id aktivnosti: " + this.brojAktivnosti
        korId.innerHTML = "id korisnika " + this.korId
        aktivnost.innerHTML = "aktivnost " + this.aktivnost
        datum.innerHTML = "datum: " + this.datum
        dugmeObrisi.innerText = "obriši"

        dugmeObrisi.onclick = () => {
            axios.post("http://localhost:3000/removeActivity", {
                 act_id:this.brojAktivnosti   
                })
                .then(function (response) {

                })
                .catch(function (error) {
                console.log(error)
                })
                returnActivities()
        }

        activityContainer.appendChild(brojAktivnosti)
        activityContainer.appendChild(korId)
        activityContainer.appendChild(aktivnost)
        activityContainer.appendChild(datum)
        activityContainer.appendChild(dugmeObrisi)
        adminPanelContainer.appendChild(activityContainer)

        activityContainer.style.color = "white"
        brojAktivnosti.className = "ticket-span"
        korId.className = "ticket-span"
        aktivnost.className = "ticket-span"
        datum.className = "ticket-span"
    }
}



function Ticket(brojKarte,korId,sedId,filmId,datum){
    this.brojKarte = brojKarte
    this.korId = korId
    this.sedId =  sedId
    this.filmId = filmId
    this.datum =  datum

    this.prikazi = function() {
        let ticketContainer = document.createElement("div")
        let brojKarte = document.createElement("span")
        let korId = document.createElement("span")
        let sedId = document.createElement("span")
        let filmId = document.createElement("span")
        let datum = document.createElement("span")
        let dugmeObrisi = document.createElement("button")
        

        brojKarte.innerHTML ="broj karte: " + this.brojKarte
        korId.innerHTML ="id korisnika: " + this.korId
        sedId.innerHTML ="id sedista: " + this.sedId
        filmId.innerHTML ="id filma" + this.filmId
        datum.innerHTML ="datum " + this.datum
        dugmeObrisi.innerHTML = "obriši"

        dugmeObrisi.onclick = () =>{
            axios.post("http://localhost:3000/ticketsRemove",{
                brojKarte:this.brojKarte
            })
            .then(function (response) {
                console.log(response)
              })
            .catch(function (error) {
                console.log(error)
            })
        }
        

        ticketContainer.appendChild(brojKarte)
        ticketContainer.appendChild(korId)
        ticketContainer.appendChild(sedId)
        ticketContainer.appendChild(filmId)
        ticketContainer.appendChild(datum)
        ticketContainer.appendChild(dugmeObrisi)

        ticketContainer.style.color = "white"
        korId.className = "ticket-span"
        sedId.className = "ticket-span"
        filmId.className = "ticket-span"
        datum.className = "ticket-span"
 

        adminPanelContainer.appendChild(ticketContainer)

        

    }
}

function returnTickets() {
    ticketsFromDB = []
    axios.get("http://localhost:3000/tickets")
     .then(function (response) {
         console.log(response.data.result)
        let arr = response.data.result
        for(let i = 0; i < arr.length; i++){
            ticketsFromDB.push(new Ticket(arr[i].prs_id, arr[i].kor_id,arr[i].sed_id,arr[i].film_id,arr[i].prs_datum))
        }
        adminPanelContainer.innerHTML = ""
        for(let j = 0; j < ticketsFromDB.length; j++){
            ticketsFromDB[j].prikazi()
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
}

function clearAdminPanel() {
    adminPanelContainer.innerHTML= ""
}

function returnComments() {
    adminPanelContainer.innerHTML = ""
    for(let i = 0; i < dataArr.length; i++) {
        let container = document.createElement("div")
        let korUsername = document.createElement("span")
        let komId = document.createElement("span")
        let komentar = document.createElement("span")
        let btnRemove = document.createElement("button")

        korUsername.innerHTML = "id korisnika: " + dataArr[i].kor_username
        komentar.innerHTML = "komentar " + dataArr[i].komentar
        komId.innerHTML = "kom id: " + dataArr[i].kom_id
        btnRemove.innerHTML = "obriši"

        korUsername.className = "ticket-span"
        komId.className = "ticket-span"
        komentar.className = "ticket-span"


        btnRemove.onclick = () =>{
            axios.post("http://localhost:3000/commentRemove",{
                kom_id:dataArr[i].kom_id
            })
            .then(function (response) {
                console.log(response)
              })
            .catch(function (error) {
                console.log(error)
            })
            returnComments()
        }


        container.appendChild(korUsername)
        container.appendChild(komId)
        container.appendChild(komentar)
        container.appendChild(btnRemove)

        adminPanelContainer.appendChild(container)

    }  
}

function returnActivities() {
    adminPanelContainer.innerHTML = ""
    activitiesArr = []
    axios.get("http://localhost:3000/activity")
    .then(function (response) {
        let temp = response.data.result
        activitiesArr = []
         for(let i = 0; i < temp.length; i++) {
            activitiesArr.push(new Activity(temp[i].act_id,temp[i].fk_kor_id,temp[i].activity,temp[i].act_date))
         }

         for(let j = 0; j < activitiesArr.length; j++) {
            activitiesArr[j].prikazi()
         }
         console.log(activitiesArr)
    })
    .catch(function (error) {
    // handle error
    console.log(error)
    })
    .then(function () {
    })
}


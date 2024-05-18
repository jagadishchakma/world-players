// load default show data
function defaultPlayers(){
  
    fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=Arsenal")
        .then(res => res.json())
        .then(data => {

            let div = document.querySelector(".players");
            data.player.map((player)=>{
                div.insertAdjacentHTML('beforeend',`
                <div class="col-md-4 mb-3">
                    <div class="card" style="width: 18rem;">
                        <img src="${player.strThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${player.strPlayer}</h5>
                            <p class="card-text">
                                <strong>Nationality:</strong> ${player.strNationality
                                }
                                <br>
                                <strong>Gender: </strong> ${player.strGender}
                                <br>
                                <strong>Weight: </strong>${player.strWeight}
                                <br>
                                <strong>Position: </strong> ${player.strPosition}
                                <br>
                                <strong>Id: </strong>${player.idPlayer}
                                <br>
                                <strong>Description: </strong>${player.strDescriptionEN.slice(0,100)}...
                                <br>
                                
                                <a href="https://${player.strInstagram}" target="_blank"><i class="fa fa-instagram"></i></a>
                                <a href="https://${player.strFacebook}" class="ms-2" target="_blank"><i class="fa fa-facebook"></i></a>
                                <a href="htps://${player.strTwitter}" class="ms-2" target="_blank"><i class="fa fa-twitter"></i></a>
                            </p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary float-left" onclick="addToPlayer(this,'${player.strPlayer}')">Add to group</button>
                            <button class="btn btn-warning float-right" data-bs-toggle="modal" data-bs-target="#details" onclick="playerDetails(${player.idPlayer})">Details</button>
                        </div>
                    </div>
                </div>
                `)
            })
        })
    
    }
defaultPlayers();


// add to player 
function addToPlayer(element,strPlayer){
    let readyElement = document.getElementsByClassName("players-ready")[0];
    let readyNumber = parseInt(readyElement.innerText);
    if(readyNumber == 11){
        alert("Over Use");
    }else{
        readyElement.innerText = readyNumber + 1;
        element.setAttribute("disabled","true");

        let playersNameBoxEle = document.getElementsByClassName("ready-players-names")[0];
        playersNameBoxEle.insertAdjacentHTML('beforeend',`
            <li>${strPlayer}</li>
        `);
    }
   
}

// players search

let search = document.querySelector(".players-search");
let spin = document.querySelector(".spinner");
search.addEventListener("keyup", (event)=>{
    let serachValue = search.value;
    if(event.key === "Enter"){
        search.style.display = "none";
        spin.style.display = "block";
        fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${serachValue}`)
        .then(res => res.json())
        .then(data => {
            search.style.display = "block";
            spin.style.display = "none";
            console.log(data);
            let div = document.querySelector(".players");
            div.innerHTML = '<div></div>'
            if(data.player != null){
                data.player.map((player)=>{
                    if(player.strThumb != null && player.strDescriptionEN != null){
                        div.insertAdjacentHTML('beforeend',`
                        <div class="col-md-4 mb-3">
                            <div class="card" style="width: 18rem;">
                                <img src="${player.strThumb}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${player.strPlayer}</h5>
                                    <p class="card-text">
                                        <strong>Nationality:</strong> ${player.strNationality
                                        }
                                        <br>
                                        <strong>Gender: </strong> ${player.strGender}
                                        <br>
                                        <strong>Weight: </strong>${player.strWeight}
                                        <br>
                                        <strong>Position: </strong> ${player.strPosition}
                                        <br>
                                        <strong>Id: </strong>${player.idPlayer}
                                        <br>
                                        <strong>Description: </strong>${(player.strDescriptionEN) ? player.strDescriptionEN.slice(0,100) : ""}...
                                        <br>
                                        <a href="https://${player.strInstagram}" target="_blank"><i class="fa fa-instagram"></i></a>
                                        <a href="https://${player.strFacebook}" class="ms-2" target="_blank"><i class="fa fa-facebook"></i></a>
                                        <a href="https://${player.strTwitter}" class="ms-2" target="_blank"><i class="fa fa-twitter"></i></a>
                                    </p>
                                </div>
                                <div class="card-footer">
                                    <button class="btn btn-primary float-left" onclick="addToPlayer(this,'${player.strPlayer}')">Add to group</button>
                                    <button class="btn btn-warning float-right" data-bs-toggle="modal" data-bs-target="#details" onclick="playerDetails(${player.idPlayer})">Details</button>
                                </div>
                            </div>
                        </div>
                    `)
                    }
                })
            }else{
            div.insertAdjacentHTML('beforeend',`
                <h1 class="alert alert-warning">OOPs! No Players Found</h1>
            `)
            }
            
        })
    }else{
        console.log(search.value);
    }
})

//player details
function playerDetails(id){
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    .then(res=>res.json())
    .then(data =>{
        let player = data.players[0];
        let holder = document.querySelector(".modal-content")
        holder.innerHTML = `
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">${player.strPlayer}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <img src="${player.strThumb}" style="margin: auto" width="100%"/>
            <p>${player.strDescriptionEN}</p>
            <ul>
                <li>Name: ${player.strPlayer}</li>
                <li>Nationality: ${player.strNationality}</li>
                <li>Weight: ${player.strWeight}</li>
                <li>Height: ${player.strHeight}</li>
                <li>Sport: ${player.strSport}</li>
                <li>Team: ${player.strTeam}</li>
            </ul>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
        `
    })
}

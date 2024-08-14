const getinfoBtn = document.getElementById("getinfoBtn");

let pok_name;
let ability;
let helditems;
let photo;


async function getdata() {
    try{
        document.getElementById('error').textContent = "";
        let pokemon = document.getElementById("pokemon").value;
        let api = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        let response = await fetch(api);
        if(pokemon==""){
            document.getElementById("name").textContent = ``;
            document.getElementById("ability").textContent=``;
            document.getElementById("helditems").textContent = ``;
            document.getElementById("pokphoto").src = '';
            document.getElementById("error").textContent = "Please Enter a pokemon name";
            throw new Error("No Pokemon name entered");
        }

        if(response.status == 404){
            document.getElementById("name").textContent = ``;
            document.getElementById("ability").textContent=``;
            document.getElementById("helditems").textContent = ``;
            document.getElementById("pokphoto").src = '';
            document.getElementById("error").textContent = "Pokemon Not found";
            throw new Error("Pokemon Not Found");
        }

        if(!response.ok){
            document.getElementById("name").textContent = ``;
            document.getElementById("ability").textContent=``;
            document.getElementById("helditems").textContent = ``;
            document.getElementById("pokphoto").src = '';
            document.getElementById("error").textContent = "Error Please Try Again";
            throw new Error("something went wrong please try again");
        }

        let data = await response.json();

        //console.log(response);
        pok_name = data.name;
        ability = `${data.abilities[0].ability.name}`;
        helditems = `${data.held_items[0].item.name}`;
        photo = data.sprites.front_default;

        document.getElementById("name").textContent = `Name: ${pok_name}`;
        document.getElementById("ability").textContent=`Ability: ${ability}`;
        document.getElementById("helditems").textContent = `HeldItem:${helditems}`;
        document.getElementById("pokphoto").src = photo;
    }
    catch(error){
        console.error(error);
    }
}

/*
function getdata(){
    let pokemon = document.getElementById("pokemon").value;
    let api = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    fetch(api).then(response => res = response.json()).then(value => {
        console.log(value);
        pok_name = value.name;
        ability = `${value.abilities[0].ability.name}`;
        helditems = `${value.held_items[0].item.name}`;
        photo = value.sprites.front_default;
        document.getElementById("name").textContent = `Name: ${pok_name}`;
        document.getElementById("ability").textContent=`Ability: ${ability}`;
        document.getElementById("helditems").textContent = `HeldItem:${helditems}`;
        document.getElementById("pokphoto").src = photo;
    }).catch(error => console.error(error));
}

*/


getinfoBtn.onclick = getdata;

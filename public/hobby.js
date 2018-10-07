

let url = "https://skole.rasmuslumholdt.dk/CA2-Backend/api/";
const getHobbies = (url, selectId) => {
    fetch(url, { method: `GET` })
        .then((response) => response.json())
        .then((data) => {
            let select = document.getElementById(selectId);

            for (let i = 0; i < data.length; i++) {
                let option = document.createElement("option");
                option.text = data[i].name;
                option.value = data[i].id;

                select.add(option);
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

const getAllHobbies = (url) => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let content = data.map(e => `<div class="person"><h3>${e.name}</h3><p>Description: ${e.desc}, <br>Person List: ${e.personList}</p></div></br>`).join("");
            document.getElementById("content").innerHTML = content;
        })
        .catch((error) => {
            console.log(error);
        })
}

const getHobby = (url) => {
    fetch(url, { method: `GET` })
        .then((response) => response.json())
        .then((e) => {
            let content = `<h3><h3>${e.name}</h3><p>Description: ${e.desc}, <br>Person List: ${e.personList}</p></div></h3></br>`;
            document.getElementById("content").innerHTML = content;
        })
        .catch((error) => {
            console.log(error);
        })
}


window.onload = () => {
    getHobbies("https://skole.rasmuslumholdt.dk/CA2-Backend/api/hobby/", "hobbySelect");
    getHobbies("https://skole.rasmuslumholdt.dk/CA2-Backend/api/hobby/", "hobby");

    
    document.getElementById("getAllHobby").addEventListener("click", () => {
        getAllHobbies(url + "hobby/");
    });

    let hobSelect = document.getElementById("hobbySelect");
    document.querySelector('#getHobby').addEventListener('click', () => {
        getHobby(url + 'hobby/' + hobSelect.value);
    });
}
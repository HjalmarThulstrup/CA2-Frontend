let url = "https://skole.rasmuslumholdt.dk/CA2-Backend/api/address/";

const getZipCodes = (url) => {
    fetch(url, { method: `GET` })
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("address").innerHTML = JSON.stringify(data);
        })
        .catch((error) => {
            console.log(error);
        })
}

window.onload = () =>{
    document.getElementById("getAddress").addEventListener("click", () =>{
        getZipCodes(url + "2");
    })
}
import 'bootstrap/dist/css/bootstrap.css'

let url = "http://localhost:8084/CA2/api/CityInfo/";

const getZipCodes = (url) => {
    fetch(url, { method: `GET` })
        .then((response) => response.json())
        .then((data) => {
            let content = data.map(el => `<p>${el.zipCode}</p>`).join("");
            document.getElementById("zipCodes").innerHTML = content;
        })
        .catch((error) => {
            console.log(error);
        })
}

const getSearchZip = (url, zip) => {
    fetch(url+zip, {method: `GET`})
    .then((response) => response.json())
    .then((data) => {
        document.getElementById("zipCodes").innerHTML = JSON.stringify(data);
    })
    .catch((error) =>{
        console.log(error);
    })
}

window.onload = () => {
    document.getElementById("btnZip").addEventListener("click", () => {
        getZipCodes(url + "zipCodeList");
    });

    document.getElementById("btnSearchZip").addEventListener("click", () =>{
        let zip = document.getElementById("zipBox").value;
        getSearchZip(url, zip);
        document.getElementById("zipCodes").innerHTML = document.getElementById("zipBox").value;
    })

}
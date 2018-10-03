import 'bootstrap/dist/css/bootstrap.css'


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

window.onload = () => {
    document.getElementById("btnZip").addEventListener("click", () => {
        getZipCodes("http://localhost:8084/CA2/api/CityInfo/zipCodeList");
    });
}
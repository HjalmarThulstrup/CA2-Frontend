let url = "https://skole.rasmuslumholdt.dk/CA2-Backend/api/cityinfo/";

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

window.onload = () =>{
    document.getElementById("getAllZip").addEventListener("click", () =>{
        getZipCodes(url + "zipCodeList");
    })
}
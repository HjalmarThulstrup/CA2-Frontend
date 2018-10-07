let url = "https://skole.rasmuslumholdt.dk/CA2-Backend/api/person/";

const getCities = (url, selectId) => {
    fetch(url, { method: `GET` })
        .then((response) => response.json())
        .then((data) => {
            let select = document.getElementById(selectId);

            for (let i = 0; i < data.length; i++) {
                let option = document.createElement("option");
                option.text = data[i].zipCode + " " + data[i].city;
                option.value = data[i].zipCode;

                select.add(option);
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

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

const getAllPeople = (url) => {
    fetch(url, { method: `GET` })
        .then((response) => response.json())
        .then((data) => {
            let content = data.map(el => `<div class="person"><h3>${el.id} - ${el.lastName}, ${el.firstName}</h3><p>Email: ${el.email}</p><p>Phone: ${el.phoneNums}</p><p>Hobbies: ${el.hobbies}</p><p>Address: ${el.streetAndCity}</p></div></br>`).join("");
            document.getElementById("people").innerHTML = content;
        })
        .catch((error) => {
            console.log(error);
        })
}

const getAllContacts = (url) => {
    fetch(url, { method: `GET` })
        .then((response) => response.json())
        .then((data) => {
            let content = data.map(el => `<p>Email: ${el.email}</p><p>Phone: ${el.phoneNums}</p></br>`).join("");
            document.getElementById("people").innerHTML = content;
        })
        .catch((error) => {
            console.log(error);
        })
}

const getHobbyPopularity = (url) => {
    fetch(url, { method: `GET` })
        .then((response) => response.json())
        .then((data) => {
            let content = `<h3>Der er ${data.amount} person(er) med denne hobby</h3></br>`;
            document.getElementById("people").innerHTML = content;
        })
        .catch((error) => {
            console.log(error);
        })
}

const postNewPerson = (url, firstName, lastName, email, hobby, phone, phoneDesc, address, addressDesc, city) => {
    fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                email: email,
                firstName: firstName,
                lastName: lastName,
                hobbyList: [
                    {
                        id: hobby
                    }
                ],

                phoneList: [
                    {
                        number: phone,
                        description: phoneDesc
                    }],

                address: {
                    street: address,
                    additionalInfo: addressDesc,
                    cityInfo: {
                        zipCode: city
                    }
                }



            })
    }).then((res) => {
        console.log(res);
        return res.json();
    })
        .then(res => console.log(res));
}

window.onload = () => {
    getCities("https://skole.rasmuslumholdt.dk/CA2-Backend/api/cityinfo/zipCodeList", "zipSelect")
    getCities("https://skole.rasmuslumholdt.dk/CA2-Backend/api/cityinfo/zipCodeList", "city");
    getHobbies("https://skole.rasmuslumholdt.dk/CA2-Backend/api/hobby/", "hobbySelect");
    getHobbies("https://skole.rasmuslumholdt.dk/CA2-Backend/api/hobby/", "hobby");

    document.getElementById("getAllPeople").addEventListener("click", () => {
        getAllPeople(url + "complete");
    })

    document.getElementById("getAllContacts").addEventListener("click", () => {
        getAllContacts(url + "contactinfo");
    })

    let zipSelect = document.getElementById("zipSelect");
    document.getElementById("getAllPeopleByCity").addEventListener("click", () => {
        getAllPeople(url + "city/" + zipSelect.value);
    })

    let hobSelect = document.getElementById("hobbySelect");
    document.getElementById("getAllPeopleByHobby").addEventListener("click", () => {
        getAllPeople(url + "hobby/" + hobSelect.value);
    })

    document.getElementById("getHobbyPopularity").addEventListener("click", () => {
        getHobbyPopularity("https://skole.rasmuslumholdt.dk/CA2-Backend/api/hobby/getHobbyPopulation/" + hobSelect.value);
    })

    document.getElementById("postNewPerson").addEventListener("click", () => {
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let email = document.getElementById("email").value;
        let hobby = document.getElementById("hobby").value;
        let phone = document.getElementById("phone").value;
        let phonedesc = document.getElementById("phonedesc").value;
        let addressName = document.getElementById("addressName").value;
        let addressDesc = document.getElementById("addressDesc").value;
        let city = document.getElementById("city").value;


        postNewPerson(url, firstName, lastName, email, hobby, phone, phonedesc, addressName, addressDesc, city);

    })
}
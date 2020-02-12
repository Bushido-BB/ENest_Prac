"strict mode"
let user = {}
let users = new Map()
//-----------------TEMPRARY-----------------
var states = {
    "": [],
    "India": ["Delhi", "Mumbai", "West Bengal", "UP"],
    "America": ["California", "Nevada", "New York", "Florida"],
    "Japan": ["Hokaiddo", "Kanto", "Shikoku"],
    "Australia": ["Perth", "Adilaide", "Brisbane"],
    "Canada": ["Ontario", "Quebec", "British Columbia"]
}
//-----------------TEMPRARY-----------------
selectCountry = ()=>{
    console.log("Fired")
    let state_box = document.getElementById("state_id")
    let country_box = document.getElementById("country_id")
    state_box.innerHTML = `<option value="" disabled selected>State</option>`
    let _country = states[country_box.value]
    _country.forEach((_state)=>{
        state_box.innerHTML += `<option value="${_state}">${_state}</option>`
    })
}
getUserData = (elem)=>{
    user.firstname = elem.firstname.value
    user.lastname = elem.lastname.value
    user.email = elem.email.value
    user.phone = elem.phone.value
    user.date = elem.date.value
    user.country = elem.country.value
    user.state = elem.state.value
    user.gender = elem.gender.value
    user.hobbies = []
    elem.reading.checked?user.hobbies.push(elem.reading.value):null
    elem.listening.checked?user.hobbies.push(elem.listening.value):null
    elem.others.checked?user.hobbies.push(elem.others.value):null
    user.education = elem.education.value
}
setUserData =(elem)=>{
    elem.firstname.value = user.firstname
    elem.lastname.value = user.lastname
    elem.email.value = user.email
    elem.phone.value = user.phone
    elem.date.value = user.date
    elem.country.value = user.country
    selectCountry()
    elem.state.value = user.state
    elem.gender.value = user.gender
    elem.reading.checked = false
    elem.listening.checked = false
    elem.others.checked = false
    user.hobbies.forEach(element => {
        elem[`${element}`].checked = true
    })
    elem.education.value = user.education
}
setUsers = (elem)=>{
    getUserData(elem)
    if(validateFull(elem)){
        if(!user.key)
            user.key = Math.random()
        users.set(user.key, user)
        document.querySelector("form").reset()
        user = {}
        updateTable()
    }
}
updateTable = ()=>{
    console.log(users)
    document.querySelector("tbody").innerHTML = ""
    for(_user of users){
        let entry = document.createElement("tr")
        entry.innerHTML =`<td>${_user[1].firstname}</td>
                        <td>${_user[1].lastname}</td>
                        <td>${_user[1].email}</td>
                        <td>${_user[1].phone}</td>
                        <td>${_user[1].date}</td>
                        <td>${_user[1].country}</td>
                        <td>${_user[1].state}</td>
                        <td>${_user[1].gender}</td>
                        <td>${_user[1].hobbies.toString()}</td>
                        <td>${_user[1].education}</td>
                        <td>
                            <button type="button" onClick="editUser(${_user[0]}, this.form)">Edit</button>
                            <button type="button" onClick="deleteUser(${_user[0]})">Delete</button>
                        </td>`
        document.querySelector("tbody").appendChild(entry)
    }
}
editUser = (key, elem)=>{
    user = users.get(key)
    setUserData(elem)
}
deleteUser = (key)=>{
    users.delete(key)
    updateTable()
}
//-----------------VALIDATE-----------------
validate = (id)=>{
    let mesg = ""
    let value = id.value
    switch(id.name){
        case "firstname":
        case "lastname":
            if(!/(^([a-zA-Z])+)$/gm.test(value))
                mesg = "Invalid name"
            break
        case "email":
            if(!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(value))
                mesg = "Invalid Email"
            break
        case "phone":
            if(!/^\d{5}[.-]\d{5}$/gm.test(value))
                mesg = "Enter in xxxxx-xxxxx format"
            break
        case "date":
            if(!/^\d{4}[.-]\d{2}[.-]\d{2}$/gm.test(value))
                mesg = "Choose a date"
            break
        case "country":
            if(!value)
                mesg = "Choose a country first"
            break
        case "state":
            if(!value)
                mesg = "Choose a state"
            break
        case "gender":
            if(!value)
                mesg = "Select gender"
            break
        case "education":
            if(!value.trim())
                mesg = "Enter your qualifications"
            break                                                                                       
    }
    id.parentNode.lastChild.textContent = mesg?mesg:undefined
    return mesg?false:true
}
validateFull = (elem)=>{
    let validate_flag = false
    for(_elem of elem ){
        validate_flag = validate(_elem)
        if(validate_flag==false)
            break
    }
    if(validate_flag){
        return true
    }
    return false
}
//-----------------VALIDATE-----------------
window.addEventListener("load", ()=>{
    Object.defineProperties(user,{
        key: {
            enumerable:true,
            writable:true
        },
        firstname: {
            enumerable:true,
            writable: true
        },
        lastname: {
            enumerable:true,
            writable: true
        },
        email: {
            enumerable:true,
            writable: true
        },
        phone: {
            enumerable:true,
            writable: true
        },
        date: {
            enumerable:true,
            writable: true
        },
        country: {
            enumerable:true,
            writable: true
        },
        state: {
            enumerable:true,
            writable: true
        },
        gender: {
            enumerable:true,
            writable: true
        },
        hobbies: {
            enumerable:true,
            writable: true
        },
        education: {
            enumerable:true,
            writable: true
        }
    })
    Object.seal(user)
    document.getElementById("country_id").addEventListener("change", selectCountry())
})
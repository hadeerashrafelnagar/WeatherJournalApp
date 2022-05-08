/* Global Variables */
const baseUrl = 'api.openweathermap.org/data/2.5/weather?'
const apikey =  '8eedc045220d303fc839d484a1f48e74&units=metric'
const generateBtn = document.getElementById('generate');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();
//async function to make a Get request
const getWeather = async (baseUrl, code,key) =>{
    const response = await fetch(`https://${baseUrl}zip=${code}&appid=${key}`);
    console.log(response)
    let data = await response.json()
    console.log(data)
    return (data)
};
//async function to make a Post request
const postData = async (path='', data = {}) => {
    console.log(data)
    const postRequest = await fetch(path, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(data),
    })
}
// Update user interface
const updateUI = async () => {
    const response = await fetch('http://localhost:8000/getData');
    const dataUnion = await response.json()
    console.log(dataUnion)
    document.getElementById('temp').innerHTML = `<span class="entry-item">temp: </span> ${dataUnion.temp}`
    document.getElementById('date').innerHTML =`<span class="entry-item">Date: </span> ${newDate}`
    document.getElementById('content').innerHTML =`<span class="entry-item">You feel: </span> ${dataUnion.content}`
    
};
// handler function
async function perfomAction(e){
    e.preventDefault()
    let zipCode = document.getElementById('zip').value;
    let feeling = document.getElementById('feelings').value;
    console.log(newDate);
    getWeather(baseUrl, zipCode,apikey)
    .then(function(data){
        const weatherData= {
            temp: data.main.temp,
            date: newDate,
            content:feeling
        }
        postData('http://localhost:8000',weatherData)
        }).then(function(){
            updateUI()
    })
};
//Create an event listener for the element with the id: generate
generateBtn.addEventListener('click', perfomAction);
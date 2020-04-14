console.log('Client side js');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const locationText = document.querySelector('#locationText');
const forecastText = document.querySelector('#forecastText');
const errorText = document.querySelector('#errorText');

weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    forecastText.textContent = 'Loading...';
    locationText.textContent = '';
    const address = search.value;
    let url = 'http://localhost:4200/weather?address='+address;
    if(address){
        fetch(url).then((response) =>{
            response.json().then((data) =>{
                if(data.error) {
                    errorText.textContent = data.error;
                }else{
                    console.log(data)
                    errorText.textContent ='';
                    locationText.textContent= data.location;
                    forecastText.textContent = data.forecast;
                }
            })
        }) 
    }else{
        forecastText.textContent ='';
        alert('please provide address!!')
    }
    
})
console.log('JS file client side');



const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const weatherMsg1 = document.querySelector('#weatherMsg1')
const weatherMsg2 = document.querySelector('#weatherMsg2')
const imageIcon = document.querySelector('#icon')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = searchElement.value

    weatherMsg1.textContent = "Loading..."
    weatherMsg2.textContent = ''

    fetch(`/weather?address=${location}`).then( (response) => {
      response.json().then((data => {
        if (data.error) {
          weatherMsg1.textContent = data.error
          console.log(data.error);
        } else {
          weatherMsg1.textContent = data.location
          weatherMsg2.textContent = data.forecastMsg
          imageIcon.src = data.weatherIcon
          searchElement.value = ''
        }
      }))
    })

})
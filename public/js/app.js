const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msgOne')
const msgtwo = document.querySelector('#msgtwo')
const msg3 = document.querySelector('#msg3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    msgtwo.textContent = msg3.textContent = ''
    msgOne.textContent = 'Loading........'
    
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgtwo.textContent = msg3.textContent = ''
                return msgOne.textContent = data.error
            }

            msgOne.textContent = data.location
            msgtwo.textContent = data.summary
            msg3.textContent = 'Temperature  :- ' + data.temperature + ', Precip Probability :- ' + data.precipProbability
            console.log(data)
        })
    })
})

window.addEventListener('load', () => {

    const template = (nombre, capital, poblacion) => {
        return `
            <div class="col mb-3">
                <div class="card">
                    <img  src="/img/hotel.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${nombre}</h5>
                        <p class="card-text">${capital}</p>
                        <p class="card-text">${poblacion}</p>
                    </div>
                </div> 
            </div>`
    }
   
    const input = document.getElementById('inputSearch')
    const ciudad = document.getElementById('inputCiudad')
    const estrellas = document.getElementById('inputEstre')
    const form = document.getElementById('formSearch')
    

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        resp.innerHTML = ''
        console.log(ciudad.value, estrellas.value)
        //fetch(`/api/hotel/${input.value}/${ciudad.value}/${estrellas.value}`)
        fetch(`/api/hotel?name=${input.value}&city=${ciudad.value}&star=${estrellas.value}`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data)
            data.forEach(element => {
                const card = template(element.nombre, element.estrellas, element.ciudad)
                
                resp.innerHTML += card
                
            });
        })
        .catch((e) => {
            console.log(e)
        })
    })
})



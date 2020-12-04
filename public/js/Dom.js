
window.addEventListener('load', () => {

    const template = (foto, nombre, ciudad, estrellas, parqueadero, wifi, precio) => {
        return `
            <div class="col mb-3">
                <div class="card">
                    <img  src="${foto}" class="card-img-top imag" alt="img hotel">
                    <div class="card-body">
                        <h5 class="card-title">${nombre}</h5>
                        <p class="card-text">Ciudad: ${ciudad}</p>
                        <p class="card-text">Estrellas: ${estrellas}</p>
                        <p class="card-text">Parqueadero: ${parqueadero ? `<i class="fa">&#xf00c</i>` : `<i class="fa">&#xf00d</i>`}</p>
                        <p class="card-text">Wifi: ${wifi ? `<i class="fa">&#xf00c</i>` : `<i class="fa">&#xf00d</i>`}</p>
                        <p class="card-text">Precio: $${precio} </p>
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
        const name = input.value ? input.value : "-1"
        //fetch(`/api/hotel/${input.value}/${ciudad.value}/${estrellas.value}`)
        fetch(`/api/hotel?name=${name}&city=${ciudad.value}&star=${estrellas.value}`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data)
            data.forEach(element => {
                const card = template(element.fotoURL, element.nombre, element.ciudad, element.estrellas, element.parqueadero, element.wifi, element.precio)
                
                resp.innerHTML += card
                
            });
        })
        .catch((e) => {
            console.log(e)
        })
    })
})



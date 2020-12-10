
window.addEventListener('load', () => {

    const template = (foto, nombre, ciudad, estrellas, parqueadero, wifi, precio) => {
        let estrellitas = 0
        switch (estrellas) {

            case 1:
                estrellitas = '★'
                break
            case 2:
                estrellitas = '★★'
                break
            case 3:
                estrellitas = '★★★'
                break
            case 4:
                estrellitas = '★★★★'
                break
            case 5:
                estrellitas = '★★★★★'
                break
        }
        return `
            <div class="col mb-3">
                <div class="card">
                    <img  src="${foto}" class="card-img-top imag" alt="img hotel">
                    <div class="card-body">
                        <h5 class="card-title">${nombre}</h5>
                        <p class="card-text font-weight-bold">Ciudad:  <span class="font-weight-normal"> ${ciudad}</span></p>
                        <p class="card-text font-weight-bold">Estrellas: <span style="color:#FEBB02">${estrellitas}</p>
                        <p class="card-text font-weight-bold">Parqueadero : <i class="fa fa-car"></i>  ${parqueadero ? `  <i class="fa">&#xf00c</i>` : `  <i class="fa">&#xf00d</i>`}</p>
                        <p class="card-text font-weight-bold">Wifi:  <i class="fa fa-wifi" aria-hidden="true"></i>${wifi ? `  <i class="fa">&#xf00c</i>` : `  <i class="fa">&#xf00d</i>`}</p>
                        <p class="card-text font-weight-bold text-warning">Precio: <span class="font-weight-normal text-dark">$ ${precio} *Prom/N.</span></p>
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
        if (!input.value && !ciudad.value && !estrellas.value) {
            alert('Debe ingresar alguna opción')
        }
        const name = input.value ? input.value : "-1"
        
        //fetch(`/api/hotel/${input.value}/${ciudad.value}/${estrellas.value}`)
        fetch(`/api/hotel?name=${name}&city=${ciudad.value}&star=${estrellas.value}`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
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




window.addEventListener('load', () => {

    const template = (nombre, capital, poblacion) => {
        return `
            <div class="col mb-3">
                <div class="card">
                    <img src="{imagen}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${nombre}</h5>
                        <p class="card-text">${capital}</p>
                        <p class="card-text">${poblacion}</p>
                    </div>
                </div> 
            </div>`
    }
   
    const input = document.getElementById('inputSearch')
    const form = document.getElementById('formSearch')
    

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        resp.innerHTML = ''
        fetch('http://localhost:3000/api/hotel/' + input.value)
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
            
        })
    })
})



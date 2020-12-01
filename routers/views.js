const express = require('express')
const router = new express.Router()

router.get('/eje', (req, res) => { // get = nos permite definir rutas en nuetro servidor por medio de "/" que sera nustra Direccion local, cunado "/" esta sola es nuestra ruta por defecto. req = permite obtener infomacion sobre la peticion que el cliente esta pidiendo res = Permite enviar la respuesta que se le va entreagar al cliente 
    console.log(req.url) // Muestra la dirección en la cual llegan los requerimientos 
    res.send('<h1>Bienvenidos</h1>')  // send = Permite imprimir una respuesta al ciente en la web
})

router.get('/about', (req, res) => { 
    //res.sendFile('./views/about.html', { root: __dirname })
    res.render('about') // cambiamos la ruta del sendFile por la de render para poder usar los ejs
})

router.get('/', (req, res) => { 
    //res.sendFile('./views/index.html', { root: __dirname })
    res.render('index')
})

router.get('/example/v1', (req, res) => { 
    console.log(req.url)
    res.send('Hola mundo 3')
})

// ruta por defecto 
router.use((req, res) => {// use = Nos permite crear una pagina por defecto para cuando la pagina solicitada por el cliente no exita.
    //res.status(404).sendFile('./views/404.html', { root: __dirname })
    res.status(404).render('404')
}) 

module.exports = router
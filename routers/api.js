const express = require('express') // Importamos el express
const router = new express.Router() // Router que permite agrupar 
const hotelModel = require('../db/models/hotel') // Importa el modelo de de la coleccion junto con la estructura

// Rutas de la API

//  GET nos permite obtener la respuesta de la API
router.get('/hotel', async (req, res) => { // Enrutamos nuestra base de datos a una web
    try {
        const Hoteles = await hotelModel.find({}) //find busca todos los hoteles y los almacena en un objeto 
        res.send(Hoteles)// send permite enviar la respuesta al cliente 
    }
    catch(e) { // cuando la pagina no es validad la resspuesta entra por el catch
        res.status(500).send({ // muestra el estatus 
            messager: 'Error inesperado'
        })
    }
}) 

// busca los hoteles por el id
router.get('/hotel/:id', async (req, res) => { // : = es como un varible que se guardara en id 
    try {
        const id = req.params.id // Resive el id por el parametro y lo amacena en la variable  
        const hotel = await hotelModel.findById(id) // Permite buscar el hotel con el id que se paso 

        if(!hotel) {
            res.status(404).send()
        }
        else {
            res.status(200).send(hotel)
        }
    }
    catch(e) {
        res.status(500).send({
            messager: 'Error inesperado'
        })
    } 
})

//  POST = permite crear un nuevo hotel y almacenarlo en la base de datos 
router.post('/hotel', async (req, res) => {  
    try {
        const dataHotel = req.body; // req.body = es donde llegara la informacion del cliente agregando un nuevo hotel por medio del postman
        const hotel = new hotelModel(dataHotel) // crea el objeto con su propiedades con la data del body de postman
    await hotel.save() // save = permite guardar en la base de datos 
    }
    catch(e) {
        res.status(500).send({
            messager: 'Error inesperado'
        })
    }
})

router.patch('/hoteles/:id', async (req, res) => {
	try {
    	const id = req.params.id; // Resive el id por el parametro y lo amacena en la variable
        const hotel = await hotelModel.findByIdAndUpdate(id, req.body, { // findByIdAndUpdate encuentra por el primer parametro (id) y actualiza con el cambio que esta en el body
                new: true, // new = Permite enviar el objeto de una vez actualizado al cliente 
                runValidators: true // runValidators = que al momento de la modificacion se tengan en cuenta los validadores 
            }
    	);
        if (!hotel) {
            res.status(404).send();
        } else {
            res.send(hotel); // send = Envia el dato actualizado 
        }
    } 
    catch(e) {
    	res.status(500).send(e);
	}
});

router.delete('/hoteles/:id', async (req, res) => {
	try {
    	const id = req.params.id; // Resive el id por el parametro y lo amacena en la variable
    	const hotel = await hotelModel.findByIdAndDelete(id); // Busca  con el primer parametro (id) y elimina el objeto con que esta identificado con ese id 
    		if (!hotel){
        		res.status(404).send();
            } 
            else {
        		res.send();
    		}
        } 
    catch(e) {
    	res.status(500).send(e);
	}
});

// Ruta por defecto de la API
router.use((req, res) => {
	res.sendStatus(404); // Envia el significado del estatus 404 al cliente 
});

module.exports = router
const express = require('express') // Importamos el express
const router = new express.Router() // Router que permite agrupar 
const hotelModel = require('../db/models/hotel') // Importa el modelo de de la coleccion junto con la estructura

router.get('/hotel', async (req, res) => { // Enrutamos nuestra base de datos a una web
    try {
        const Hoteles = await hotelModel.find({}) //find es un objeto vacio que traera todo la estructura 
        res.send(Hoteles)
    }
    catch(e) { // cuando la pagina no es validad la resspuesta entra por el catch
        res.status(500).send({ // muestra el estatus 
            messager: 'Error inesperado'
        })
    }
}) 

// busca los hoteles por el id
router.patch('/hotel/:id', async (req, res) => { 
    try {
        const id = req.params.id // Resive el id por parametro
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

//  Esta ruta permite crear un nuevo hotel y crearlo a la base de datos 
router.post('/hotel', async (req, res) => {  
    try {
        const dataHotel = req.body; // req.body es donde llegara la informacion del cliente agregando un nuevo hotel 
        console.log(dataHotel)
        const hotel = new hotelModel(dataHotel) // crea el objeto con su propiedades con la data del body de postman
    await hotel.save() // save permite guardar en la base de datos 
    }
    catch(e) {
        res.status(500).send({
            messager: 'Error inesperado'
        })
    }
})

router.patch('/hoteles/:id', async (req, res) => {
	try {
    	const id = req.params.id;
        const hotel = await hotelModel.findByIdAndUpdate(id, req.body,{
                new: true, 
                runValidators: true 
            }
    	);
        if (!hotel) {
            res.status(404).send();
        } else {
            res.send(hotel);
        }
    } 
    catch(e) {
    	res.status(500).send(e);
	}
});

router.delete('/hoteles/:id', async (req, res) => {
	try {
    	const id = req.params.id;
    	const hotel = await hotelModel.findByIdAndDelete(id);
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

router.use((req, res) => {
	res.sendStatus(404);
});

module.exports = router
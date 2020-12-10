const express = require('express') // Importamos el express
const router = new express.Router() // Router que permite agrupar 
const hotelModel = require('../db/models/hotel') // Importa el modelo de de la coleccion junto con la estructura

////////////////////////////// RUTAS API /////////////////////////////////////////

//  GET nos permite obtener la respuesta de la API
  
router.get('/hotel', async (req, res) => { // : = es como un varible que se guardara en id 
    const name = req.query.name // Resive el id por el parametro y lo amacena en la variable
    const city = req.query.city
    const star = req.query.star
   
    if (name != '-1' && city && star) {
        try {
            const Hoteles = await hotelModel.find({$and:[{nombre:{$regex:name,$options:'i'}},{ciudad:city},{estrellas:star}]}) //find busca todos los hoteles y los almacena en un objeto 
            res.send(Hoteles) // send permite enviar la respuesta al cliente 
        } catch (e) { // cuando la pagina no es validad la resspuesta entra por el catch
            res.status(500).send({ // muestra el estatus 
                messager: 'Error inesperado l'
            })
        }
    }else if ( name === '-1' && city && star) {
        try {
            const Hoteles = await hotelModel.find({$and:[{ciudad:city},{estrellas:star}]}) //find busca todos los hoteles y los almacena en un objeto 
            res.send(Hoteles) // send permite enviar la respuesta al cliente 
        } catch (e) { // cuando la pagina no es validad la resspuesta entra por el catch
            res.status(500).send({ // muestra el estatus 
                messager: 'Error inesperado l'
            })
        }
    } 
    else if ( name != '-1' && !city && star) {
        try {
            const Hoteles = await hotelModel.find({$and:[{nombre:{$regex:name,$options:'i'}},{estrellas:star}]}) //find busca todos los hoteles y los almacena en un objeto 
            res.send(Hoteles) // send permite enviar la respuesta al cliente 
        } catch (e) { // cuando la pagina no es validad la resspuesta entra por el catch
            res.status(500).send({ // muestra el estatus 
                messager: 'Error inesperado l'
            })
        }
    }  
    else if ( name != '-1' && city && !star) {
        try {
            const Hoteles = await hotelModel.find({$and:[{nombre:{$regex:name,$options:'i'}},{ciudad:city}]}) //find busca todos los hoteles y los almacena en un objeto 
            res.send(Hoteles) // send permite enviar la respuesta al cliente 
        } catch (e) { // cuando la pagina no es validad la resspuesta entra por el catch
            res.status(500).send({ // muestra el estatus 
                messager: 'Error inesperado l'
            })
        }
    }
    else if ( name != '-1' && !city && !star) {
        try {
            const Hoteles = await hotelModel.find({nombre:{$regex:name,$options:'i'}}) //find busca todos los hoteles y los almacena en un objeto 
            res.send(Hoteles) // send permite enviar la respuesta al cliente 
        } catch (e) { // cuando la pagina no es validad la resspuesta entra por el catch
            res.status(500).send({ // muestra el estatus 
                messager: 'Error inesperado l'
            })
        }
    }
    else if ( name == '-1' && city && !star) {
        try {
            const Hoteles = await hotelModel.find({ciudad:city}) //find busca todos los hoteles y los almacena en un objeto 
            res.send(Hoteles) // send permite enviar la respuesta al cliente 
        } catch (e) { // cuando la pagina no es validad la resspuesta entra por el catch
            res.status(500).send({ // muestra el estatus 
                messager: 'Error inesperado l'
            })
        }
    }
    else if ( name == '-1' && !city && star) {
        try {
            const Hoteles = await hotelModel.find({estrellas:star}) //find busca todos los hoteles y los almacena en un objeto 
            res.send(Hoteles) // send permite enviar la respuesta al cliente 
        } catch (e) { // cuando la pagina no es validad la resspuesta entra por el catch
            res.status(500).send({ // muestra el estatus 
                messager: 'Error inesperado l'
            })
        }
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
            messager: 'Error inesperado o'
        })
    }
})

// PATCH = Permite modificar los hotel y actualizarlos en la base de datos 

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

// DELETE = Permite borrar los hotel de la base de datos 

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
router.use((req, res) => {// use = Nos permite crear una pagina por defecto para cuando la pagina solicitada por el cliente no exita.
    //res.status(404).sendFile('./views/404.html', { root: __dirname })
    res.status(404).render('404') // Envia el estatus 404 y el render me direcciona al archivo 404
})

module.exports = router
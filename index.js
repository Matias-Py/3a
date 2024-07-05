const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
const { v4: uuidv4 } = require('uuid');
app.use(express.static('dist'))
const Contacto = require('./models/mongo')


app.get('/contactos', (request, response) => {
    Contacto.find({}).then(contactos => {
        response.json(contactos)
    })
})

app.get('/contactos/:id', (request, response) => {
    Contacto.findById(request.params.id).then(contacto => {
        response.json(contacto)
    })
})


app.post('/contactos', (request, response) => {
    const body = request.body;
  
    if (!body.name) {
      return response.status(400).json({ error: 'Debe ingresar un nombre' });
    }
  
    const contacto = new Contacto({
      name: body.name,
      number: body.number,
    });
  
    contacto.save()
    .then((contactoGuardado) => {
      response.json(contactoGuardado);
      console.log('Enviado a Mongo!');
    })
    .catch(error=> {
      console.error(error);
      response.status(500).json({ error: 'Error interno del servidor' });
    })
  });
  

app.delete('/contactos/:id', (request, response) => {
    Contacto.findByIdAndDelete(request.params.id)
      .then(resultado => {
        response.status(204).end();
    })
      .catch(error => next(error));
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
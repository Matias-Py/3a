const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
const { v4: uuidv4 } = require('uuid');


let contactos = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Esta es mi API!</h1>')
})

app.get('/contactos', (request, response) => {
    response.json(contactos)
})

app.get('/contactos/:id', (request, response) => {
    const id = Number(request.params.id)
    const contacto = contactos.find(contacto => contacto.id === id)
    if(contacto){
        response.json(contacto)
    }else{
        response.status(404).end()
    }
})

app.post('/contactos',(request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Falta el nombre o el número del contacto'
        });
    }

    // Verifica si el nombre ya existe en la lista de contactos
    const nombreExistente = contactos.find(contacto => contacto.name === body.name);
    if (nombreExistente) {
        return response.status(400).json({
            error: 'El nombre del contacto ya existe en la agenda'
        });
    }
    
    const contacto = {
        id: uuidv4(),
        name: body.name,
        number: body.number
    }
    contactos.push(contacto)
    response.json(contacto)
})

app.delete('/contactos/:id', (request, response) => {
    const id = Number(request.params.id)
    contactos = contactos.filter(contacto => contacto.id !== id)
    console.log('contacto eliminado')
    response.status(204).end()
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
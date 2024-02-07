const mongoose = require('mongoose')
const Person = require('./mongo')
const express = require('express')
const captain_morgan = require('morgan')
const cors = require('cors')
const app = express()
captain_morgan.token('body', function (req, res) { return JSON.stringify(req.body) });

app.use(cors())  
app.use(express.json())
app.use(captain_morgan(':method :url :status :res[name-length] - :response-time ms :body'));
app.use(express.static('dist'))

///////////////////////GET

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

///////////////////////DELETE

app.delete('/api/persons/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const result = await Person.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      console.log(`deleted person with id ${id} from phonebook`);
      response.status(204).end();
    } else {
      response.status(404).send({ error: 'person not found' });
    }
  } catch (error) {
    next(error);
  }
});
    
///////////////////////POST

app.post('/api/persons', async (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: body.name },
      { number: body.number },
      { new: true, upsert: true }
    )

    console.log(`added or updated ${body.name} number ${body.number} in phonebook`)
    response.json(updatedPerson)
  } catch (error) {
    next(error)
  }
})

///////////////////////PUT

app.put('/api/persons/:id', async (request, response, next) => {
  const id = request.params.id;
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing' 
    });
  }

  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      id,
      { name: body.name, number: body.number },
      { new: true }
    );

    if (!updatedPerson) {
      return response.status(404).json({ 
        error: 'person not found' 
      });
    }

    console.log(`updated ${body.name} number ${body.number} in phonebook`)
    response.json(updatedPerson);
  } catch (error) {
    next(error);
  }
});

///////////////////////404 HANDLING
const unknownEndpoint = (request, response) => {response.status(404).send({ error: 'unknown endpoint' })}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
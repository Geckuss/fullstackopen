const mongoose = require('mongoose')
require('dotenv').config()
const action = process.argv[3]
const name = process.argv[4]
const number = process.argv[5]

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fullstack.6c7jpa4.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  }
})

const Person = mongoose.model('Person', personSchema)

if (action === 'get') {
  // List all persons
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (action === 'add') {
  // Add a new person
  const name = process.argv[4]
  const number = process.argv[5]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else if (action === 'delete') {
  // Delete a person
  Person.deleteOne({ name: name }).then(() => {
    console.log(`deleted ${name} from phonebook`)
    mongoose.connection.close()
  })
} else if (action === 'edit') {
  // Edit a person's number
  Person.findOneAndUpdate({ name: name }, { number: number }, { new: true }).then(() => {
    console.log(`changed ${name}'s number to ${number}`)
    mongoose.connection.close()
  })
}

module.exports = Person
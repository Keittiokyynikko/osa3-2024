const mongoose = require('mongoose')

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.9phs0.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    name: String,
    number: String,
})
  
const Person = mongoose.model('Person', noteSchema)

if(process.argv.length<4) {
    console.log("phonebook:")

    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })

} else {
    
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    
    person.save().then(result => {
        console.log(`added ${person.name} ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}
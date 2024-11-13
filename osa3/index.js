const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

morgan.token('content-data', function (req, res) {
    return JSON.stringify(req.body)
})

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content-data'))


let persons = [
    {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": "1"
    },
    {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": "2"
    },
    {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": "3"
    },
    {
    "id": "5",
    "name": "Anssi Asikainen",
    "number": "030-434334343"
    }
]

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/info", (request, response) => {
    const d = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${d}</p>`)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    response.json(person)
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

app.post("/api/persons/", (request, response) => {
    const id = Math.floor(Math.random() * 1000)
    const person = request.body
    const filterer = persons.find(p => p.name === person.name)

    if(person.name === "" || person.number === "") {
        return response.status(400).json({
            error: "Name or number is missing"
        })
    }

    if(filterer) {
        return response.status(400).json({
            error: "Name must be unique"
        })
    }

    person.id = String(id)
    console.log(person)
    persons = persons.concat(person)
    response.json(person)

})

const PORT = 3001 || process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
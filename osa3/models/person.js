const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

console.log(`connecting to ${url}`)

mongoose.connect(url)
.then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

function validator1(val) {
    return /\d{2,3}-\d{7,8}/.test(val)
}

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
    },
    number: {
        type: String,
        minlength: 8,
        validate: {
            validator: function validator1(val) {
                return /\d{2}-\d{7}/g.test(val)
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      }
})

module.exports = mongoose.model('Person', personSchema)
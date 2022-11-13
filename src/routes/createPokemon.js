const { Pokemon } = require('../db/sequelize')
const { ValidationError } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.post('/api/pokemons',auth,  (req, res) => {
    req.body.types = req.body.types.join()
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        if(error instanceof ValidationError){
          return res.status(400).json({message: error.message, data: error})
        }
        const message = `Un pokémon n'a pas pu être ajouté. Vérifiez bien les informations saisies.`
        res.status(500).json({message , data : error})
      })
  })
}
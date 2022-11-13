const { Pokemon } = require('../db/sequelize')
const { ValidationError } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.put('/api/pokemons/:id',auth, (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Pokemon.findByPk(id).then(pokemon => {
        if(pokemon === null){
          const message = `Le pokémon demandé n'existe pas. Réessayer avec un autre identifiant.`
          res.status(404).json({message , data : error})
        }
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.json({message, data: pokemon })
      })
    })
    .catch(error => {
      if(error instanceof ValidationError){
        return res.status(400).json({message: error.message, data: error})
      }
      const message = `Un pokémon n'a pas pu être modifié. Réessayer dans quelques instants.`
      res.status(500).json({message , data : error})
    })
  })
}
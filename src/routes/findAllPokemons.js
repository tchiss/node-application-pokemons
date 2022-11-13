const { Op } = require('sequelize')
const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = app => {
  app.get('/api/pokemons', auth , (req, res) => { //appliquer le middleware auth sur la route /api/pokemons
    const name = req.query.name
    const limit = parseInt(req.query.limit) || 5

    if(name){

      if(name.length < 2){
        const message = "Le terme de la recherche doit contenir au minimum 2 caractères"
        return res.status(400).json({message})
      }

      Pokemon.findAndCountAll({
        where : {
          name : {
            [Op.like] : `%${name}%`
          },
        },
        order : ['name'],
        limit : limit
      })
      .then( ({count , rows}) => {
        const message = `Il y ' a ${count} pokemons qui correspondent au terme de recherche ${name}.`
        res.json({ message, data: rows })
      })
      .catch(error => {
        const message = `La liste des pokémons n'a pas pu être récupérée. Vérifiez bien les informations saisies.`
        res.status(500).json({message , data : error})
      })
    }else{
    Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        const message = `La liste des pokémons n'a pas pu être récupérée. Vérifiez bien les informations saisies.`
        res.status(500).json({message , data : error})
      })
    }
  })
}
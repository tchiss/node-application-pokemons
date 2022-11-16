const { Sequelize, DataTypes } = require('sequelize') // ORM sequelize
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt')
  
let sequelize;

if(process.env.NODE_ENV === 'production')
{
  sequelize = new Sequelize('pokedex','root','', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: true
  })
}else{
  sequelize = new Sequelize('pokedex','root','password', {
    host: 'mariadb',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })
}

  
const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
  
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => { //force:true, mettre a jour la db sans probleme
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      }).then(pokemon => console.log(pokemon.toJSON())) //toJSON afficher les elements cles de notre objet 
    })

    bcrypt.hash('pikachu', 10)
          .then(hash => {
            User.create({
              username : "pikachu",
              password : hash
            })
          })

    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, Pokemon, User
}
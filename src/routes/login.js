const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
  
    User.findOne({ where: { username: req.body.username } }).then(user => {
      if(!user){
        const message = `L'utilisateur démandé n'existe pas.`;
        return res.status(404).json({message})
      }
      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if(isPasswordValid) {
          //JWT
          const token = jwt.sign( //generer un jeton JWT
            {userId : user.id},
            privateKey,
            {expiresIn : '24h'}
          )

          const message = `L'utilisateur a été connecté avec succès`;
          return res.json({ message, data: user, token })
        }
        const message = `Le mot de passe est incorrect.`
        return res.status(401).json({message})
      })
      .catch(_ => {
        const message = `L'utilisateur n'a pas pu se connecter. Vérifiez bien les informations saisies`;
        return res.status(400).json({ message })
      })
    })
  })
}
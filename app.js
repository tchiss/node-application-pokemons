const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const sequelize = require('./src/db/sequelize')
const cors = require('cors')

//creons nous memes notre propre middleware
/*app.use((req,res, next)=>{
    console.log(`URL ${req.url}`)
    next();
})
Middleware morgan fait la meme chose en moins de lignes de code
*/

//utilisation du middleware morgan pour l'affichage des messages http dans la console
app.use(favicon(__dirname + '/favicon.ico'))
   .use(bodyParser.json()) //parser toutes les donnees entrantes au format JSON, afin d'effectuer les POST... depuis insomnia ou postman
   .use(cors())
//il est possible de combiner plusieurs middlewares en les enchainant grace a la fonction next()
//morgan gere le next en interne

//initialisation de la db
sequelize.initDb() 

app.get('/', (req , res) => {
    res.json('Hello 👋')
})

//definitions des poins de terminaison
require('./src/routes/findAllPokemons')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app )

//On ajoute la gestion des erreurs 404
app.use(({res}) => {
    const message = "Impossible de trouver la resssource demandée ! Vous pouvez essayer une autre URL."
    res.status(404).json({message})
})

app.listen(port,() => console.log(`Le serveur a démarré sur http://localhost:${port}`))


/**
 * Erreurs techniques =>  ce qui est courant dans tous les API REST (acces a la bd , ressource introuvable ...)
 * Erreurs metiers => ce qui est specifique a chaque API
 * 
 * Gestion des erreurs sequelize
 * 
 *  - Validateurs (integrees et on peut aussi les creer) 
 * Si ca echoue , alors sequelize enverra aucune requete sql a la bd
 * 
 *  - Contraintes (regles definies directement au niveau de la bd)
 * Que ca ne respecte ou non les contraintes sequelize enverra tjrs une requete sql a la bd
 */


module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : {
          msg : 'Ce name est déjà pris.'
      }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt : { msg : 'Utilisez uniquement les nombres entiers pour les points de vie'},
          notNull : { msg : 'Les points de vie sont une propriété requise.'}
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
          return this.getDataValue('types').split(',')
        }, //obtenir ['' , '']
        set(types){
          this.setDataValue('types', types.toString().split(',').join())
        } //obtenir '',''
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }


'use strict';

module.exports = (sequelize, DataTypes) => {
  
  const users = sequelize.define('users', {

    UserId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,

    Username: {
      type: DataTypes.STRING,
      unique: true
    },

    Password: DataTypes.STRING,

    Email: {
        type: DataTypes.STRING,
        unique: true
      },

    Admin: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN   
    },

    createdAt: {
      allowNull: false,
      type: DataTypes.DATE   
    },

    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE   
    },

    Deleted: DataTypes.BOOLEAN

  }, {});


  // users.associate = function(models) {
    // associations can be defined here
  // };

  return users;
};
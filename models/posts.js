

'use strict';

module.exports = (sequelize, DataTypes) => {

  const posts = sequelize.define('posts', {

    PostId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    PostTitle: DataTypes.STRING,
    PostBody: DataTypes.STRING,

    UserId: {
      foreignKey: true,
      type: DataTypes.INTEGER
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

  // posts.associate = function(models) {
    // associations can be defined here
  // };

  return posts;
};


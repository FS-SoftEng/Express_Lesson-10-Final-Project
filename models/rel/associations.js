

module.exports = function(models) {

    models.users.belongsToMany(models.posts);

    models.posts.hasOne(models.users);
}


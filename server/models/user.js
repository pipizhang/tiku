'use strict';

export default (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    username: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    salt: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false}
  });

  User.associate = (models) => {
    User.hasMany(models.UserQuestion);
  };
  return User;
};

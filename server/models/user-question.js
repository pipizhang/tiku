'use strict';

export default (sequelize, DataTypes) => {
  let UserQuestion = sequelize.define('UserQuestion', {
    userId: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    questionId: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    correct: {type: DataTypes.INTEGER, defaultValue: 0},
    incorrect: {type: DataTypes.INTEGER, defaultValue: 0}
  });

  UserQuestion.associate = (models) => {
    UserQuestion.belongsTo(models.User, {foreignKey: 'userId'});
  };

  return UserQuestion;
};

'use strict';

export default (sequelize, DataTypes) => {
  let UserQuiz = sequelize.define('UserQuiz', {
    userId: DataTypes.INTEGER,
    isCompleted: DataTypes.BOOLEAN
  });

  UserQuiz.associate = (models) => {
    UserQuiz.hasMany(models.UserAnswer, {foreignKey: 'quizId'});
  };

  return UserQuiz;
};

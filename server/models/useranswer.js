'use strict';

export default (sequelize, DataTypes) => {
  let UserAnswer = sequelize.define('UserAnswer', {
    quizId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    choiceId: DataTypes.INTEGER,
    isCorrect: DataTypes.BOOLEAN
  });

  UserAnswer.associate = (models) => {
    UserAnswer.belongsTo(models.UserQuiz, {foreignKey: 'quizId'});
  };

  return UserAnswer;
};

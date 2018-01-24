'use strict';

export default (sequelize, DataTypes) => {
  let UserAnswer = sequelize.define('UserAnswer', {
    quizeId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    choiceId: DataTypes.INTEGER,
    isCorrect: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserAnswer;
};

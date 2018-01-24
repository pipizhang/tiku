'use strict';

export default (sequelize, DataTypes) => {
  let Choice = sequelize.define('Choice', {
    questionId: DataTypes.STRING,
    content: DataTypes.TEXT,
    isCorrect: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Choice;
};

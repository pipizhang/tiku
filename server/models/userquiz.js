'use strict';

export default (sequelize, DataTypes) => {
  let UserQuiz = sequelize.define('UserQuiz', {
    userId: DataTypes.INTEGER,
    isCompleted: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserQuiz;
};

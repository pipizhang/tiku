'use strict';

export default (sequelize, DataTypes) => {
  let Question = sequelize.define('Question', {
    content: DataTypes.STRING,
    explanation: DataTypes.TEXT,
    image: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Question;
};

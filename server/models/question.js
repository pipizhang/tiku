'use strict';

export default (sequelize, DataTypes) => {
  let Question = sequelize.define('Question', {
    content: {type: DataTypes.TEXT, allowNull: false},
    explanation: DataTypes.TEXT,
    image: DataTypes.STRING,
    category: DataTypes.STRING
  });

  Question.associate = (models) => {
    models.Question.hasMany(models.Choice);
  };
  return Question;
};

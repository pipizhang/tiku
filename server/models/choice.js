'use strict';

export default (sequelize, DataTypes) => {
  let Choice = sequelize.define('Choice', {
    questionId: {type: DataTypes.STRING, allowNull: false},
    content: {type: DataTypes.TEXT, allowNull: false},
    isCorrect: {type: DataTypes.BOOLEAN, defaultValue: false}
  });

  Choice.associate = (models) => {
    Choice.belongsTo(models.Question);
  };

  return Choice;
};

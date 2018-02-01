'use strict';

import BaseController from './base'
import models from '../models'
import formidable from 'formidable'

class QuestionController extends BaseController {

  constructor() {
    super();
  }

  async pick(req, res, next) {
    let sql = "select * from Questions where id not in (select questionId from UserQuestions where userId = ? and correct > incorrect) order by random() limit 1";
    let result = await models.sequelize.query(sql, {replacements: [req.session.user.id]});
    let question = []
    if (result[0].length < 1) {
      return super.resError(res, "No record");
    }

    question = result[0][0];
    let choices = await models.Choice.findAll({where: {questionId: question.id}, raw: true});
    question.choices = choices;

    super.resSuccess(res, question, "");
  }

  async getById(req, res, next) {
    const questionId = req.params.question_id;
    let question = await models.Question.findById(questionId, {raw: true});
    if (question) {
      let choices = await models.Choice.findAll({where: {questionId: questionId}, raw: true});
      question.choices = choices;
    } else {
      return super.resError(res, "No record");
    }
    super.resSuccess(res, question, "");
  }

  async answer(req, res, next) {
    const questionId = req.params.question_id;
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err !== null) {
        err.status = 400;
        return next(err);
      }

      let { choiceId = 0} = fields;
      let isCorrect = await models.Choice.count({where: {questionId: questionId, choiceId: choiceId, isCorrect: true}});
      let isOld =  models.UserQuestion.count(where: {userId: req.session.user.id, questionId: questionId});

      if (isOld > 0) {
        if (isCorrect > 0) {
          await models.sequelize.query(
            "Update UserQuestions SET correct=correct+1, updatedAt=? WHERE userId=? and questionsId=?",
            {replacements: [Date.now(), req.session.user.id, questionId]}
          );
        } else {
          await models.sequelize.query(
            "Update UserQuestions SET incorrect=incorrect+1, updatedAt=? WHERE userId=? and questionsId=?",
            {replacements: [Date.now(), req.session.user.id, questionId]}
          );
        }
      } else {
        await models.UserQuestion.create({
          userId: req.session.user.id,
          questionId: questionId,
          correct: isCorrect > 0 ? 1 : 0,
          incorrect: isCorrect > 0 ? 0 : 1,
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
      }

      super.resSuccess(res, null, "");
    });
  }

}

export default new QuestionController

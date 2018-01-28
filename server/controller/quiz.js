'use strict';

import BaseController from './base'
import models from '../models'

class QuizController extends BaseController {

  constructor() {
    super();
  }

  async chcekStatus(req, res, next) {
    let nCompleted = await models.UserQuiz.count({where: {userId: req.session.user.id, isCompleted: true}});
    let nIncompleted = await models.UserQuiz.count({where: {userId: req.session.user.id, isCompleted: false}});
    let incompleted = await models.UserQuiz.findOne({where: {userId: req.session.user.id, isCompleted: false}});

    super.resSuccess(res, {
      completed: nCompleted,
      incompleted: nIncompleted,
      current: (nIncompleted > 0) ? incompleted['id'] : null
    }, "");
  }

  async start(req, res, next) {
    let amount = req.params.n || 10;

    // Fetch answerd questions
    let userAnswers = await models.UserQuiz.findAll({
      attributes: ['id'],
      where: {userId: req.session.user.id},
      include: [{
        model: models.UserAnswer,
        required: true,
        attributes: ['questionId'],
        where: {isCorrect: true}
      }]
    });
    let answeredIds = [];
    userAnswers.forEach((item) => {
      answeredIds.push(item.id);
    });

    // Create Quiz
    let now = Date.now();
    let quiz = await models.UserQuiz.create({
      userId: req.session.user.id,
      isCompleted: false,
      createdAt: now,
      updatedAt: now
    });

    // Create Answers
    let w = "";
    if (answeredIds.length > 0) {
      w = "WHERE id not in ("+ answeredIds.join(",") +")";
    }
    let rest = await models.sequelize.query("SELECT id FROM Questions " + w + " ORDER BY random() LIMIT ?", {replacements: [amount]});
    rest[0].forEach((row) => {
      models.UserAnswer.create({
        quizId: quiz.id,
        questionId: row['id'],
        choiceId: 0,
        isCorrect: 0,
        createdAt: now,
        updatedAt: now
      });
    });

    super.resSuccess(res, {
      quizId: quiz.id
    }, "");
  }

  async stop(req, res, next) {

  }

  async getInfoById(req, res, next) {
    const quizId = req.params.quiz_id;
    let quiz = await models.User.findOne({where: {id: quizId, userId: req.session.user.id}});
    super.resSuccess(res, quiz, "");
  }

  async list(req, res, next) {
    let all = [];
    if (req.session.user && req.session.user.id) {
      all = await models.UserQuiz.findAll({where: {userId: req.session.user.id}});
    }
    super.resSuccess(res, all, "");
  }

  async answer(req, res, next) {

  }

}

export default new QuizController

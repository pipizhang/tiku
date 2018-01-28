'use strict';

import BaseController from './base'
import models from '../models'

class QuizController extends BaseController {

  constructor() {
    super();
  }

  async chcekStatus(req, res, next) {
    models.UserQuiz.findOne({where: {userId: req.session.user.id}});
  }

  async start(req, res, next) {
    let answer = await models.UserQuiz.findAll({include: [{model: models.UserAnswer, required: true}]});
    console.log(answer);
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

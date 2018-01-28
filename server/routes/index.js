'use strict';

import AccountController from '../controller/account'
import QuestionController from '../controller/question'

export default app => {

  app.get('/', (req, res, next) => {
    res.send("It works");
  });

  app.post('/login', AccountController.login);
  app.get('/logout', AccountController.logout);
  app.get('/question/pick', QuestionController.pick);
  app.get('/questions/:question_id', QuestionController.getById);
  app.post('/questions/:question_id', QuestionController.answer);

}

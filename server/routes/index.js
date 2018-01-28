'use strict';

import HomeController from '../controller/home'
import AccountController from '../controller/account'
import QuizController from '../controller/quiz'

export default app => {

  app.get('/', HomeController.index);

  app.post('/login', AccountController.login);
  app.get('/logout', AccountController.logout);

  app.get('/quiz/:quiz_id(^\d+$)', QuizController.getInfoById);
  app.post('/quiz', QuizController.start);
  app.get('/quizzies', QuizController.list);
  app.get('/quiz/status', QuizController.chcekStatus);

}

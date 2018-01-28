'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        username: 'test',
        password: 'dd6f3d56d09bde7e730dcd20f4d0e764',
        salt: '09420ff9db68025a5d2d54f79eaaed23',
        email: 'test@demo.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        username: 'peter',
        password: '21f5e26c3f29767bbab7f6bb6d4a06a8',
        salt: '4f88749663ac38966d133d041684b8ec',
        email: 'peter@demo.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

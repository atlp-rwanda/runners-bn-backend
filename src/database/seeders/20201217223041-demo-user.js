import passsword from '../../helpers/generatePassword';

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Users', [{
    firstName: 'John',
    lastName: 'requester',
    email: 'nyagatarejames@gmail.com',
    managerId: 2,
    role: 'requester',
    password: await passsword.encryptPassword('James@2020'),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Jane',
    lastName: 'manager',
    email: 'jimnyagtr@gmail.com',
    managerId: null,
    role: 'manager',
    password: await passsword.encryptPassword('James@2020'),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Joe',
    lastName: 'tripadmin',
    email: 'barefoottripadmin@runners.com',
    managerId: null,
    role: 'tripAdmin',
    password: await passsword.encryptPassword('James@2020'),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Jay',
    lastName: 'requester',
    email: 'jay@gmail.com',
    managerId: 2,
    role: 'requester',
    password: await passsword.encryptPassword('James@2020'),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Dan',
    lastName: 'superadmin',
    email: 'superadmin@runners.com',
    managerId: null,
    role: 'superAdmin',
    password: await passsword.encryptPassword('James@2020'),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  ], {}),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {})
};

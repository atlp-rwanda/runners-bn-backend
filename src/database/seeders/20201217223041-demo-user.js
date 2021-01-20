module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Users', [{
    firstName: 'John',
    lastName: 'requester',
    email: 'andelarunners@gmail.com',
    managerId: 2,
    role: 'requester',
    password: 'james',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Jane',
    lastName: 'manager',
    email: 'barefootmanager@runners.com',
    managerId: null,
    role: 'manager',
    password: 'james',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Joe',
    lastName: 'tripadmin',
    email: 'barefoottripadmin@runners.com',
    managerId: null,
    role: 'tripAdmin',
    password: 'james',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Dan',
    lastName: 'superadmin',
    email: 'superadmin@runners.com',
    managerId: null,
    role: 'superAdmin',
    password: 'james',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  ], {}),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {})
};

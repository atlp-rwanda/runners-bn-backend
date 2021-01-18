module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Users', [{
    firstName: 'John',
    lastName: 'requester',
    email: 'barefootrequester@runners.com',
    managerId: 2,
    role: 'requester',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Jane',
    lastName: 'manager',
    email: 'barefootmanager@runners.com',
    managerId: null,
    role: 'manager',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Joe',
    lastName: 'tripadmin',
    email: 'andelarunners@gmail.com',
    managerId: null,
    role: 'tripAdmin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Dan',
    lastName: 'superadmin',
    email: 'jimnyagtr@gmail.com',
    managerId: null,
    role: 'superAdmin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  ], {}),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {})
};

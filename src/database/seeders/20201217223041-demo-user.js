import passsword from '../../helpers/generatePassword';

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Users', [{
    firstName: 'Johnny',
    lastName: 'clown',
    email: 'nyagatarejames@gmail.com',
    managerId: 2,
    role: 'tripAdmin',
    password: await passsword.encryptPassword('Johnny@2020'),
    isVerified: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Janeyy',
    lastName: 'MCclain',
    email: 'jimnyagtr@gmail.com',
    managerId: null,
    role: 'tripAdmin',
    password: await passsword.encryptPassword('Janey@2020'),
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Joey',
    lastName: 'Admina',
    email: 'barefoottripadmin@runners.com',
    managerId: null,
    role: 'tripAdmin',
    password: await passsword.encryptPassword('Joey@2020'),
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Jayna',
    lastName: 'Remy',
    email: 'jaym@gmail.com',
    managerId: 2,
    role: 'manager',
    password: await passsword.encryptPassword('Jayna@2020'),
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Danny',
    lastName: 'supermanager',
    email: 'superadmin@runners.com',
    managerId: null,
    role: 'requester',
    password: await passsword.encryptPassword('Danny@2020'),
    isVerified: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Neya',
    lastName: 'Larrison',
    email: 'andelarunners@gmail.com',
    managerId: null,
    role: 'requester',
    password: await passsword.encryptPassword('Larri@2020'),
    isVerified: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  ], {}),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {})
};

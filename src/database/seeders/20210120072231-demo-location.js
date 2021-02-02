module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Locations', [{
    name: 'Kigali',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'NewYork',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Califonia',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Nebraska',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  ], {}),
  down: (queryInterface) => queryInterface.bulkDelete('Locations', null, {})
};

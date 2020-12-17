module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Users', [{
    id: '38eb202c-3f67-4eed-b7ac-9c31bc226e0c',
    first_name: 'Mucyo Aime Christian'
  },
  {
    id: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc',
    first_name: 'Nyagatare James',
  },
  ], {}),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {})
};

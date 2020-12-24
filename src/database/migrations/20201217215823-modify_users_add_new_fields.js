module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        default: Sequelize.fn('uuid_generate_v4'),
        primaryKey: true,
        type: Sequelize.UUID
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Users');
  }
};

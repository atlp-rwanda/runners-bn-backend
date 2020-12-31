module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Accommodation', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      accommodationName: {
        type: Sequelize.STRING,
        unique: true
      },
      accommodationType: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      createdBy: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      amenities: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      numberOfRooms: {
        type: Sequelize.INTEGER
      },
      latitude: {
        type: Sequelize.DECIMAL,
      },
      longitude: {
        type: Sequelize.DECIMAL,
      },
      locationId: {
        type: Sequelize.INTEGER
      },
      streetAddress: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface,) => {
    await queryInterface.dropTable('Accommodation');
  }
};

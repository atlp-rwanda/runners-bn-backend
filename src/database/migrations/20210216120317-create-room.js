module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      accommodationId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Accommodation',
          key: 'id',
        },
      },
      roomType: {
        type: Sequelize.STRING,
      },
      bedType: {
        type: Sequelize.STRING
      },
      roomCost: {
        type: Sequelize.INTEGER
      },
      roomNumber: {
        type: Sequelize.INTEGER,
      },
      photo: {
        type: Sequelize.ARRAY(Sequelize.STRING)
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
  down: async (queryInterface) => {
    await queryInterface.dropTable('Rooms');
  }
};

const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Email extends Model {
    static associate(models) {}

    async validatePassword(password) {
      return await bcrypt.comparePassword(password, this.password);
    }
  }
  Email.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      expireAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Email",
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );
  return Email;
};

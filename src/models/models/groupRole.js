"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class groupRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  groupRole.init(
    {
      roleId: DataTypes.INTEGER,
      groupId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "groupRole",
      tableName: "grouprole",
    },
  );
  return groupRole;
};

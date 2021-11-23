'use strict';
const { hash } = require('bcryptjs');
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Detail, {
        foreignKey: 'userId',
        sourceKey: 'id',
        as: 'detail_user',
      });
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: 'invalid email format',
          },
        },
        unique: {
          args: true,
          msg: 'The email already registered',
        },
      },
      username: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: 'The username is already registerd',
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [6],
            msg: 'password at least 6 characters',
          },
        },
      },
      total_score: DataTypes.INTEGER,
      bio: DataTypes.STRING,
      location: DataTypes.STRING,
      social_media_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: (user, options) => {
          user.password = hashPassword(user.password);
        },
      },
    }
  );
  User.addHook('beforeBulkUpdate', (user, options) => {
    user.attributes.password = hashPassword(user.attributes.password);
  });
  return User;
};

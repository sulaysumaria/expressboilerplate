const mongoose = require('mongoose');

const {hashString} = require('./../helpers/excryption.helper');

const modelName = 'user';
const schema = new mongoose.Schema(
    {
      name: {type: String},
      email: {type: String},
      salt: {type: String},
      password: {type: String},
      status: {type: String},
    },
    {timestamps: true}
);

/**
 * User Class
 *
 * Extends Mongoose Class
 */
class User {
  /**
   * Check if user's password is valid
   * @param {String} password
   */
  async isPasswordValid(password) {
    const hashedPassword = hashString(password, this.salt);

    return hashedPassword === this.password;
  }

  /**
   * Check if email is available for registration
   * @param {String} email
   */
  static async isEmailAvailable(email) {
    const emailExists = await this.countDocuments({email});

    return !(emailExists > 0);
  }
}

schema.loadClass(User);

module.exports = mongoose.model(modelName, schema);

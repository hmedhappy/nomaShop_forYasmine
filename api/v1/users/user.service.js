const pool = require('../../../config/pool');
var { now } = require('../../../utils/CurrentDateTime');
var { myRnId } = require('../../../utils/randomNumber');

/**
 * users services
 */
module.exports = {
  /**
   * sign up user
   * @param {Object} data
   * @param {Function} callback
   */
  register: async (data, callback) => {
    const MoreData = {
      code: myRnId(),
      created_at: now,
    };
    const allData = Object.assign({}, data, MoreData);
    await pool.query(
      `INSERT INTO users(${Object.keys(allData).map((key) => key)})
      VALUES(${Object.keys(allData).map((key) => `'${allData[key]}'`)})`,

      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  checkEmailAndUsername: async ({ email, username }, callback) => {
    await pool.query(
      `SELECT * FROM users
      WHERE email = '${email}' or username = '${username}'  `,
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }

        return callback(null, results.rowCount ? true : false);
      }
    );
  },

  /**
   * user authentication
   * @param {String} email
   * @param {Function} callback
   */
  login: (email, callback) => {
    pool.query(
      `SELECT *
      FROM users
      WHERE email = $1`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }

        return callback(null, results.rows[0]);
      }
    );
  },
  /**
   * get all users list
   * @param {Function} callback
   */
  getUsers: (callback) => {
    pool.query(`SELECT * FROM users`, [], (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results.rows);
    });
  },

  /**
   * get user by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getUserById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM users
      WHERE id = $1`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }

        return callback(null, results.rows[0]);
      }
    );
  },

  /**
   * update user password
   * @param {Object} data
   * @param {Function} callback
   */
  updatePassword: (data, callback) => {
    pool.query(
      `UPDATE users
      SET password=$1
      WHERE id = $2`,
      [data.password, data.id],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  /**
   * update user info
   * @param {Object} data
   * @param {Function} callback
   */
  updateProfile: (data, callback) => {
    pool.query(
      `UPDATE users
      SET username=$1,
      email=$2
      WHERE id = $3`,
      [data.username, data.email, data.id],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};

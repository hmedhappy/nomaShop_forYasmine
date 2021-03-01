const pool = require('../../../config/pool');
var CurrentDateTime = require('../../../utils/CurrentDateTime');

/**
 * Roles services
 */
module.exports = {
  /**
   * get all Roles list
   * @param {Function} callback
   */
  getRoles: (callback) => {
    pool.query(`SELECT * FROM roles`, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get Role by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getRoleById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM roles
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
   * add Role
   * @param {Integer} data
   * @param {Function} callback
   */
  addRole: (data, callback) => {
    pool.query(
      `INSERT INTO public.roles(
        ${Object.keys(data).map((key) => key)})
      VALUES (${Object.keys(data).map((key) => `'${data[key]}'`)});
    `,
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results.rows);
      }
    );
  },
  /**
   * delete Role by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deleteRoleById: (id, callback) => {
    pool.query(
      `DELETE FROM public.roles
      WHERE id=${id};`,
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }

        return callback(null, results.rowCount ? 'Deleted' : 'Not Found');
      }
    );
  },
  /**
   * update Role by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updateRoleById: (id, data, callback) => {
    pool.query(
      `UPDATE public.Roles
	SET ${Object.keys(data).map((key) => `${key}='${data[key]}'`)}
	WHERE id=${id};`,
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

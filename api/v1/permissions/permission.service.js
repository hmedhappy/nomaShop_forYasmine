const pool = require('../../../config/pool');
var CurrentDateTime = require('../../../utils/CurrentDateTime');

/**
 * Permissions services
 */
module.exports = {
  /**
   * get all Permissions list
   * @param {Function} callback
   */
  getPermissions: (callback) => {
    pool.query(`SELECT * FROM permissions`, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get Permission by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getPermissionById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM permissions
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
   * add Permission
   * @param {Integer} data
   * @param {Function} callback
   */
  addPermission: (data, callback) => {
    pool.query(
      `INSERT INTO public.permissions(
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
   * delete Permission by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deletePermissionById: (id, callback) => {
    pool.query(
      `DELETE FROM public.permissions
      WHERE id=${id};`,
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }

        return callback(null, results.rows[0]);
      }
    );
  },
  /**
   * update Permission by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updatePermissionById: (id, data, callback) => {
    pool.query(
      `UPDATE public.permissions
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

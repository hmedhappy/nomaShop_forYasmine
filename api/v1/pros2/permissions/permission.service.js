const pool = require('../../../config/pool');

/**
 * permissions services
 */
module.exports = {
  /**
   * get all permissions list
   * @param {Function} callback
   */
  getpermissions: (callback) => {
    pool.query(`SELECT * FROM permissions`, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get permission by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getpermissionById: (id, callback) => {
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
   * add permission
   * @param {Integer} data
   * @param {Function} callback
   */
  addpermission: (data, callback) => {
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
   * delete permission by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deletepermissionById: (id, callback) => {
    pool.query(
      `DELETE FROM public.permissions
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
   * update permission by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updatepermissionById: (id, data, callback) => {
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

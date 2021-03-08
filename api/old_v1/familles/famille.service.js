const pool = require('../../../config/pool');
var CurrentDateTime = require('../../../utils/CurrentDateTime');

/**
 * familles services
 */
module.exports = {
  /**
   * get all familles list
   * @param {Function} callback
   */
  getfamilles: (callback) => {
    pool.query(`SELECT * FROM familles`, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get famille by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getfamilleById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM familles
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
   * add famille
   * @param {Integer} data
   * @param {Function} callback
   */
  addfamille: (data, callback) => {
    pool.query(
      `INSERT INTO public.familles(
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
   * delete famille by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deletefamilleById: (id, callback) => {
    pool.query(
      `DELETE FROM public.familles
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
   * update famille by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updatefamilleById: (id, data, callback) => {
    pool.query(
      `UPDATE public.familles
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

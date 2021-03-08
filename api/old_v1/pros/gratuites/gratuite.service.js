const pool = require('../../../config/pool');
var CurrentDateTime = require('../../../utils/CurrentDateTime');

/**
 * gratuites services
 */
module.exports = {
  /**
   * get all gratuites list
   * @param {Function} callback
   */
  getgratuites: (callback) => {
    pool.query(`SELECT * FROM gratuites`, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get gratuite by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getgratuiteById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM gratuites
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
   * add gratuite
   * @param {Integer} data
   * @param {Function} callback
   */
  addgratuite: (data, callback) => {
    pool.query(
      `INSERT INTO public.gratuites(
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
   * delete gratuite by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deletegratuiteById: (id, callback) => {
    pool.query(
      `DELETE FROM public.gratuites
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
   * update gratuite by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updategratuiteById: (id, data, callback) => {
    pool.query(
      `UPDATE public.gratuites
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

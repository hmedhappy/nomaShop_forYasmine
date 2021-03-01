const pool = require('../../../config/pool');
var CurrentDateTime = require('../../../utils/CurrentDateTime');

/**
 * conditiongratuites services
 */
module.exports = {
  /**
   * get all conditiongratuites list
   * @param {Function} callback
   */
  getconditiongratuites: (callback) => {
    pool.query(`SELECT * FROM conditiongratuites`, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get conditiongratuite by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getconditiongratuiteById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM conditiongratuites
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
   * add conditiongratuite
   * @param {Integer} data
   * @param {Function} callback
   */
  addconditiongratuite: (data, callback) => {
    pool.query(
      `INSERT INTO public.conditiongratuites(
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
   * delete conditiongratuite by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deleteconditiongratuiteById: (id, callback) => {
    pool.query(
      `DELETE FROM public.conditiongratuites
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
   * update conditiongratuite by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updateconditiongratuiteById: (id, data, callback) => {
    pool.query(
      `UPDATE public.conditiongratuites
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

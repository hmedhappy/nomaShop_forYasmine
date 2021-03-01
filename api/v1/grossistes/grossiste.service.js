const pool = require('../../../config/pool');
var CurrentDateTime = require('../../../utils/CurrentDateTime');

/**
 * Grossistes services
 */
module.exports = {
  /**
   * get all Grossistes list
   * @param {Function} callback
   */
  getGrossistes: (callback) => {
    pool.query(`SELECT * FROM grossistes ;`, (error, results, fields) => {
      console.log(results);
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get Grossiste by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getGrossisteById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM grossistes
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
   * add Grossiste
   * @param {Integer} data
   * @param {Function} callback
   */
  addGrossiste: (data, callback) => {
    pool.query(
      `INSERT INTO public.grossistes(
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
   * delete Grossiste by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deleteGrossisteById: (id, callback) => {
    pool.query(
      `DELETE FROM public.grossistes
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
   * update Grossiste by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updateGrossisteById: (id, data, callback) => {
    pool.query(
      `UPDATE public.grossistes
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

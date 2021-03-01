const pool = require('../../../config/pool');
var CurrentDateTime = require('../../../utils/CurrentDateTime');

/**
 * sousFamilles services
 */
module.exports = {
  /**
   * get all sousFamilles list
   * @param {Function} callback
   */
  getsousFamilles: (callback) => {
    pool.query(`SELECT * FROM sousFamilles`, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get sousFamille by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getsousFamilleById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM sousFamilles
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
   * add sousFamille
   * @param {Integer} data
   * @param {Function} callback
   */
  addsousFamille: (data, callback) => {
    pool.query(
      `INSERT INTO public.sousFamilles(
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
   * delete sousFamille by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deletesousFamilleById: (id, callback) => {
    pool.query(
      `DELETE FROM public.sousFamilles
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
   * update sousFamille by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updatesousFamilleById: (id, data, callback) => {
    pool.query(
      `UPDATE public.sousFamilles
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

const pool = require('../../../config/pool');
var CurrentDateTime = require('../../../utils/CurrentDateTime');

/**
 * sousFamille services
 */
module.exports = {
  /**
   * get all sousFamille list
   * @param {Function} callback
   */
  getsousFamilles: (callback) => {
    pool.query(`SELECT * FROM sousfamilles ;`, (error, results, fields) => {
      console.log(results);
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
      FROM sousfamilles
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
      `INSERT INTO public.sousfamilles(
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
      `DELETE FROM public.sousfamilles
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

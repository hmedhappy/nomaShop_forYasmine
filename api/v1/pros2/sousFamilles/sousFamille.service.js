const pool = require('../../../config/pool');

/**
 * sousfamilles services
 */
module.exports = {
  /**
   * get all sousfamilles list
   * @param {Function} callback
   */
  getsousfamilles: (callback) => {
    pool.query(`SELECT * FROM sousfamilles`, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get sousfamille by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getsousfamilleById: (id, callback) => {
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
   * add sousfamille
   * @param {Integer} data
   * @param {Function} callback
   */
  addsousfamille: (data, callback) => {
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
   * delete sousfamille by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deletesousfamilleById: (id, callback) => {
    pool.query(
      `DELETE FROM public.sousfamilles
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
   * update sousfamille by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updatesousfamilleById: (id, data, callback) => {
    pool.query(
      `UPDATE public.sousfamilles
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

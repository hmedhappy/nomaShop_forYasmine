const pool = require('../../../config/pool');
var CurrentDateTime = require('../../../utils/CurrentDateTime');

/**
 * Gammes services
 */
module.exports = {
  /**
   * get all Gammes list
   * @param {Function} callback
   */
  getGammes: (callback) => {
    pool.query(`SELECT * FROM gammes ;`, (error, results, fields) => {
      console.log(results);
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get Gamme by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getGammeById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM Gammes
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
   * add Gamme
   * @param {Integer} data
   * @param {Function} callback
   */
  addGamme: (data, callback) => {
    pool.query(
      `INSERT INTO public.gammes(
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
   * delete Gamme by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deleteGammeById: (id, callback) => {
    pool.query(
      `DELETE FROM public.gammes
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
   * update Gamme by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updateGammeById: (id, data, callback) => {
    pool.query(
      `UPDATE public.gammes
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

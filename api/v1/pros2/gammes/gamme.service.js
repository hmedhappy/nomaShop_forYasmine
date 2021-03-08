const pool = require('../../../config/pool');

/**
 * gammes services
 */
module.exports = {
  /**
   * get all gammes list
   * @param {Function} callback
   */
  getgammes: (callback) => {
    pool.query(`SELECT * FROM gammes`, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get gamme by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getgammeById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM gammes
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
   * add gamme
   * @param {Integer} data
   * @param {Function} callback
   */
  addgamme: (data, callback) => {
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
   * delete gamme by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deletegammeById: (id, callback) => {
    pool.query(
      `DELETE FROM public.gammes
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
   * update gamme by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updategammeById: (id, data, callback) => {
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

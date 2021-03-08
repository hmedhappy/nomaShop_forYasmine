const pool = require('../../../config/pool');

/**
 * marques services
 */
module.exports = {
  /**
   * get all marques list
   * @param {Function} callback
   */
  getmarques: (callback) => {
    pool.query(`SELECT * FROM marques`, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get marque by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getmarqueById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM marques
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
   * add marque
   * @param {Integer} data
   * @param {Function} callback
   */
  addmarque: (data, callback) => {
    pool.query(
      `INSERT INTO public.marques(
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
   * delete marque by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deletemarqueById: (id, callback) => {
    pool.query(
      `DELETE FROM public.marques
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
   * update marque by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updatemarqueById: (id, data, callback) => {
    pool.query(
      `UPDATE public.marques
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

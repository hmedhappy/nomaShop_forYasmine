const pool = require('../../../config/pool');
var CurrentDateTime = require('../../../utils/CurrentDateTime');

/**
 * Marques services
 */
module.exports = {
  /**
   * get all Marques list
   * @param {Function} callback
   */
  getMarques: (callback) => {
    pool.query(`SELECT * FROM marques ;`, (error, results, fields) => {
      console.log(results);
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get Marque by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getMarqueById: (id, callback) => {
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
   * add Marque
   * @param {Integer} data
   * @param {Function} callback
   */
  addMarque: (data, callback) => {
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
   * delete Marque by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deleteMarqueById: (id, callback) => {
    pool.query(
      `DELETE FROM public.marques
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
   * update Marque by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updateMarqueById: (id, data, callback) => {
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

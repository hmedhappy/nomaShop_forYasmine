const pool = require('../../../config/pool');
var CurrentDateTime = require('../../../utils/CurrentDateTime');

/**
 * Famille services
 */
module.exports = {
  /**
   * get all Famille list
   * @param {Function} callback
   */
  getFamilles: (callback) => {
    pool.query(`SELECT * FROM familles ;`, (error, results, fields) => {
      console.log(results);
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get Famille by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getFamilleById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM Familles
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
   * add Famille
   * @param {Integer} data
   * @param {Function} callback
   */
  addFamille: (data, callback) => {
    pool.query(
      `INSERT INTO public.familles(
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
   * delete Famille by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deleteFamilleById: (id, callback) => {
    pool.query(
      `DELETE FROM public.familles
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
   * update Famille by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updateFamilleById: (id, data, callback) => {
    pool.query(
      `UPDATE public.familles
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

const pool = require('../../../config/pool');
var CurrentDateTime = require('../../../utils/CurrentDateTime');

/**
 * Fournisseurs services
 */
module.exports = {
  /**
   * get all Fournisseurs list
   * @param {Function} callback
   */
  getFournisseurs: (callback) => {
    pool.query(`SELECT * FROM fournisseurs`, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get Fournisseur by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getFournisseurById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM fournisseurs
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
   * add Fournisseur
   * @param {Integer} data
   * @param {Function} callback
   */
  addFournisseur: (data, callback) => {
    pool.query(
      `INSERT INTO public.fournisseurs(
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
   * delete Fournisseur by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deleteFournisseurById: (id, callback) => {
    pool.query(
      `DELETE FROM public.fournisseurs
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
   * update Fournisseur by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updateFournisseurById: (id, data, callback) => {
    pool.query(
      `UPDATE public.fournisseurs
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

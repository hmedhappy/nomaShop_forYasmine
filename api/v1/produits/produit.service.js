const pool = require('../../../config/pool');
var CurrentDateTime = require('../../../utils/CurrentDateTime');

/**
 * produits services
 */
module.exports = {
  /**
   * get all produits list
   * @param {Function} callback
   */
  getProduits: (callback) => {
    pool.query(`SELECT * FROM produits`, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get produit by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getProduitById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM produits
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
   * add produit
   * @param {Integer} data
   * @param {Function} callback
   */
  addProduit: (data, callback) => {
    pool.query(
      `INSERT INTO public.produits(${Object.keys(data).map((key) => [key])})
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
   * delete produit by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deleteProduitById: (id, callback) => {
    pool.query(
      `DELETE FROM public.produits
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
   * update produit by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updateProduitById: (id, data, callback) => {
    pool.query(
      `UPDATE public.produits
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

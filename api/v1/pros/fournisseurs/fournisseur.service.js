const pool = require('../../../config/pool');
var CurrentDateTime = require('../../../utils/CurrentDateTime');

/**
 * fournisseurs services
 */
module.exports = {
  /**
   * get all fournisseurs list
   * @param {Function} callback
   */
  getfournisseurs: (callback) => {
    pool.query(`SELECT * FROM fournisseurs`, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get fournisseur by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getfournisseurById: (id, callback) => {
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
   * add fournisseur
   * @param {Integer} data
   * @param {Function} callback
   */
  addfournisseur: (data, callback) => {
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
   * delete fournisseur by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deletefournisseurById: (id, callback) => {
    pool.query(
      `DELETE FROM public.fournisseurs
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
   * update fournisseur by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updatefournisseurById: (id, data, callback) => {
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

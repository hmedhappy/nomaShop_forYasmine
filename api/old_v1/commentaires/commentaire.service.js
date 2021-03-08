const pool = require('../../../config/pool');
var CurrentDateTime = require('../../../utils/CurrentDateTime');

/**
 * commentaires services
 */
module.exports = {
  /**
   * get all commentaires list
   * @param {Function} callback
   */
  getcommentaires: (callback) => {
    pool.query(`SELECT * FROM commentaires`, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get commentaire by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getcommentaireById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM commentaires
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
   * add commentaire
   * @param {Integer} data
   * @param {Function} callback
   */
  addcommentaire: (data, callback) => {
    pool.query(
      `INSERT INTO public.commentaires(
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
   * delete commentaire by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deletecommentaireById: (id, callback) => {
    pool.query(
      `DELETE FROM public.commentaires
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
   * update commentaire by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updatecommentaireById: (id, data, callback) => {
    pool.query(
      `UPDATE public.commentaires
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

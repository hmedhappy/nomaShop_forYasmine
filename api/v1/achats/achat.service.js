const pool = require('../../../config/pool');
var CurrentDateTime = require('../../../utils/CurrentDateTime');

/**
 * Achats services
 */
module.exports = {
  /**
   * get all Achats list
   * @param {Function} callback
   */
  getAchats: (callback) => {
    pool.query(`SELECT * FROM achats ;`, (error, results, fields) => {
      console.log(results);
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get Achat by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getAchatById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM achats
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
   * add Achat
   * @param {Integer} data
   * @param {Function} callback
   */
  addAchat: (data, callback) => {
    pool.query(
      `INSERT INTO public.achats(
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
   * delete Achat by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deleteAchatById: (id, callback) => {
    pool.query(
      `DELETE FROM public.achats
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
   * update Achat by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updateAchatById: (id, data, callback) => {
    pool.query(
      `UPDATE public.achats
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

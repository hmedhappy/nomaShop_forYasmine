const pool = require('../../../config/pool');
var CurrentDateTime = require('../../../utils/CurrentDateTime');

/**
 * Groupes services
 */
module.exports = {
  /**
   * get all Groupes list
   * @param {Function} callback
   */
  getGroupes: (callback) => {
    pool.query(`SELECT * FROM groupes ;`, (error, results, fields) => {
      console.log(results);
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get Groupe by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getGroupeById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM groupes
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
   * add Groupe
   * @param {Integer} data
   * @param {Function} callback
   */
  addGroupe: (data, callback) => {
    pool.query(
      `INSERT INTO public.groupes(
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
   * delete Groupe by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deleteGroupeById: (id, callback) => {
    pool.query(
      `DELETE FROM public.groupes
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
   * update Groupe by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updateGroupeById: (id, data, callback) => {
    pool.query(
      `UPDATE public.groupes
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

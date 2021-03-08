const pool = require('../../../config/pool');
var CurrentDateTime = require('../../../utils/CurrentDateTime');

/**
 * groupes services
 */
module.exports = {
  /**
   * get all groupes list
   * @param {Function} callback
   */
  getgroupes: (callback) => {
    pool.query(`SELECT * FROM groupes`, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get groupe by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getgroupeById: (id, callback) => {
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
   * add groupe
   * @param {Integer} data
   * @param {Function} callback
   */
  addgroupe: (data, callback) => {
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
   * delete groupe by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deletegroupeById: (id, callback) => {
    pool.query(
      `DELETE FROM public.groupes
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
   * update groupe by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updategroupeById: (id, data, callback) => {
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

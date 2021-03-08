const pool = require('../../../config/pool');

/**
 * fidelites services
 */
module.exports = {
  /**
   * get all fidelites list
   * @param {Function} callback
   */
  getfidelites: (callback) => {
    pool.query(`SELECT * FROM fidelites`, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get fidelite by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getfideliteById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM fidelites
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
   * add fidelite
   * @param {Integer} data
   * @param {Function} callback
   */
  addfidelite: (data, callback) => {
    pool.query(
      `INSERT INTO public.fidelites(
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
   * delete fidelite by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deletefideliteById: (id, callback) => {
    pool.query(
      `DELETE FROM public.fidelites
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
   * update fidelite by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updatefideliteById: (id, data, callback) => {
    pool.query(
      `UPDATE public.fidelites
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

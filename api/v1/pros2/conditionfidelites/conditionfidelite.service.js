const pool = require('../../../config/pool');

/**
 * conditionfidelites services
 */
module.exports = {
  /**
   * get all conditionfidelites list
   * @param {Function} callback
   */
  getconditionfidelites: (callback) => {
    pool.query(`SELECT * FROM conditionfidelites`, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get conditionfidelite by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getconditionfideliteById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM conditionfidelites
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
   * add conditionfidelite
   * @param {Integer} data
   * @param {Function} callback
   */
  addconditionfidelite: (data, callback) => {
    pool.query(
      `INSERT INTO public.conditionfidelites(
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
   * delete conditionfidelite by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deleteconditionfideliteById: (id, callback) => {
    pool.query(
      `DELETE FROM public.conditionfidelites
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
   * update conditionfidelite by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updateconditionfideliteById: (id, data, callback) => {
    pool.query(
      `UPDATE public.conditionfidelites
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

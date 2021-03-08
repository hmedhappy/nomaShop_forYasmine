const pool = require('../../../config/pool');

/**
 * grossistes services
 */
module.exports = {
  /**
   * get all grossistes list
   * @param {Function} callback
   */
  getgrossistes: (callback) => {
    pool.query(`SELECT * FROM grossistes`, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get grossiste by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getgrossisteById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM grossistes
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
   * add grossiste
   * @param {Integer} data
   * @param {Function} callback
   */
  addgrossiste: (data, callback) => {
    pool.query(
      `INSERT INTO public.grossistes(
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
   * delete grossiste by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deletegrossisteById: (id, callback) => {
    pool.query(
      `DELETE FROM public.grossistes
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
   * update grossiste by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updategrossisteById: (id, data, callback) => {
    pool.query(
      `UPDATE public.grossistes
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

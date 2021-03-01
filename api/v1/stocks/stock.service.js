const pool = require('../../../config/pool');
var CurrentDateTime = require('../../../utils/CurrentDateTime');

/**
 * stocks services
 */
module.exports = {
  /**
   * get all stocks list
   * @param {Function} callback
   */
  getstocks: (callback) => {
    pool.query(`SELECT * FROM stocks`, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  /**
   * get stock by Id
   * @param {Integer} id
   * @param {Function} callback
   */
  getstockById: (id, callback) => {
    pool.query(
      `SELECT *
      FROM stocks
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
   * add stock
   * @param {Integer} data
   * @param {Function} callback
   */
  addstock: (data, callback) => {
    pool.query(
      `INSERT INTO public.stocks(
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
   * delete stock by id
   * @param {Integer} id
   * @param {Function} callback
   */
  deletestockById: (id, callback) => {
    pool.query(
      `DELETE FROM public.stocks
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
   * update stock by id
   * @param {Integer} id
   * @param {Object} data
   * @param {Function} callback
   */
  updatestockById: (id, data, callback) => {
    pool.query(
      `UPDATE public.stocks
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

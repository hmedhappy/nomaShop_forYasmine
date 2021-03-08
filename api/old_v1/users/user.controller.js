const {
  register,
  getUsers,
  getUserById,
  updatePassword,
  updateProfile,
  login,
  checkEmailAndUsername,
} = require('./user.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const NumRandom = require('../../../utils/randomNumber');

/**
 * user controller
 */
module.exports = {
  /**
   * add new user record
   * @param {Object} req
   * @param {Object} res
   */
  register: (req, res) => {
    const body = req.body;
    //Check username OR email exist
    checkEmailAndUsername(body, (err, exist) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: err,
        });
      }
      if (exist) {
        return res.status(400).json({
          success: 0,
          message: 'Utilisateur Déja inscrit avec cet email ou username',
        });
      }
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      // test if file is not empty
      if (!req.file || !req.file.path) {
        // console.log(body);
      } else {
        body.image = req.file.path;
      }
      register(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: err,
          });
        }
        return res.status(200).json({
          success: 1,
          message: 'Utilisateur Ajouté',
          data: results.data,
        });
      });
    });
  },
  /**
   * user login
   * @param {Object} req
   * @param {Object} res
   */
  login: (req, res) => {
    const body = req.body;

    login(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: 'invalide email or password',
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, 'qwe1234');
        //if you went to add expire token after 24h
        // const jsontoken = sign({ result: results }, "qwe1234", {expiresIn: "24h"});
        // Choose the data to send back
        const { code, email, username, name, lastname } = results;
        return res.json({
          success: 'login ok',
          token: jsontoken,
          results: { code, email, username, name, lastname },
        });
      } else {
        return res.json({
          success: 0,
          data: 'Invalide email or password',
        });
      }
    });
  },
  /**
   * get list of users
   * @param {Object} req
   * @param {Object} res
   */
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  /**
   * get user by id
   * @param {Object} req
   * @param {Object} res
   */
  getUserById: (req, res) => {
    const id = req.params.id;
    getUserById(id, (err, results) => {
      if (err || !results) {
        console.log(err);
        return res.json({
          success: 0,
          data: !results ? 'records empty' : 'Invalide User',
        });
      }
      return res.json(results);
    });
  },
  /**
   * update user info
   * @param {Object} req
   * @param {Object} res
   */
  updateProfile: (req, res) => {
    const body = req.body;
    updateProfile(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: err,
        });
      }
      return res.json({
        message: 1,
        message: 'profile updated',
      });
    });
  },
  /**
   * update user password
   * @param {Object} req
   * @param {Object} res
   */
  updatePassword: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updatePassword(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: err,
        });
      }
      return res.json({
        message: 1,
        message: 'password updated',
      });
    });
  },
};

const {
  getFournisseurs,
  getFournisseurById,
  addFournisseur,
  deleteFournisseurById,
  updateFournisseurById,
} = require('./fournisseur.controller');
const { checkToken } = require('../../../auth/token_validation');
const router = require('express').Router();
const myMulter = require('../../../middleware/multer');
const rateLimit = require('express-rate-limit');

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    'Too many accounts created from this IP, please try again after an hour',
});

/** POST /api/v1/users/register - Create new user */
router.get('/', checkToken, getFournisseurs);
/** POST /api/v1/users/register - Create new user */
router.post('/', addFournisseur);
/** GET /api/v1/users/:id - Get user by id */
router.get('/:id', checkToken, getFournisseurById);
/** POST /api/v1/users/login - Authenticate user */
router.delete('/:id', deleteFournisseurById);
/** POST /api/v1/users/login - Authenticate user */
router.patch('/:id', updateFournisseurById);

module.exports = router;

/* ******************************* */
// import packages that we need
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const http = require('http');
var compression = require('compression');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');
const rateLimit = require('express-rate-limit');

const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Time to document that Express API you built',
      version: '1.0.0',
      description:
        'A test project to understand how easy it is to document and Express API',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
      contact: {
        name: 'Swagger',
        url: 'https://swagger.io',
        email: 'Info@SmartBear.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    definitions: {
      UserRegister: {
        properties: {
          code: {
            type: 'string',
          },
          username: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
        },
      },
      UserLogin: {
        properties: {
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
        },
      },
      AddAchat: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          type_achat: {
            type: 'string',
          },
          date_achat: {
            type: 'Date',
          },
          mode_paiement: {
            type: 'Enum',
          },
        },
      },
      Addrole: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          libelle: {
            type: 'string',
          },
          type: {
            type: 'Date',
          },
        },
      },
      AddProduits: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          code_a_barre: {
            type: 'string',
          },
          collisage: {
            type: 'string',
          },
          famille_code: {
            type: 'string',
          },
          fournisseur_code: {
            type: 'string',
          },
          gamme_code: {
            type: 'string',
          },
          image: {
            type: 'string',
          },
          libelle: {
            type: 'string',
          },
          marque_code: {
            type: 'string',
          },
          ordre: {
            type: 'string',
          },
          prix_achat_ht: {
            type: 'string',
          },
          prix_achat_ttc: {
            type: 'string',
          },
          prix_vente_ht: {
            type: 'string',
          },
          prix_vente_ttc: {
            type: 'string',
          },
          sousfamille_code: {
            type: 'string',
          },
          tva: {
            type: 'string',
          },
        },
      },
      AddMarque: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          libelle: {
            type: 'string',
          },
        },
      },
    },
  },

  apis: ['server.js', 'api/v1/*/*.router.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// * API DOCUMENTATION * //
// Extended: https://swagger.io/specification/#infoObject
// http://localhost:5000/api-docs/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(express.json());
app.use(morgan('dev')); // logs statuss of each request

//Use to limit repeated requests to public APIs and/or endpoints.
//  apply to all requests
app.use(limiter);

/**
 * Settings
 */
const server = http.createServer(app);

// parse application/json
app.use(bodyParser.json());

const cors = require('cors');
var allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:5000',
];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

/**
 * Turning on gzip compression can hugely impact the
 * performance of your webapp. When a gzip compatible browser requests
 * for some resource, the server can compress the response before sending
 *  it to the browser. If you don’t use gzip for compressing your static resource
 *  it might take longer for the browser to fetch it.
 */
// compress all responses
app.use(compression());

/** Serving static files */
app.use(express.static(__dirname + '/uploads')); // you can access image
//using this url: http://localhost:7000/abc.jpg
//make sure `abc.jpg` is present in `uploads` dir.
//Or you can change the directory for hiding real directory name:
// you can access image using this url: http://localhost:7000/uploads/abc.jpg
app.use('/uploads', express.static(__dirname + '/uploads/'));

/** GET / - Testing server */
app.get('/', function (req, res) {
  return res.send({ error: true, message: 'this is route just for test' });
});

// * Routes * //
// import  routes
const achatRouter = require('./api/v1/achats/achat.router');
const commentaireRouter = require('./api/v1/commentaires/commentaire.router');
const conditionfideliteRouter = require('./api/v1/conditionfidelites/conditionfidelite.router');
const conditiongratuiteRouter = require('./api/v1/conditiongratuites/conditiongratuite.router');
const detailachatRouter = require('./api/v1/detailachats/detailachat.router');
const familleRouter = require('./api/v1/familles/famille.router');
const fideliteRouter = require('./api/v1/fidelites/fidelite.router');
const fournisseurRouter = require('./api/v1/fournisseurs/fournisseur.router');
const gammeRouter = require('./api/v1/gammes/gamme.router');
const gratuiteRouter = require('./api/v1/gratuites/gratuite.router');
const grossisteRouter = require('./api/v1/grossistes/grossiste.router');
const groupeRouter = require('./api/v1/groupes/groupe.router');
const marqueRouter = require('./api/v1/marques/marque.router');
const permissionRouter = require('./api/v1/permissions/permission.router');
const produitRouter = require('./api/v1/produits/produit.router');
const promotionRouter = require('./api/v1/promotions/promotion.router');
const roleRouter = require('./api/v1/roles/role.router');
const sousFamilleRouter = require('./api/v1/sousFamilles/sousFamille.router');
const stockRouter = require('./api/v1/stocks/stock.router');
const userRouter = require('./api/v1/users/user.router');

// * Api's * //

app.use('/api/v1/achats', achatRouter);
app.use('/api/v1/commentaires', commentaireRouter);
app.use('/api/v1/conditionfidelites', conditionfideliteRouter);
app.use('/api/v1/conditiongratuites', conditiongratuiteRouter);
app.use('/api/v1/detailachats', detailachatRouter);
app.use('/api/v1/familles', familleRouter);
app.use('/api/v1/fidelites', fideliteRouter);
app.use('/api/v1/fournisseurs', fournisseurRouter);
app.use('/api/v1/gammes', gammeRouter);
app.use('/api/v1/gratuites', gratuiteRouter);
app.use('/api/v1/grossistes', grossisteRouter);
app.use('/api/v1/groupes', groupeRouter);
app.use('/api/v1/marques', marqueRouter);
app.use('/api/v1/permissions', permissionRouter);
app.use('/api/v1/produits', produitRouter);
app.use('/api/v1/promotions', promotionRouter);
app.use('/api/v1/roles', roleRouter);
app.use('/api/v1/sousfamilles', sousFamilleRouter);
app.use('/api/v1/stocks', stockRouter);
app.use('/api/v1/users', userRouter);

/**
 * Node.js has implementation the core cluster modules,
 * that allowing applications to run on more than one core.
 * Cluster module a parent/master process can be forked in any
 * number of child/worker processes and communicate with them sending
 *  messages via IPC communication.
 */
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  //Check if work id is died
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // This is Workers can share any TCP connection
  // It will be initialized using express
  console.log(`Worker ${process.pid} started`);

  // http://localhost:5000/cluster
  app.get('/cluster', (req, res) => {
    let worker = cluster.worker.id;
    res.send(`Running on worker with id ==> ${worker}`);
  });

  // * Start * //
  // start our rest api server
  server.listen(process.env.APP_PORT, () => {
    console.log('Server started on port', process.env.APP_PORT);
  });
}

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
        url: `http://localhost:${process.env.APP_PORT}/api/v1`,
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
      Addfournisseur: {
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
      Addmarque: {
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
      Addpermission: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          action: {
            type: 'string',
          },
          role_code: {
            type: 'string',
          },
        },
      },
      Addgamme: {
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
      Addfamille: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          libelle: {
            type: 'string',
          },
          couleurFamille: {
            type: 'string',
          },
          gamme_code: {
            type: 'string',
          },
        },
      },
      Addsousfamille: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          libelle: {
            type: 'string',
          },
          couleurSousFamille: {
            type: 'string',
          },
          prix_ht: {
            type: 'float',
          },
          prix_ttc: {
            type: 'float',
          },
          tva: {
            type: 'float',
          },
          famille_code: {
            type: 'string',
          },
        },
      },
      Addproduit: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          code_a_barre: {
            type: 'string',
          },
          image: {
            type: 'string',
          },
          libelle: {
            type: 'string',
          },
          collisage: {
            type: 'string',
          },
          ordre: {
            type: 'string',
          },
          prix_achat_ht: {
            type: 'float',
          },
          prix_achat_ttc: {
            type: 'float',
          },
          prix_vente_ht: {
            type: 'float',
          },
          prix_vente_ttc: {
            type: 'float',
          },
          tva: {
            type: 'float',
          },
          sousFamille_code: {
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
          marque_code: {
            type: 'string',
          },
        },
      },
      Addgroupe: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          libelle: {
            type: 'string',
          },
          produit_code: {
            type: 'string',
          },
        },
      },
      Addachat: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          type_achat: {
            type: 'ENUM',
          },
          date_achat: {
            type: 'Date',
          },
          mode_paiement: {
            type: 'string',
          },
          montant_total_ht: {
            type: 'float',
          },
          montant_total_ttc: {
            type: 'float',
          },
          montant_total_tva: {
            type: 'float',
          },
          net_a_payer_ht: {
            type: 'float',
          },
          remise: {
            type: 'float',
          },
          net_a_payer: {
            type: 'float',
          },
          longitude_livraison: {
            type: 'string',
          },
          latitude_livraison: {
            type: 'string',
          },
          adresse_livraison: {
            type: 'string',
          },
          date_prevue_livraison: {
            type: 'Date',
          },
          commentaire: {
            type: 'string',
          },
          annule: {
            type: 'boolean',
          },
          user_code: {
            type: 'string',
          },
          fournisseur_code: {
            type: 'string',
          },
          grossiste_code: {
            type: 'string',
          },      
        },
      },
      Addfidelite: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          valeur: {
            type: 'string',
          },
          date_debut: {
            type: 'Date',
          },
          date_fin: {
            type: 'Date',
          },
          cummulable: {
            type: 'string',
          },
          actif: {
            type: 'boolean',
          },
          condition: {
            type: 'ENUM',
          }, 
          user_code: {
            type: 'string',
          },
          produit_code: {
            type: 'string',
          },
          famille_code: {
            type: 'string',
          },
          sousFamille_code: {
            type: 'string',
          },
          gamme_code: {
            type: 'string',
          },
          groupe_code: {
            type: 'string',
          },        
        },
      },
      Addpromotion: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          libelle: {
            type: 'string',
          },
          type: {
            type: 'string',
          },
          valeur_min: {
            type: 'float',
          },
          valeur_max: {
            type: 'float',
          },
          qte_min: {
            type: 'float',
          },
          qte_max: {
            type: 'float',
          },
          date_debut: {
            type: 'Date',
          }, 
          date_fin: {
            type: 'Date',
          },
          remise: {
            type: 'float',
          },
          actif: {
            type: 'boolean',
          },
          famille_code: {
            type: 'string',
          },
          sousFamille_code: {
            type: 'string',
          },
          gamme_code: {
            type: 'string',
          },
          groupe_code: {
            type: 'string',
          },
          produit_code: {
            type: 'string',
          },
          user_code: {
            type: 'string',
          },        
        },
      },
      Addconditionfidelite: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          qte_min: {
            type: 'float',
          },
          qte_max: {
            type: 'float',
          },
          chiffre_min: {
            type: 'float',
          },
          chiffre_max: {
            type: 'float',
          }, 
          famille_code: {
            type: 'string',
          },
          sousFamille_code: {
            type: 'string',
          },
          gamme_code: {
            type: 'string',
          },
          groupe_code: {
            type: 'string',
          }, 
          fidelite_code: {
            type: 'string',
          },       
        },
      },
      Addgratuite: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          date_debut: {
            type: 'Date',
          },
          date_fin: {
            type: 'Date',
          },
          cummulable: {
            type: 'string',
          },
          quantite: {
            type: 'float',
          },
          actif: {
            type: 'boolean',
          },
          user_code: {
            type: 'string',
          },
          produit_code: {
            type: 'string',
          },
          famille_code: {
            type: 'string',
          },
          sousFamille_code: {
            type: 'string',
          },
          gamme_code: {
            type: 'string',
          },
          groupe_code: {
            type: 'string',
          },        
        },
      },
      Addconditiongratuite: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          qte_min: {
            type: 'float',
          },
          qte_max: {
            type: 'float',
          },
          chiffre_min: {
            type: 'float',
          },
          chiffre_max: {
            type: 'float',
          }, 
          famille_code: {
            type: 'string',
          },
          sousFamille_code: {
            type: 'string',
          },
          gamme_code: {
            type: 'string',
          },
          groupe_code: {
            type: 'string',
          }, 
          produit_code: {
            type: 'string',
          },
          gratuite_code: {
            type: 'string',
          },       
        },
      },
      Adddetailachat: {
        type: 'object',
        properties: {
          type_detailAchat: {
            type: 'ENUM',
          },
          tva: {
            type: 'float',
          },
          total_ht: {
            type: 'float',
          },
          total_ttc: {
            type: 'float',
          },
          total: {
            type: 'float',
          },
          remise: {
            type: 'float',
          },
          total_net_ht: {
            type: 'float',
          },
          total_net: {
            type: 'float',
          },
          date_creation: {
            type: 'Date',
          },
          produit_code: {
            type: 'string',
          },
          achat_code: {
            type: 'string',
          },
          gratuite_code: {
            type: 'string',
          },      
        },
      },
      Addstock: {
        type: 'object',
        properties: {
          quantite: {
            type: 'string',
          },
          produit_code: {
            type: 'string',
          },
        },
      },
      Addcommentaire: {
        type: 'object',
        properties: {
          contenu: {
            type: 'string',
          },
          date_creation: {
            type: 'Date',
          },
          isDeleted: {
            type: 'boolean',
          },
          produit_code: {
            type: 'string',
          },
          user_code: {
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
  `http://localhost:${process.env.APP_PORT}`,
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

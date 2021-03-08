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
      AddProduit: {
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

module.exports = swaggerOptions;

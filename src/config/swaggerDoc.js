import swaggerUi from 'swagger-ui-express';
import swaggerJSDocs from 'swagger-jsdoc';
import { config } from 'dotenv';

config();

const backendUrl = process.env.BACKEND_URL;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Barefoot Nomad',
      version: '0.1.0',
      description:
        'Barefoot Nomad is an application that will enable its Company Nomads book their international travel and accommodation globally, easily and conveniently across all the locations/centers where the company has its operation. ',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Andela runners',
        url: 'https://runners-bn-backend.herokuapp.com/',
        email: 'andelarunners@gmail.com',
      },
    },
    servers: [
      {
        url: backendUrl,
      },
    ],
  },
  security: ['JWT'],
  apis: ['src/routes/*.js'],
};

const setUpSwaggerUi = (app) => {
  const specs = swaggerJSDocs(options);
  app.use(
    '/documentation',
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );
  return app;
};

export default setUpSwaggerUi;

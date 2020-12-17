import setUpSwaggerUi from '../config/swaggerDoc';
import welcomeRoute from './welcomeRoute';

const urlPreffix = '/api/v1';

/**
 * @swagger
 * components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * */

const routes = (app) => {
  app.use(urlPreffix, welcomeRoute);
  setUpSwaggerUi(app);

  return app;
};

export default routes;

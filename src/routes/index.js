import setUpSwaggerUi from '../config/swaggerDoc';
import welcomeRoute from './welcomeRoute';
import userRoutes from './userRoutes';

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
  app.use(`${urlPreffix}/users`, userRoutes);
  setUpSwaggerUi(app);

  return app;
};

export default routes;

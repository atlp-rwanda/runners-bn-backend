import setUpSwaggerUi from '../config/swaggerDoc';
import welcomeRoute from './welcomeRoute';
import userRoutes from './userRoutes';
import accommodationRoutes from './accommodationRoutes';
import tripRoutes from './tripRoutes';

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
  app.use(`${urlPreffix}/accommodations`, accommodationRoutes);
  app.use(`${urlPreffix}/trips`, tripRoutes);
  setUpSwaggerUi(app);

  return app;
};
export default routes;

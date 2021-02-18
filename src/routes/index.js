import googleRoute from './googleRoute';
import setUpSwaggerUi from '../config/swaggerDoc';
import welcomeRoute from './welcomeRoute';
import userRoutes from './userRoutes';
import accommodationRoutes from './accommodationRoutes';
import tripRoutes from './tripRoutes';
import notificationRoutes from './notificationRoute';
import roomRoutes from './roomRoutes';

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
  app.use(`${urlPreffix}/notification`, notificationRoutes);
  app.use(urlPreffix, roomRoutes);
  app.use(`${urlPreffix}/google`, googleRoute);
  setUpSwaggerUi(app);

  return app;
};
export default routes;

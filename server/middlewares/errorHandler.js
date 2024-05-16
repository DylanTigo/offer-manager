import { constants } from "../constants.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  switch (statusCode) {
    case constants.ERROR.VALIDATION_ERROR:
      res.json({
        title: "Erreur de validation",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.ERROR.UNAUTHORIZED:
      res.json({
        title: "Non autorisé",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.ERROR.FORBIDDEN:
      res.json({
        title: "Accée interdit",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.ERROR.NOT_FOUND:
      res.json({
        title: "Page non trouvée",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.ERROR.SERVER_ERROR:
      res.json({
        title: "Erreur du serveur",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      break;
  }
};
export default errorHandler;

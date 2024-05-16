function accessControl(role) {
  return function(req, res, next) {
    const user = req.user;
    if (user.role === role) {
      next();
    } else {
      res.status(403).send('Accès refusé');
    }
  };
}

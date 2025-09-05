// middleware/timer.js
export const timer = (req, _res, next) => {
  req.startTime = Date.now();
  next();
};

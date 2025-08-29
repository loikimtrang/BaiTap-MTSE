export const delay = (ms = 500) => (req, res, next) => setTimeout(next, ms);

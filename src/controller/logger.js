const { createLogger, transports, format } = require("winston");
// ---- logging function
const logg = createLogger({
  transports: [
    new transports.File({
      filename: "info_log.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "error_log.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});
module.exports = { logg };

import winston from "winston";

export const _logger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	transports: [new winston.transports.File({ filename: "logs/app.log" })]
});

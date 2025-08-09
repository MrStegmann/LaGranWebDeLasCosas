import fs from 'fs';
import { app } from 'electron';
import path from 'path';
import LogLevel from './enums/LogLevel.js';
import LogType from './enums/LogType.js';

export class Logger {
	constructor(logType = LogType.BACKEND) {
		this.logDir = path.join(app.getPath('userData'), 'logs');
		this.logFile = path.join(this.logDir, `${logType}.log`);
		this.ensureDirExists();
	}

	ensureDirExists() {
		try {
			if (!fs.existsSync(this.logDir)) {
				fs.mkdirSync(this.logDir, { recursive: true });
			}
		} catch (err) {
			if (err.code === 'ENOTDIR') {
				// Algo en el path que debería ser carpeta es un archivo
				try {
					// Comprobamos si hay un archivo con el mismo nombre
					if (fs.existsSync(this.logDir) && fs.statSync(this.logDir).isFile()) {
						fs.unlinkSync(this.logDir); // Eliminamos el archivo problemático
						fs.mkdirSync(this.logDir, { recursive: true }); // Reintentamos crear la carpeta
					} else {
						console.error(`No se pudo crear el directorio de logs: ${this.logDir}`);
					}
				} catch (innerErr) {
					console.error('Error interno al manejar ENOTDIR:', innerErr);
				}
			} else {
				console.error('Error desconocido al crear la carpeta de logs:', err);
			}
		}
	}

	log(message) {
		const timestamp = new Date().toISOString();
		const fullMessage = `[${timestamp}] ${message}\n`;

		try {
			fs.appendFileSync(this.logFile, fullMessage, 'utf8');
		} catch (err) {
			console.error('Fallo al escribir el log:', err);
		}
	}

	logError(input, origin = 'system') {
		const timestamp = new Date().toISOString().replace('T', ' ').replace('Z', '');
		let level = LogLevel.ERROR;
		let message = '';

		if (input instanceof Error) {
			message = input.stack || input.message;
		} else if (typeof input === 'object' && input !== null) {
			const candidate = input.type?.toUpperCase?.() || 'ERROR';
			level = Object.values(LogLevel).includes(candidate) ? candidate : LogLevel.ERROR;
			message = input.msg || 'Unknown error';
		} else {
			message = String(input);
		}

		const logLine = `[${timestamp}] [${level}] [${origin}] ${message}\n`;

		try {
			fs.appendFileSync(this.logFile, logLine, 'utf8');
		} catch (e) {
			console.error('Fallo al escribir log:', e);
		}
	}
}

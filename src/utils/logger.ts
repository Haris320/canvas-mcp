const LEVELS: Record<string, number> = { debug: 0, info: 1, warn: 2, error: 3 };

const configuredLevel = process.env['LOG_LEVEL'] ?? 'info';
const configuredLevelNum = LEVELS[configuredLevel] ?? 1;

function shouldLog(level: string): boolean {
  return (LEVELS[level] ?? 0) >= configuredLevelNum;
}

function log(level: string, msg: string, meta?: object): void {
  if (!shouldLog(level)) return;
  console.log(JSON.stringify({ level, msg, ts: new Date().toISOString(), ...meta }));
}

export const logger = {
  debug: (msg: string, meta?: object): void => log('debug', msg, meta),
  info:  (msg: string, meta?: object): void => log('info',  msg, meta),
  warn:  (msg: string, meta?: object): void => log('warn',  msg, meta),
  error: (msg: string, meta?: object): void => log('error', msg, meta),
};

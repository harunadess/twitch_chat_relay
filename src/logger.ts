namespace logger {
  enum LogTag {
    info = 'INFO',
    error = 'ERROR'
  }

  function getPrefix(tag: LogTag) {
    return `${new Date()} [${tag}] ---`;
  }

  export function error(msg: string, ...args: unknown[]) {
    console.log(`${getPrefix(LogTag.error)} ${msg}`, ...args);
  }

  export function info(msg: string, ...args: unknown[]) {
    console.log(`${getPrefix(LogTag.info)} ${msg}`, ...args);
  }

  export function log(msg: string, ...args: unknown[]) {
    info(msg, args);
  }
}

export { logger };
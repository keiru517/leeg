declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv extends Dict<string> {
        PORT?: string;
        DB_HOST?: string;
        DB_NAME?: string;
        DB_PORT?: string;
        DB_USER?: string;
        DB_PASS?: string;
      }
    }
  }
}

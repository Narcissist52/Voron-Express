declare module "sql.js" {
  export type SqlValue = string | number | null;

  export class Database {
    constructor(data?: Uint8Array);
    run(sql: string, params?: SqlValue[]): void;
    exec(sql: string): Array<{ columns: string[]; values: SqlValue[][] }>;
    export(): Uint8Array;
    close(): void;
  }

  export interface SqlJsStatic {
    Database: typeof Database;
  }

  export interface InitSqlJsConfig {
    locateFile?: (file: string) => string;
  }

  export default function initSqlJs(config?: InitSqlJsConfig): Promise<SqlJsStatic>;
}

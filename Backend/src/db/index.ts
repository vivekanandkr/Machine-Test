import { DataSource, type DataSourceOptions } from "typeorm";
import path from "node:path";

const rootDir = process.cwd();
const isProd = process.env.NODE_ENV === "production";
const PgDataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE_NAME,
    entities: [path.join(__dirname, "..", "entity", "**", "*.{js,ts}")],
    migrations: [isProd ? path.join(__dirname, "/migrations/**/*.js") : path.join(rootDir, "src/db/migrations/**/*{.ts,.js}")],
    migrationsTableName: "migrations_versions",
    migrationsRun: true,
    logging: process.env.NODE_ENV === "development" ? "all" : false,
};

const AppDataSource = new DataSource(PgDataSourceOptions);

export default AppDataSource;

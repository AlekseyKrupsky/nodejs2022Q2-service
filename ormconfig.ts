// import * as dotenv from "dotenv";
import { DataSourceOptions } from 'typeorm';
import * as dotenv from "dotenv";
import { cwd } from "node:process";

dotenv.config({ path: `${cwd()}/.env` });

export default {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    entities: [
        // "src/**/entities/*.entity.{ts,js}",
    ],
    migrations: [
        "migrations/*.ts"
    ],
    cli: {
        // entitiesDir: "src/**/entities/*.ts",
        migrationsDir: "migrations"
    },
    migrationsRun: true,
    autoLoadEntities: true,
    autoLoadMigrations: true,
} as DataSourceOptions;

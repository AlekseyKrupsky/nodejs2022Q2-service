import { DataSource } from 'typeorm';
import Ormconfig from './src/ormconfig';

export const AppDataSource = new DataSource(Ormconfig);

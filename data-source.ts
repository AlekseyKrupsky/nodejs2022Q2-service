import { DataSource } from 'typeorm';
import Ormconfig from './ormconfig';

export const dataSource = new DataSource(Ormconfig);

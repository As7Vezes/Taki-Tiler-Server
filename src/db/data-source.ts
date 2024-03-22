import 'reflect-metadata';
import { DataSource } from 'typeorm';
import "dotenv/config"
import { User } from '../entities/User';

export const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User],
});

export const appDataSourceTest = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.DB_PORT_TEST),
  username: process.env.DB_USER_TEST,
  password: process.env.DB_PASSWORD_TEST,
  database: process.env.DB_NAME_TEST,
  synchronize: true,
  logging: false,
  entities: [User],
});

export async function connectDatabase(): Promise<boolean> {
    try {
        await appDataSource.initialize();
        console.log('Database connected');
        return true;
      } catch (error) {
        console.error("Failed to connected to Database: " + error)
        return false
      }
}

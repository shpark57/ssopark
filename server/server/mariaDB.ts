import { createPool, Pool} from 'mysql';
require("dotenv").config({ path: "/server/.env" })

let pool : Pool;


export const init = () => {
    try {
      // @ts-ignore
      pool = createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: Number(process.env.DB_PORT),
        password: process.env.DB_PW,
        database: process.env.DB,
        connectionLimit: 4,
      });
  
      console.debug('MySql Adapter Pool generated successfully');
    } catch (error) {
      console.error('[mysql.connector][init][Error]: ', error);
      throw new Error('failed to initialized pool');
    }
  };
  export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
    try {
      if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');
  
      return new Promise<T>((resolve, reject) => {
        pool.query(query, params, (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });
  
    } catch (error) {
      console.error('[mysql.connector][execute][Error]: ', error);
      throw new Error('failed to execute MySQL query');
    }
  }

//module.exports=connection;
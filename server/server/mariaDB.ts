import { createPool, Pool} from 'mysql';

let pool : Pool;


export const init = () => {
    try {
      pool = createPool({
        host: 'shpark91.synology.me',
        user: 'ssopark',
        password: 'ss5parkPASSW%RD',
        database: 'ssopark',
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
export class MySqlConfiguration {
    /**
     * The database server host address.
     */
    host: string = process.env.paradigm_api__mysql__host;

    /**
     * 

     * The database server host address port, if null the default 3306 port will be used.
     */
    port?: number = Number(process.env.paradigm_api__mysql__port);

    /**
     * The name of the database.
     */
    database: string = process.env.paradigm_api__mysql__database;

    /**
     * The name of the user.
     */
    user: string = process.env.paradigm_api__mysql__user;

    /**
     * The password of the user.
     */
    password?: string = process.env.paradigm_api__mysql__password;

    /**
     * A connection timeout limit in milliseconds.
     */
    connectTimeout?: number;

    /**
     * The limit of maximum parallel connections at the same time.
     */
    connectionLimit?: number;

    /**
     * Indicates if it should allow multiple statements at the same time.
     */
    multipleStatements?: boolean;
}

# Running the UI
In one terminal window, open the `client` directory and run `npm run dev`. 

In another terminal window, open the `server` directory and run `npm start`.

You should see `console.log` statements affirming they were both successful and are now listening. 

## Environmental Variables

Both the `client` and `server` directories expect their own `.env` files. 

### Server `.env`

The server expects the following variables:

```env
POSTGRES_ADMIN=    # username for psql log in
POSTGRES_PASSWORD= # password for psql log in
DB_CONTAINER_NAME= # localhost if running locally, IP address if online, or name of docker container in a network
DB_PORT=           # port where database is exposed
DB_NAME=           # name of database being accessed

```

These are used in the connecting string in `server/index.js` to connect to the database. 

### Client `.env`

`client/next.config.js` is dependent on an `.env` file that contains the following variables:

```env
UI_SERVER_HOST=   # local host if running locally, IP address if online, or name of docker container in a network
UI_CLIENT_HOST=   # local host if running locally, IP address if online, or name of docker container in a network
```
> Note: if you add more variables in `client/.env` (or change the names of the variables), you need to update both the `client/.env` and the `client/next.config.js` files for those changes to take full effect. 
# gr-leantime-server

GraphQL and React Lean Time Server

## Start  
 
### MongoDB version

    git clone https://github.com/iascchen/gr-leantime-server.git
    docker run --name my-mongo -p 27017:27017 -d mongo

### Run

Set Environment
   
    cp .env.example .env
    
Modify .env

    # Note we depend on NODE_ENV being set to dictate which of the env variables below get loaded at runtime.
    # See README for more details.
    
    # GraphQL Account Center
    ACCOUNT_CENTER_API=<account-center-host-in-vpc>/login
    HEADER_FOR_AUTH=x-app-token
    # Put lots of randomness in these, MUST same with Account Center
    SESSION_SECRET=xxxxxxxx
    
    # Production DB of MongoDB
    DB_URI=mongodb://<db_user>:<db_password>@<db_connection_url>/<database>
    # Develop DB running mongodb docker locally
    DB_URI_LOCAL=mongodb://<your-ip>:27017/<database>

    # Application Port - express server listens on this port (default 8000).
    PORT=10000

Run in dev mode

    yarn
    yarn dev

Run in production Mode
    
    yarn clean && yarn build && yarn prod

## Run with Docker in develop mode
    
    ./docker_builder.sh
    ./docker_run.sh

**Attention** For production mode, please set the ENV of container according your deployment

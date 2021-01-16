# zdnGraphgl

ZDN Admin API Server

## Start  
 
### MongoDB version

    git clone https://github.com/iascchen/zdnGraphgl.git
    
    git checkout master 
    git pull
    docker run --name my-mongo -p 27017:27017 -d mongo
     
### MySQL Version

    git clone https://github.com/iascchen/zdnGraphgl.git
    
    git checkout mysql-version
    git pull
    docker run --name my-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql

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
    
    # # Production DB of MySQL
    # DB_URI=mysql://<db_user>:<db_password>@<db_connection_url>/<database>
    # # Develop DB running mysql docker locally
    # DB_URI_LOCAL=mysql://root:my-secret-pw@<your-ip>/zdn
    
    # Application Port - express server listens on this port (default 8000).
    PORT=8000
    
    # ALIYUN VOD - Reference: https://help.aliyun.com/document_detail/101355.html?spm=a2c4g.11186623.6.979.3e8d3aadWOpdmE
    ALIYUN_VOD_REGION=cn-shanghai
    ALIYUN_VOD_ID=xxxx
    ALIYUN_VOD_KEY=xxxx

Run in dev mode

    yarn
    yarn dev

Run in production Mode
    
    yarn clean && yarn build && yarn prod

## Run with Docker in develop mode
    
    ./docker_builder.sh
    ./docker_run.sh

**Attention** For production mode, please set the ENV of container according your deployment

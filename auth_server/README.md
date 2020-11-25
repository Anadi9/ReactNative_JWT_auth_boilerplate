# auth_server

It is node-express backend for jwt authentication.

### To start

1. After cloning repo
```
cd auth_server
```

2. Install dependencies
```
npm install
or
yarn install
```

3. Setup your .env file
```
PORT = 'YOUR_PORT'                          //add port (e.g. 5000)
HOSTNAME = 'YOUR_PC_IP'                     //add ip address of yo pc (e.g. 192.189.1.5)
MONGODB_URL = 'YOUR_MONGODB_ATLAS_URL'      //add your mongodb/atlas url
JWT_KEY = 'MAKE_YOUR_OWN_JWT_KEY'           //add any random long string (e.g. diguoeifnq09fy76dyvhqwjbhnm98cy967rgb3n87gcb)
```

4. Run your server
```
npm start 
or
nodemon
or
node index.js
```

That's it your done with backend setup.

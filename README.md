welcome to expressJS

npm install

for aragon2
npm install -g node-gyp
npm install argon2
for squileze
npx sequelize-cli init

#run on environtment dev
npm run start-dev
npx sequelize-cli db:migrate
first seeding after created all tables : npx sequelize-cli db:seed:all

#for run migrate
npm install --save-dev sequelize-cli 
npx sequelize-cli seed:generate --name file  --seeders-path db/seeders/

#run apps
1. npm run start-dev
2. open post man
3. login
4. copy token
5. paste token in next hit url postman

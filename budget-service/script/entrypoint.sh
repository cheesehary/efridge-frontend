# db initialization
sleep 20

# db migration
yarn typeorm migration:run

# start server
yarn dev
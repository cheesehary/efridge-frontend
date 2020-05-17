#TODO increase sleeping time for db initialization
sleep 10

yarn typeorm migration:run

# start server
yarn dev
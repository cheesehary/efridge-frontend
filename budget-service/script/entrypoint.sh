# db initialization
sleep 20

# db migration
echo "running migration"
yarn typeorm migration:run

# start server
echo "starting server"
yarn dev
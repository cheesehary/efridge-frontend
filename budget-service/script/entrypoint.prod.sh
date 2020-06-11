# start nginx
echo "starting nginx"
/usr/sbin/nginx

# db initialization
sleep 20

# db migration
echo "running migration"
./node_modules/.bin/typeorm migration:run

# start server
echo "starting server"
yarn start
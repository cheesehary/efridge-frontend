# start nginx
/usr/sbin/nginx

# db initialization
sleep 20

# db migration
npx typeorm migration:run

# start server
yarn start
psql -c "create database converge"
knex migrate:rollback --knexfile "db/knexfile.js"
knex migrate:latest --knexfile "db/knexfile.js"
knex seed:run --knexfile "db/knexfile.js"


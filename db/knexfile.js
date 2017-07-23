module.exports = {
development: {		
	client: 'postgresql',		
 	connection: {		
		database: 'converge',		
		user:     'postgres',		
		password: ''		
	},
	migrations: {	
		tableName: 'knex_migrations'		
	},
	seeds: {
		directory: __dirname + '/seeds'
	}			
},		
		
staging: {		
	client: 'postgresql',		
 	connection: {		
		database: 'converge',		
		user:     'postgres',		
		password: ''		
	},		
	pool: {		
	min: 2,		
	max: 10		
	},		
	migrations: {		
		tableName: 'knex_migrations'		
	}		
},		
	
production: {		
	client: 'postgresql',		
	connection: {		
		database: 'converge',		
		user:     'postgres',		
		password: ''		
	},		
	pool: {		
		min: 2,		
		max: 10		
	},		
	migrations: {		
		tableName: 'knex_migrations'		
	}		
 	}		
		
};
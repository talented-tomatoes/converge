
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTableIfNotExists('users', (table) => {
		table.increments('id').primary;
		table.string('loginid').notNullable();
		table.string('first_name').notNullable();
		table.string('last_name').notNullable();
		table.string('avatar_url');
		table.string('email');
		table.string('linkedinid');
		table.string('phonenumber');
		table.string('usertype');
	}),
	knex.schema.createTableIfNotExists('speakers', (table) => {
		table.increments('id').primary;
		table.string('loginid').notNullable();
		table.string('first_name').notNullable();
		table.string('last_name').notNullable();
		table.string('jobtitle');
		table.string('avatar_url');
		table.string('about');
		table.string('email');
		table.string('linkedinid');
		table.integer('confid');
	}),
	knex.schema.createTableIfNotExists('conferences', (table) => {
		table.increments('id').primary;
		table.string('confname').notNullable();
		table.string('address').notNullable();
		table.string('mapurl').notNullable();
		table.string('confimg_url').notNullable();
	})
])
.then(() => {
	return Promise.all([
		knex.schema.createTableIfNotExists('presentations', (table) => {
			table.increments('id').primary;
			table.string('presentationname').notNullable();
			table.string('description').notNullable();
			table.date('presentationdate').notNullable();
			table.time('presentationtime').notNullable();
			table.string('location').notNullable();
			table.integer('speakerid').references('id').inTable('speakers');
			table.integer('conferenceid').references('id').inTable('conferences');
		}),
		knex.schema.createTableIfNotExists('users_presentations', (table) => {
			table.increments('id').primary;
			table.integer('userid').references('id').inTable('users');
			table.integer('presentationid').references('id').inTable('presentations');
		}),
		knex.schema.createTableIfNotExists('presentations_speakers', (table) => {
			table.increments('id').primary;
			table.integer('presentationid').references('id').inTable('presentations');
			table.integer('speakerid').references('id').inTable('speakers');
		}),
		knex.schema.createTableIfNotExists('conferences_users', (table) => {
			table.increments('id').primary;
			table.integer('conferenceid').references('id').inTable('conferences');
			table.integer('userid').references('id').inTable('users');
		})
	])
	})
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('conferences_users'),
		knex.schema.dropTable('presentations_speakers'),
		knex.schema.dropTable('users_presentations'),
		knex.schema.dropTable('presentations'),
		knex.schema.dropTable('conferences'),
		knex.schema.dropTable('speakers'),
		knex.schema.dropTable('users'),
  ]);
};

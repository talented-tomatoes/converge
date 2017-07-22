
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
		table.string('gallery_name');
		table.unique('loginid');
	}),
	knex.schema.createTableIfNotExists('speakers', (table) => {
		table.increments('id').primary;
		table.string('first_name').notNullable();
		table.string('last_name').notNullable();
		table.string('job_title');
		table.string('avatar_url');
		table.string('bio', 2000);
		table.string('email');
<<<<<<< HEAD
		table.string('linkedin_id');
		table.integer('conference_id');
=======
		table.string('linkedinid');
		table.integer('confid').references('id').inTable('conferences');
>>>>>>> checkin screen related changes
	}),
])
.then(() => {
	return Promise.all([
		knex.schema.createTableIfNotExists('conferences', (table) => {
			table.increments('id').primary;
			table.string('name').notNullable();
			table.string('address').notNullable();
			table.string('start_date').notNullable();
			table.string('end_date').notNullable();
			table.string('logo', 500);
			table.string('details', 2000).notNullable();
			table.integer('ticket_price').notNullable();
			table.string('venue_map', 500).notNullable();
			table.string('banner', 500).notNullable();
			table.integer('user_id').references('id').inTable('users');
		}),
		knex.schema.createTableIfNotExists('presentations', (table) => {
			table.increments('id').primary;
			table.string('name').notNullable();
			table.string('description').notNullable();
			table.date('date').notNullable();
			table.time('time').notNullable();
			table.string('location').notNullable();
			table.integer('speaker_id').references('id').inTable('speakers');
			table.integer('conference_id').references('id').inTable('conferences');
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
			table.string('userid').references('loginid').inTable('users');
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

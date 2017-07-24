
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTableIfNotExists('users', (table) => {
		table.increments('id').primary;
		table.string('login_id').notNullable();
		table.string('first_name').notNullable();
		table.string('last_name').notNullable();
		table.string('avatar_url');
		table.string('email');
		table.string('linkedin_id');
		table.string('phone_number');
		table.string('user_type');
		table.string('gallery_name');
		table.unique('login_id');
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
		knex.schema.createTableIfNotExists('speakers', (table) => {
			table.increments('id').primary;
			table.string('first_name').notNullable();
			table.string('last_name').notNullable();
			table.string('job_title');
			table.string('avatar_url');
			table.string('bio', 2000);
			table.string('email');
			table.string('linkedin_id');
			table.integer('conference_id').references('id').inTable('conferences');
		}),
		knex.schema.createTableIfNotExists('presentations', (table) => {
			table.increments('id').primary;
			table.string('name').notNullable();
			table.string('description', 2000).notNullable();
			table.string('date').notNullable();
			table.string('time').notNullable();
			table.string('location').notNullable();
			table.integer('speaker_id').references('id').inTable('speakers');
			table.integer('conference_id').references('id').inTable('conferences');
		}),
		knex.schema.createTableIfNotExists('users_presentations', (table) => {
			table.increments('id').primary;
			table.integer('user_id').references('id').inTable('users');
			table.integer('presentation_id').references('id').inTable('presentations');
		}),
		knex.schema.createTableIfNotExists('presentations_speakers', (table) => {
			table.increments('id').primary;
			table.integer('presentation_id').references('id').inTable('presentations');
			table.integer('speaker_id').references('id').inTable('speakers');
		}),
		knex.schema.createTableIfNotExists('conferences_users', (table) => {
			table.increments('id').primary;
			table.integer('conference_id').references('id').inTable('conferences');
			table.string('user_id').references('login_id').inTable('users');
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
		knex.schema.dropTable('speakers'),
		knex.schema.dropTable('conferences'),
		knex.schema.dropTable('users'),
  ]);
};

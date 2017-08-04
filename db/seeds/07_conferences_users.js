
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('conferences_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('conferences_users')
      .returning('id')
      .insert([
        { conference_id: 1, user_id: 1, checked_in: true },
        { conference_id: 1, user_id: 2, checked_in: true },
        { conference_id: 1, user_id: 3, checked_in: true },
        { conference_id: 1, user_id: 4, checked_in: true }
      ]);
    });
};

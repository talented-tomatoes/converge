
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('conferences_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('conferences_users')
      .returning('id')
      .insert([
        // { conference_id: 1, user_id: '106873821099349941383' },
        // { conference_id: 2, user_id: '106873821099349941383'},
        // { conference_id: 1, user_id: '106873821099349941385'},
        // { conference_id: 2, user_id: '106873821099349941385'}
      ]);
    });
};

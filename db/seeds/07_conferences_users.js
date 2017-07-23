
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('conferences_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('conferences_users').insert([
        { id: 1, conference_id: 1, user_id: '106873821099349941383' },
        { id: 2, conference_id: 2, user_id: '106873821099349941383'},
        { id: 3, conference_id: 1, user_id: '106873821099349941385'},
        { id: 4, conference_id: 2, user_id: '106873821099349941385'},
      ]);
    });
};

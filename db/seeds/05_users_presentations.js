
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_presentations').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_presentations')
      .returning('id')
      .insert([
        // {user_id: '1', presentation_id: 1},
        // {user_id: '1', presentation_id: 2},
        // {user_id: '1', presentation_id: 3},
        // {user_id: '3', presentation_id: 4},
        // {user_id: '3', presentation_id: 5},
        // {user_id: '3', presentation_id: 6}
      ]);
    });
};

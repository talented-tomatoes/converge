
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('presentations_speakers').del()
    .then(function () {
      // Inserts seed entries
      return knex('presentations_speakers').insert([
        {id: 1, presentation_id: 1, speaker_id: 1},
        {id: 2, presentation_id: 2, speaker_id: 2},
        {id: 3, presentation_id: 3, speaker_id: 3},
        {id: 4, presentation_id: 4, speaker_id: 4},
        {id: 5, presentation_id: 5, speaker_id: 5},
        {id: 6, presentation_id: 6, speaker_id: 6},
      ]);
    });
};

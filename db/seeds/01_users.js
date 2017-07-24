
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users')
      .returning('id')
      .insert([
        {login_id: '106873821099349941383', first_name: 'Padma', last_name: 'Govindarajalu', avatar_url: 'https://res.cloudinary.com/awchang56/image/upload/v1500820911/Padma_Govindaradalu_1_imqyhp.jpg', email: 'padma.govindarajalu@gmail.com', linkedin_id: 'https://www.linkedin.com/in/padma-govindarajalu-59092ba/', phone_number:'123-234-1234', user_type: 'admin', gallery_name: '106873821099349941383' },
        {login_id: '106873821099349941384', first_name: 'Alex', last_name: 'Chang', avatar_url: 'https://res.cloudinary.com/awchang56/image/upload/v1500771623/alex_vshmmf.jpg', email: 'awchang56@gmail.com', linkedin_id: 'https://www.linkedin.com/in/awchang56/', phone_number:'555-555-5555', user_type: 'attendee', gallery_name: '106873821099349941384' },
        {login_id: '106873821099349941385', first_name: 'Ryan', last_name: 'Platon', avatar_url: 'https://res.cloudinary.com/awchang56/image/upload/v1500822267/Ryan_Platon_fl4nae.jpg', email: 'ryan.platon@gmail.com', linkedin_id: 'https://www.linkedin.com/in/ryanplaton/', phone_number:'444-444-4444', user_type: 'attendee', gallery_name: '106873821099349941385' },
        {login_id: '106873821099349941386', first_name: 'Wilson', last_name: 'Cen', avatar_url: 'https://res.cloudinary.com/awchang56/image/upload/v1500822328/Wilson_Cen_cqix5l.jpg', email: 'wilsoncen@gmail.com', linkedin_id: 'https://www.linkedin.com/in/wilsoncen/', phone_number:'666-666-6666', user_type: 'admin', gallery_name: '106873821099349941386' }
      ]);
    });
};

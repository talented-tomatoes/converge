
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users')
      .returning('id')
      .insert([
        {login_id: '106873821099349941383', first_name: 'Padma', last_name: 'Govindarajalu', avatar_url: 'https://res.cloudinary.com/awchang56/image/upload/v1500820911/Padma_Govindaradalu_1_imqyhp.jpg', email: 'padma.govindarajalu@gmail.com', linkedin_id: 'padma-govindarajalu-59092ba', phone_number:'123-234-1234', user_type: 'attendee' },
        {login_id: '117286496899187654492', first_name: 'Alex', last_name: 'Chang', avatar_url: 'https://res.cloudinary.com/awchang56/image/upload/v1500771623/alex_vshmmf.jpg', email: 'awchang56@gmail.com', linkedin_id: 'awchang56', phone_number:'555-555-5555', user_type: 'attendee' },
        {login_id: '109393783164163414314', first_name: 'Ryan', last_name: 'Platon', avatar_url: 'https://res.cloudinary.com/awchang56/image/upload/v1500822267/Ryan_Platon_fl4nae.jpg', email: 'ryan.platon@gmail.com', linkedin_id: 'ryanplaton', phone_number:'444-444-4444', user_type: 'attendee' },
        {login_id: '101444786080971826600', first_name: 'Wilson', last_name: 'Cen', avatar_url: 'https://res.cloudinary.com/awchang56/image/upload/v1500822328/Wilson_Cen_cqix5l.jpg', email: 'wilsoncen@gmail.com', linkedin_id: 'wilsoncen', phone_number:'666-666-6666', user_type: 'attendee' },
        {login_id: '108806252823690457393', first_name: 'Tomato', last_name: 'One', avatar_url: 'https://bloximages.chicago2.vip.townnews.com/bozemandailychronicle.com/content/tncms/assets/v3/editorial/c/e1/ce1b3c3c-02a3-11e2-8644-001a4bcf887a/505a3e31194b6.image.jpg', email:'hrsf78tt01@gmail.com', linkedin_id: 'tomato01', phone_number:'123-234-1234', user_type: 'host' },
        {login_id: '110026807933040600737', first_name: 'Tomato', last_name: 'Two', avatar_url: 'https://photos1.blogger.com/blogger2/5868/4130/1600/tomatopurple.jpg', email: 'hrsf78tt02@gmail.com', linkedin_id: 'tomato02', phone_number: '123-456-7890', user_type: 'attendee' },
        {login_id: '117995269280335550175', first_name: 'Tomato', last_name: 'Three', avatar_url: 'https://curbstonevalley.com/wp-content/uploads/2010/10/GermanOrange-150x150.jpg', email: 'hrsf78tt03@gmail.com', linkedin_id: 'tomato03', phone_number: '123-456-7890', user_type: 'attendee' },        {login_id: '106157414943730174639', first_name: 'Tomato', last_name: 'Four', avatar_url: 'https://curbstonevalley.com/wp-content/uploads/2010/10/IlliniStar-150x150.jpg', email: 'hrsf78tt04@gmail.com', linkedin_id: 'tomato04', phone_number: '123-456-7890', user_type: 'host' },
      ]);
    });
};




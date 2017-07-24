
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('conferences').del()
    .then(function () {
      // Inserts seed entries
      return knex('conferences')
      .returning('id')
      .insert([
        {name: 'TechCrunch Disrupt', address:'Pier 48, SanFrancisco, CA 94158', start_date: '09-21-2017', end_date: '09-23-2017', logo: 'http://res.cloudinary.com/awchang56/image/upload/v1500825938/TechCrunch-Logo_1_b7qxz4.jpg', details: 'TechCrunch Disrupt is the world’s leading authority in debuting revolutionary startups, introducing game-changing technologies and discussing what’s top of mind for the tech industry’s key innovators. Disrupt gathers the best and brightest entrepreneurs, investors, hackers, and tech fans for on-stage interviews, the Startup Battlefield competition, a 24-hour Hackathon, Startup Alley, Hardware Alley, and After Parties.', ticket_price: '1995', venue_map: '', banner: 'http://res.cloudinary.com/awchang56/image/upload/v1500825912/disruptsf2017_banner_zuoa4q.png', user_id: 1},
        {name: 'VidCon', address:'800 W Katella Ave, Anaheim, CA 92802', start_date: '06-20-2018', end_date: '06-23-2018', logo: 'http://res.cloudinary.com/awchang56/image/upload/v1500825923/VidCon_logo_tkyza1.png', details: 'The VidCon 2018 Industry Track brings back our popular seminar series, and this time we’re extending it across both Friday and Saturday. In addition, we’re expanding the “Innovation Showcase,” where the top production studios and creative companies get an opportunity to share their latest projects and talk about what’s in store for the balance of 2017 and 2018. Finally, we’re inviting some of the most forward thinking research organizations to present the eye-opening results of their latest research studies. Topics include the latest findings on fandom, how GenZ really consumes media, buying behavior for OTT and new MVPD services and much more!', ticket_price: '1995', venue_map: '', banner: 'http://res.cloudinary.com/awchang56/image/upload/v1500825916/VidCon_Banner_k4q8wv.jpg', user_id: 4}
      ]);
    });
};

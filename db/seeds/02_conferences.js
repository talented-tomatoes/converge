
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('conferences').del()
    .then(function () {
      // Inserts seed entries
      return knex('conferences')
      .returning('id')
      .insert([
        {
          name: 'TechCrunch Disrupt',
          address:'Pier 48, SanFrancisco, CA 94158',
          start_date: '2017-09-21',
          start_time: '10:00AM',
          end_date: '2017-09-23',
          end_time: '9:00PM',
          logo: 'https://res.cloudinary.com/awchang56/image/upload/v1500825938/TechCrunch-Logo_1_b7qxz4.jpg',
          details: 'TechCrunch Disrupt is the world’s leading authority in debuting revolutionary startups, introducing game-changing technologies and discussing what’s top of mind for the tech industry’s key innovators. Disrupt gathers the best and brightest entrepreneurs, investors, hackers, and tech fans for on-stage interviews, the Startup Battlefield competition, a 24-hour Hackathon, Startup Alley, Hardware Alley, and After Parties.',
          ticket_price: 1995,
          venue_map: 'https://res.cloudinary.com/awchang56/image/upload/v1501482840/map_dvmxho.png',
          banner: 'https://res.cloudinary.com/awchang56/image/upload/v1500825912/disruptsf2017_banner_zuoa4q.png',
          user_id: 1},
        {
          name: 'VidCon',
          address:'800 W Katella Ave, Anaheim, CA 92802', start_date: '2018-06-20',
          end_date: '2018-06-23',
          start_time: '10:00AM',
          end_time: '9:00PM',
          logo: 'https://res.cloudinary.com/awchang56/image/upload/v1500825923/VidCon_logo_tkyza1.png',
          details: 'The VidCon 2018 Industry Track brings back our popular seminar series, and this time we’re extending it across both Friday and Saturday. In addition, we’re expanding the “Innovation Showcase,” where the top production studios and creative companies get an opportunity to share their latest projects and talk about what’s in store for the balance of 2017 and 2018. Finally, we’re inviting some of the most forward thinking research organizations to present the eye-opening results of their latest research studies. Topics include the latest findings on fandom, how GenZ really consumes media, buying behavior for OTT and new MVPD services and much more!',
          ticket_price: 1995,
          venue_map: 'https://res.cloudinary.com/awchang56/image/upload/v1501482239/DIGI_MAP_SHEET-816x1024_krbyts.jpg',
          banner: 'https://res.cloudinary.com/awchang56/image/upload/v1500825916/VidCon_Banner_k4q8wv.jpg',
          user_id: 4},
        {
          name: 'API World',
          address: '150 W San Carlos St, San Jose, CA 95113',
          start_date: '2017-09-25',
          start_time: '12:00PM',
          end_date: '2017-09-27', 
          end_time: '4:00PM', 
          logo: 'https://apiworld.co/wp-content/uploads/2016/08/apiworld-logo-retina_new@2x.png',
          details: 'API World 2017 is the world’s largest vendor-neutral API conference and expo, organizing the API Economy. API World is dedicated to the mission to be independent and facilitate connections, knowledge, trust and business within the developer community of API providers and consumers.',
          ticket_price: 35,
          venue_map: 'https://www.sanjose.org/media/650852/digitalmonitorlocationsv2.jpg',
          banner: 'https://apiworld.co/wp-content/uploads/2014/12/APIWORLD-WHT.png',
          user_id: 4
        }
      ]);
    });
};

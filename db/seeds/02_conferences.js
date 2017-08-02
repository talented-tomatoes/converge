
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
          logo: 'https://res.cloudinary.com/ryanplaton/image/upload/v1501697676/TechCrunch-Logo_1_b7qxz4_y3jumf.jpg',
          details: 'TechCrunch Disrupt is the world’s leading authority in debuting revolutionary startups, introducing game-changing technologies and discussing what’s top of mind for the tech industry’s key innovators. Disrupt gathers the best and brightest entrepreneurs, investors, hackers, and tech fans for on-stage interviews, the Startup Battlefield competition, a 24-hour Hackathon, Startup Alley, Hardware Alley, and After Parties.',
          ticket_price: 125,
          venue_map: 'https://res.cloudinary.com/ryanplaton/image/upload/v1501697678/map_dvmxho_xcgak3.png',
          banner: 'https://res.cloudinary.com/ryanplaton/image/upload/v1501697675/disruptsf2017_banner_zuoa4q_skvesi.png',
          user_id: 5},
        {
          name: 'VidCon',
          address:'800 W Katella Ave, Anaheim, CA 92802', start_date: '2018-06-20',
          end_date: '2018-06-23',
          start_time: '10:00AM',
          end_time: '9:00PM',
          logo: 'https://res.cloudinary.com/ryanplaton/image/upload/v1501697674/VidCon_logo_tkyza1_lktzsd.png',
          details: 'The VidCon 2018 Industry Track brings back our popular seminar series, and this time we’re extending it across both Friday and Saturday. In addition, we’re expanding the “Innovation Showcase,” where the top production studios and creative companies get an opportunity to share their latest projects and talk about what’s in store for the balance of 2017 and 2018. Finally, we’re inviting some of the most forward thinking research organizations to present the eye-opening results of their latest research studies. Topics include the latest findings on fandom, how GenZ really consumes media, buying behavior for OTT and new MVPD services and much more!',
          ticket_price: 200,
          venue_map: 'https://res.cloudinary.com/ryanplaton/image/upload/v1501697677/DIGI_MAP_SHEET-816x1024_krbyts_pooe1c.jpg',
          banner: 'https://res.cloudinary.com/ryanplaton/image/upload/v1501697674/VidCon_Banner_k4q8wv_leiyen.jpg',
          user_id: 5},
        {
          name: 'API World',
          address: '150 W San Carlos St, San Jose, CA 95113',
          start_date: '2017-09-25',
          start_time: '12:00PM',
          end_date: '2017-09-27',
          end_time: '4:00PM',
          logo: 'https://res.cloudinary.com/ryanplaton/image/upload/v1501699401/api-world-2017-final-logo_kn3odi_jtl4av_mp1ayk.png',
          details: 'API World 2017 is the world’s largest vendor-neutral API conference and expo, organizing the API Economy. API World is dedicated to the mission to be independent and facilitate connections, knowledge, trust and business within the developer community of API providers and consumers.',
          ticket_price: 35,
          venue_map: 'https://www.sanjose.org/media/650852/digitalmonitorlocationsv2.jpg',
          banner: 'https://res.cloudinary.com/ryanplaton/image/upload/v1501699401/api-world-2017-final-logo_kn3odi_jtl4av_mp1ayk.png',
          user_id: 5
        }
      ]);
    });
};

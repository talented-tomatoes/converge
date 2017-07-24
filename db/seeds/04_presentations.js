
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('presentations').del()
    .then(function () {
      // Inserts seed entries
      return knex('presentations')
      .returning('id')
      .insert([
        {name: 'STARTUP BATTLEFIELD', description: 'Startup Battlefield brings the world s top early stage startups together on one stage to compete for the coveted Disrupt Cup, a $50,000 prize, and the attention of media and investors. Since appearing on the TechCrunch stage, Battlefield alumni have collectively raised over $6.9 billion. The judges include TechCrunch editors as well as top VCs and entrepreneurs, and past winners include names like Dropbox, Mint, Yammer, Zenefits, and many more. Participation is free and open. Battlefield applications are now open for Disrupt SF ', date: '2017-09-21', time: '10.00AM', location: '', speaker_id: 1, conference_id: 1},
        {name: 'HACKATHON', description: 'Our Hackathons are crazy, exciting, exhausting events where hundreds of coders and developers come together to form teams which have just shy of 24 hours to build something amazing from the ground up.', date: '2017-09-22', time: '10:00AM', location: '', speaker_id: 2, conference_id: 1},
        {name: 'STARTUP ALLEY', description: 'At the heart of Disrupt lies Startup Alley where hundreds of early-stage companies in a variety of verticals showcase their talent and technology to attendees, investors and members of the press. Startup Alley is open to companies that are less than 2 years old with less than $2.5M in funding.', date: '09-22-2017', time: '11.00AM', location: '', speaker_id: 3, conference_id: 1},
        {name: 'The Late Late Show with James Corden. Internet Success, TV Reach', description: 'James Corden s post-midnight talk show on CBS is more than just a TV sensation. The producers carefully crafted much of the show so it would translate to internet success as well as appeal to a broadcast audience — to the tune of 1 billion YouTube views, Emmy awards, and spin off series. How did they do it? This session brings together the key team to share their recipe for creating these segments that work so well across both media. In addition, they will explore their creative process, how they learn from what does not work, and how you can apply their lessons to creating your own watercooler moments.', date: '06-20-2018', time: '10:00AM', location: 'BallRoom E', speaker_id: 4, conference_id: 1},
        {name: 'Emerging Business Models: The Changing Face of the MCN', description: 'This session features 1:1 interviews with 4 of the most well-known multi-channel networks, as we explore how their business models have changed to address marketplace changes, the explosion of new platforms, life after acquisition, and more. After the set of 1:1 interviews, we will bring all the execs up for a roundtable discussion on what the future looks like.', date: '2017-09-23', time: '11:00AM', location: '', speaker_id: 5, conference_id: 2},
        {name: 'Edutainment', description: 'Remember when you stared at the clock for what seemed like an eternity in Mrs. William s third period Biology class, praying that somehow you could move time and end the most boring lecture possible? If you do — and are convinced that learning CANNOT be entertaining — prepare to be proven wrong! Online video has changed how we learn; find out how from these top-notch EDU creators.', date: '2017-09-23', time: '2:00PM', location: '', speaker_id: 6, conference_id: 2}
      ]);
    });
};

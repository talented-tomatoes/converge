
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('presentations').del()
    .then(function () {
      // Inserts seed entries
      return knex('presentations')
      .returning('id')
      .insert([
        {name: 'STARTUP BATTLEFIELD', description: 'Startup Battlefield brings the world s top early stage startups together on one stage to compete for the coveted Disrupt Cup, a $50,000 prize, and the attention of media and investors. Since appearing on the TechCrunch stage, Battlefield alumni have collectively raised over $6.9 billion. The judges include TechCrunch editors as well as top VCs and entrepreneurs, and past winners include names like Dropbox, Mint, Yammer, Zenefits, and many more. Participation is free and open. Battlefield applications are now open for Disrupt SF ', date: '2017-09-21', time: '10:00AM', location: 'Red Room', conference_id: 1},
        {name: 'HACKATHON', description: 'Our Hackathons are crazy, exciting, exhausting events where hundreds of coders and developers come together to form teams which have just shy of 24 hours to build something amazing from the ground up.', date: '2017-09-22', time: '10:00AM', location: 'Blue Room', conference_id: 1},
        {name: 'STARTUP ALLEY', description: 'At the heart of Disrupt lies Startup Alley where hundreds of early-stage companies in a variety of verticals showcase their talent and technology to attendees, investors and members of the press. Startup Alley is open to companies that are less than 2 years old with less than $2.5M in funding.', date: '2017-09-23', time: '11:00AM', location: 'Green Room', conference_id: 1},
        {name: 'The Late Late Show with James Corden. Internet Success, TV Reach', description: 'James Corden s post-midnight talk show on CBS is more than just a TV sensation. The producers carefully crafted much of the show so it would translate to internet success as well as appeal to a broadcast audience — to the tune of 1 billion YouTube views, Emmy awards, and spin off series. How did they do it? This session brings together the key team to share their recipe for creating these segments that work so well across both media. In addition, they will explore their creative process, how they learn from what does not work, and how you can apply their lessons to creating your own watercooler moments.', date: '2018-06-20', time: '10:00AM', location: 'Ballroom E', conference_id: 2},
        {name: 'Emerging Business Models: The Changing Face of the MCN', description: 'This session features 1:1 interviews with 4 of the most well-known multi-channel networks, as we explore how their business models have changed to address marketplace changes, the explosion of new platforms, life after acquisition, and more. After the set of 1:1 interviews, we will bring all the execs up for a roundtable discussion on what the future looks like.', date: '2018-06-23', time: '11:00AM', location: 'Ballroom C', conference_id: 2},
        {name: 'Edutainment', description: 'Remember when you stared at the clock for what seemed like an eternity in Mrs. William s third period Biology class, praying that somehow you could move time and end the most boring lecture possible? If you do — and are convinced that learning CANNOT be entertaining — prepare to be proven wrong! Online video has changed how we learn; find out how from these top-notch EDU creators.', date: '2018-06-22', time: '2:00PM', location: 'Red Room', conference_id: 2},
        {
          'location': 'Workshop Room 3',
          'time': '12:00 PM',
          'id': 14,
          'date': '2017-09-25',
          'conference_id': 3,
          'description': 'For most organizations today, application integration is being solved with “point-to-point” solutions that spiderweb between apps and services. This is simply an extension of the legacy enterprise integration patterns we’ve seen for 2 decades. But with modern enterprise using more than 1000 cloud-based applications, this point-to-point model doesn’t scale and need to change. Enter Data Hubs. By focusing on the data you care about rather than the interfaces and APIs of your applications - your integration architecture is able to scale, while creating a governance and mediation layer. Data and application integration leaders should develop such a strategy to determine effective mediation of semantics, and to identify data sharing requirements across applications, constituencies and ecosystems.\n',
          'name': 'API Integration with a Data Hub'
        },
        {
          'location': 'Workshop Room 1',
          'time': '12:00 PM',
          'id': 15,
          'date': '2017-09-25',
          'conference_id': 3,
          'description': 'Talk about the future of microservices',
          'name': 'New Frontiers for Microservices'
        },
        {
          'location': 'Workshop Room 2',
          'time': '12:00 PM',
          'id': 16,
          'date': '2017-09-25',
          'conference_id': 3,
          'description': 'Tod Greene\'s talk on APIs',
          'name': 'Featured Talk: PubNub'
        },
        {
          location: 'Workshop Room 1',
          time: '1:00 PM',
          date: '2017-09-25',
          conference_id: 3,
          description: 'TBA',
          name: 'Service Landscaping with a Purpose'
        },
        {
          location: 'Workshop Room 1',
          time: '1:00 PM',
          date: '2017-09-25',
          conference_id: 3,
          description: 'TBA',
          name: 'Optimizing User Experience Using Point-to-Point Real-time messaging'
        },
        {
          location: 'Workshop Room 3',
          time: '2:00 PM',
          date: '2017-09-25',
          conference_id: 3,
          description: `Join this session for an introduction on how to build moving experiences with the Uber Developer Platform. Instantly integrate the ability to move people and things from A to B into any app.`,
          name: 'Building Moving Experiences'
        },
        {
          location: 'Workshop Room 1',
          time: '2:00 PM',
          date: '2017-09-25',
          conference_id: 3,
          description: 'TBA',
          name: 'Panel: the people side of microservices'
        },
        {
          location: 'Workshop Room 2',
          time: '2:00 PM',
          date: '2017-09-25',
          conference_id: 3,
          description: `First described by Martin Fowler back in 2010, blue-green deployment is a release technique that reduces downtime and risk by running two identical production environments called Blue and Green. Fast-forwarding to 2013, Danilo Sato from ThoughtWorks published on company's blog a very insightful article that describes how to implement blue-green deployments using AWS. We, at Mitoc Group, are working primarily with serverless computing from AWS, and this talk will share our experience using blue-green deployment process for serverless powered applications.`,
          name: 'Blue-Green Deployments for Serverless Powered Applications on AWS'
        },
        {
          location: 'Workshop Room 3',
          time: '3:00 PM',
          date: '2017-09-25',
          conference_id: 3,
          description: `When we discuss APIs these days, we automatically assume HTTPS-based REST APIs. This is a great standard when working with application integration. Not so great, when working with the Internet of Things. Devices these days are communicating over many protocols. A few of the most popular IoT protocols include: HTTPS, Web Sockets, MQTT, CoAP, XMPP, and AMQP. We have gone the extra mile with our open source Meshblu IoT platform to adapt our HTTPS REST API to each of these protocols natively. This strategy allows devices connected via any means to interact with other connected devices communicating in virtually any protocol using the device's native protocol. It's like a French-to-English-to-German translator for IoT. The API world is changing again with the addition of the Internet of Things. Let's consider these new devices and protocols in our API strategies.`,
          name: `Don't Stop @ REST`
        },
        {
          location: 'Workshop Room 4',
          time: '3:00 PM',
          date: '2017-09-25',
          conference_id: 3,
          description: 'TBA',
          name: 'RabbitMQ Without the Complexity'
        },
      ]);
    });
};


        {
          location: 'Workshop Room',
          time: '',
          date: '2017-09-25',
          conference_id: 3,
          description: '',
          name: ''
        },
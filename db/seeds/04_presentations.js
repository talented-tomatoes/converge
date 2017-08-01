
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('presentations').del()
    .then(function () {
      // Inserts seed entries
      return knex('presentations')
      .returning('id')
      .insert([
        {
          name: 'STARTUP BATTLEFIELD', 
          description: 'Startup Battlefield brings the world s top early stage startups together on one stage to compete for the coveted Disrupt Cup, a $50,000 prize, and the attention of media and investors. Since appearing on the TechCrunch stage, Battlefield alumni have collectively raised over $6.9 billion. The judges include TechCrunch editors as well as top VCs and entrepreneurs, and past winners include names like Dropbox, Mint, Yammer, Zenefits, and many more. Participation is free and open. Battlefield applications are now open for Disrupt SF ', 
          date: '2017-09-21', 
          time: '10:00AM', 
          location: 'Red Room', 
          conference_id: 1},
        {
          name: 'HACKATHON',
          description: 'Our Hackathons are crazy, exciting, exhausting events where hundreds of coders and developers come together to form teams which have just shy of 24 hours to build something amazing from the ground up.',
          date: '2017-09-22',
          time: '10:00AM',
          location: 'Blue Room',
          conference_id: 1},
        {
          name:'STARTUP ALLEY',
          description: 'At the heart of Disrupt lies Startup Alley where hundreds of early-stage companies in a variety of verticals showcase their talent and technology to attendees, investors and members of the press. Startup Alley is open to companies that are less than 2 years old with less than $2.5M in funding.',
          date: '2017-09-23',
          time:'11:00AM',
          location: 'Green Room',
          conference_id: 1},
        {
          name: 'The Late Late Show with James Corden. Internet Success, TV Reach',
          description: 'James Corden s post-midnight talk show on CBS is more than just a TV sensation. The producers carefully crafted much of the show so it would translate to internet success as well as appeal to a broadcast audience — to the tune of 1 billion YouTube views, Emmy awards, and spin off series. How did they do it? This session brings together the key team to share their recipe for creating these segments that work so well across both media. In addition, they will explore their creative process, how they learn from what does not work, and how you can apply their lessons to creating your own watercooler moments.',
          date: '2018-06-20',
          time: '10:00AM',
          location: 'Ballroom E',
          conference_id: 2},
        {
          name: 'Emerging Business Models: The Changing Face of the MCN', description: 'This session features 1:1 interviews with 4 of the most well-known multi-channel networks, as we explore how their business models have changed to address marketplace changes, the explosion of new platforms, life after acquisition, and more. After the set of 1:1 interviews, we will bring all the execs up for a roundtable discussion on what the future looks like.',
          date: '2018-06-23',
          time: '11:00AM',
          location: 'Ballroom C',
          conference_id: 2},
        {
          name: 'Edutainment',
          description: 'Remember when you stared at the clock for what seemed like an eternity in Mrs. William s third period Biology class, praying that somehow you could move time and end the most boring lecture possible? If you do — and are convinced that learning CANNOT be entertaining — prepare to be proven wrong! Online video has changed how we learn; find out how from these top-notch EDU creators.',
          date: '2018-06-22',
          time: '2:00PM',
          location: 'Red Room',
          conference_id: 2},
        {
          'location': 'Workshop Room 3',
          'time': '12:00 PM',
          'date': '2017-09-25',
          'conference_id': 3,
          'description': 'For most organizations today, application integration is being solved with “point-to-point” solutions that spiderweb between apps and services. This is simply an extension of the legacy enterprise integration patterns we’ve seen for 2 decades. But with modern enterprise using more than 1000 cloud-based applications, this point-to-point model doesn’t scale and need to change. Enter Data Hubs. By focusing on the data you care about rather than the interfaces and APIs of your applications - your integration architecture is able to scale, while creating a governance and mediation layer. Data and application integration leaders should develop such a strategy to determine effective mediation of semantics, and to identify data sharing requirements across applications, constituencies and ecosystems.\n',
          'name': 'API Integration with a Data Hub'
        },
        {
          'location': 'Workshop Room 1',
          'time': '12:00 PM',
          'date': '2017-09-25',
          'conference_id': 3,
          'description': 'Talk about the future of microservices',
          'name': 'New Frontiers for Microservices'
        },
        {
          'location': 'Workshop Room 2',
          'time': '12:00 PM',
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
        {
          location: 'Workshop Room 1',
          time: '3:00 PM',
          date: '2017-09-25',
          conference_id: 3,
          description: 'TBA',
          name: 'The Hardest Part About Microservices - Your Data'
        },
        {
          location: 'Workshop Room 1',
          time: '3:00 PM',
          date: '2017-09-25',
          conference_id: 3,
          description: `While Function-as-a-Service and Amazon Lambda-based applications are pulling in all of the press in the serverless domain, it's easy to forget that integrating with multiple services can cause dependency and maintenance nightmares, both in terms of coordinating data flow and from maintaining a complex and interconnected system. In this talk we'll look at the benefits of choosing a sole-provider-based serverless development platform. We'll examine how keeping everything with one provider simplifies an app's code, reduces maintenance headaches, and provides a single touchpoint for your DevOps team when maintaining your software. To do this, we'll compare a simple application built using Backand against a similar app built using multiple integrations with separate providers, and examine the code differences to see how sticking with a single serverless functionality provider can help avoid maintenance nightmares, as well as increase the velocity of your development team. Coding Language: JavaScript`,
          name: 'Under One Roof - Avoiding Dependency Hell in a Serverless App'
        },
        {
          location: 'Workshop Room 4',
          time: '4:00PM',
          date: '2017-09-25',
          conference_id: 3,
          description: 'With the advent of microservices and the proliferation of APIs, even the simplest applications require significant API orchestration logic as they find the data they depend on scattered across an ever growing number of systems. Even with the newer protocols, developers still need to do a significant amount of heavy lifting. In this fun and thought provoking talk we will take a look at a new set of technologies, currently under development, that let developers easily combine data from multiple services exposed via RESTful or GraphQL APIs by writing declarative graph queries instead of code and delegating orchestration to a new kind of "query" engine - one that understands how to talk to data services as well as APIs. We will discuss the main shortcomings of the current state of the industry, explore the possible solutions space, understand (briefly) different techniques for automating data-gathering across distributed/federated systems and, finally, take a look at a couple of real world scenarios and working code. This talk will aim to be equal parts content and inspiration. We hope to spark interest in exploring higher level abstractions and protocols for publishing and connecting systems.',
          name: 'Federated Graph Queries Over REST and GraphQL APIs'
        },
        {
          location: 'Workshop Room 2',
          time: '4:00 PM',
          date: '2017-09-25',
          conference_id: 3,
          description: 'Software paradigm is changing from monolith applications to microservices, and with it the infrastructure behind it. Moving from on-premise to cloud to ipaas. Lately a new addition came with serverless infrastructure. In this talk we will walkthrough the principles of serverless and what it applies to APIs. How does it change the API design? what does it change for the end developer? what does it change for the monitoring. We will also be looking at the existing solutions in the market as well as the available frameworks. We will guide attendees into this new space and give an overview of the state of the Art.',
          name: `Serverless APIs, How To's, and Best Practices`
        },
        {
          location: 'Workshop Room 3',
          time: '4:00 PM',
          date: '2017-09-25',
          conference_id: 3,
          description: 'TBA',
          name: 'How Mature Are You? Judging API Program Quality'
        },
        {
          location: 'Workshop Room 1',
          time: '4:00 PM',
          date: '2017-09-25',
          conference_id: 3,
          description: 'PRO Talk',
          name: 'PANEL: The Evolution of Microservices Protocols'
        },
        {
          location: 'Workshop Room 4',
          time: '4:25 PM',
          date: '2017-09-25',
          conference_id: 3,
          description: 'GraphQL & Emerging Technologies Track',
          name: 'GraphQL Fundamentals'
        },
        {
          location: 'Workshop Room 3',
          time: '5:00 PM',
          date: '2017-09-25',
          conference_id: 3,
          description: 'API Tech',
          name: 'API Driven Development'
        },
        {
          location: 'Workshop Room 4',
          time: '5:00 PM',
          date: '2017-09-25',
          conference_id: 3,
          description: 'Let’s face it, REST APIs can be problematic, and hypermedia hasn’t quite proven to be the answer we’ve looked for.  GraphQL has quickly become more popular offering a solution to the problems REST created - but opens back up the very problems REST was created to avoid (remember SOAP?).  But what if there was a way to take the best of both: enter API chains.  In this session we’ll take a look at the pros and cons of REST, GraphQL, and a new specification and library for chaining numerous resource calls into a single HTTP request.',
          name: 'APIs, Chains, & Graphs'
        },
        {
          location: 'Workshop Room 1',
          time: '5:00 PM',
          date: '2017-09-25',
          conference_id: 3,
          description: 'PRO Talk',
          name: 'API Security for Microservices'
        },
        {
          location: 'Main Stage',
          time: '9:00 AM',
          date: '2017-09-26',
          conference_id: 3,
          description: 'In this technical presentation, I will share challenges eBay has been facing during Marketplaces codebase transformation to a (micro)services oriented architecture. Monolithic codebase stack and direct database level integration still have its appeal and tend to be part of “path of least resistance” solutions when a business project faces timeline pressures. For a company of eBay’s size when it comes to number of developers, users, inventory and transactions and velocity of product changes required to stay competitive, there is no doubt that distributed execution and architecture is the right target. So why are opposite forces still so strong? Can the transformation implode and code monoliths re-appear? I will explain the approach eBay has taken on the transition, obstacles the architecture and development teams have seen in the past 5 years and will discuss options on how to address them.',
          name: 'Monolith Strikes Back - Forces Challenging a Transition to Micro-services Architecture'
        },
        {
          location: 'Workshop Room 1',
          time: '9:00 AM',
          date: '2017-09-26',
          conference_id: 3,
          description: 'API Identidy and Security',
          name: `Chillin' Like a Villain - Applying Critical Thinking to Security`
        },
        {
          location: 'Main Stage',
          time: '9:25 AM',
          date: '2017-09-26',
          conference_id: 3,
          description: 'Microservices',
          name: 'Introducing Microservices to the Enterprise'
        },
        {
          location: 'Workshop Room 1',
          time: '10:00 AM',
          date: '2017-09-26',
          conference_id: 3,
          description: 'API adoption in both consumer and enterprises has gone beyond predictions. It has become the ‘coolest’ way of exposing business functionalities to the outside world. Both the public and private APIs, need to be protected, monitored and managed. API security has evolved a lot in last five years. The growth of standards, out there, has been exponential. Following best practices in securing APIs will help to wade through the weeds to keep the bad guys away while realizing the internal and external benefits of developing APIs for your services. This talk guides you through the maze of options and shares industry leading best practices in designing APIs for rock-solid security.',
          name: 'API Security Best Practices and Guidelines'
        },
        {
          location: 'Expo Stage A',
          time: '10:25 AM',
          date: '2017-09-26',
          conference_id: 3,
          description: 'OPEN Talk',
          name: 'OPEN TALK: Creating Value Through Your MobileApp with Real-Time Data Capture'
        },
        {
          location: 'Expo Stage A',
          time: '11:00 AM',
          date: '2017-09-26',
          conference_id: 3,
          description: 'OPEN Talk',
          name: 'OPEN Talk: Mocks - Fake APIs for Real Developers'
        },
        {
          location: 'Workshop Room 1',
          time: '11:00 AM',
          date: '2017-09-26',
          conference_id: 3,
          description: 'API Identity & Security',
          name: `Winning the Red Queen's Race by Changing the Racecourse`
        },
        {
          location: 'Workshop Room 4',
          time: '11:25 AM',
          date: '2017-09-26',
          conference_id: 3,
          description: 'OPEN Talk',
          name: 'OPEN Talk: Offshore Development - How Not to Screw it Up'
        },
        {
          location: 'Workshop Room 4',
          time: '1:00 PM',
          date: '2017-09-26',
          conference_id: 3,
          description: 'OPEN Talk',
          name: 'OPEN Talk: Data Streams and Realtime Technology Stacks'
        },
        {
          location: 'Workshop Room 3',
          time: '1:00 AM',
          date: '2017-09-26',
          conference_id: 3,
          description: 'Integrate: Internet of Things API Design',
          name: `Design, Build and Launch IOT API's`
        },
        {
          location: 'Workshop Room 2',
          time: 'Building Real-time Apps with GraphQL Subscriptions',
          date: '2017-09-26',
          conference_id: 3,
          description: 'Real-time & Streaming APIs',
          name: 'Building Real-time Apps with GraphQL Subscriptions'
        },
        {
          location: 'Workshop Room 3',
          time: '3:00 PM',
          date: '2017-09-26',
          conference_id: 3,
          description: 'Integrate: Internet of Things API Design',
          name: 'the Perfect IoT Storm - Microservices and APIs'
        },
        {
          location: 'Main Stage',
          time: '3:00 PM',
          date: '2017-09-26',
          conference_id: 3,
          description: 'OPEN Talk',
          name: 'OPEN Talk: Building a Unified API Experience'
        },
        {
          location: 'Workshop Room 2',
          time: '4:00 PM',
          date: '2017-09-26',
          conference_id: 3,
          description: 'Real-time & Streaming APIs',
          name: 'The Impact of Real-Time APIs in the Largest Global Industries - Health Care, Banking and More'
        },
        {
          location: 'Workshop Room 2',
          time: '9:00 AM',
          date: '2017-09-27',
          conference_id: 3,
          description: `As we increasingly interact with our devices, it's important for them to understand us better. Doing so will lead increased engagement and satisfaction with our digital experiences. This is Emotion AI -- the exciting new field that bridges human emotion detection and measurement with artificial intelligence. Designing APIs that understand this unique type of data set will become more and more important as the technology is adopted and becomes a part of our lives. Learn how emotional data is generated, packaged, and delivered, and how APIs are used to analyze and consume them.`,
          name: 'Designing an API for Emotion Measurement'
        },
        {
          location: 'Workshop Room 4',
          time: '9:00 AM',
          date: '2017-09-27',
          conference_id: 3,
          description: `Public APIs are a big deal. They are intermediaries that enable applications to interact. Designing a set of interfaces that will meet business objectives, attract developers, and be long-lived is a technical challenge. After dealing with SOAP-based legacy APIs for years, we delivered new modern family of RESTful buy and sell public APIs which enable buyers to shop off-eBay and sellers to manage their business at scale. At eBay, our challenge was to create a vision for the new APIs, plan ahead, and deliver a stable contract that will last for years, even as we add business capabilities. Our API design is developer-centric and focused on exposing valuable solutions to empower third-party developers. APIs represent the consumer’s view of the functionalities. They are the front door to the portfolio of internal capabilities and have requirements tailored to external clients. This presentation outlines difficulties we faced and approaches we took to deliver new APIs and achieve consistency across capabilities.`,
          name: 'OPEN Talk: How We Enabled off-eBay Shopping and Streamlined Selling at eBay'
        },
        {
          location: 'Workshop Room 1',
          time: '9:00 AM',
          date: '2017-09-27',
          conference_id: 3,
          description: `The API economy is radically changing the way organizations do business and operate. More and more successful companies are choosing to “build” their products by leveraging the services and infrastructure of other organizations alongside their own unique user experience and brand. Why? It's a strategic move to stay ahead of their competition and maintain future growth. The fundamental premise of the API economy is the increased productivity enabled by packaging commodity, yet often highly complex, functionality into reusable “building blocks”. Let’s look at 3 household names: Uber, Spotify and AirBnB. They all have several things in common. Firstly and perhaps most obviously they’re all multi billion dollar companies. However, they are also all exemplary examples of companies successfully leveraging APIs to build crucial - yet not core to their competitive advantage - elements of their product offering. The API economy also allows for increased collaboration and accessibility and promotes more agile and user centric solutions. In this session we will explore the benefits and downsides of the API economy as well as the classic build vs buy dilemma; whether to build your application from scratch in-house or whether to licence the technology from a specialist vendor.`,
          name: 'The API Economy - Is It Good For You?'
        },
        {
          location: 'Workshop Room 3',
          time: '9:00 AM',
          date: '2017-09-27',
          conference_id: 3,
          description: `The majority of enterprises are using and implementing public cloud infrastructures and emerging patterns such as microservice architectures in order to build scalable, connected systems. These systems support new demands on businesses as they move from traditional software models to providing Software-as-a-Service (SaaS) platforms, building Internet-of-Things (IoT) solutions, and supporting mobile application development and integration. This will discuss lessons learned over the course a long term consulting engagement for a Internet-of-Things solution. The session will discuss the ups and downs of the project, mistakes made and also the successes. Attendees should leave the session with best practices to help with developing the following aspects of an Internet-of-Things system: Environment Provisioning & Config Management Integration frameworks in the cloud Device authentication Messaging from Devices`,
          name: 'Using IoT Devices in Industry'
        },
        {
          location: 'Workshop Room 2',
          time: '9:25AM',
          date: '2017-09-27',
          conference_id: 3,
          description: `Semantics3 is pioneering the use of Artificial Intelligence in ecommerce. We work with many Fortune 500 retailers on problems core to their ecommerce businesses. Our offer to retailers is simple - in order to compete on a level playing field with Amazon, they need to develop core tech strategies that keep up with Amazon's own tech strategy. We help these retailers fill this void through our AI APIs, which tackle problems like product enrichment, image generation, content generation, product classification and taxonomy. Efficiency-wise, we've managed to achieve human-levels of accuracy without a human-level cost margin. Our talk will explore some of the core business challenges that retailers face, and how AI APIs can help.`,
          name: 'Artificial Intelligence for Ecommerce - An API approach'
        },
        {
          location: 'Workshop Room 4',
          time: '9:25 AM',
          date: '2017-09-27',
          conference_id: 3,
          description: `Blockchains will disrupt much of today's financial, insurance, records, and identity systems. However, to build a blockchain application requires knowledge of everything from peer-to-peer networks, cryptography, consensus, protocols, hashing techniques, key management, mining, privacy, etc. Understanding and keeping up with ever-changing developments requires extremely specialized skills for developers and companies trying to build blockchain applications. Do you know what it takes to build and run a blockchain infrastructure platform? Come to this session to find out what it takes and why you may want to consider a blockchain API provider like BlockCypher. BlockCypher is a blockchain infrastructure company. BlockCypher enables companies building blockchain applications to do so easily via APIs and Blockchain Web Services (BWS). Companies can focus on their business applications while leaving the heavy lifting of running the entire blockchain infrastructure stack to BlockCypher.`,
          name: 'OPEN Talk: What Does it Take to Build and Run Blockchain Infrastructure?'
        },
        {
          location: 'Workshop Room 1',
          time: '10:00 AM',
          date: '2017-09-27',
          conference_id: 3,
          description: `You've created a great API that provides a wonderful and valuable service; but will it get used. This presentation will examine the best practices in building developer and partner ecosystems around your API. It will cover what it takes to build your business strategy around your API, the myths about marketing to developers, and how to best present your API and other developer resources such that you can attract and retain API users.`,
          name: 'Best Practices in Growing a Developer Eco-system Around Your API'
        },
        {
          location: 'Workshop Room 2',
          time: '10:00 AM',
          date: '2017-09-27',
          conference_id: 3,
          description: '90% of data that humanity has ever created, came into being in the last two years. With advances in Hardware, Software, and Platforms as a Service over the last year, you can take a few basic steps to implement machine learning algorithms to get smarter with data.',
          name: 'AI as API'
        },
        {
          location: 'Workshop Room 3',
          time: '10:00 AM',
          date: '2017-09-27',
          conference_id: 3,
          description: `In this presentation I will present the Async API Specification. Protocols like MQTT are going to make the IoT revolution possible because of its low battery and traffic consumption. It's time for us to create a machine-readable specification (like OpenAPI) to define how these APIs can be consumed. It will allow the Async APIs to become interoperable, predictable and will enable us to generate better tooling for them. Read more about Async APIs: http://nordicapis.com/asynchronous-apis-in-choreographed-microservices/`,
          name: 'Async APIs will drive the IoT revolution'
        },
        {
          location: 'Workshop Room 1',
          time: '10:00 AM',
          date: '2017-09-27',
          conference_id: 3,
          description: 'APIs are unlocking new opportunities across a broad range of industries seeking to add value to their products and services. But a successful API strategy requires striking a delicate balance: when should you expose proprietary and derived data through the API itself, and when does it benefit the business to offer differentiated datasets through higher value solutions? This decision should be front and center to your business’ API strategy. Developing APIs and exposing data in a piecemeal way undermines the business benefits APIs can deliver. In this session, Anuj will address key decision factors when it comes to how much to expose in APIs: -- What is the overall business objective? If the goal is to become a go-to third-party API and gain rapid category traction, it will drive a different decision than if you are delivering advanced predictive models through software to provide an enhanced service to customers. -- How diverse are your market segments? The depth of your API offering could change depending on your target markets and how they value your offering. -- What is your channel strategy? Your company’s overall channel strategy could influence the offerings sold through various channels.',
          name: 'Indecent API Exposure - How Much Data Should You Expose Through APIs'
        },
        {
          location: 'Main Stage',
          time: '11:00 AM',
          date: '2017-09-27',
          conference_id: 3,
          description: 'APIs 101: Strategy and Monetization',
          name: 'The Perfect IoT Storm - Microservices and APIs'
        },
        {
          location: 'Workshop Room 2',
          time: '11:00 AM',
          date: '2017-09-27',
          conference_id: 3,
          description: 'The tremendous takeover of messaging platforms over social networks are just a part of the equation of the rise of conversational interfaces. A big driver for this is also that teams no longer need a PHD in NLP to add AI capabilities in their projects thanks to all the APIs available out there. During this session learn to build a customer support bot to reply, using natural language, to FAQ across different chat platform with little to no code using Stamplay and IBM Watson.',
          name: 'Easily Deploy your Chat Bot to Multiple Channels with IBM Watson and Stamplay'
        },
        {
          location: 'Workshop Room 3',
          time: '11:00 AM',
          date: '2017-09-27',
          conference_id: 3,
          description: 'Integrate: Internet of Things APIs',
          name: `With IoT and API's, We're Better Together`
        },
        {
          location: 'Expo Stage A',
          time: '1:00 PM',
          date: '2017-09-27',
          conference_id: 3,
          description: 'Today there are 8 billion connected “things” using APIs as the foundation of innovation in architecture design and modernization, enabling applications and services to be exposed for consumers to access in a manner that simplifies integration and reduces the burden of interoperability. There are many types of APIs ranging from REST, Cloud, Mobile, B2B, IoT, and Web Service APIs, but to properly secure, authenticate, and integrate APIs, API Security Gateway technology is required. An API Security Gateway enables these applications and services to be securely exposed, however, not all API Gateway technologies are created equal.',
          name: 'OPEN Talk: Best Practices in Deploying API Gateways'
        },
        {
          location: 'Main Stage',
          time: '2:00 PM',
          date: '2017-09-27',
          conference_id: 3,
          description: 'An API is a stable contract with your end users, but your company needs to change and adapt to succeed. How do you manage this conflict? In this talk, Aaron will discuss how Vimeo has built their public API to adapt alongside the company.',
          name: 'Tips for Creating Stable, Usable APIs (In a Constantly Changing Company)'
        },
        {
          location: 'Workshop Room 2',
          time: '2:00 PM',
          date: '2017-09-27',
          conference_id: 3,
          description: 'With the growth in machine learning, neural networks, cognitive systems, self-driving cars, the importance of APIs will only grow. The neural networks can only get better when they are fed data from millions of independent data points. These independent data points are essentially systems which are not only sharing data but seeking intelligence from centrally hosted systems. To cater to demands of vast networks of systems sharing and receiving data APIs will need to be lightweight, low latency, high performance and scalable.',
          name: 'Role of APIs in the World of Rising Machine Self Awareness and Cognitive Systems'
        },
      ]);
    });
};

// Template
        // {
        //   location: 'Workshop Room',
        //   time: '',
        //   date: '2017-09-27',
        //   conference_id: 3,
        //   description: '',
        //   name: ''
        // },
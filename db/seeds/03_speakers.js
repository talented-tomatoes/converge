
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('speakers').del()
    .then(function () {
      // Inserts seed entries
      return knex('speakers')
      .returning('id')
      .insert([
        {first_name: 'Sam', last_name: 'Altman', job_title: 'President', avatar_url: 'https://res.cloudinary.com/awchang56/image/upload/v1500833051/Sam_Altman_jdvbnn.png', bio: 'Sam Altman is the president of Y Combinator and the co-chair of OpenAI. Sam also serves on the board of Boom and Reddit. He was cofounder and CEO of Loopt, which was funded by Y Combinator in 2005 and acquired by Green Dot in 2012. Sam also founded Hydrazine Capital. He studied computer science at Stanford, and while there worked in the AI lab. \n Prior to taking over as Y Combinator s president, Sam was a part-time partner at Y Combinator since 2011. You can read Sam\'s essays on startups and technology at [his blog](http://blog.samaltman.com/). \n Sam has consistently been recognized for his entrepreneurship. He was featured in Inc. Magazine\'s Top 30 Entrepreneurs Under 30 and BusinessWeek\'s Tech\'s Best Entrepreneurs. \n As an early innovator in mobile location services, Sam joined Apple CEO Steve Jobs on stage at WWDC 2008, presenting Loopt as one of the first applications in the iPhone App Store. \n Sam has been a valuable source for many media outlets including Charlie Rose, CNN, The Economist, New York Times, Wall Street Journal and numerous others', email: 'sam.altman@gmail.com', linkedin_id: 'samaltman', conference_id: 1},
        {first_name: 'Alon', last_name: 'Cohen', job_title: 'President and co-founder', avatar_url: 'https://res.cloudinary.com/awchang56/image/upload/v1500833483/Alon_Cohen_wnyiub.jpg', bio: 'Alon Cohen is the President and co-founder of Houzz, the leading platform for home remodeling and design, bringing together both professionals and homeowners via mobile, local and social tools. Alon and his wife and cofounder, Adi Tatarko, started Houzz out of challenges that they faced during their own remodeling process. Today, millions of homeowners and more than 1.5 million active home professionals connect through Houzz.com and its mobile apps every month, sharing their photos, advice and product recommendations. Earlier in his career, Alon was a Senior Director of Engineering at eBay, where he helped start eBay\'s developer APIs and manage technology teams responsible for eBay Stores, ProStores, advertising and analytics. Before that, he worked in various software development roles and founded a software company together with his wife. Alon lives in Palo Alto with his wife and three boys. He enjoys traveling the world and playing basketball with his sons, both of which he hopes to do more often', email: 'alon.cohen@gmail.com', linkedin_id: 'aloncohen', conference_id: 1},
        {first_name: 'John', last_name: 'Green', job_title: 'Author', avatar_url: 'https://res.cloudinary.com/awchang56/image/upload/v1500833696/JohnGreen_s0yq1w.jpg', bio: 'John Green is the New York Times bestselling author of Looking for Alaska and The Fault in Our Stars. He is one half of the vlogbrothers on YouTube, co-creator of educational series Crash Course, and co-CEO of Complexly. He is also the award-winning, #1 bestselling author of The Fault in Our Stars, Looking for Alaska, An Abundance of Katherines, Paper Towns, and Will Grayson, Will Grayson. In 2014 he was selected by TIME magazine as one of the 100 Most Influential People in the World, and in 2015 he signed a first-look producing deal with Fox 2000 . You can follow him on twitter @johngreen.', email: 'john.green@gmail.com', linkedin_id: 'johngreen', conference_id: 1},
        {first_name: 'Anna', last_name: 'Fang', job_title: 'CEO', avatar_url: 'https://res.cloudinary.com/awchang56/image/upload/v1500833987/Anna_Fang_cm5g0b.png', bio: 'Anna Fang is the CEO and Partner of ZhenFund, an angel investment fund active in China\'s TMT sector. Anna oversees the fund\'s investments, portfolio management and operations. Since starting the fund in 2011 with Xu Xiaoping, Anna has managed the fund’s over 300 early stage investments. She also sits on the Boards of many of ZhenFund’s investments.', email: 'anna.fang@gmail.com', linkedin_id: 'https://www.linkedin.com/in/anna_fang', conference_id: 1},
        {first_name: 'Kristen', last_name: 'Green', job_title: 'Managing Director', avatar_url: 'https://res.cloudinary.com/awchang56/image/upload/v1500834316/KristenGreen_i0muen.png', bio: 'Kirsten Green used a unique and unconventional blend of professional history and acquired investment experience to launch San Francisco-based Forerunner Ventures in 2010, where she currently serves as Founder and Managing Director. Noticing that emerging purchasing processes were linear and ripe for improvement, Kirsten developed a pacesetter mentality and analytical eye to remain ahead of experience-driven retail trends and identify compelling brand platforms and visionary entrepreneurs. As a founder, Kirsten has lead efforts to raise over $250M from leading investors and has invested in more than 40 early stage companies. Forerunner Ventures is the only VC firm to invest in both Dollar Shave Club and Jet.com, two of the biggest and highest-profile e-commerce exits in recent years, and counts Birchbox, Bonobos, Glossier, Hotel Tonight, Warby Parker and Zola among its portfolio companies. She currently serves on the Board of Directors of several Forerunner portfolio companies including Glossier, InTurn, Outdoor Voices, Ritual and Rockets of Awesome among others. In an unpredictable consumer landscape, Kirsten’s 20+ years of evaluation and investment success stems from a combination of product savvy, retail acumen and a thesis-driven approach that has been the basis of all Forerunner investments — from pre-revenue startups to multi-billion-dollar enterprises- to date. Prior to Forerunner, Kirsten was an equity research analyst and investor at Banc of America Securities, formerly Montgomery Securities, covering publicly-traded retail and consumer stocks. Kirsten graduated from UCLA with a B.A. in Business Economics, and earned a CPA license and a CFA certification.', email: 'kristen.green@gmail.com', linkedin_id: 'kristengreen', conference_id: 2},
        {first_name: 'Michael', last_name: 'Wayne', job_title: 'Founder and CEO', avatar_url: 'https://res.cloudinary.com/awchang56/image/upload/v1500834578/MichaelWayne_FounderandCEO-KinCommunity__2702_tdj2ca.jpg', bio: 'Wayne founded Kin Community in 2007 and has grown the business into a global digital media company that inspires and entertains women around the world through home-focused content and community. Kin Studios produces world-class original and branded video content in categories that include food, home, and DIY. Kin Community is a network of 120 of the best lifestyle content creators across all social platforms. Kin Community works with the world’s leading advertisers to deliver high-quality online video and social campaigns. Wayne is a founding member of GOVA, the trade association for online video, and served as the founding Chairman of the IAWTV. He has lectured at the S.I. Newhouse School of Public Communication at Syracuse University, USC Annenberg School for Communication & Journalism and UCLA’s Anderson School of Business. He has been featured in numerous publications, including Business Week, The Wall Street Journal and The New York Times. Before founding Kin Community, Wayne served as Vice President of Strategic Alliances for Sony Pictures. Prior to joining Sony, Wayne served as Vice President, Business Development for Launch Media where he was part of the core team that grew the online music media company from start-up through IPO and ultimately to its acquisition by Yahoo! Prior to Launch Media, Wayne was a Marketing Manager for The ABC Television Network. He began his career as an entrepreneur in Prague, Czech Republic, where he founded Velvet Magazine, the first English-language city magazine in Central and Eastern Europe. Wayne earned his Bachelor of Arts in English Literature from The University of the South, Sewanee, TN. He’s a board member of the Los Angeles chapter of Girls Inc., a non-profit organization that provides more than 140,000 girls across the U.S. and Canada with life-changing experiences and solutions to the unique challenges girls face.', email: 'michael.wayne@gmail.com', linkedin_id: 'michaelwayne', conference_id: 2},
        {
          first_name: 'Neha',
          last_name:  'Sampat',
          job_title: 'CEO',
          avatar_url: 'https://apiworld.co/wp-content/uploads/2016/04/sampat-neha.png',
          bio: 'Neha Sampat (@nehasf) is the CEO of Built.io, a company that brings startup innovation to large organizations. With 15+ years experience in enterprise software, Neha is a recognized industry leader and has led product marketing and online experiences for companies like Sun Microsystems and VMware. She is a proponent of diversity and an outspoken advocate for nurturing women leaders in her industry. Neha sits on the Board for the Application Developers Alliance with a passion for supporting professional growth for developers. Neha can be found appearing on keynote stages or expert panels discussing her experiences as an entrepreneur, a female leader or how Built.io is changing the world through automation. Neha was named a “San Francisco Business Times 40 under 40” honoree and one of “50 Women in Tech Dominating Silicon Valley” in 2015.',
          email: 'nehasampat@example.com',
          linkedin_id: 'nehasampat',
          conference_id: 3
        },
        {
          first_name: 'Michael',
          last_name: 'Stowe',
          job_title: 'Developer Relations Manager',
          avatar_url: 'https://apiworld.co/wp-content/uploads/2016/04/stowe-michael.png',
          bio: 'Professional technologist and marketer with over 15 years experience. Author, speaker, and consultant with a focus on community development, software architecture, API design, security, and usability.',
          email: 'michaelstowe@example.com',
          linkedin_id: 'mikestowe',
          conference_id: 3
        },
        {
          first_name: 'Rob',
          last_name: 'Zazueta',
          job_title: 'Director of Digital Strategy',
          avatar_url: 'https://apiworld.co/wp-content/uploads/2016/04/zazueta-rob.png',
          bio: 'Crazy passionate about helping enterprises, entrepreneurs, small businesses and startups use technology to drive sales and increase revenues. My career has spanned across business development with an emphasis on technical integrations and channel partnerships, technical sales and support, web application design and programming and online and social marketing. I also spent three years as an independent business owner focused on providing technical consulting for small business customers.',
          email: 'robzazueta@example.com',
          linkedin_id: 'techknowme',
          conference_id: 3
        }, 
        {
          first_name: 'Matt',
          last_name: 'McLarty',
          job_title: 'Vice President, API Academy',
          avatar_url: 'https://apiworld.co/wp-content/uploads/2016/04/Matt.jpg',
          bio: `20+ years in Information Technology Enterprise Architecture, Microservices, Distributed Systems, API Management, Mobile/Cloud/Social/Application/IoT/Big Data Integration, DevOps, REST, SOA, Web Services, Middleware, Information Security`,
          email: 'mattmclarty@example.com',
          linkedin_id: 'mattmclartybc',
          conference_id: 3
        },
        {
          first_name: 'Todd',
          last_name: 'Greene',
          job_title: 'Founder, CEO of PubNub',
          avatar_url: 'https://apiworld.co/wp-content/uploads/2016/04/Todd.jpg',
          bio: `As co-founder and CEO of PubNub, we've delivered a groundbreaking cloud service that levels the playing field, bringing the power of massively multi-user applications to any developer, at any budget.`,
          email: 'toddgreene@example.com',
          linkedin_id: 'toddngreene',
          conference_id: 3
        }, 
        {
          first_name: 'Tanya',
          last_name: 'Vlahovic',
          job_title: 'Senior Software Architect (eBay Inc)',
          avatar_url: 'https://apiworld.co/wp-content/uploads/2016/04/AAEAAQAAAAAAAAiRAAAAJDIyNWFlYzBhLWY5MjItNGU1Yi05OWJiLTEwOWRjOGM5ZWY4Mg1.jpg',
          bio: '15+ years of experience in complete software development life cycle: requirements phase, design and architecture, development, testing, deployment, data analysis, and monitoring. In-depth knowledge of designing, implementing and deploying APIs, user entity resolution, risk assessment and decision making systems. ',
          email: 'tvlahovic@example.com',
          linkedin_id: 'tvlahovic',
          conference_id: 3
        },
        {
          first_name: 'Aldo', 
          last_name: 'Bucchi',
          job_title: 'Principal Architect (MuleSoft)',
          avatar_url: 'https://apiworld.co/wp-content/uploads/2014/12/aldoheadshot.png',
          bio: `Hacker, Salesman, Manager, Coach, Consultant, Engineer. 15 years in the IT industry. Advisor to early stage startups and innovation consultant to CXO types at >1B corporations.`,
          email: 'abucchi@example.com',
          linkedin_id: 'aldobucchi',
          conference_id: 3
        }, 
        {
          first_name: 'Dustin',
          last_name: 'Whittle',
          job_title: 'Developer Advocate (Uber)',
          avatar_url: 'https://apiworld.co/wp-content/uploads/2016/04/06d1510.jpg',
          bio: `At the moment I specialize in developing scalable web platforms and developer advocacy. I enjoy contributing to making the web better.`,
          email: 'dwhittle@example.com',
          linkedin_id: 'dustinwhittle',
          conference_id: 3
        },
        {
          first_name: 'Chris',
          last_name: 'Matthieu',
          job_title: 'Director, IoT Engineering (Citrix Octoblu)',
          avatar_url: 'https://apiworld.co/wp-content/uploads/2016/04/AAEAAQAAAAAAAAlfAAAAJDg5ZWZkZmJjLTgxM2UtNDY4YS04MDc4LTA4Nzc0OGI2NjFhOQ.jpg',
          bio: 'Highly experienced Senior Executive recognized and recruited to drive the development, launch, and market expansion of best in class enterprise software. An expert in developing architecture, SOA, SaaS, and layers of technology from network to web. A proven Business Leader and strategist with a lengthy record of success resolving strategic business issues and creating new market opportunities and disruptive operational models via software. A key player in the evolution of technology and business strategies for companies including BlueCross BlueShield of AZ, Hoosier & Arizona Lotteries, and Accenture with a record of success identifying and leading the introduction of emerging technologies and business models into existing and brand new product portfolios.',
          email: 'cmatthieu@example.com',
          linkedin_id: 'chrismatthieu',
          conference_id: 3
        },
        {
          first_name: 'Mary',
          last_name: 'Cochran',
          job_title: 'Middleware Consultant (Red Hat)',
          avatar_url: 'https://apiworld.co/wp-content/uploads/2016/04/AAEAAQAAAAAAAAYwAAAAJDZlZjE0MzIxLTQxMmUtNGRhMC05ODk2LThmOTEwZTc2Zjc4NA.jpg',
          bio: 'I am a software consultant for Red Hat. I work mainly in the Middleware area with a strong focus on Integration. I work with clients as well as on internal initiatives. My product focus is on JBoss Fuse and the technologies within it.',
          email: 'mcochran@example.com',
          linkedin_id: 'mary-cochran-31201252',
          conference_id: 3
        },
        {
          first_name: 'Catheryne',
          last_name: 'Nicholson',
          job_title: 'CEO (BlockCypher)',
          avatar_url: 'http://apiworld.co/wp-content/uploads/2016/04/AAEAAQAAAAAAAAiIAAAAJDJhYzExNTgyLTFiZTQtNDkyMy05YTM0LWMyYzNiMjhhNzJiOA.jpg',
          bio: '15+ years in software product management, product marketing, environmental & energy, and defense; 5+ years as a U.S. Naval Officer.',
          email: 'cnicholson@example.com',
          linkedin_id: 'catherynenicholson',
          conference_id: 3
        },
        {
          first_name: 'Erik',
          last_name: 'Wilde',
          job_title: 'Unavailable',
          avatar_url: 'Unavailable',
          bio: 'Unavailable',
          email: 'Unavailable',
          linkedin_id: 'Unavailable',
          conference_id: 3
        },
        {
          first_name: 'Christopher',
          last_name: 'Dow',
          job_title: 'Vice President, Software, August home, Inc.',
          avatar_url: 'https://static.sched.com/a4/1674479/avatar.jpg.320x320px.jpg?4d7',
          bio: `Christopher Dow runs the software organization for August, where he is responsible for front-end, back-end, mobile, and firmware development. 

          Prior to August, Christopher Dow was senior vice president, Architecture at Rovi where he was responsible for directing the architecture of Rovi digital entertainment products and product ecosystem, including the Rovi guide, metadata, search and recommendations solutions. He joined Rovi in 2007, when the company acquired Mediabolic, and has over 22 years in the computer graphics and multimedia industry. Chris has directed the high-level architecture for consumer electronics (CE) devices such as digital video recorders, web pads and hand-held gaming devices. He has also led the development of 3D graphics APIs, the media resource solution of a set-top box in an interactive TV environment, and has experience with imaging and X server development.`,
          email: 'cdow@example.com',
          linkedin_id: 'christopherdow',
          conference_id: 3
        },
        {
          first_name: 'Hunter',
          last_name: 'Loftis',
          job_title: 'Engineering Manager, Languages, Heroku',
          avatar_url: 'https://static.sched.com/a12/4195255/avatar.jpg.320x320px.jpg?816',
          bio: `Full-stack JavaScript, C#, Unity, VR, Node.js engineer who loves occasionally escaping the keyboard. I manage the Languages team at Heroku and believe that programming should be playful.`,
          email: 'hloft@example.com',
          linkedin_id: 'hunterloftus',
          conference_id: 3
        },
        {
          first_name: 'Christian',
          last_name: 'Posta',
          job_title: 'Principal Artchitect (Cloud Native Apps, Red Hat)',
          avatar_url: `https://static.sched.com/a12/3419237/avatar.jpg.320x320px.jpg?5f3`,
          bio: `Christian Posta (@christianposta) is a Principal Middleware Specialist/Architect at Red Hat and well known for being an author (Microservices for Java Developers, O’Reilly 2016), frequent blogger, speaker, open-source enthusiast and committer on Apache ActiveMQ, Apache Camel, Fabric8 and others. Christian has spent time at web-scale companies and now helps companies creating and deploying large-scale distributed architectures - many of what are now called Microservices based. He enjoys mentoring, training and leading teams to be successful with distributed systems concepts, microservices, devops, and cloud-native application design.`,
          email: 'christianposta@example.com',
          linkedin_id: 'ceposta',
          conference_id: 3
        },
        {
          first_name: 'Ross',
          last_name: 'Garrett',
          job_title: 'Head of Product Marketing, Cloud Elements',
          avatar_url: 'https://static.sched.com/a12/4075165/avatar.jpg.320x320px.jpg?9ce',
          bio: `Ross Garrett is the Head of Product Marketing at Cloud Elements - responsible for market strategy, product positioning and evangelism. He is a well-known speaker at developer events and other industry conferences. Ross has over 10 years of product and marketing leadership experience in the integration space, most recently at Push Technology and previously with Axway, CA and Layer 7.`,
          email: 'rgarrett@example.com',
          linkedin_id: 'rossgarrett',
          conference_id: 3
        },
        {
          first_name: 'Eugene',
          last_name: 'Istrati',
          job_title: 'Technology Partner, Mitoc Group',
          avatar_url: `https://static.sched.com/a12/3930418/avatar.jpg.320x320px.jpg?47e`,
          bio: `Eugene Istrati has spent over two decades as a technologist in a variety of industries, including digital media, cloud computing, and reputation marketing. Before joining Mitoc Group as Technology Partner, Eugene worked as Director of Engineering at Hearst Corporation and Program Manager at Amazon Web Services. He holds a dual Bachelor of Science degree in Mathematics and Computer Science and a Master of Science degree in Computer Science and Engineering.`,
          email: 'eistrati@example.com',
          linkedin_id: 'eugeneistrati',
          conference_id: 3
        },
        {
          first_name: 'Matt',
          last_name: 'Billock',
          job_title: 'Director of Product Management',
          avatar_url: `https://static.sched.com/a12/3739343/avatar.jpg.320x320px.jpg?e12`,
          bio: `I'm a developer with 13 years of experience, doing product management for serverless app platforms. I have worked in a number of industries, from game dev to trading software, and have a passion for making the lives of developers easier. I'm a proponent of test-driven development, complete documentation, and tools that reduce the headaches faced by developers.`,
          email: 'mattbillock@example.com',
          linkedin_id: 'mattbillock',
          conference_id: 3
        },
        {
          first_name: 'Nicolas',
          last_name: 'Grenié',
          job_title: 'API Evangelist, RedHat',
          avatar_url: `https://static.sched.com/a12/3930461/avatar.jpg.320x320px.jpg?2fe`,
          bio: 'TBA',
          email: 'ngrenie@example.com',
          linkedin_id: 'ngrenie',
          conference_id: 3
        },
        {
          first_name: 'Jenny', 
          last_name: 'Wagner',
          job_title: 'Digital Product Manager, Arity, founded by Allstate',
          avatar_url: `https://media.licdn.com/mpr/mprx/0_0DBXb7RwI_THIERYYXwbzUEmeCyasHNlDXEbBAwIMg2DIXBgZXwGFVEaECDkjXRjjbEFnLIwJq8DZJF-dQ6wKNwSmq8SZJQOYQ66L7BDRaAkZmcBYG9F_53kDA`,
          bio: `Jenny Wanger heads the DevEx Rockstars at Arity, a startup founded by Allstate in downtown Chicago. Formally trained in design thinking, she only feels properly dressed when there’s a pack of post-it notes in her pocket. She is also the owner of Avenir Design, a customer experience consulting firm and has worked with everything from startups raising their first round of funding to GE and Steelcase. Find her documenting user behavior on the streets of Chicago or as a guest blogger on Mind the Product.`,
          email: 'jwagner@example.com',
          linkedin_id: 'jennywagner',
          conference_id: 3
        },
        {
          first_name: 'Robert',
          last_name: 'Zhu',
          job_title: 'Software Engineer, Facebook',
          avatar_url: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/000/259/312/1b19d18.jpg',
          bio: `TBA`,
          email: 'rzhu@example.com',
          linkedin_id: 'rzhu',
          conference_id: 3
        },
        {
          first_name: 'Julia',
          last_name: 'Edwards',
          job_title: 'Software Engineer, Box',
          avatar_url: 'https://static.sched.com/a12/4195256/avatar.jpg.320x320px.jpg?14c',
          bio: `Julia is a software engineer on the Partners team at Box. She works on designing, building out, and maintaining Box's integrations with strategic partners like Google and Microsoft. She is passionate about developing and leveraging APIs to create a more connected and knowledgable world. Outside of work, she enjoys spending time with Malibu (her grumpy 10 year old yellow Lab), doing CrossFit, gardening, and playing Zelda on her N64.`,
          email: 'jedwards@example.com',
          linkedin_id: 'jedwards',
          conference_id: 3
        },
        {
          first_name: 'Snezana',
          last_name: 'Sahter',
          job_title: 'Principal Software Architct, eBay Inc',
          avatar_url: `https://static.sched.com/a12/3930417/avatar.jpg.320x320px.jpg?cc4`,
          bio: `eCommerce | Identity | Risk management for eCommerce | Services Oriented Architecture`,
          email: 'ssahter@example.com',
          linkedin_id: 'ssahter',
          conference_id: 3
        },
        {
          first_name: 'Milan',
          last_name: 'Patel',
          job_title: 'Program Director for Security Offerings',
          avatar_url: `https://static.sched.com/a12/3930461/avatar.jpg.320x320px.jpg?2fe`,
          bio: 'Management, IBM',
          email: 'patelm@example.com',
          linkedin_id: 'patelpatel',
          conference_id: 3
        },
        {
          first_name: 'Ashley',
          last_name: 'Roach',
          job_title: 'Principal Engineer Evangelist, Cisco DevNet',
          avatar_url: `https://static.sched.com/a12/4195908/avatar.jpg.320x320px.jpg?92e`,
          bio: `Ashley Roach is a Principal Engineer and API Evangelist for Cisco's developer relations team, DevNet. He has spoken and led workshops at many Cisco and 3rd-Party conferences. Prior to DevNet, he was a Product Manager in Cloud Collaboration working on APIs and XMPP technologies. Before Cisco, he was Product Manager at NewsGator Technologies, where he initiated the Social Sites product, the leading social software integration with SharePoint at the time. Before NewsGator, he joined Jabber, Inc. in 2003 where he was the Product Manager for the Jabber XCP server and launched the JabberNow appliance. Ashley holds an MBA from the University of Colorado Leeds School of Business and Undergraduate degree in History from the University of Pennsylvania. When not hacking on APIs, he enjoys playing guitar at blues jams around Denver, snowboarding, and camping.`, 
          email: 'aroach@example.com',
          linkedin_id: 'ashleyroach',
          conference_id: 3
        },
        {
          first_name: 'Prabath',
          last_name: 'Siriwardena',
          job_title: 'Senior Director of Security Architecture, WSO2',
          avatar_url: 'https://static.sched.com/a13/3164778/avatar.jpg.320x320px.jpg?8f1',
          bio: 'Prabath Siriwardena is the Senior Director of Security Architecture at WSO2 Inc., a company that produces a wide variety of open source software from data to screen. He is the author of the book Advanced API Security published by Apress. Prabath is also a member of Apache Axis PMC and has spoken at numerous international conferences including OSCON, QCon, ApacheCon, WSO2Con, EIC, IDentity Next and OSDC. He has more than 10 years of industry experience and has worked with many Fortune 100 companies.',
          email: 'prabath@example.com',
          linkedin_id: 'prabathsss',
          conference_id: 3
        },
        {
          first_name: 'Semyon',
          last_name: 'Sergunin',
          job_title: 'Head of SDK Product Group, ABBYY',
          avatar_url: `https://static.sched.com/a13/4308988/avatar.jpg.320x320px.jpg?6e0`,
          bio: `I believe that people are intelligent and creative, but unfortunately, they have to waste their precious time dealing with stupid and repetitive tasks, which prevent them from reaching their full potential. 
          At ABBYY we help to solve it. We build technology for capturing information from analog (or digital) sources and making it actionable: searchable, analyzable, ready for making decisions and taking actions. Now our technology saves people millions of hours per year by reducing the need for manual data entry. For last 20+ years, thousands of software developers integrated our OCR, document and data capture technologies into their applications, saving users' time and improving their experience.
          At API:World I will show how to leverage our latest Real-time Mobile Capture technology for reading card numbers, codes, signs and any other alpha-numeric data on the mobile device.`,
          email: 'sserguinin@example.com',
          linkedin_id: 'semyonsergunin',
          conference_id: 3
        },
        {
          first_name: 'Abhinav',
          last_name: 'Asthana',
          job_title: `CEO/Co-founder, Postman`,
          avatar_url: 'https://static.sched.com/a13/4325486/avatar.jpg.320x320px.jpg?0fa', 
          bio: `TBA`,
          email: 'aasthana@example.com',
          linkedin_id: 'asthana_abhinav',
          conference_id: 3
        },
        {
          first_name: 'Josh',
          last_name: 'Thurston',
          job_title: `Security Strategist`,
          avatar_url: 'https://static.sched.com/a12/3445633/avatar.jpg.320x320px.jpg?040', 
          bio: `Josh Thurston is a Security Strategist in the McAfee Office of the CTO. In this role, Thurston drives business growth and defines the company’s go-to-market strategy for the Americas, creating and communicating innovative solutions for today’s complex information security and privacy challenges.
          Prior to joining McAfee, Thurston was co-founder of a merchant services company known for developing a secure mobile credit card processing solution over digital wireless devices. 
          With over a decade at McAfee, Thurston is an industry veteran with extensive experience in customer environments of multiple sizes and verticals. Thurston has worked side by side with engineering teams in product innovations, design specification, scalability testing, and product integrations. 
          Thurston has educated security practitioners around the globe on security design and best practices, and is a known speaker and participant in industry events. Thurston has a Bachelor’s of Science in Business / e-Business.`,
          email: 'jthurston@example.com',
          linkedin_id: 'jthurston',
          conference_id: 3
        },
        {
          first_name: 'Alan',
          last_name: 'Winters',
          job_title: `Head of US Business Development, MobiDev`,
          avatar_url: 'https://static.sched.com/a13/4308219/avatar.jpg.320x320px.jpg?5b6', 
        bio: `I am an entertainment executive/TV producer turned serial entrepreneur. After spending two decades creating and marketing projects for major media companies such as FOX and Lionsgate, I have spent the past twelve years in the world of digital start-ups and emerging companies. I am currently engaged in a number of such businesses and takes an active, hands-on role in each.`,
          email: 'awinters@example.com',
          linkedin_id: 'awinters',
          conference_id: 3
        },
        {
          first_name: 'Bhavana',
          last_name: 'Srinivas',
          job_title: `Solutions Architect, PubNub`,
          avatar_url: 'https://static.sched.com/a12/3754775/avatar.jpg.320x320px.jpg?b40', 
          bio: `I have been working in the realtime communication space for over three years, and am excited by the possibilities it has for the future. Whether it is building the next big IoT application, or working with realtime APIs or the infrastructure to support always-on applications, I am excited to learn more in this space.`,
          email: 'bhavanasrinivas@example.com',
          linkedin_id: 'bhavanascrinivas',
          conference_id: 3
        },
        {
          first_name: 'Venkatachalam',
          last_name: 'Rangasamy',
          job_title: `Principal Software Architect, Equinix`,
          avatar_url: 'https://static.sched.com/a10/3135065/avatar.jpg.320x320px.jpg?cd4', 
          bio: `Principal Software Architect at Equinix. An Innovative, dynamic and agile lead with reputations for defining enterprise technology strategies/solutions that reduce costs | | Authored a well acclaimed micro-service design principle based framework called AquaJS`,
          email: 'venka@example.com',
          linkedin_id: 'venkatachalam',
          conference_id: 3
        },
        {
          first_name: 'Gal',
          last_name: 'Oppenheimer',
          job_title: `Senior Product Manager, Built.io`,
          avatar_url: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/2/000/201/299/1d37753.jpg', 
          bio: `Gal Oppenheimer is the senior product manager at Built.io and delivered award-winning applications from inception to onstage launch. He is responsible for Built.io’s flagship products including Built.io Flow, Built.io Backend, and Built.io Contentstack. Gal manages development engagements for both enterprises and startup customers including the Sacramento Kings, Miami Heat, Dell, EMC, VMware, Elastic, Twilio and more. Gal holds a B.A. in economics and a minor in computer science from The University of Chicago. Parthiv Patel is the Technical Marketing Manager at Built.io where he specializes in technologies that enable tomorrow’s connected ecosystems. Dubbed “Connected Parthiv”, he has been hacking hardware for over a decade and brings to life solutions that span robotics, automation and artificial intelligence. From smart buildings to race cars, Parthiv’s forte is building interesting connections and innovative demos at the intersection of hardware, software, digital and physical. As part of the Office of the CTO, he authors Built.io’s annual Technology Predictions.`,
          email: 'gal@example.com',
          linkedin_id: 'galop',
          conference_id: 3
        },
        {
          first_name: 'Adam',
          last_name: 'Tornes',
          job_title: `Senior Product Manager, Twitter Developer Platform`,
          avatar_url: 'https://static.sched.com/a12/4195264/avatar.jpg.320x320px.jpg?073', 
          bio: `Adam is Senior Product Manager at Twitter, where he leads many of the product and engineering initiatives related to Twitter's API platform and data business. Prior to joining Twitter, Adam was an early employee and PM at Gnip, where he launched and managed many of the company's core API products that still support Twitter’s enterprise customers today (including Historical PowerTrack, Search, Replay and more). Previously, he served as Director of Product at OneRiot (a Gnip customer acquired by Walmart Labs) and Web Development Engineer at web analytics company, Compete (acq. by TNS). Adam received his MBA from The Ohio State University and has a bachelor degree in computer graphics technology from Purdue University. Outside of Twitter, Adam founded and leads Colorado Product, a professional organization focused on growth and development of the PM/PMM profession in the region.`,
          email: 'atorr@example.com',
          linkedin_id: 'adamtorres',
          conference_id: 3
        },
        {
          first_name: 'Matthias',
          last_name: 'Broner',
          job_title: `TBA`,
          avatar_url: 'TBA', 
          bio: `TBA`,
          email: 'mbro@example.com',
          linkedin_id: 'mbron',
          conference_id: 3
        },
        {
          first_name: 'Boisy',
          last_name: 'Pitre',
          job_title: `Emotion AI Evangelist, Affectiva`,
          avatar_url: 'https://static.sched.com/a12/3930406/avatar.jpg.320x320px.jpg?7eb', 
          bio: `Boisy is the Emotion AI Evangelist for Affectiva, an MIT Media Lab spinoff, where he advocates and promotes the adoption of the company’s emotion-based artificial intelligence technology across all of its supported platforms. He is responsible for designing and developing the first real-time machine learning-based, emotion-sensing and analytics SDK for mobile devices, which has pushed the boundaries of innovation in the industry. Now he is focused on advancing the adoption of Emotion AI through his thought leadership and advocacy. Boisy holds a Master of Science in Computer Science from the University of Louisiana at Lafayette.`,
          email: 'boisyp@example.com',
          linkedin_id: 'boisyp',
          conference_id: 3
        },
        {
          first_name: 'Gavin',
          last_name: 'Cooney',
          job_title: `CEO and Co-Founder, Learnosity`,
          avatar_url: 'https://static.sched.com/a12/3930411/avatar.jpg.320x320px.jpg?f4b', 
          bio: `Gavin is the Co-Founder and CEO of Learnosity, an award winning educational technology company that offers a suite of B2B, SaaS assessment technologies (APIs) which enable organizations from a wide range of sectors, to easily incorporate powerful, interactive assessment capabilities into any digital product, new or existing.`,
          email: 'gcooney@example.com',
          linkedin_id: 'gcooney',
          conference_id: 3
        },
        {
          first_name: 'Varun',
          last_name: 'Sivamani',
          job_title: `Chief Executive Officer, Semantics3, Inc`,
          avatar_url: 'https://static.sched.com/a12/3722970/avatar.jpg.320x320px.jpg?db4', 
          bio: `Varun started out with the simple idea of organizing and structuring the world's ecommerce information in his dorm room at university. This eventually evolved into Semantics3, which he co-founded with two of his classmates.

          You should talk to us about how we're helping retailers embrace ecommerce with APIs and AI - particularly in challenges like product catalog enrichment, product taxonomy and the RealTime price monitoring

          Varun oversees the strategic direction of the company, with offices in San Francisco, Bengaluru and Singapore. It is the leading provider of intelligent data-powered software for ecommerce-focussed companies; it supports retailers, brands, insurance providers and many other large Fortune 500 enterprises make better decisions and grow their market in online commerce.

          Varun hails from Singapore and holds a bachelor's degree in computer engineering from the National University of Singapore (NUS).`,
          email: 'varun@example.com',
          linkedin_id: 'varun',
          conference_id: 3
        },
        {
          first_name: 'Paul',
          last_name: 'Nerger',
          job_title: `Senior VP, Product Management`,
          avatar_url: 'https://static.sched.com/a12/3930409/avatar.jpg.320x320px.jpg?832', 
          bio: `Developer and Partner Ecosystems | Documenting APIs | Building Developer Communities | Developer Relations`,
          email: 'paul_n@example.com',
          linkedin_id: 'paulnerger',
          conference_id: 3
        },
        {
          first_name: 'Arjun',
          last_name: 'Mohan',
          job_title: `CEO, Archie.ai`,
          avatar_url: 'https://static.sched.com/a12/3663563/avatar.jpg.320x320px.jpg?676', 
          bio: `Arjun is the CEO & Co-founder of Archie.AI, an Artificially Intelligent Data Scientist. Archie plugs into a business's wealth of untapped data to synthesize insights and increase revenue. Archie's database of 50 million conversions helps train machine learning algorithms powering Archie. Our goal is to help businesses make better decisions based on rigorous and continuous analysis of their existing data, through the power of A.I.`,
          email: 'arjunmohan@example.com',
          linkedin_id: 'arjunmohan',
          conference_id: 3
        },
        {
          first_name: 'Fran',
          last_name: 'Mendez',
          job_title: `Lead Engineer, Hutch`,
          avatar_url: 'https://static.sched.com/a12/3930416/avatar.jpg.320x320px.jpg?f1a', 
          bio: `TBD`,
          email: 'fmendez@example.com',
          linkedin_id: 'fmendez',
          conference_id: 3
        },
        {
          first_name: 'Anuj',
          last_name: 'Agrawal',
          job_title: `CMO, Earth Networks`,
          avatar_url: 'https://static.sched.com/a12/3930410/avatar.jpg.320x320px.jpg?329', 
          bio: `TBD`,
          email: 'aagrawal@example.com',
          linkedin_id: 'aagrawal',
          conference_id: 3
        },
        {
          first_name: 'Guiliano',
          last_name: 'Iacobelli',
          job_title: `CEO, Stamplay`,
          avatar_url: 'https://static.sched.com/a12/3230401/avatar.jpg.320x320px.jpg?259', 
          bio: `Software engineer turned full stack entrepreneur. Co-Founder of #500 Strong company Stamplay, the Lego for APIs. Love for Hip Hop.`,
          email: 'giacobelli@example.com',
          linkedin_id: 'giaco',
          conference_id: 3
        },
        {
          first_name: 'Scott',
          last_name: 'Harkins',
          job_title: `VP IoT Partner Programs Honeywell Connection Home & Buildings, Honeywell`,
          avatar_url: 'https://static.sched.com/a12/4195253/avatar.jpg.320x320px.jpg?952', 
          bio: `Scott Harkins is Vice President of Partner Development within Honeywell’s Connected Home & Building organizations. In this role, Scott manages the relationships with technology companies, the developer community & the startup community. The partner development team is responsible for creating consumer value by enabling developers to consume Honeywell’s API for its’ portfolio of cloud connected products.`,
          email: 'sharkins@example.com',
          linkedin_id: 'sharkins',
          conference_id: 3
        },
        {
          first_name: 'Greg',
          last_name: 'DiFruscio',
          job_title: `Director of Support`,
          avatar_url: 'https://static.sched.com/a13/4325447/avatar.jpg.320x320px.jpg?4b7', 
          bio: `Working with Forum Systems since 2004, Greg is responsible for all pre and post-sales customer support. This includes product training for customers and partners as well as deploying new Forum Sentry installations. A core focus is on designing, building, implementing, and demonstrating the Forum Sentry API Security Gateway use cases.`,
          email: 'gdi@example.com',
          linkedin_id: 'gregdifruscio',
          conference_id: 3
        },
        {
          first_name: 'Aaron',
          last_name: 'Hedges',
          job_title: `API Product Manager, Vimeo`,
          avatar_url: 'TBD', 
          bio: `Aaron Hedges has been building the Vimeo API for years. Starting as an engineer, he recently transitioned into Product Management and is focusing that time on the design, developer experience and the business of APIs.`,
          email: 'ahedges@example.com',
          linkedin_id: 'ahedges',
          conference_id: 3
        },
        {
          first_name: 'Sumit',
          last_name: 'Kapoor',
          job_title: `Managing Partner, Zorang Inc.`,
          avatar_url: 'https://static.sched.com/a13/4327141/avatar.jpg.320x320px.jpg?e13', 
          bio: `With over 20 years of IT industry experience leading teams in engineering, services, product management, sales and marketing, in diverse fields such as Services, Telecom, Content Management, Integration and Marketplaces at leading companies such as HCL-HP, Verizon (GTE), Interwoven (OpenText), Cast Iron and IBM, Sumit can provide a unique perspective as a Consumer and Provider of services. Sumit has a Masters in CS from Cornell University and a Bachelors in CS from Pune University, India.`,
          email: 'sumitkapoor@example.com,',
          linkedin_id: 'sumitkapoor',
          conference_id: 3
        }
      ]);
    });
};

// template
        // {
        //   first_name: '',
        //   last_name: '',
        //   job_title: ``,
        //   avatar_url: '', 
        //   bio: ``,
        //   email: '',
        //   linkedin_id: '',
        //   conference_id: 3
        // },
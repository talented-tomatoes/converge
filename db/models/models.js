const db = require('../index.js');
//define the models
const User = db.Model.extend({
  tableName: 'users',
  presentations: function() {
    return this.belongsToMany(Presentation, 'users_presentations');
  },
  conferences: function() {
    return this.belongsToMany(Conference);
  }
});


const Presentation = db.Model.extend({
  tableName: 'presentations',
  users: function() {
    return this.belongsToMany(User, 'users_presentations');
  },
  speakers: function() {
    return this.belongsToMany(Speaker);
  },
  conferences: function() {
    return this.belongsTo(Conference);
  }
});

const Conference = db.Model.extend({
  tableName: 'conferences',
  users: function() {
    return this.belongsToMany(User);
  },
  speakers: function() {
    return this.hasMany(Speaker);
  },
  presentations: function() {
    return this.hasMany(Presentation);
  }
});

const Speaker = db.Model.extend({
  tableName: 'speakers',
  presentations: function() {
    return this.belongsToMany(Presentation);
  },
  conferences: function() {
    return this.belongsTo(Conference);
  }
});

const ConferenceUser = db.Model.extend({
  tableName: 'conferences_users',
  conferences: function() {
    return this.belongsTo(Conference);
  },
  users: function() {
    return this.belongsTo(User);
  }
});

const UserPresentation = db.Model.extend({
  tableName: 'users_presentations',
  presentations: function() {
    return this.belongsTo(Presentation);
  }
});

const PresentationSpeaker = db.Model.extend({
  tableName: 'presentations_speakers',
  speakers: function() {
    return this.belongsTo(Speaker)
  }
})

module.exports = {
  User: User,
  Users: User.collection(User),
  Presentation: Presentation,
  Presentations: Presentation.collection(Presentation),
  Conference: Conference,
  Conferences: Conference.collection(Conference),
  ConferenceUser: ConferenceUser,
  UserPresentation: UserPresentation,
  Speaker: Speaker,
  Speakers: Speaker.collection(Speaker),
  PresentationSpeaker: PresentationSpeaker
};



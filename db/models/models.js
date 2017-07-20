const db = require('../index.js');
//define the models
const User = db.Model.extend({
  tableName: 'users',
  presentations: () => {
    return this.belongsToMany(Presentation, 'users_presentations');
  },
  conferences: () => {
    return this.belongsToMany(Conference, 'conferences_users');
  }
});

const Presentation = db.Model.extend({
  tableName: 'presentations',
  users: () => {
    return this.belongsToMany(User, 'users_presentations');
  },
  speakers: () => {
    return this.belongsToMany(Speaker, 'presentations_speakers');
  },
  conference: () => {
    return this.belongsTo(Conference, 'conferences');
  }
});

const Conference = db.Model.extend({
  tableName: 'conferences',
  users: () => {
    return this.belongsToMany(User, 'conferences_users');
  },
  speakers: () => {
    return this.hasMany(Speaker);
  },
  presentations: () => {
    return this.hasMany(Presentation);
  }
});

const Speaker = db.Model.extend({
  tableName: 'speakers',
  presentations: () => {
    return this.belongsToMany(Presentation, 'presentations_speakers');
  }
});

module.exports = {
  User: User,
  Users: User.collection(User),
  Presentation: Presentation,
  Presentations: Presentation.collection(Presentation),
  Conference: Conference,
  Conferences: Conference.collection(Conference),
  Speaker: Speaker,
  Speakers: Speaker.collection(Speaker)
};



const bookshelf = require('../bookshelf.js');
//define the models
const User = bookshelf.Model.extend({
  tableName: 'users',
  presentations: () => {
    return this.belongsToMany(Presentation, 'users_presentations');
  },
  conferences: () => {
    return this.belongsToMany(Conference, 'conferences_users');
  }
});

const Presentation = bookshelf.Model.extend({
  tableName: 'presentations',
  users: () => {
    return this.belongsToMany(User, 'users_presentations');
  },
  speakers: () => {
    return this.belongsToMany(Speaker, 'presentations_speakers');
  }
});

const Conference = bookshelf.Model.extend({
  tableName: 'conferences',
  users: () => {
    return this.belongsToMany(User, 'conferences_users');
  }
});

const Speaker = bookshelf.Model.extend({
  tableName: 'speakers',
  presentations: () => {
    return this.belongsToMany(Presentation, 'presentations_speakers');
  }
});



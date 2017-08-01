const models = require('../../db/models/models.js');
const config = require('../../config/config.js');
const stripe = require('stripe')(config.stripe.secKey);
const util = require('../lib/utils.js');
const axios = require('axios');

let getAllUsers = (req, res) => {

  console.log('GET /api/users');
  models.Users.fetch()
		.then(user => {
  console.log('users=', user.attributes);
  res.status(200).send(user);
})
		.catch(err => {
  console.log('Error:', err);
  res.status(500).send(err);
});

};

let getUser = (req, res) => {
  models.User.where({login_id: req.params.id})
  .fetchAll()
  .then(user => {
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send(user);
    }
  })
  .catch(err => {
    console.log(`Error fetching user with id:${req.params.id}-`, err);
    res.status(500).send(err);
  });
};

let getAllSpeakersOfConf = (req, res) => {
  const confid = req.params.confid;
  models.Speaker.where({conference_id: confid})
    .orderBy('first_name', 'ASC')
    .fetchAll()
    .then((speakers) => {
      speakers.forEach(speaker => {
        console.log('fetched speaker: ', speaker.attributes.first_name, speaker.attributes.last_name);
      });
      console.log(speakers.length, 'speakers fetched')
      res.status(200).send(speakers);
    })
  .catch((err) => {
    console.log('Error fetching speakers by conferenceID: ', err);
    res.status(404).send(err);
  });
};

let getAllSpeakersOfPresentation = (req, res) => {
  models.PresentationSpeaker.where({presentation_id: req.params.presentationid})
    .fetchAll({withRelated: ['speakers']})
    .then((record) => {
      var data = JSON.stringify(record);
      var speakers = JSON.parse(data).map(speaker => speaker.speakers);
      res.status(200).send(speakers);
    })
    .catch((err) => {
      console.log('Error getting all speakers of presentation', err);
      res.status(404).send(err);
    });
};

let getAllConferences = (req, res) => {
  models.Conferences
  .orderBy('start_date', 'ASC')
  .fetch()
  .then(collection => {
    console.log('conferences = ', collection);
    res.status(200).send(collection);
  })
  .catch(err => {
    console.log('ERROR:', err);
  });
};

let getAllPresentationsOfConf = (req, res) => {
  const confid = req.params.confid;
  models.Presentation.where({conference_id: confid})
    .fetchAll({withRelated: 'speakers'})
    .then(presentations => {
      var data = JSON.stringify(presentations);
      var sortedData = JSON.parse(data).sort((a, b) => {
        return new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time);
      });
      presentations.forEach(presentation => {
        console.log('fetched presentation: ', presentation.attributes.name);
      })
      console.log(presentations.length, 'presentations fetched');
      res.status(200).send(sortedData);
    })
    .catch(err => {
      console.log('Error getting presentations of conference: ', err);
    });
};

let checkinUser = (req, res) => {
  let USERID = req.params.userid;
  let CHECKINPICURL = req.body.checkinpicurl;
  let gallery_name = req.params.userid;

      // verify
  const OPTIONS = util.getKairosRequestObj(CHECKINPICURL, gallery_name, USERID);
  console.log('options = ', OPTIONS);
  return axios.post(OPTIONS.url, OPTIONS.body, OPTIONS.config)
// }
    //res.status(200).send('Success!');

  .then(response => {
    if (response.data.images) {
      let confidence = response.data.images[0]['transaction']['confidence'];
      console.log('confidence=', confidence);
      if (confidence > 0.65) {
        console.log('face was a match');
        res.status(200).send('Success');
      } else {
        console.log('no match found')
        res.status(200).send('Checkin Failed. Please enter a Valid Picture');
      }
    } else {
      console.log('no match found')
      res.status(200).send('Checkin Failed. Please enter a Valid Picture');
    }
  })
	.catch(err => {
  console.log('no match found')
  console.log('ERROR :', err);
  res.status(500).send('Internal Error!');
});
};



let chargeCustomer = (req, res) => {
  stripe.charges.create({
    amount: Number(req.body.details.total.amount.value) * 100,
    currency: 'usd',
    description: 'Example event registration charge',
    source: req.body.token
  }, function(err, charge) {
    if (err) {
      console.log(err);
      res.status(400).end();
    } else {
      console.log('payment successful!');
      res.status(201).end();
    }
  });

};

let registerUser = (req, res) => {
  models.User.forge({login_id: req.body.login_id})
             .fetch()
             .then(user => {
               console.log('user fetched===>', user);
               user.save(req.body)
               .then(user => {
                 console.log('user saved:', user);
               })
                .catch(err => {
                  console.log('error saving user: ', err);
                });
             })
             .catch(err => {
               models.User.forge(req.body)
                          .save()
                          .then(user => {
                            console.log('user saved:', user);
                          })
                          .catch(user => {
                            console.log('error saving user: ', err);
                          });
             });
  res.status(200).send('User saved!');
};

let getUserIdByGoogleLoginID = (req, res) => {
  // console.log('req.params: ', req.params.userID);
  models.User.where({'login_id': req.params.userID}).fetch()
    .then(user => {
      res.status(200).send(user);
    });

};

let addConference = (req, res) => {
  //console.log('Inside addConference, conference name=', req.body.name);
  models.Conference.forge(req.body).save()
    .then(conference => {
      console.log(conference.attributes.name, 'conference created');
      res.status(200).send('Conference saved!');
    })
    .catch(err => {
      console.log('error.error==> ',  err);
      // console.log('error.keys==> ', Object.keys(err));
      if (err.detail.includes('already exists')) {
        res.status(500).send(`Conference ${req.body.name} has been added already!`);
      }
    });
};

let getConferencesByHostID = (req, res) => {
  models.Conference.where({user_id: req.params.hostID})
    .orderBy('start_date', 'ASC')
    .fetchAll()
      .then(conferences => {
        console.log(conferences.length, 'conferences fetched');
        res.status(200).send(conferences);
      });
};

// ADD A NEW SPEAKER TO A CONFERENCE
let addSpeaker = (req, res) => {
  models.Speaker.forge(req.body).save()
    .then(speaker => {
      console.log('1 speaker saved: ', speaker.attributes.first_name, speaker.attributes.last_name);
      res.status(201).send(speaker);
    })
    .catch(err => {
      console.log('error: ', err);
      res.status(400).send('error saving speaker');
    });
};

let updateSpeakerOfConf = (req, res) => {
  console.log('Updating speaker of conference ', req.body);

  // bookshelf command -
    // use .where to look for the entry in Speaker
    // then .fetch() it
    // then use that result to update the row

  models.Speaker.where({id: req.body.id}).fetch()
    .then(speaker => {
      speaker.save(req.body, {method: 'update'});
      console.log('speaker updated: ', speaker);
      res.status(200).send('Speaker Updated!');
    })
    .catch(err => {
      console.log('error: ', err);
      res.status(400).send('error udpating speaker');
    });
};

let addPresentation = (req, res) => {
  var presentation = req.body.presentation;
  var speakers = req.body.speakers;

  models.Presentation.forge(presentation).save()
    .then(pres => {
      console.log('1 new presentation added to conference');
      for (var key in speakers) {
        models.PresentationSpeaker.forge({speaker_id: speakers[key].id, presentation_id: pres.id}).save()
          .then(record => {
            console.log('speaker_id/presentation_id added to join table');
          })
          .catch(err => {
            console.log(err);
          });

      }
      res.status(201).end();
    })
    .catch(err => {
      console.log('Error saving presentation: ', err);
      res.status(400).send('error saving presentation');
    });
};


let helloWorld = (req, res) => {
  res.send('hello world');
};


let saveUserToConference = (req, res) => {
  console.log('Payment successful. Saving user to Conference ===>', req.body);
  var conference_id = req.body.conference_id;
  var user_id = req.body.user_id;
  models.ConferenceUser.forge({conference_id, user_id})
		.fetch()
		.then(record => {
  if (record) {
    console.log('RECORD FOUND ===>', record);
    res.status(201).end();
  } else {
    models.ConferenceUser.forge({conference_id, user_id}).save();
    res.status(201).end();
  }
})
		.catch(error => {
  console.log(error);
  res.status(400).end();
});
};

let getAllUserEvents = (req, res) => {

  models.ConferenceUser.where({user_id: req.params.userid})
		.fetchAll({withRelated: ['conferences']})
		.then(record => {
  var data = JSON.stringify(record);
  var conferences = JSON.parse(data).map(conf => conf.conferences);
  res.status(200).send(conferences);
});

};

let getUserSchedule = (req, res) => {
  models.UserPresentation.where({user_id: req.params.userid})
    .fetchAll({withRelated: ['presentations']})
    .then(record => {
      var data = JSON.stringify(record);
      var presentations = JSON.parse(data).map(pres => pres.presentations);
      res.status(200).send(presentations);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send('Error getting user schedule');
    })
}

let savePresentationToUserSchedule = (req, res) => {
  console.log('Saving presentation to user schedule...', req.body);
  models.UserPresentation.forge(req.body)
    .fetch()
    .then(record => {
      if (!record) {
        models.UserPresentation.forge(req.body).save();
        res.status(201).send('success');
      } else {
        res.status(201).send('already added');
      }

    });
};

let editConference = (req, res) => {
  console.log('UPDATING CONFERENCE ', req.body);

  // bookshelf command -
    // use .where to look for the entry in Speaker
    // then .fetch() it
    // then use that result to update the row

  models.Conference.where({id: req.body.id}).fetch()
    .then(conference => {
      conference.save(req.body, {method: 'update'});
      console.log('conference updated: ', conference);
      res.status(200).send('Conference Updated!');
    })
    .catch(err => {
      console.log('error: ', err);
      res.status(400).send('error udpating conference');
    });
};

let getConferenceByConfID = (req, res) => {
  console.log('GETTING CONFERENCE BY ID: ', req.params.confID);

  models.Conference.where({id: req.params.confID}).fetch()
    .then(conference => {

      console.log('conference fetched: ', conference);
      res.status(200).send(conference);
    })
    .catch(err => {
      console.log('error: ', err);
      res.status(400).send('error fetching that specific conference');
    });
};
let removePresentationFromUserSchedule = (req, res) => {
  console.log('Removing presentation from user schedule...', req.params);
  var userid = req.params.userid;
  var presid = req.params.presid;
  models.UserPresentation.where({user_id: userid, presentation_id: presid})
    .destroy()
    .then(results => {
      res.status(200).end();
    })
    .catch(err => {
      console.log(err);
      res.status(400).send('Error removing presentation from user schedule');
    });
};

let editUserProfile = (req, res) => {
  console.log('In EditUserProfile');
  models.User.where({login_id: req.body.login_id}).fetch()
    .then(user => {
      console.log('user: ', user.attributes);
      if (user) {
      return user.save(req.body, {method: 'update'});
      } else {
        res.status(404).send(user);
      }
    })
    .then(user => {
      console.log('user===>', user);
      if (user) {
        res.status(201).send(user);
      } else {

      }
    })
    .catch(err => {
      console.log('error updating user: ', err);
      res.status(400).send('error updating user: ', err);
    });
};

let removePresentationFromConference = (req, res) => {
  var presid = req.params.presid;
  models.Presentation.where({id: presid})
    .destroy()
    .then(results => {
      console.log('presentation deleted');
      res.status(200).end();
    })
    .catch(err => {
      console.log('error deletingn presentation: ', err);
      res.status(400).send('Error removing presentation from conference');
    });
};

let getAllPresentationsOfSpeaker = (req, res) => {
  console.log('Getting all presentations of speaker', req.params);
  models.PresentationSpeaker.where({speaker_id: req.params.speakerid})
    .fetchAll({withRelated: ['presentations']})
    .then(record => {
      var data = JSON.stringify(record);
      var presentations = JSON.parse(data).map(pres => pres.presentations);
      res.status(200).send(presentations);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send('Error getting speakers presentations');
    });
};

let editPresentation = (req, res) => {
  //fetch current record and update presentation table with new updates
  models.Presentation.where({id: req.body.presentation.id}).fetch()
    .then(presentation => {
      presentation.save(req.body.presentation, {method: 'update'});
      console.log('presentation updated');

      //to update speaker/presentations joins, first delete current joins, then add new joins
      //fetch all joins between current presentation and speakers and delete from database
      models.PresentationSpeaker.where({presentation_id: req.body.presentation.id})
        .destroy()
        .then(result => {
          console.log('All joins associated with', req.body.presentation.name, 'destroyed');

          //create new records for new joins
          for (let i = 0; i < req.body.speakerIds.length; i++) {
            models.PresentationSpeaker.forge({speaker_id: req.body.speakerIds[i], presentation_id: req.body.presentation.id}).save()
              .then(joins => {
                console.log('1 join associated with', req.body.presentation.name, 'created')
                if (i === req.body.speakerIds.length - 1) {
                  console.log('presentation/speaker join table updated');
                  res.status(201).send('presentation Updated');
                }
              })
              .catch(err => {
                console.log('error updating presentation/speaker join table: ', err);
                res.status(400).send('error updating presentation: ', err);
              })
          }
        })
        .tap(result => {

        })
        .catch(err => {
          console.log('error updating presentation/speaker join table: ', err);
          res.status(400).send('error updating presentation: ', err);
        });
    })
    .catch(err => {
      console.log('error updating presentation: ', err);
      res.status(400).send('error updating presentation: ', err);
    });
}

let deleteSpeakerFromPresentation = (req, res) => {
  console.log('deleteSpeakerFromPresentation: ', req.params);
  models.PresentationSpeaker.where({speaker_id: req.params.speakerid, presentation_id: req.params.presentationid})
  .destroy()
  .then(results => {
    res.status(204).end();
  })
  .catch(err => {
    console.log('error deleting speaker from presentation: ', err);
    res.status(400).send('error deleting speaker from presentation');
  })
}

let deleteConferenceFromHost = (req, res) => {
  console.log('Deleting Conference from Host, id:', req.params.conferenceID);

  models.Conference.where({id: req.params.conferenceID})
  .destroy()
  .then(results => {
    res.status(204).end();
  })
  .catch(err => {
    console.log('error deleting conference from host ', err);
    res.status(400).send('error deleting conference from host');
  });
};

let deleteSpeaker = (req, res) => {
  console.log('Deleting Speaker ', req.params.speakerID);
  models.Speaker.where({id: req.params.speakerID})
  .destroy()
  .then(results => {
    console.log('1 speaker deleted');
    res.status(204).end();
  })
  .catch(err => {
    console.log('error deleteing speaker ', err);
    res.status(400).send('error deleting speaker');
  });
};

module.exports = {
  getAllUsers: getAllUsers,
  getAllSpeakersOfConf: getAllSpeakersOfConf,
  getAllSpeakersOfPresentation: getAllSpeakersOfPresentation,
  getAllConferences: getAllConferences,
  getAllPresentationsOfConf: getAllPresentationsOfConf,
  checkinUser: checkinUser,
  chargeCustomer: chargeCustomer,
  registerUser: registerUser,
  addConference: addConference,
  addSpeaker: addSpeaker,
  addPresentation: addPresentation,
  saveUserToConference: saveUserToConference,
  getUserIdByGoogleLoginID: getUserIdByGoogleLoginID,
  getConferencesByHostID: getConferencesByHostID,
  getAllUserEvents: getAllUserEvents,
  helloWorld: helloWorld,
  savePresentationToUserSchedule: savePresentationToUserSchedule,
  getUser: getUser,
  updateSpeakerOfConf: updateSpeakerOfConf,
  editConference: editConference,
  getConferenceByConfID: getConferenceByConfID,
  getUserSchedule: getUserSchedule,
  editUserProfile: editUserProfile,
  removePresentationFromUserSchedule: removePresentationFromUserSchedule,
  removePresentationFromConference: removePresentationFromConference,
  getAllPresentationsOfSpeaker: getAllPresentationsOfSpeaker,
  editPresentation: editPresentation,
  deleteSpeakerFromPresentation: deleteSpeakerFromPresentation,
  deleteConferenceFromHost: deleteConferenceFromHost,
  deleteSpeaker: deleteSpeaker
};
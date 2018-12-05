'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const { App } = require('jovo-framework');

const config = {
  logging: true,
};

const app = new App(config);

// =================================================================================
// App Logic
// =================================================================================

app.setHandler({
  LAUNCH: function() {
    this.toIntent('HelloWorldIntent');
  },
  HelloWorldIntent: function() {
    this.tell('Ciao dev');
  },
  speaker: function() {
    let speech = 'Lo speaker è quel moretto carino di nome Lorenzo?';
    let reprompt = 'Rispondi con si o no';
    this.followUpState('SceltaSpeaker').ask(speech, reprompt);
  },
  SceltaSpeaker: {
    YesIntent: function() {
      this.tell('è un ragazzo molto simpatico');
    },
    NoIntent: function() {
      let speech = 'Probabilmente parli di Fabio Biondi?';
      let reprompt = 'Rispondi con si o no';
      this.followUpState('FabioBiondi').ask(speech, reprompt);
    },
  },
  FabioBiondi: {
    YesIntent: function() {
      this.tell('fai attenzione, parla molto velocemente');
    },
    NoIntent: function() {
      this.tell('peccato...è un Google Developer Expert');
    },
  },
  MyNameIsIntent: function(name) {
    this.tell('Hey ' + name.value + ', nice to meet you!');
  },
});

module.exports.app = app;

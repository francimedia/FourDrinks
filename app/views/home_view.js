var View = require('./view');
var template = require('./templates/home');

module.exports = View.extend({
  id: 'home-view',
  template: template,

  events: {
    "click #about-1": "nextClicked"
  },
 
  nextClicked: function(e){
    e.preventDefault();
    // this.trigger("next")    
    Backbone.history.navigate("about", {trigger: true});
  } 

});

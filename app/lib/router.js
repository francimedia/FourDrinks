var application = require('application');

module.exports = Backbone.Router.extend({
  routes: {
    '': 'home',
    'about': 'about'
  },

  home: function() {
    if($('body #navigation').length == 0) {
      $('body').append(application.layoutView.render().el);  
    }
    this._fadeTransition(application.homeView);
  },

  about: function() {    
    this._fadeTransition(application.aboutView);
  },

  _fadeTransition: function(view) {
    $('#content').fadeOut(100, function() {
      $('#content').html(view.render().el).fadeIn();  
    });
  }

});

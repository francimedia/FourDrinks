// Application bootstrapper.
Application = {
  initialize: function() {
    var LayoutView = require('views/layout_view');
    var HomeView = require('views/home_view');
    var AboutView = require('views/about_view');
    var Router = require('lib/router');
    // Ideally, initialized classes should be kept in controllers & mediator.
    // If you're making big webapp, here's more sophisticated skeleton
    // https://github.com/paulmillr/brunch-with-chaplin
    this.layoutView = new LayoutView();
    this.homeView = new HomeView();    
    this.aboutView = new AboutView();
    this.router = new Router();
    if (typeof Object.freeze === 'function') Object.freeze(this);
  }
}

module.exports = Application;

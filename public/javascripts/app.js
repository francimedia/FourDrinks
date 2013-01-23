(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("application", function(exports, require, module) {
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
  
});
window.require.register("initialize", function(exports, require, module) {
  var application = require('application');

  $(function() {
    application.initialize();
    Backbone.history.start();
  });
  
});
window.require.register("lib/router", function(exports, require, module) {
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
  
});
window.require.register("lib/view_helper", function(exports, require, module) {
  // Put your handlebars.js helpers here.
  
});
window.require.register("models/collection", function(exports, require, module) {
  // Base class for all collections.
  module.exports = Backbone.Collection.extend({
    
  });
  
});
window.require.register("models/model", function(exports, require, module) {
  // Base class for all models.
  module.exports = Backbone.Model.extend({
    
  });
  
});
window.require.register("views/about_view", function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/about');

  module.exports = View.extend({
    id: 'about-view',
    template: template
  });
  
});
window.require.register("views/home_view", function(exports, require, module) {
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
  
});
window.require.register("views/layout_view", function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/layout');

  module.exports = View.extend({
    id: 'layout-view',
    template: template
  });
  
});
window.require.register("views/templates/about", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div class=\"container\" id=\"content\">\n	<p>\n	  test 1\n	</p> \n</div>";});
});
window.require.register("views/templates/home", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div class=\"container\">\n	<p>\n	  <button class=\"btn btn-large btn-info\" type=\"button\">\n	  	<i class=\"icon-user icon-white\"></i> Connect to FourSquare\n	  </button>\n	</p>\n\n	<div class=\"btn-group\">\n	  <a class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\n	    Action\n	    <span class=\"caret\"></span>\n	  </a>\n	  <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\n	    <li><a tabindex=\"-1\" href=\"#\">Action</a></li>\n	    <li><a tabindex=\"-1\" href=\"#\">Another action</a></li>\n	    <li><a tabindex=\"-1\" href=\"#\">Something else here</a></li>\n	    <li class=\"divider\"></li>\n	    <li><a tabindex=\"-1\" href=\"#\">Separated link</a></li>\n	  </ul>\n	</div>\n</div>";});
});
window.require.register("views/templates/layout", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div class=\"container\" id=\"navigation\">\n	<ul class=\"nav nav-tabs\">\n	  <li class=\"active\">\n	    <a href=\"#\">Home</a>\n	  </li>\n	  <li><a href=\"#about\">About</a></li>\n	  <li><a href=\"#help\">Help</a></li>\n	  <li class=\"dropdown\">\n	    <a class=\"dropdown-toggle\"\n	       data-toggle=\"dropdown\"\n	       href=\"#\">\n	        Dropdown\n	        <b class=\"caret\"></b>\n	      </a>\n	    <ul class=\"dropdown-menu\">\n		    <li><a tabindex=\"-1\" href=\"#\">Action</a></li>\n		    <li><a tabindex=\"-1\" href=\"#\">Another action</a></li>\n		    <li><a tabindex=\"-1\" href=\"#\">Something else here</a></li>\n		    <li class=\"divider\"></li>\n		    <li><a tabindex=\"-1\" href=\"#\">Separated link</a></li>\n	    </ul>\n	  </li>\n	</ul>\n</div>\n<div id=\"content\"></div>";});
});
window.require.register("views/view", function(exports, require, module) {
  require('lib/view_helper');

  // Base class for all views.
  module.exports = Backbone.View.extend({
    initialize: function() {
      this.render = _.bind(this.render, this);
    },

    template: function() {},
    getRenderData: function() {},

    render: function() {
      this.$el.html(this.template(this.getRenderData()));
      this.afterRender();
      return this;
    },

    afterRender: function() {}
  });
  
});

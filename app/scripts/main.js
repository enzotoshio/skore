var App = new Marionette.Application();

App.addInitializer(function() {
  App.Routes = new API.Routers.Default();

  App.addRegions({
    MainRegion: "#main-region"
  });

  App.Layout = new API.LayoutViews.Home();

  App.MainRegion.show(App.Layout);
});

App.on("start", function() {
  Backbone.history.start({ trigger: true });
});

App.start();
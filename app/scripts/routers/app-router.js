API.Routers.Default= Marionette.AppRouter.extend({
  controller: new API.Controllers.Home(),

  appRoutes: {
    "index" : "init",
    "" : "init",
    "/" : "init"
  }
});
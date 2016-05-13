API.Controllers.Home = Marionette.Controller.extend( {
  init: function () {
    var headerView = new API.ItemViews.Header();

    App.Layout.header.show( headerView );
  }
} );
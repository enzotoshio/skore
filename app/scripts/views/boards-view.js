API.ItemViews.Board = Marionette.ItemView.extend( {
  template: false,
  tagName: 'option',
  onRender: function () {
    var text = this.model.get( 'name' ),
      id = this.model.get( 'id' );

    this.$el.text( text );
    this.$el.val( id );
  }
} );

API.CollectionViews.Boards = Marionette.CollectionView.extend( {
  tagName: 'select',
  className: 'header-manager-field',
  id: 'boards-controller',
  childView: API.ItemViews.Board
} );
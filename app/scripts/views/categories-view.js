API.ItemViews.Category = Marionette.ItemView.extend( {
  template: false,
  tagName: 'option',
  onRender: function () {
    var text = this.model.get( 'name' ),
      id = this.model.get( 'id' );

    this.$el.text( text );
    this.$el.val( text );
    this.$el.attr( 'data-category', id );
  }
} );

API.CollectionViews.Categories = Marionette.CollectionView.extend( {
  tagName: 'select',
  className: 'header-manager-field',
  id: 'categories-controller',
  childView: API.ItemViews.Category
} );
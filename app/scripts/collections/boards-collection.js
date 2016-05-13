API.Collections.Boards = Backbone.Collection.extend( {
  url: '/scripts/mocks/boards.json',
  comparator: function ( model ) {
    return !model.get( 'default' );
  },
  byCategoryId: function ( categoryId ) {
    var filtered = this.filter( function ( item ) {
      return item.get( 'category_id' ) === Number(categoryId);
    } );

    return new API.Collections.Boards( filtered );
  }
} );
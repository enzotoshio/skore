API.ItemViews.Header = Backbone.Marionette.ItemView.extend( {

  template: '#header-skeleton',

  ui: {
    background: '#header-background',
    form: '#header-manager-container',
    title: '#header-title',
    subtitle: '#header-subtitle'
  },

  initialize: function () {
    this.fetchCategoriesCollection();
  },

  events: {
    'click #header-submit-button': 'updateHeader',
    'change #categories-controller': 'filterBoards'
  },

  fetchCategoriesCollection: function () {
    this.categoriesCollection = new API.Collections.Categories();
    this.categoriesCollection.fetch()
      .then( this.renderCategories.bind( this ) );
  },

  fetchBoardsCollection: function () {
    this.boardsCollection = new API.Collections.Boards();
    this.boardsCollection.fetch()
      .then( this.renderBoards.bind( this ) );
  },

  renderCategories: function ( collection ) {
    var categoriesCollectionView = new API.CollectionViews.Categories( {
      collection: this.categoriesCollection
    } );

    categoriesCollectionView.render()
      .$el.insertBefore( '#header-submit-button' );

    this.fetchBoardsCollection();
  },

  getSelectedCategory: function () {
    var categoriesSelect = this.ui.form.find( '#categories-controller' ),
      selectedCategory = categoriesSelect[ 0 ].options[ categoriesSelect[ 0 ].selectedIndex ];

    return selectedCategory;
  },

  getSelectedBoard: function () {
    var boardsSelect = this.ui.form.find( '#boards-controller' ),
      boardSelected = boardsSelect[ 0 ].options[ boardsSelect[ 0 ].selectedIndex ];

    return boardSelected;
  },

  filterBoards: function () {
    this.boardsCollection = this.allBoardsCollection;
    this.renderBoards();
  },

  renderBoards: function () {
    var selectedCategory = this.getSelectedCategory(),
      category = this.$( selectedCategory )
      .attr( 'data-category' ) || this.boardsCollection.first()
      .get( 'category_id' ),
      boardsSelect = this.ui.form.find( '#boards-controller' ),
      hasBoardsSelect = boardsSelect.length > 0;

    this.allBoardsCollection = this.allBoardsCollection || this.boardsCollection;
    this.boardsCollection = this.boardsCollection.byCategoryId( category );
    this.boardsCollection.sort();

    var boardsCollectionView = new API.CollectionViews.Boards( {
      collection: this.boardsCollection
    } );

    if ( hasBoardsSelect ) {
      boardsSelect.remove();
    }

    boardsCollectionView.render()
      .$el.insertBefore( '#categories-controller' );

    this.updateHeader();
  },

  updateHeader: function () {
    var boardSelectedId = this.getSelectedBoard()
      .value,
      selectedBoardData = this.boardsCollection.find( function ( item ) {
        return item.get( 'id' ) === Number( boardSelectedId );
      } )
      .attributes;

    this.updateBackground( selectedBoardData );
    this.updateHeaderInfo( selectedBoardData );
  },

  updateBackground: function ( selectedBoard ) {
    var boardBackgroundImage = selectedBoard[ 'background_image' ] || 'http://placehold.it/1024x800/252525?text=No Image';

    this.ui.background.attr( 'src', boardBackgroundImage );
  },

  updateHeaderInfo: function ( selectedBoard ) {
    var title = selectedBoard[ 'name' ] || 'No title',
      subtitle = this.getSelectedCategory()
      .text;

    this.ui.title.text( title );
    this.ui.subtitle.text( subtitle );
  }
} );
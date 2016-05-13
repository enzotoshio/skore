module.exports = {
  beforeEach: function ( browser ) {
    browser
      .url( 'http://localhost:9000/' )
      .waitForElementVisible( 'body', 1000 )
  },

  'Should start with title, subtitle and background already set': function ( browser ) {
    browser
      .moveToElement( '#header-background', 100, 100, function () {
        browser
          .assert.containsText( '#header-title', 'Conteúdos Extras' )
          .assert.containsText( '#header-subtitle', 'Books' )
          .expect.element( '#header-background' )
          .to.have.attribute( 'src' )
          .which.contains( 'http://res.cloudinary.com/skore-production/image/upload/c_fill,dpr_2.0,f_auto,w_980/d6sndbxfuuccttm5uwbb' );
      } );
  },

  'Should update boards list': function ( browser ) {
    browser
      .moveToElement( '#header-background', 100, 100, function () {
        browser
          .click( '#categories-controller option[value="Educação"]' )
          .assert.containsText( '#boards-controller option:nth-child(1)', 'Conteúdos Extras' )
          .assert.containsText( '#boards-controller option:nth-child(2)', 'Como nosso cérebro aprende?' )
          .expect.element( '#boards-controller option:nth-child(7)' )
          .to.be.present;
      } );
  },

  'Should update title, subtitle and background': function ( browser ) {
    browser
      .moveToElement( '#header-background', 100, 100, function () {
        browser
          .click( '#header-submit-button' )
          .pause( 1000 )
          .assert.containsText( '#header-title', 'Conteúdos Extras' )
          .assert.containsText( '#header-subtitle', 'Books' )
      } )
      .end();
  }
};
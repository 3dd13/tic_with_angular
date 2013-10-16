'use strict';

describe('Controller: GameBoardCtrl', function () {

  // load the controller's module
  beforeEach(module('ticWithAngularFireApp'));

  var GameBoardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GameBoardCtrl = $controller('GameBoardCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

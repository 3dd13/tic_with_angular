'use strict';

describe('Controller: MatchPlayerCtrl', function () {

  // load the controller's module
  beforeEach(module('ticWithAngularFireApp'));

  var MatchPlayerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MatchPlayerCtrl = $controller('MatchPlayerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

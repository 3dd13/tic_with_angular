'use strict';

angular.module('ticWithAngularFireApp', ['firebase'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/game_board/:id/:mySymbol', {
        templateUrl: 'views/game_board.html',
        controller: 'GameBoardCtrl'
      })
      .when('/match_player', {
        templateUrl: 'views/match_player.html',
        controller: 'MatchPlayerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

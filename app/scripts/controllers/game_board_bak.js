'use strict';

angular.module('ticWithAngularFireApp')
  .controller('GameBoardCtrl', function ($scope, $routeParams, angularFire) {
    $scope.gameBoardId = $routeParams.id;
    $scope.mySymbol = $routeParams.mySymbol;
    // $scope.currentSymbol = 'x';
    
    $scope.gameBoard = [];
    var gameBoardRef = new Firebase("https://example.firebaseio.com/room/" + $routeParams.id);
    $scope.promise = angularFire(gameBoardRef, $scope, "gameBoard");
    $scope.promise.then (function () {
      if ($scope.gameBoard.length == 0 && $routeParams.mySymbol == 'x') {
        $scope.makeMyMove();
      } else {
        $scope.waitForOpponentToMove();
      }
    });
    
    $scope.waitForOpponentToMove = function() {
      gameBoardRef.on('child_added', function(snapshot) {
        gameBoardRef.off('child_added');
        
        if ($scope.isLosing()) {
          // print losing
          // redirect to match player if play again
        } else if ($scope.isDraw()) {
          // print draw
          // redirect to match player if play again
        } else {
          $scope.makeMyMove();
        }
      });
    };
    
    $scope.makeMyMove = function() {
      if ($scope.isWinning()) {
        // print winning
        // redirect to match player if play again
      } else if ($scope.isDraw()) {
        // print draw
        // redirect to match player if play again
      } else {
        $scope.waitForOpponentToMove();
      }
    }
    
    $scope.isLosing = function() {
      return false; 
    }
    
    $scope.isWinning = function() {
      return false; 
    }
    
    $scope.isDraw = function() {
      return false; 
    }    
  });

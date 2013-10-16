'use strict';

angular.module('ticWithAngularFireApp')
  .controller('GameBoardCtrl', function ($scope, $routeParams, angularFire) {
    $scope.gameBoardId = $routeParams.id;
    $scope.mySymbol = $routeParams.mySymbol;    
    
    $scope.gameBoard = [];
    var gameBoardRef = new Firebase("https://example.firebaseio.com/room/" + $routeParams.id);
    $scope.promise = angularFire(gameBoardRef, $scope, "gameBoard");

    /*
      Step 1
    */
    // $scope.promise.then (function () {
    //   console.log("In Game Board");
    //   console.log($scope.gameBoardId);
    //   console.log($scope.mySymbol);      
    // });
    
    /*
      Step 2
    */
    $scope.promise.then (function () {
      if ($scope.gameBoard.length == 0 && $routeParams.mySymbol == 'x') {
        console.log("I am First Move: Symbol: " + $routeParams.mySymbol);
        $scope.makeMyMove();
      } else {
        console.log("I am Second Move: Symbol: " + $routeParams.mySymbol);
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
      $scope.listenForMyClick();
      
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

    $scope.listenForMyClick = function() {
      // handle click event on cell 
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

'use strict';

angular.module('ticWithAngularFireApp')
  .controller('GameBoardCtrl', function ($scope, $routeParams, angularFire) {
    $scope.gameBoardId = $routeParams.id;
    $scope.mySymbol = $routeParams.mySymbol;    
    $scope.myTurn = false;
    
    // $scope.gameBoard = [];
    var gameBoardRef = new Firebase("https://3dd13-ttt-game.firebaseio.com/room/" + $routeParams.id);
    $scope.promise = angularFire(gameBoardRef, $scope, "gameBoard", []);

    $scope.promise.then (function () {
      $scope.gameBoard = [];
      if ($routeParams.mySymbol == 'x') {
        console.log("I am First Move: Symbol: " + $routeParams.mySymbol);
        $scope.myTurn = true;
      } else {
        console.log("I am Second Move: Symbol: " + $routeParams.mySymbol);
        $scope.myTurn = false;
      }
    });
    
    gameBoardRef.on('value', function(snapshot) {
      console.log("wait received");
      if (!$scope.myTurn) {
        if (snapshot.val() != null) {
          if (!arrays_equal(snapshot.val(), $scope.gameBoard)) {
            console.log("diff gameboard");
            if ($scope.isLosing()) {
              // print losing
              // redirect to match player if play again
            } else if ($scope.isDraw()) {
              // print draw
              // redirect to match player if play again
            } else {
              $scope.myTurn = true;
            }
          } else {
            console.log("same gameboard"); 
          }
        } else {
          console.log("snapshot is empty");
        }
      } else {
        console.log("it is my turn but I receive ");
      }
    });
    

            
    $scope.handleClick = function(index) {
      if ($scope.myTurn) {
        $scope.gameBoard[index] = $scope.mySymbol;
      
        if ($scope.isWinning()) {
          // print winning
          // redirect to match player if play again
        } else if ($scope.isDraw()) {
          // print draw
          // redirect to match player if play again
        } else {
          $scope.myTurn = false;
        }
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
    
    function arrays_equal(a,b) { return !(a<b || b<a); }
  });

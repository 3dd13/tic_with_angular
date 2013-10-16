'use strict';

angular.module('ticWithAngularFireApp')
  .controller('MatchPlayerCtrl', function ($scope, angularFire, $location) {
    $scope.waitingRoom = {};
    var waitingRoomRef = new Firebase("https://3dd13-ttt-game.firebaseio.com/waiting_room");
    $scope.promise = angularFire(waitingRoomRef, $scope, "waitingRoom");
    
    $scope.promise.then (function () {
      if ($scope.waitingRoom.xJoined == true) {
        $scope.joinWaitingRoom();
      } else {        
        $scope.createWaitingRoom();
      }
    });
    
    $scope.joinWaitingRoom = function() {
      var roomNumber = $scope.waitingRoom.gameBoardNumber;
      $scope.waitingRoom = {};
      
      $location.path('game_board/' + roomNumber + '/o');
    }
    
    // TODO what happen if I refresh the page
    // TODO how to check if the opponent is alive ?
    // TODO how to check if the opponent is matching you ?
    // TODO hand shaking to confirm opponent (xId, oId) each guy set in another firebase endpoint, saying who they are expecting. I am expecting you, You are expecting me. ok.
    // TODO make sure the id is unique
    $scope.createWaitingRoom = function() {
      $scope.waitingRoom = {xJoined: true, gameBoardNumber: generateGameBoardNumber()};
      $scope.noticeMessage = "You are x, waiting for opponent.";
      
      waitingRoomRef.on('child_removed', function(snapshot) {
        $location.path('game_board/' + $scope.waitingRoom.gameBoardNumber + '/x');
      });
    }
    
    function generateGameBoardNumber() {
      return Math.floor(Math.random() * 16777215).toString(16);
    }
  });

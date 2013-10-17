'use strict';

angular.module('ticWithAngularFireApp')
  .controller('MatchPlayerCtrl', function ($scope, angularFire, $location) {
    $scope.waitingRoom = {};
    var waitingRoomRef = new Firebase("https://3dd13-ttt-game.firebaseio.com/waiting_room");
    $scope.promise = angularFire(waitingRoomRef, $scope, "waitingRoom");
    
    /* 
      Step 1
    */
    // $scope.promise.then (function () {
    //   $scope.waitingRoom = {xJoined: true, gameBoardNumber: generateGameBoardNumber()};
    // });
        
    /* 
      Step 2
    */
    // $scope.promise.then (function () {
    //   $scope.createWaitingRoom();
    // });
    // 
    // $scope.createWaitingRoom = function() {
    //   $scope.waitingRoom = {xJoined: true, gameBoardNumber: generateGameBoardNumber()};
    //   $scope.noticeMessage = "You are x, waiting for opponent.";
    // }
        
    /* 
      Step 3
    */
    // $scope.promise.then (function () {
    //   if ($scope.waitingRoom.xJoined == true) {
    //     $scope.joinWaitingRoom();
    //   } else {        
    //     $scope.createWaitingRoom();
    //   }
    // });
    // 
    // $scope.joinWaitingRoom = function() {
    //   $scope.waitingRoom = {};
    // 
    //   console.log("joinWaitingRoom");
    // }
    // 
    // $scope.createWaitingRoom = function() {
    //   $scope.waitingRoom = {xJoined: true, gameBoardNumber: generateGameBoardNumber()};
    //   $scope.noticeMessage = "You are x, waiting for opponent.";
    //   
    //   waitingRoomRef.on('child_removed', function(snapshot) {
    //     console.log("createWaitingRoom and another people removed the waiting room");
    //   });
    // }
    
    /*
      Step 4
    */
    $scope.promise.then (function () {
      if ($scope.waitingRoom.xJoined == true) {
        $scope.joinWaitingRoom();
      } else {        
        $scope.createWaitingRoom();
      }
    });
    
    $scope.createWaitingRoom = function() {
      $scope.waitingRoom = {xJoined: true, gameBoardNumber: generateGameBoardNumber()};
      $scope.noticeMessage = "You are x, waiting for opponent.";
      
      waitingRoomRef.on('child_removed', function(snapshot) {
        // TODO should double check if the I am paired
        
        $location.path('game_board/' + $scope.waitingRoom.gameBoardNumber + '/x');
      });
    }

    $scope.joinWaitingRoom = function() {
      var gameBoardNumber = $scope.waitingRoom.gameBoardNumber;
      $scope.waitingRoom = {};
      
      $location.path('game_board/' + gameBoardNumber + '/o');
    }
    
    // TODO what happen if I refresh the page
    // TODO how to check if the opponent is alive ?
    // TODO how to check if the opponent is matching you ?
    // TODO hand shaking to confirm opponent (xId, oId) each guy set in another firebase endpoint, saying who they are expecting. I am expecting you, You are expecting me. ok.
    // TODO make sure the id is unique

    
    function generateGameBoardNumber() {
      // 2 ^ 23 - 1
      return Math.floor(Math.random() * 16777215).toString(16);
    }
    
    /*
      Step 5
    */
    // $scope.removeWaitingRoomInTransaction = function() {
    //   waitingRoomRef.transaction(function(currentWaitingRoom) {
    //     currentWaitingRoom = {};
    //     
    //     if (currentWaitingRoom.xJoined == true && currentWaitingRoom.oJoined == true) {
    //       console.log('There are already 2 players joined.');
    //       return; // Abort the transaction.
    //     } else if (currentWaitingRoom.xJoined == true && currentWaitingRoom.oJoined == false) {
    //       return {}; // clear the waitingRoom
    //     } else {
    //       return; // Abort the transaction      
    //     }
    //   }, function(error, committed, snapshot) {
    //   
    //     console.log("onCompleted");
    //     if (error) {
    //       console.log('Transaction failed abnormally!', error);
    //     } else if (!committed) {
    //       console.log('Aborted the transaction.');        
    //     } else {
    //       console.log('Completed successfully!');        
    //     }
    // 
    //     console.log('After save, the waitingRoom is now: ', snapshot.val());
    //   }); 
    // }
      
  });

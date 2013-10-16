Some key modules in the program
================


App.js
----------
- add match player route 
- change game board route 


Match player js
----------
- link to firebase waiting room
- check if there is any player waiting
  - create one if no player record
     - listen to deletion
  - delete one if there is one
- redirect the two players to game_board/:room number/:my symbol


Game board js
----------
- link to firebase room/room number
- link the $scope.cells to angularfire
- decide if I am the first one to move
  - if yes
     - allow player to click and move
     - check winning or draw
     - wait for event for next move
     - checking losing or draw
     - ...
  - if no
    - wait for event for next move
    - checking losing or draw
    - allow player to click and move
    - check wining or draw
    - wait again
    - ...
{
    init: function(elevators, floors) {
        var rotator = 0;
        _.each(floors, function(floor) {
            floor.on("up_button_pressed down_button_pressed", function(event) {
                var elevatorIsGoingDown = false;
                var elevator = _.min(elevators, function(elevator) {                  
                    var elevatorIsGoingUp = elevator.destinationQueue.legnth > 0 && (elevator.destinationQueue[0] - elevator.currentFloor() > 0);
                    elevatorIsGoingDown = elevator.destinationQueue.legnth > 0 && (elevator.destinationQueue[0] - elevator.currentFloor() < 0);
                    var passengerIsGoingUp = event == "up_button_pressed";
                    var wrongDirection = elevatorIsGoingUp && passengerIsGoingDown;
                    var distanceToFloor = Math.abs(elevator.currentFloor() - floor.floorNum());
                    return (distanceToFloor + (wrongDirection ? 10 : 0)) + ((elevator.loadFactor() > 0.5) ? 100 * elevator.loadFactor() : 10 * elevator.loadFactor());
                } );
            }); 
        });
        _.each(elevators, function(elevator) {
            elevator.on("floor_button_pressed", function(floorNum) {
                elevator.goToFloor(floorNum);
            });
            elevator.on("idle", function() {
                elevator.goToFloor(0);
            });
        });
    },
    update: function(dt, elevators, floors) {
    }
}

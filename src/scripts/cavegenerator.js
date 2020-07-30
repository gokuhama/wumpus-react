//import Room from "../components/room";

class CaveGenerator {

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    getTotalRoomCount() {
        return this.width * this.height;
    }

    createRooms() {
        let roomRows = [];
        for (let i = 0; i < this.height; i++) {
            let roomRow = new RowModel(i);
            for (let j = 0; j < this.width; j++) {
                roomRow.rooms.push(new RoomModel((i * this.width) + j, j, i));
            }
            roomRows.push(roomRow);
        }
        return roomRows;
    }
}

class RowModel{
    rooms = [];

    constructor(id){
        this.id = id;
    }
}

class RoomModel {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
    }

    isEven() {
        return this.id % 2 === 0;
    }
}

export default CaveGenerator
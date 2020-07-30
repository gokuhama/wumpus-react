
const directions = {
    UP_LEFT: 'upleft',
    UP: 'up',
    UP_RIGHT: 'upright',
    DOWN_LEFT: 'downleft',
    DOWN_RIGHT: 'downright',
    DOWN: 'down',
    DOWN_RIGHT: 'downright'
}

class CaveGenerator {

    startingRoomId = 0;

    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.maxCaveWidth = width;
        this.maxCaveHeight = height;
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

    isTop(id) {
        return id / this.maxCaveWidth == 0;
    }

    isBottom(id) {
        return id / this.maxCaveWidth == this.maxCaveHeight - 1;
    }

    isLeft(id) {
        return id % this.maxCaveWidth == 0;
    }

    isRight(id) {
        return id % this.maxCaveWidth == this.maxCaveWidth - 1;
    }

    isRoomEven(id) {
        return id % 2 == 0;
    }

    isWrap(id, direction) {
        const isEven = this.isRoomEven(id);
        const isTop = Math.floor(id / this.maxCaveWidth) == 0;
        const isBottom = Math.floor(id / this.maxCaveWidth) == this.maxCaveHeight - 1;
        const isLeft = id % this.maxCaveWidth == 0;
        const isRight = id % this.maxCaveWidth == this.maxCaveWidth - 1;

        switch (direction) {
            case directions.UP_LEFT:
                return isLeft || (isTop && isEven);
            case directions.UP:
                return isTop;
            case directions.UP_RIGHT:
                return isRight || (isTop && isEven);
            case directions.DOWN_LEFT:
                return isLeft || (isBottom && !isEven);
            case directions.DOWN:
                return isBottom;
            default:
                return isRight || (isBottom && !isEven);
        }
    }

    getConnectedRooms(id) {
        const isTop = this.isTop(id);
        const isBottom = this.isBottom(id);
        const isLeft = this.isLeft(id);
        const isRight = this.isRight(id);
        const isEven = this.isRoomEven(id);

        let upLeft, up, upRight, downLeft, down, downRight;

        if (this.isWrap(id, directions.UP_LEFT)) {
            upLeft = isLeft ? id + this.maxCaveWidth * this.maxCaveHeight - 1 : id + this.maxCaveWidth * (this.maxCaveHeight) - 1;
        }
        else {
            upLeft = !isEven ? id - 1 : id - this.maxCaveWidth - 1;
        }

        up = this.isWrap(id, directions.UP) ? id + this.maxCaveWidth * (this.maxCaveHeight - 1) : id - this.maxCaveWidth;

        if (this.isWrap(id, directions.UP_RIGHT)) {
            upRight = isTop && !isRight ? id + this.maxCaveWidth * (this.maxCaveHeight - 1) + 1 : id - this.maxCaveWidth + 1;
        }
        else {
            upRight = !isEven ? id + 1 : id - this.maxCaveWidth + 1;
        }

        if (this.isWrap(id, directions.DOWN_LEFT)) {
            downLeft = isBottom && !isLeft ? id - this.maxCaveWidth * (this.maxCaveHeight - 1) - 1 : id + this.maxCaveWidth - 1;
        }
        else {
            downLeft = !isEven ? id + this.maxCaveWidth - 1 : id - 1;
        }

        down = this.isWrap(id, directions.DOWN) ? id - this.maxCaveWidth * (this.maxCaveHeight - 1) : id + this.maxCaveWidth;

        if (this.isWrap(id, directions.DOWN_RIGHT)) {
            downRight = isRight ? id - this.maxCaveWidth * this.maxCaveHeight - 1 : id - this.maxCaveWidth * (this.maxCaveHeight - 1) + 1;
        }
        else {
            downRight = !isEven ? id + this.maxCaveWidth + 1 : id + 1;
        }

        let connectedRooms = {
            "upLeft": upLeft,
            "up": up,
            "upRight": upRight,
            "downLeft": downLeft,
            "down": down,
            "downRight": downRight
        }

        // alert(id + " : " + JSON.stringify(connectedRooms));
        return connectedRooms;
    }
}

class RowModel {
    rooms = [];

    constructor(id) {
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
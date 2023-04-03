// Author: Alex/EnDarke
// Description: Creates OOP object of destination points for the ship to travel to.

class Point {
    instance: Instance = new Instance("Part");
}

interface PointStruct {
    new (): Point;
    instance: Instance;
    position: Vector3;
}

export = Point
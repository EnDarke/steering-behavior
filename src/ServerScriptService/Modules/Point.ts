// Author: Alex/EnDarke
// Description: Creates OOP object of destination points for the ship to travel to.

class Point {
    instance: Instance = new Instance("Part");
    position: Vector3 = new Vector3();
}

interface PointStruct {
    instance: Instance;
    position: Vector3;
}

export = Point
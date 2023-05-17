// Author: Alex/EnDarke
// Description: Handles path creation for steering.

// Service Declarations
import { Workspace } from "@rbxts/services";

// Package Declarations
import { KnitServer as Knit } from "@rbxts/knit";

// Module Declarations
import Point from "ServerScriptService/Modules/Point";

// Global Declarations
declare global {
    interface KnitServices {
        PathService: typeof PathService;
    }
}

// Knit Start-Up
const PathService = Knit.CreateService({
    Name: "PathService",
    Client: {},

    // Runs when player first loads in after data has loaded
    Init(player: Player): boolean | undefined {
        if ( !player ) return undefined

        let pathPointFolder: Folder = new Instance("Folder");
        pathPointFolder.Name = player.Name;
        pathPointFolder.Parent = Workspace.Paths;

        this.New();

        return true
    },

    // Runs when player leaves game before data is removed
    End(player: Player): boolean | undefined {
        if ( !player ) return undefined
        Workspace.Paths.FindFirstChild(player.Name)?.Destroy();

        return true
    },

    New() {
        let newPoint = new Point();
        newPoint.position = new Vector3(5, 5, 5);
        print(newPoint);
    },

    KnitInit() {
        
    },

    KnitStart() {
        
    },
});
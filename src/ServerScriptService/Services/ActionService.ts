// Author: Alex/EnDarke
// Description: Handles all UI actions for the server.

// Services \\
import { Workspace } from "@rbxts/services";

// Packages \\
import { KnitServer as Knit } from "@rbxts/knit";

// Globals \\
declare global {
    interface KnitServices {
        ActionService: typeof ActionService;
    }
}

// Knit Start-Up \\
const ActionService = Knit.CreateService({
    Name: "ActionService",
    Client: {
        New(player: Player, position: Vector3): void | undefined {
            return this.Server.New(player, position);
        },
        Delete(player: Player): void | undefined {
            return this.Server.Delete(player);
        },
        Save(player: Player): void | undefined {
            return this.Server.Save(player);
        },
        Load(player: Player, save: number): void | undefined {
            return this.Server.Load(player, save);
        },
    },

    // Knit Services
    PathService: Knit.GetService("PathService"),

    New(player: Player, position: Vector3): void | undefined {
        this.PathService.New();
    },

    Delete(player: Player): void | undefined {
        print("Delete Node");
    },

    Save(player: Player): void | undefined {
        print("Save Nodes");
    },

    Load(player: Player, save: number): void | undefined {
        print("Load Nodes");
    },

    KnitInit() {
        
    },

    KnitStart() {
        
    },
});

export = ActionService;
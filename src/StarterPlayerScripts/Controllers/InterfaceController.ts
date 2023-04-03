// Author: Alex/EnDarke
// Description: Handles functionality for on-screen interface for player experience.

// Services \\
import { ReplicatedStorage, UserInputService, Workspace } from "@rbxts/services";

// Packages \\
import { KnitClient as Knit } from "@rbxts/knit";
import { Janitor } from "@rbxts/janitor";

// Globals \\
import Object from "@rbxts/object-utils";

declare global {
    interface KnitControllers {
        InterfaceController: typeof InterfaceController;
    }
}

// Constants \\
const UserInterface: Folder = ReplicatedStorage.Storage.UI;
const Player: Player = Knit.Player;
const PlayerGui: PlayerGui = Player.PlayerGui;
const Mouse: Mouse = Player.GetMouse();

// Knit Start-Up \\
const InterfaceController = Knit.CreateController({
    Name: "InterfaceController",

    // Setup Knit Services
    DataService: Knit.GetService("DataService"),
    ActionService: Knit.GetService("ActionService"),

    // Objects
    Janitor: new Janitor<RBXScriptConnection>(),

    // Placing info/assets
    IsPlacing: false,

    New(): boolean | undefined {
        if ( this.IsPlacing ) {
            this.Janitor.Cleanup();
            this.IsPlacing = false;
            return undefined;
        }

        this.Janitor.Add(UserInputService.InputBegan.Connect((input: InputObject, gameProcessed: boolean) => {
            if ( gameProcessed ) return undefined;

            if ( input.UserInputType === Enum.UserInputType.MouseButton1 ) {
                this.ActionService.New(Mouse.Hit.Position);
            }
        }));
        
        this.IsPlacing = true;
        return true;
    },

    Delete(): boolean | undefined {
        return true;
    },

    Save(): boolean | undefined {
        return true;
    },

    Load(): boolean | undefined {
        return true;
    },

    KnitInit(): void {
        // Load player user interface.
        for (const uiObj of UserInterface.GetChildren()) {
            let copy = uiObj.Clone();
            copy.Parent = PlayerGui;
        }
    },

    KnitStart(): void {
        // Local Constants
        const Buttons: Frame = PlayerGui.Saves.MainFrame.Buttons;
        const NewButton: TextButton = Buttons.FindFirstChild("NewButton") as TextButton;
        const DeleteButton: TextButton = Buttons.FindFirstChild("DeleteButton") as TextButton;
        const SaveButton: TextButton = Buttons.FindFirstChild("SaveButton") as TextButton;
        const LoadButton: TextButton = Buttons.FindFirstChild("LoadButton") as TextButton;

        // Load player's saves
        let playerData: PlayerData | undefined = this.DataService.Get();
        if ( !playerData ) return undefined;

        for (const save of Object.values(playerData.Core.Saves)) {
            print(save);
        }

        // Signal Listeners
        NewButton.Activated.Connect(() => {this.New()});
        DeleteButton.Activated.Connect(() => {this.Delete()});
        SaveButton.Activated.Connect(() => {this.Save()});
        LoadButton.Activated.Connect(() => {this.Load()});
    },
});
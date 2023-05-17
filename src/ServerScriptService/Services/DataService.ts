// Author: Alex/EnDarke
// Description: Handles saving data through "ProfileService".

// Service Declarations
import { Players } from "@rbxts/services";

// Package Declarations
import { KnitServer as Knit } from "@rbxts/knit";

// Module Declarations
import * as ProfileService from "@rbxts/profileservice";
import DataFormat from "ServerScriptService/Modules/DataFormat";

// Global Declarations
import { Profile, ProfileStore } from "@rbxts/profileservice/globals";

declare global {
    interface KnitServices {
        DataService: typeof DataService;
    }
}

// Knit Service Declarations
//const PathService = Knit.GetService("PathService");

// Constant Declarations
const PLAYER_STORE: ProfileStore<typeof DataFormat> = ProfileService.GetProfileStore("Player", DataFormat);
const KEY: string = "Steering_Demo_";

// Variable Declarations
let Profiles = new Array<Profile<typeof DataFormat>>;

// Knit Start-Up
const DataService = Knit.CreateService({
    Name: "DataService",
    Client: {
        Get(player: Player) {
            return this.Server.Get(player);
        },
    },

    PathService: Knit.GetService("PathService"),

    // Function to get player data.
    Get(player: Player): PlayerData | undefined {
        // Prohibit continuation without necessary information.
        if ( !player ) return undefined;

        // Local Variables
        const USER_ID: number = player.UserId;
        let profile: Profile<typeof DataFormat> = Profiles[USER_ID];

        if ( profile ) {
            return profile.Data;
        } else return undefined;
    },

    // Function to update/reconcile player data.
    Update(player: Player): boolean | undefined {
        // Prohibit continuation without necessary information.
        if ( !player ) return undefined;

        // Local Variables
        const USER_ID: number = player.UserId;
        let profile: Profile<typeof DataFormat> = Profiles[USER_ID];
        
        if ( profile ) {
            profile.Reconcile();
            return true;
        } else return undefined;
    },

    // Function to completely wipe player data.
    Wipe(player: Player): boolean | undefined {
        // Prohibit continuation without necessary information.
        if ( !player ) return undefined;

        // Local Variables
        const USER_ID: number = player.UserId;
        let profile: Profile<typeof DataFormat> = Profiles[USER_ID];

        if ( profile ) {
            PLAYER_STORE.WipeProfileAsync(KEY + USER_ID);
            return true;
        } else return undefined;
    },

    KnitInit(): void {
        // Run function for players who loaded before playeradded was listening
        for (const player of Players.GetPlayers()) {
            playerAdded(player);
        }
        Players.PlayerAdded.Connect(playerAdded);
        Players.PlayerRemoving.Connect(playerRemoved);
    },

    KnitStart(): void {
        
    },
});

// Player setup | Runs on player joining server.
const playerAdded = ((player: Player): boolean | undefined => {
    // Prohibit continuation without necessary information.
    if ( !player ) return undefined
    
    // Local Variables
    const USER_ID: number = player.UserId
    let profile: Profile<typeof DataFormat> | undefined = PLAYER_STORE.LoadProfileAsync(KEY + USER_ID, "ForceLoad");

    // If player's profile could not be found, remove them.
    if ( !profile ) {
        player.Kick("Failed to load data!");
        return undefined;
    }

    // If player has left before data loading.
    if ( !player.IsDescendantOf(Players) ) {
        profile.Release()
        return undefined;
    }

    // Profile Service Configuration.
    profile.AddUserId(USER_ID);
    profile.ListenToRelease(() => {
        player.Kick();
    });

    // Adding to server profile list.
    Profiles[USER_ID] = profile;

    // Reconciling Player Data
    DataService.Update(player);

    // Setting Attributes
    player.SetAttribute("DataLoaded", true);

    // Game Setup
    DataService.PathService.Init(player);

    return true
});

const playerRemoved = ((player: Player): boolean | undefined => {
    // Prohibit continuation without necessary information.
    if ( !player ) return undefined

    // Local Variables
    const USER_ID: number = player.UserId;
    let profile: Profile<typeof DataFormat> = Profiles[USER_ID]

    // Game Close
    DataService.PathService.End(player);

    if ( profile ) {
        profile.Release();
        return true;
    } else return undefined;
});

export = DataService;
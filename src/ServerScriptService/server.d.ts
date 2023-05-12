// Author: Alex/EnDarke
// Description: Holds server-sided type values.

// Player
interface PlayerData {
    Core: {
        Saves: {
            saveType?: {},
        },
    },
}

// ReplicatedStorage
interface ReplicatedStorage extends Instance {
    Storage: Folder & {
        UI: Folder;
        UIElements: Folder;
    }
}

// Workspace
interface Workspace extends Instance {
    Paths: Folder & {};
}
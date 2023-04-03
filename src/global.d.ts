// Author: Alex/EnDarke
// Description: Holds global type values.

// Player | Types & Children
interface Player {
    PlayerGui: PlayerGui;
}

// Workspace | Types & Children
interface Workspace extends Instance {
    Paths: Folder & {};
}

// ReplicatedStorage | Types & Children
interface ReplicatedStorage extends Instance {
    Storage: Folder & {
        UI: Folder;
        UIElements: Folder;
    }
}

// PlayerData | Types & Children
interface PlayerData {
    Core: {
        Saves: {
            saveType?: {},
        },
    },
}

// Saves UserInterace | Types & Children
interface PlayerGui extends Instance {
    Saves: ScreenGui & {
        MainFrame: Frame & {
            Buttons: Frame;
        }
    }
}
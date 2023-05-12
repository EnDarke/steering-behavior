// Author: Alex/EnDarke
// Description: Holds client-sided type values.

// Player
interface Player {
    PlayerGui: PlayerGui;
}

interface PlayerGui extends Instance {
    Saves: ScreenGui & {
        MainFrame: Frame & {
            Buttons: Frame;
        }
    }
}

// ReplicatedStorage
interface ReplicatedStorage extends Instance {
    Storage: Folder & {
        UI: Folder;
        UIElements: Folder;
    }
}
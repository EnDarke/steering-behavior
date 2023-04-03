// Author: Alex/EnDarke
// Description: Client runtime code for Knit Framework bootstrapping.

// Packages \\
import { KnitClient as Knit } from "@rbxts/knit";

// Constants \\
const Parent: Instance = script.Parent as Instance;

// Knit Client Bootstrap \\
Knit.AddControllers(Parent.FindFirstChild("Controllers") as Folder);
Knit.Start().catch(() => {
    print("KNIT CLIENT STARTED");
});
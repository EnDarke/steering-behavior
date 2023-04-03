// Author: Alex/EnDarke
// Description: Server runtime code for Knit Framework bootstrapping.

// Packages \\
import { KnitServer as Knit } from "@rbxts/knit";

// Constants \\
const Parent: Instance = script.Parent as Instance;

// Knit Server Bootstrap \\
Knit.AddServices(Parent.FindFirstChild("Services") as Folder);
Knit.Start().catch(() => {
    print("KNIT SERVER STARTED");
});
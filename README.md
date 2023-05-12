# Steering Mechanic Demo

## Author:
    Alex/EnDarke

## Quick Note:
    I could very well just use Roblox's built in VectorForce, AlignOrientation,
    AlignPosition, etc. objects, but that's no fun! :D

## Objective:
    Create a demo where players can place nodes to create a track for a
    little ship to follow along.

## About:
    Steering Behaviors for Autonomous Characters. Originally proposed by, "Craig W. Reynolds"

## Summary:
    Steering Behaviors for Autonomous Characters is an algorithm that grants the ability for characters to find their way to a location excluding character's knowledge of locomotion. Through "steering," it allows us to avoid objects, follow paths, and "flock" with other objects. This algorithm covers a lot of ground in terms of extendable possibilities. However, I will only be going for a simple path-following system through this algorithm.

## Algorithm:
    There are a four key steps that are necessary for this algorithm to work. These would include: `seek and flee`, `pursuit and evasion`, `offset pursuit`, and of course `arrival`.
interface Story {
}

interface StoryContext {
    place(placeId: string): Place
    character(charId: string): Character
    player(playerId: string): Player
    journal: Journal
}

interface Teller {
    buildPlayerCharacter(): Player
    startStory(story: Story): StoryContext
}

export interface Character {
    roles(): Role[]
}

export enum Direction {
    EAST, WEST, NORTH, SOUTH,
    NE, NW, SE, SW,
    UP, DOWN, LEFT, RIGHT
}

export interface Route {
    direction: Direction;
    length: number;
    speedMultiplier: number;
}

export interface Player extends Character {
}

interface Journal {
    addEvent();
}

interface Role {
}

export interface Scenario {
    check(places: Place[], characters: Character[]): ScenarioRunner
}

interface ScenarioRunner {
    scenario: Scenario
    characters: Character[]
    places: Place[]
    valid: boolean
    run(context: StoryContext): StoryContext
}

export interface Place {
    destination: { [placeId: string]: Route }
}

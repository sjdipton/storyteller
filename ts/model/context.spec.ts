
import "mocha"
import { expect } from "chai"
import { Player } from "./v1"

class StoryContext {
    player(playerId: string): Player {
        return null
    }
}

const context = new StoryContext()

describe("storyteller context", () => {
    it ("should contain player details", () => {
        context.player("playerId");
    })
})
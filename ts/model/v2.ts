
import * as model from "./v1"

import { MetaStore } from "./store";


export interface StoryV2 {
    characters: model.Character[]
    meta: MetaStore
}

export interface Event<T> {
    eventType: T
    eventArgs: object
    render()
}

export type EventActor<T> = (story: StoryV2, event: Event<T>) => StoryV2

export type EventType = "user-event" | "nothing"


import "mocha"
import { expect } from "chai"
import { MetaStore, $sp } from "./store";

describe("meta store", () => {
    it("should successfully set and retrieve meta store", () => {
        const meta = new MetaStore()

        meta.set("a.b.c", () => 1)
        meta.set("a.d", () => 1)
        meta.set("a.e.b", () => 1)
        meta.set("a.e", () => ({f: 1}))

        expect($sp("a.b.c").get(meta.store)).equal(1)
        expect($sp("a.d").get(meta.store)).equal(1)
        expect($sp("a.e.b").get(meta.store)).equal(1)
        expect(meta.get("a.e.f")).equal(1)
    })
})

type MetaItem = string | number | { [key: string]: MetaItem };

class SimplePath {

    segments: string[]

    constructor(path: string | string[]) {
        if ((<string>path).split) {
            this.segments = (<string>path).split(".")
        } else if((<string[]>path).length) {
            this.segments = <string[]>path;
        } else {
            this.segments = []
        }
    }

    get(obj: any): any {
        if (this.segments.length == 0) {
            return obj
        }
        let [key, ...rest] = this.segments
        if (key in obj) {
            return new SimplePath(rest).get(obj[key])
        }
        return undefined
    }

    set(target: any, value: any): any {
        if (this.segments.length == 0) {
            return value
        }
        let [key, ...rest] = this.segments
        if (rest.length == 0) {
            return target[key] = this.mergeObject(target[key], value)
        } else {
            if (!(key in target)) {
                target[key] = {}
            }
            return new SimplePath(rest).set(target[key], value);
        }
    }

    private mergeObject(original, current) {
        if (typeof original == "object" && typeof current == "object") {
            return { ...original, ...current }
        }
        return current
    }

}

export function $sp(path: string): SimplePath {
    return new SimplePath(path)
}

export class MetaStore {
    store: MetaItem

    constructor(store: MetaItem = {}) {
        this.store = store;
    }

    check(path: string, validator: (mi: MetaItem) => boolean): boolean {
        return validator(this.get(path))
    }

    set(path: string, action: () => MetaItem) {
        $sp(path).set(this.store, action())
    }

    get(path: string): MetaItem {
        return <MetaItem> $sp(path).get(this.store)
    }
}

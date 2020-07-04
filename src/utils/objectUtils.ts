import { PlainObject } from "../types";

const isObject = (data: unknown) => data && typeof data === 'object';

export const isCyclic = (obj: PlainObject): boolean => {
    const seenObjects: PlainObject[] = [];
  
    const detect = (obj: PlainObject): boolean => {
        if (seenObjects.some(x => x === obj)) {
            return true;
        }

        seenObjects.push(obj);

        const hasCyclicChildrenMap: boolean[] = Object.values(obj).map((prop: unknown) => {
            if (!isObject(prop)) {
                return false;
            }

            const plainObject: PlainObject = prop as PlainObject;

            return detect(plainObject);
        });

        return hasCyclicChildrenMap.some((x: boolean) => x);
    }
  
    return detect(obj);
};
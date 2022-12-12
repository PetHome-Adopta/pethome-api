import { Sort } from "mongodb";

export interface generalOptions {
    options: {
        sort?: Sort;
        limit?: number;
        skip?: number;
    }
}
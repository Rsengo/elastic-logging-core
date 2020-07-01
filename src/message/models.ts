import { PlainObject, LogLevel } from "../logger/models";

export interface ElasticIndex {
    _index: string;
}

export interface DeprecatedElasticIndex extends ElasticIndex {
    _type: string;
}

export interface ElasticMessageMetadata {
    index: ElasticIndex | DeprecatedElasticIndex;
}

export type ElasticMessageData = {
    level: LogLevel,
    dateTime: string
} & PlainObject;
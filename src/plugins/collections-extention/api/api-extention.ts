import {gql} from 'apollo-server-core';
export const adminApiExtensions = gql`
    extend type Query {
        globalCollections(options: CollectionListOptions): CollectionList!
    }
`;
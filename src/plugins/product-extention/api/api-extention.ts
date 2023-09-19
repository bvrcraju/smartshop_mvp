import { gql } from 'apollo-server-core';
export const shopApiExtensions = gql`
        extend type Product{
            channels: [Channel!]!
        }
    `;
import { gql } from 'apollo-server-core';
export const shopApiExtensions = gql`
        extend type ProductVariant {
            channels: [Channel!]!
        }
    `;
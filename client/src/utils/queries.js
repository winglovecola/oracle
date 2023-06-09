import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_PROPHECY = gql `
{
  prophecyHistories {
    cards
    cardPosition
    resultsAI
    user
  }
}
`;

export const QUERY_USER = gql`
  {
    user {
      _id
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
export const QUERY_TAROTS = gql`
  query TarotAll {
    tarotAll {
      nameShort
    }
  }
`;

export const QUERY_TAROTS_NAMESHORT = gql`
  query Query($nameShorts: [String!]) {
    tarots(nameShorts: $nameShorts) {
      name
      nameShort
      type
      value
      meaningUp
      meaningRev
      desc
    }
  }
`;

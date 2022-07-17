import { gql } from "@apollo/client";

export const GET_MENUS = gql`query GetMenus {
  getMenus {
    id
    name
    description
    price
    slug
    imgUrl
    stock
    CategoryMenus {
      CategoryId
    }
  }
}
`;
export const GET_MENU = gql`
query GetMenu($getMenuId: ID) {
  getMenu(id: $getMenuId) {
    id
    name
    description
    stock
    slug
    imgUrl
    price
    CategoryMenus {
      CategoryId
    }
  }
}`;
  export const GET_CATEGORY = gql`
  query GetCategories {
    getCategories {
      id
      name
    }
  }`;

  export const GET_INGREDIENT = gql`
  query GetIngredient {
    getIngredient {
      id
      name
    }
  }`;
  export const GET_CART = gql`query Query($data: token) {
    getCart(data: $data) {
      cart {
        CartItems {
          Menu {
            id
            name
            imgUrl
            price
            description
            slug
            stock
            CategoryMenus {
              CategoryId
            }
          }
          ammount
          totalAmmount
        }
        statusPayment
        id
      }
      totalPrice
    }
  }`;
   

  export const ADD_CART= gql`
  mutation AddToCart($data: cartData) {
    addToCart(data: $data) {
      response
    }
  }
  `;

  export const REMOVE_CART= gql`
  mutation Mutation($data: RemoveCart) {
    removeFromCart(data: $data) {
      response
    }
  }
  `;
  
  export const REGISTER = gql`
  mutation Mutation($data: register) {
    Register(data: $data) {
      _id
      email
    }
  }
  `;

export const LOGIN = gql`
mutation Mutation($data: login) {
    login(data: $data) {
      email
      role
      access_token
    }
  }
`;
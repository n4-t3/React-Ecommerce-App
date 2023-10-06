import { buildSchema } from "graphql";

export const schema = buildSchema(`
    type User {
        _id: String!
        email: String!
        name: String!
        password: String!
        isAdmin: Boolean!
        boughtItem: [Item]!
        cartItem: [Item]!
    }

    input UserData {
        email: String!
        name: String!
        password: String!
    }

    type AuthData {
        token: String!
        userId: String!
    }

    type Item {
        _id: String!
        collectionName: String!
        name: String!
        imgSrc: String!
        price: Float!
    }
   
    type Closet{
        _id: String!
        collectionName: String!
        name: String!
        imgSrc: String!
        closet:[Item]
    }

    type RootQuery {
        loginResolver(email:String!, password:String!): AuthData!
    }
    
    type RootMutation {
        createUserResolver(userInput: UserData!): User!
        addToBoughtItemsResolver(itemId: String!): User!
        addToCartResolver(itemId: String!): User!
        removeFromCartResolver(itemId: String!): User!
        createClosetResolver(collectionName: String! imgSrc: String!): Closet!
        createItemResolver(collectionName: String! name: String! imgSrc: String! price: Float! ): Item!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

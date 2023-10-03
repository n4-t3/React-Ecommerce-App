import { buildSchema } from "graphql";

export const schema = buildSchema(`
    type Item {
        _id: String!
        collection: String!
        name: String!
        imgSrc: String!
        price: Float!
    }
   
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

    type RootQuery {
        loginResolver(email:String!, password:String!): AuthData!
    }

    type RootMutation {
        createUserResolver(userInput: UserData): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

// mutations
import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email: String, $password: String) {
        login(email: $email, password: $password) {
            token
            user {
                __id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
mutation addUser($username)`
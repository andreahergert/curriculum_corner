// queries
import { gql } from "@apollo/client";

export const GET_ME = gql`
    query me {
        me{
            _id
            username
            email
            password
            todos {
                _id
                todoText
                todoAuthor
                createdAt
            }
        }
    }
`;
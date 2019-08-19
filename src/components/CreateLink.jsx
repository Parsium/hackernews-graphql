import React, { useState } from 'react';
import gql from 'graphql-tag';
// import { Mutation } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';

const POST_MUTATION = gql`
    mutation PostMutation($description: String!, $url: String!) {
        post(description: $description, url: $url) {
            id
            createdAt
            url
            description
        }
    }
`

const CreateLink = ({history}) => {
    const [link, setLink] = useState({description: '', url: ''});
    const [postMutation] = useMutation(
        POST_MUTATION,
        { onCompleted: () => history.push('/') }
    );

    return (
        <div>
            <div className="flex flex-column mt3">
                <input
                    className="mb2"
                    value={link.description}
                    onChange={e => {
                        let newDesc = e.target.value;
                        setLink(prevState => {
                            return {...prevState, description: newDesc}; // Immutable updates. Create copy of object and update state with the copy! 
                        });
                    }}
                    type="text"
                    placeholder="A description for the link"
                />
                <input
                    className="mb2"
                    value={link.url}
                    onChange={e => {
                        let newUrl = e.target.value;
                        setLink(prevState => {
                            return {...prevState, url: newUrl};
                        });
                    }}
                    type="text"
                    placeholder="The URL for the link"
                />
            </div>
            <button onClick={e => {
                e.preventDefault();
                postMutation({variables: link});
            }}>Submit</button>
        </div>

        // <Mutation mutation={POST_MUTATION}>
        // {(postMutation, { data }) => 
        //     <button onClick={e => {
        //         e.preventDefault();
        //         postMutation({variables: this.state});
        //     }}>
        //     Submit
        //     </button>
        // }
        // </Mutation>
    );
}
export default CreateLink;
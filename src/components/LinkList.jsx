import React from 'react';
import Link from './Link';
//import { Query } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const FEED_QUERY = gql`
    {
        feed {
            links {
                id
                createdAt
                url
                description
            }
        }
    }
`

const LinkList = () => {
    // <Query query={FEED_QUERY}>
    //     {({loading, error, data}) => {
    //         if (loading) return <div>Fetching...</div>;
    //         if (error) return <div>Error: {`$(error)`}</div>;

    //         const linksToRender = data.feed.links;

    //         return (
    //             <div>
    //                 {linksToRender.map(link => <Link key={link.id} link={link} />)}
    //             </div>
    //         );
    //     }}
    // </Query>

    const {loading, error, data} = useQuery(FEED_QUERY);

    if (loading) return 'Loading...';
    if (error) return `Error: $(error.message)`;

    const linksToRender = data.feed.links;

    return (
        <div>
            {linksToRender.map(link => <Link key={link.id} link={link} />)}
        </div>
    );
};
export default LinkList;
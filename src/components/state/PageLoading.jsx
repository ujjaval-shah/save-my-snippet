import React from 'react';
import { Container, Divider, Loader } from 'semantic-ui-react';

function PageLoading(props) {
    return (
        <>
            <Divider hidden section />
            <Divider hidden section />
            <Container text>
                <Loader active inline='centered' size='massive' />
            </Container>
        </>
    );
}

export default PageLoading;
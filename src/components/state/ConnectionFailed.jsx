import React from 'react';
import { Button, Container, Divider, Header, Icon, Segment } from 'semantic-ui-react';

function ConnectionFailed(props) {
    return (
        <>
            <Divider hidden />
            <Container text>
                <Segment placeholder>
                    <Header icon>
                        <Icon name='warning sign' color='red' />
                        <Divider hidden />
                        Cannot reach server
                    </Header>
                    <Button primary onClick={props.tryAgain}>Try again</Button>
                </Segment>
            </Container>
        </>
    );
}

export default ConnectionFailed;
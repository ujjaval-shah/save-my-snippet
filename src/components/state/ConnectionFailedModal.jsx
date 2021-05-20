import React from 'react';
import { Button, Divider, Header, Icon, Modal } from 'semantic-ui-react';

function ConnectionFailedModal(props) {
    return (
        <Modal
            basic
            open={props.open}
            size='small'
        >
            <Header icon>
                <Icon name='warning sign' color='red' />
                <Divider hidden />
                Cannot reach server
            </Header>
            <Modal.Content>
                <p style={{ textAlign: 'center' }}>
                    Unable to reach the server. Check your connectivity and try again.
                </p>
            </Modal.Content>
            <Modal.Actions style={{ textAlign: 'center' }}>
                <Button color='violet' inverted onClick={props.closeModal}>
                    OK
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default ConnectionFailedModal;
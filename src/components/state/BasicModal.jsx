import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

function BasicModal(props) {
    return (
        <Modal
            open={props.open}
            size='small'
        >
            <Modal.Header> Success </Modal.Header>
            <Modal.Content>
                <p style={{ textAlign: 'center' }}>
                    {props.message}
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

export default BasicModal;
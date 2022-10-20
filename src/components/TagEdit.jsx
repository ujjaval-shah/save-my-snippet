import React, { Component, createRef } from 'react';
import { Button, Container, Form, Header, Input, Segment } from 'semantic-ui-react';
import { create_tag, delete_tag, update_tag } from '../api/Apis';
import ConnectionFailedModal from './state/ConnectionFailedModal';

class NewTag extends Component {

    state = {
        value: '',
        loading: false
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    onPlusClick = () => {
        const tagObj = {
            tag: this.state.value
        }
        this.setState({ loading: true },
            async () => {
                const [result, new_tag] = await create_tag(tagObj)
                if (result) {
                    this.setState({ loading: false, value: '' })
                    this.props.tagCreated(new_tag)
                } else {
                    this.setState({ loading: false })
                    this.props.openModal()
                }
            }
        )
    }

    render() {
        return (
            <Form.Field>
                <Input
                    value={this.state.value}
                    style={{ float: 'left', width: '300px' }}
                    onChange={this.handleChange}
                    loading={this.state.loading}
                    placeholder='CREATE NEW FOLDER...'
                />
                <Button icon='plus' type="button" onClick={this.onPlusClick} onKeyPress={this.handleKeyPress} />
            </Form.Field>
        );
    }
}

class EditEachTag extends Component {

    state = {
        editMode: false,
        value: this.props.tag.tag,
        loading: false
    }

    inputRef = createRef()

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    onCheckClick = () => {
        const tagObj = {
            id: this.props.tag.id,
            tag: this.state.value
        }
        this.setState({ loading: true },
            async () => {
                const [result, updated_tag] = await update_tag(tagObj)
                if (result) {
                    this.setState({ loading: false, editMode: false })
                    this.props.tagUpdated(updated_tag)
                } else {
                    this.setState({ loading: false })
                    this.props.openModal()
                }
            }
        )
    }

    onPencilClick = () => {
        this.setState({ editMode: true },
            () => { this.inputRef.current.focus(); }
        )
    }

    onDeleteClick = () => {
        const id = this.props.tag.id

        this.setState({ loading: true }, async () => {
            const response = await delete_tag(id)
            if (response[0] === true) {
                this.props.tagDeleted(id)
            } else {
                this.setState({ loading: false })
                this.props.openModal()
            }
        })
    }

    render() {
        return (
            <>
                <Form.Field>
                    <Input
                        className="tag-edit"
                        ref={this.inputRef}
                        value={this.state.value}
                        disabled={!(this.state.editMode)}
                        style={{ float: 'left', width: '300px' }}
                        onChange={this.handleChange}
                        loading={this.state.loading}
                    />
                    {this.state.editMode === false
                        ? <Button icon='pencil' type="button" onClick={this.onPencilClick} />
                        : <Button icon='check' type="button" onClick={this.onCheckClick} />
                    }
                    <Button icon='trash alternate' type="button" onClick={this.onDeleteClick} />
                </Form.Field>
            </>
        )
    }
}

class TagEdit extends Component {

    state = { connectfailmodal: false }

    closeModal = () => {
        this.setState({ connectfailmodal: false })
    }

    openModal = () => {
        this.setState({ connectfailmodal: true })
    }

    render() {
        return (
            <>
                <Segment basic>
                    <Container>
                        <Header as='h3'> Edit Tags </Header>
                        <Form>
                            <NewTag
                                tagCreated={this.props.tagCreated}
                                openModal={this.openModal}
                            />
                            {this.props.tags.map(tag => <EditEachTag
                                key={tag.id}
                                tag={tag}
                                openModal={this.openModal}
                                tagUpdated={this.props.tagUpdated}
                                tagDeleted={this.props.tagDeleted}
                            />)}
                        </Form>
                    </Container>
                </Segment>
                <ConnectionFailedModal open={this.state.connectfailmodal} closeModal={this.closeModal} />
            </>
        );
    }
}

export default TagEdit;
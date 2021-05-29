import React, { Component } from 'react';
import Highlight from 'react-highlight.js';
import { withRouter } from 'react-router';
import { Card, Divider, Dropdown, Header, Icon, Label, Segment } from 'semantic-ui-react';
import { delete_snip } from '../api/Apis';

const timeFormat = (strTime) => {
    const arrTime = strTime.split('T')
    return arrTime[0] + ' ' + arrTime[1].slice(0, 8)
}

class Snippet extends Component {

    state = {
        loading: false,
    }

    // pin = async (id) => {
    //     this.setState({ loading: true }, async () => {
    //         const response = await pin_snip(id)
    //         if (response[0] === true) {
    //             this.props.snipPinned(id)
    //         } else {
    //             this.setState({ loading: false })
    //         }
    //     })
    // }

    // unpin = async (id) => {
    //     this.setState({ loading: true }, async () => {
    //         const response = await unpin_snip(id)
    //         if (response[0] === true) {
    //             this.props.snipUnpinned(id)
    //         } else {
    //             this.setState({ loading: false })
    //         }
    //     })
    // }

    delete = async (id) => {
        this.setState({ loading: true }, async () => {
            const response = await delete_snip(id)
            if (response[0] === true) {
                this.props.snipDeleted(id)
            } else {
                this.setState({ loading: false })
                this.props.openModal()
            }
        })
    }

    render() {
        // const {  languages } = this.state;
        const { tags, snip, languages } = this.props;
        if (snip && languages && tags)
            return (

                <Segment basic loading={this.state.loading}>

                    <Card fluid>
                        <Label as='a' corner='right' onClick={() => console.log("-- -- -- --")}>
                            {snip.pinned && <Icon name='pin' />}
                        </Label>
                        <Card.Content>
                            <Header as='h3'>
                                {snip.id + ' ' + snip.title}
                                <Dropdown
                                    as={Label}
                                    icon={{ fitted: true, size: 'large', name: 'ellipsis vertical' }}
                                >
                                    <Dropdown.Menu>
                                        <Dropdown.Item text='Edit' onClick={
                                            () => this.props.history.push(`/snip/${snip.id}/edit`)
                                        } />
                                        {snip.pinned ? <Dropdown.Item text='Unpin' /> : <Dropdown.Item text='Pin to Top' />}
                                        <Dropdown.Item text='Delete' onClick={() => { this.delete(snip.id) }} />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Header>
                        </Card.Content>
                        <Card.Content>

                            <Header as='h4'> Snippet </Header>
                            <Highlight language="javascript" style={{ fontSize: '.95em' }}>
                                {snip.snippet}
                            </Highlight>

                            {snip.description &&
                                (<>
                                    < Header as='h4'> Description </Header>
                                    <div>
                                        {snip.description}
                                    </div>
                                </>)
                            }

                            <Divider hidden style={{ margin: '0.2rem' }} />

                            <div style={{ fontSize: 12 }}>
                                <p> <b>Language:</b> {languages.find(item => item.id === snip.language).language} </p>
                                <p> <b>Tags:</b> {tags.filter(item => snip.tags.indexOf(item.id) >= 0).map(item => <Label
                                    key={item.id}
                                    style={{ textTransform: 'initial', fontFamily: 'Cousine', padding: '.3em', 'borderRadius': '.25em' }}
                                > {item.tag} </Label>)} </p>
                                <p> <b>Created At: </b> {timeFormat(snip.created_at)} </p>
                                <p> <b>Updated At: </b> {timeFormat(snip.updated_at)} </p>
                            </div>

                        </Card.Content>
                    </Card>
                </Segment>

            );
        else return null
    }
}

export default withRouter(Snippet);
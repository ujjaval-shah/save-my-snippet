import React, { Component } from 'react';
import Highlight from 'react-highlight.js';
import { withRouter } from 'react-router';
import { Card, Container, Divider, Dropdown, Grid, Header, Icon, Label, Segment } from 'semantic-ui-react';
import { delete_snip } from '../api/Apis';

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
                <Container>
                    <Segment basic loading={this.state.loading}>

                        <Card fluid>
                            <Label as='a' corner='right' onClick={() => console.log("-- -- -- --")}>
                                {snip.pinned && <Icon name='pin' />}
                            </Label>
                            <Card.Content>
                                <Header as='h3'>
                                    {snip.title}
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
                                <Highlight language="javascript">
                                    {snip.snippet}
                                </Highlight>

                                <Header as='h4'> Description </Header>
                                <div>
                                    {snip.description}
                                </div>

                                <Divider hidden />

                                <Grid columns={4} relaxed='very'>
                                    <Grid.Column>
                                        <Header as='h4'> Language </Header>
                                        <div>
                                            {languages.find(item => item.id === snip.language).language}
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Header as='h4'> Tags </Header>
                                        <div>
                                            {tags.filter(item => snip.tags.indexOf(item.id) >= 0).map(item => <Label key={item.id}> {item.tag} </Label>)}
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Header as='h4'> Created At </Header>
                                        <div>
                                            {snip.created_at.split('T').join(' ')}
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Header as='h4'> Updated At </Header>
                                        <div>
                                            {snip.updated_at.split('T').join(' ')}
                                        </div>
                                    </Grid.Column>
                                </Grid>

                            </Card.Content>
                        </Card>
                    </Segment>
                </Container>
            );
        else return null
    }
}

export default withRouter(Snippet);
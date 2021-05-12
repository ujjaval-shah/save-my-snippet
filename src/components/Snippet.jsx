import React, { Component } from 'react';
import Highlight from 'react-highlight.js';
import { Card, Container, Divider, Grid, Header, Icon, Label, Segment } from 'semantic-ui-react';
// import { get_snip, get_languages } from '../api/TagApis';

class Snippet extends Component {

    // state = {
    //     languages: null
    // }

    // componentDidMount = async () => {
    //     const snip = await get_snip(6)
    //     const languages = await get_languages()
    //     this.setState({ snip, languages }, () => console.log(this.state))
    // }

    render() {
        // const {  languages } = this.state;
        const { tags, snip, languages } = this.props;
        if (snip && languages && tags)
            return (
                <Container>
                    <Segment basic>

                        <Card fluid>
                            <Label as='a' corner='right' onClick={() => console.log("-- -- -- --")}>
                                {snip.pinned && <Icon name='pin' />}
                            </Label>
                            <Card.Content>
                                <Header as='h3'> {snip.title} </Header>
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

export default Snippet;
import React, { Component } from 'react';
import Highlight from 'react-highlight.js';
import { Card, Container, Divider, Grid, Header, Label } from 'semantic-ui-react';
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
                    <Divider hidden />
                    <Card fluid>
                        <Card.Content>
                            <Header as='h3'> {snip.title} </Header>
                        </Card.Content>
                        <Card.Content>
                            <Header as='h4'> Snippet </Header>
                            <Highlight language="javascript">
                                {snip.snippet}
                            </Highlight>

                            <Header as='h4'> Description </Header>
                            <p>
                                {snip.description}
                            </p>

                            <Divider hidden />

                            <Grid columns={4} relaxed='very'>
                                <Grid.Column>
                                    <Header as='h4'> Language </Header>
                                    <p>
                                        {languages.find(item => item.id === snip.language).language}
                                    </p>
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as='h4'> Tags </Header>
                                    <p>
                                        {tags.filter(item => snip.tags.indexOf(item.id) >= 0).map(item => <Label key={item.id}> {item.tag} </Label>)}
                                    </p>
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as='h4'> Created At </Header>
                                    <p>
                                        {snip.created_at.split('T').join(' ')}
                                    </p>
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as='h4'> Updated At </Header>
                                    <p>
                                        {snip.updated_at.split('T').join(' ')}
                                    </p>
                                </Grid.Column>
                            </Grid>

                        </Card.Content>
                    </Card>
                </Container >
            );
        else return null
    }
}

export default Snippet;
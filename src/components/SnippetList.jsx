import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button, Container, Divider, Segment } from 'semantic-ui-react';
import Snippet from './Snippet';
import ConnectionFailedModal from './state/ConnectionFailedModal';
import TagList from './TagList';

class SnippetList extends Component {

    state = {
        connectfailmodal: false
    }

    closeModal = () => {
        this.setState({ connectfailmodal: false })
    }

    openModal = () => {
        this.setState({ connectfailmodal: true })
    }

    render() {
        const { tags, snips, languages, snipDeleted } = this.props;
        return (
            <>
                <TagList tags={tags} />
                <div>
                    <Container>
                        <Segment basic>
                            <Button primary content='New Snip' icon='plus' labelPosition='left'
                                onClick={() => { this.props.history.push('/snip/create') }}
                            />
                        </Segment>
                    </Container>
                    {snips.map(item => <Snippet key={item.id} tags={tags} snip={item} languages={languages}
                        snipDeleted={snipDeleted}
                        openModal={this.openModal}
                    />)}
                    <Divider hidden />
                    <ConnectionFailedModal open={this.state.connectfailmodal} closeModal={this.closeModal} />
                </div>
            </>
        );
    }
}

export default withRouter(SnippetList);
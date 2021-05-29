import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button, Container, Divider, Dropdown, Header, Icon, Segment } from 'semantic-ui-react';
import Snippet from './Snippet';
import ConnectionFailedModal from './state/ConnectionFailedModal';
import TagList from './TagList';
import Masonry from "react-responsive-masonry"

const options = [
    {
        key: 'Created At',
        text: 'Created At',
        value: 'Created At',
        content: 'Created At',
    },
    {
        key: 'Updated At',
        text: 'Updated At',
        value: 'Updated At',
        content: 'Updated At',
    }
]

class SnippetList extends Component {

    state = {
        connectfailmodal: false,
        activeTag: -1,
        sortBy: 'Created At',
        sortOrder: 'up'
    }

    setActiveTag = (id) => {
        this.setState({ activeTag: id })
    }

    closeModal = () => {
        this.setState({ connectfailmodal: false })
    }

    openModal = () => {
        this.setState({ connectfailmodal: true })
    }

    render() {
        const { tags, snips, languages, snipDeleted } = this.props;

        let sortedSnips = this.state.activeTag === -1
            ? snips.slice()
            : snips.slice().filter((snip) => snip.tags.indexOf(this.state.activeTag) >= 0)

        if (this.state.sortBy === 'Created At') sortedSnips = sortedSnips.sort((a, b) => a.created_at > b.created_at ? -1 : 1)
        else sortedSnips = sortedSnips.sort((a, b) => a.updated_at > b.updated_at ? -1 : 1)
        if (this.state.sortOrder === 'down') sortedSnips.reverse()
        let pinnedSnips = sortedSnips.filter(item => item.pinned)
        let unpinnedSnips = sortedSnips.filter(item => !item.pinned)

        return (
            <>
                <TagList tags={tags} activeTag={this.state.activeTag} setActiveTag={this.setActiveTag} />
                <div>
                    <Segment basic>
                        <Button primary content='New Snip' icon='plus' labelPosition='left'
                            onClick={() => { this.props.history.push('/snip/create') }}
                        />
                        <Dropdown
                            button
                            text={`Sort By: ${this.state.sortBy}`}
                            open={this.state.sortdropdownopen}
                            onChange={(event, data) => { this.setState({ sortBy: data.value }) }}
                            inline
                            options={options}
                            defaultValue={this.state.sortBy}
                        />
                        <Button icon
                            onClick={
                                () => this.state.sortOrder === 'down'
                                    ? this.setState({ sortOrder: 'up' })
                                    : this.setState({ sortOrder: 'down' })
                            }
                        >
                            <Icon name='long arrow alternate down'
                                color={this.state.sortOrder === 'down' ? 'black' : 'pink'}
                                fitted />
                            <Icon name='long arrow alternate up'
                                color={this.state.sortOrder === 'up' ? 'black' : 'pink'}
                                fitted />
                        </Button>
                    </Segment>

                    {sortedSnips.length === 0 && (
                        <Container textAlign='center'>
                            <Icon name='folder outline' size='massive' color='teal' />
                            <Header as='h2' color='teal'> No snips in the folder. </Header>
                        </Container>
                    )
                    }

                    {pinnedSnips.length !== 0 && (<>
                        <Segment basic style={{ marginBottom: '0.5rem', paddingBottom: 0 }}>
                            <b>PINNED</b>
                        </Segment>
                        <Masonry columnsCount={2}>
                            {pinnedSnips.map(item => <Snippet key={item.id} tags={tags} snip={item} languages={languages}
                                snipDeleted={snipDeleted}
                                openModal={this.openModal}
                            />)}
                        </Masonry>
                    </>)}

                    {unpinnedSnips.length !== 0 && (<>
                        <Segment basic style={{ marginBottom: '0.5rem', paddingBottom: 0 }}>
                            <b>OTHERS</b>
                        </Segment>
                        <Masonry columnsCount={2}>
                            {unpinnedSnips.map(item => <Snippet key={item.id} tags={tags} snip={item} languages={languages}
                                snipDeleted={snipDeleted}
                                openModal={this.openModal}
                            />)}
                        </Masonry>
                    </>)}

                    {/* <Masonry columnsCount={2}>
                        {snips.map(item => <Snippet key={item.id} tags={tags} snip={item} languages={languages}
                            snipDeleted={snipDeleted}
                            openModal={this.openModal}
                        />)}
                    </Masonry> */}


                    <Divider hidden />
                    <ConnectionFailedModal open={this.state.connectfailmodal} closeModal={this.closeModal} />
                </div>
            </>
        );
    }
}

export default withRouter(SnippetList);
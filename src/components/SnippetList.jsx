import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button, Container, Divider, Dropdown, Header, Icon, Segment } from 'semantic-ui-react';
import Snippet from './Snippet';
import ConnectionFailedModal from './state/ConnectionFailedModal';
import TagList from './TagList';
import Masonry from "react-responsive-masonry"
import TagEdit from './TagEdit';
import Select from 'react-select';

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
        sortBy: 'Created At',
        sortOrder: 'up',
        languageSelection: null
    }

    // setActiveTag = (id) => {
    //     this.setState({ activeTag: id })
    // }

    closeModal = () => {
        this.setState({ connectfailmodal: false })
    }

    openModal = () => {
        this.setState({ connectfailmodal: true })
    }

    render() {
        const { tags, snips, languages, snipDeleted, snipUpdated } = this.props;
        const sortedTags = tags.sort((a, b) => a.id < b.id ? -1 : 1)

        // The Edit Folders case
        if (this.props.match.path === '/tag/edit') {
            return (<>
                <TagList tags={sortedTags} activeTag={-2} />
                <div>
                    <TagEdit
                        tags={sortedTags}
                        tagUpdated={this.props.tagUpdated}
                        tagCreated={this.props.tagCreated}
                        tagDeleted={this.props.tagDeleted}
                    />
                </div>
            </>)
        }

        // Check if Folder (Tag) exists or not
        const { tagId } = this.props.match.params;
        const tagExists = typeof tagId === 'undefined' || typeof tags.find((tag) => tag.id === parseInt(tagId)) !== 'undefined' ? true : false

        // Filter Snips based on selected Folder
        let sortedSnips = (this.props.match.path === '/' || this.props.match.path === '/tag/all')
            ? snips.slice()
            : snips.slice().filter((snip) => snip.tags.indexOf(Number(this.props.match.params.tagId)) >= 0)

        // Language Filter
        if (this.state.languageSelection !== null) {
            sortedSnips = sortedSnips.filter(item => item.language === this.state.languageSelection.value)
        }

        // Sorting
        if (this.state.sortBy === 'Created At') sortedSnips = sortedSnips.sort((a, b) => a.created_at > b.created_at ? -1 : 1)
        else sortedSnips = sortedSnips.sort((a, b) => a.updated_at > b.updated_at ? -1 : 1)
        if (this.state.sortOrder === 'down') sortedSnips.reverse()

        // Pinned and Unpinned
        let pinnedSnips = sortedSnips.filter(item => item.pinned)
        let unpinnedSnips = sortedSnips.filter(item => !item.pinned)

        return (
            <>
                <TagList tags={sortedTags} activeTag={this.props.match.params.tagId} />
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
                        <div className='inline-div w180'>
                            <Select
                                placeholder="Select Language"
                                isClearable
                                onChange={(value) => this.setState({ languageSelection: value })}
                                // onCreateOption={this.newLanguage}
                                options={(this.props.languages !== null) ? this.props.languages.map(item => {
                                    return { value: item.id, label: item.language }
                                }) : {}}
                                value={this.state.languageSelection}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            />
                        </div>
                    </Segment>

                    {
                        (sortedSnips.length === 0 && tagExists === false) && (
                            <Container textAlign='center'>
                                <Icon name='warning sign' size='massive' color='teal' />
                                <Header as='h2' color='teal'> The folder does not exist. </Header>
                            </Container>
                        )
                    }

                    {
                        (sortedSnips.length === 0 && tagExists === true) && (
                            <Container textAlign='center'>
                                <Icon name='folder' size='massive' color='teal' />
                                <Header as='h2' color='teal'> No Results Found. </Header>
                            </Container>
                        )
                    }

                    {
                        pinnedSnips.length !== 0 && (
                            <>
                                <Segment basic style={{ marginBottom: '0.5rem', paddingBottom: 0 }}>
                                    <b>PINNED</b>
                                </Segment>
                                <Masonry columnsCount={2}>
                                    {pinnedSnips.map(item => <Snippet key={item.id} tags={tags} snip={item} languages={languages}
                                        snipDeleted={snipDeleted}
                                        snipUpdated={snipUpdated}
                                        openModal={this.openModal}
                                    />)}
                                </Masonry>
                            </>
                        )
                    }

                    {
                        unpinnedSnips.length !== 0 && (
                            <>
                                <Segment basic style={{ marginBottom: '0.5rem', paddingBottom: 0 }}>
                                    <b>OTHERS</b>
                                </Segment>
                                <Masonry columnsCount={2}>
                                    {unpinnedSnips.map(item => <Snippet key={item.id} tags={tags} snip={item} languages={languages}
                                        snipDeleted={snipDeleted}
                                        snipUpdated={snipUpdated}
                                        openModal={this.openModal}
                                    />)}
                                </Masonry>
                            </>
                        )
                    }

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
import React, { Component } from 'react';
import { Button, Loader, Segment } from 'semantic-ui-react';
import { create_languages } from '../api/Apis';
import BasicModal from './state/BasicModal';
import ConnectionFailedModal from './state/ConnectionFailedModal';
import TagList from './TagList';
import languages from "../data/languages.json"


class LanguagesEdit extends Component {

    state = {
        message: '',
        loading: false,
        connectfailmodal: false,
    }

    onBtnClick = () => {
        this.setState({ loading: true },
            async () => {
                const [result, response_data] = await create_languages({ languages });
                if (result) {
                    console.log(response_data);
                    this.setState({ loading: false, message: response_data.message });
                    this.props.loadLanguaged();
                } else {
                    this.setState({ loading: false });
                    this.openModal();
                }
            }
        )
    }

    clearMessage = () => {
        this.setState({ message: '' })
    }

    closeModal = () => {
        this.setState({ connectfailmodal: false })
    }

    openModal = () => {
        this.setState({ connectfailmodal: true })
    }

    render() {
        const { tags } = this.props;
        const sortedTags = tags.sort((a, b) => a.id < b.id ? -1 : 1);

        return (<>
            <TagList tags={sortedTags} activeTag={-3} />
            <div>
                <Segment basic>
                    <Button primary content='Add All Languages' icon='plus' labelPosition='left'
                        onClick={this.onBtnClick}
                    />
                    <Loader active={this.state.loading} inline />
                    <ConnectionFailedModal open={this.state.connectfailmodal} closeModal={this.closeModal} />

                    {/* Success Message. */}
                    <BasicModal open={this.state.message !== ''} message={this.state.message} closeModal={this.clearMessage} />
                </Segment>
            </div>
        </>);
    }
}

export default LanguagesEdit;
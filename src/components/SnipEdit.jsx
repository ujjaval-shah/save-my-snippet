import React, { Component } from 'react';
import Highlight from 'react-highlight.js';
import { Button, Checkbox, Container, Divider, Form, Header, TextArea } from 'semantic-ui-react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { create_tag, update_snip } from '../api/Apis';
import { withRouter } from "react-router-dom";
import ConnectionFailedModal from './state/ConnectionFailedModal';

class SnipEdit extends Component {

    state = {
        snipExists: true,
        title: '',
        snippet: '',
        tagLoading: false,
        tagSelection: [],
        languageSelection: null,
        description: '',
        pinned: false,
        formLoading: false,
        connectfailmodal: false
    }
    languageOptions = {}
    tagOptions = {}

    codeChange = (event) => {
        this.setState({
            snippet: event.target.value
        })
    }

    descriptionChange = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    componentDidMount = () => {
        const snip = this.props.snips.find(item => item.id.toString() === this.props.match.params.snipId)
        if (snip) {
            const { title, snippet, description, tags, language, pinned } = snip
            const tagSelection = this.props.tags.filter(item => tags.indexOf(item.id) >= 0).map(item => {
                return { value: item.id, label: item.tag }
            })
            console.log(tagSelection);
            // tags.map(item => ({ value: item.id, label: item.tag }))
            const languageItem = this.props.languages.find(item => item.id === language)
            const languageSelection = { value: languageItem.id, label: languageItem.language }
            this.setState({ title, snippet, description, tagSelection, languageSelection, pinned })
        } else {
            // console.log("The snip does not exists.")
            this.setState({ snipExists: false })
        }
    }

    // newLanguage = (inputValue) => {
    //     this.setState({
    //         languageLoading: false
    //     }, () => {

    //     })
    // }

    closeModal = () => {
        this.setState({ connectfailmodal: false })
    }

    openModal = () => {
        this.setState({ connectfailmodal: true })
    }

    handleTagCreate = (newTag) => {
        this.setState({ tagLoading: true }, async () => {
            const [result, new_tag] = await create_tag({ tag: newTag })
            if (result) {
                const new_option = { value: new_tag.id, label: new_tag.tag }
                console.log(new_tag, new_option)
                this.setState((preState) => ({
                    tagLoading: false,
                    tagSelection: [...preState.tagSelection, new_option]
                }))
                this.props.tagCreated(new_tag)
            } else {
                this.setState({ tagLoading: false })
                this.openModal()
            }
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    toggle = () => {
        this.setState(prevState => ({
            pinned: !prevState.pinned
        }))
    }

    onSubmit = () => {
        const { title, snippet, description, tagSelection, languageSelection, pinned } = this.state
        const tags = tagSelection.map(item => item.value)
        const language = languageSelection.value
        const id = Number(this.props.match.params.snipId)
        let snipObj = { id, title, snippet, description, tags, language, pinned }
        console.log(snipObj)
        this.setState({
            formLoading: true
        }, async () => {
            const [result, updated_snip] = await update_snip(snipObj)
            if (result) {
                this.props.snipUpdated(updated_snip)
                this.props.history.push("/")
            } else {
                this.openModal()
                this.setState({ formLoading: false })
            }
        })

    }

    render() {
        if (!this.state.snipExists) {
            return <Container textAlign='center'> <Divider hidden /> <Header as='h3'> Snip does not exists. </Header> </Container>
        }
        const { title, snippet, tagLoading, tagSelection, languageSelection, description } = this.state;
        return (
            <>
                <Container text>
                    <Divider hidden style={{ marginTop: 0 }} />
                    <Header as='h3'> Edit Snip </Header>
                    <Form loading={this.state.formLoading}>
                        <Form.Input
                            label='Title'
                            placeholder='Title'
                            name='title'
                            value={title}
                            onChange={this.handleChange}
                        >
                        </Form.Input>
                        <Form.Field>
                            <label> Code </label>
                            <TextArea
                                onInput={this.codeChange}
                                style={{ minHeight: 200 }}
                                value={snippet}
                                data-gramm={false}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label> Language </label>
                            <Select
                                isClearable
                                onChange={(value) => this.setState({ languageSelection: value })}
                                onCreateOption={this.newLanguage}
                                options={(this.props.languages !== null) ? this.props.languages.map(item => {
                                    return { value: item.id, label: item.language }
                                }) : {}}
                                value={languageSelection}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label> Folders </label>
                            <CreatableSelect
                                isMulti
                                isClearable
                                isDisabled={tagLoading}
                                isLoading={tagLoading}
                                onCreateOption={this.handleTagCreate}
                                onChange={(value) => this.setState({ tagSelection: value })}
                                options={(this.props.tags !== null) ? this.props.tags.map(item => {
                                    return { value: item.id, label: item.tag }
                                }) : {}}
                                value={tagSelection}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label> Description </label>
                            <TextArea
                                onInput={this.descriptionChange}
                                style={{ minHeight: 80 }}
                                value={description}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox
                                label='Pinned Snip'
                                onChange={this.toggle}
                                checked={this.state.pinned}
                            />
                        </Form.Field>
                        <Button type='submit' onClick={this.onSubmit}> Submit </Button>
                    </Form>

                    <Divider hidden />

                    {snippet !== '' &&
                        (
                            <>
                                <Header as='h3'> Snippet Preview </Header>
                                <Highlight style={{ fontSize: 14 }} language='js'>
                                    {snippet}
                                </Highlight>
                            </>
                        )
                    }

                </Container>
                <ConnectionFailedModal open={this.state.connectfailmodal} closeModal={this.closeModal} />
            </>
        );
    }
}

export default withRouter(SnipEdit);
import React, { Component } from 'react';
import { Button, Checkbox, Container, Divider, Form, Header, TextArea } from 'semantic-ui-react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { create_snip, create_tag } from '../api/Apis';
import { withRouter } from "react-router-dom";
import ConnectionFailedModal from './state/ConnectionFailedModal';
import languagesData from "../data/languages.json"
import SyntaxHighlighterWrapper from './SyntaxHighlighterWrapper';

class SnipForm extends Component {

    state = {
        title: '',
        snippet: '',
        tagLoading: false,
        tagSelection: [],
        languageSelection: { label: "Plaintext", value: 46 },
        description: '',
        pinned: false,
        formLoading: false
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
        let snipObj = { title, snippet, description, tags, language, pinned }
        console.log(snipObj)
        this.setState({
            formLoading: true
        }, async () => {
            const [result, new_snip] = await create_snip(snipObj)
            if (result) {
                this.props.snipCreated(new_snip)
                this.props.history.push("/")
            } else {
                this.openModal()
                this.setState({ formLoading: false })
            }
        })

    }

    render() {
        const { title, snippet, tagLoading, tagSelection, languageSelection, description } = this.state;
        return (
            <>
                <Container text>
                    <Divider hidden style={{ marginTop: 0 }} />
                    <Header as='h3'> Create New Snip </Header>
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
                                // onCreateOption={this.newLanguage}
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
                                <SyntaxHighlighterWrapper
                                    lang={languageSelection !== null ? languagesData.find(item => item.language === languageSelection.label).val : "plaintext"}
                                    code={snippet}
                                />
                            </>
                        )
                    }

                </Container>
                <ConnectionFailedModal open={this.state.connectfailmodal} closeModal={this.closeModal} />
            </>
        );
    }
}

export default withRouter(SnipForm);
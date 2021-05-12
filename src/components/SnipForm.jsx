import React, { Component } from 'react';
import Highlight from 'react-highlight.js';
import { Button, Checkbox, Container, Divider, Form, Header, TextArea } from 'semantic-ui-react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { create_snip, create_tag } from '../api/TagApis';
import { withRouter } from "react-router-dom";

class SnipForm extends Component {

    state = {
        title: '',
        snippet: '',
        tagLoading: false,
        tagSelection: [],
        languageSelection: null,
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

    handleTagCreate = (newTag) => {
        this.setState({ tagLoading: true }, async () => {
            const new_tag = await create_tag({ tag: newTag })
            const new_option = { value: new_tag.id, label: new_tag.tag }
            console.log(new_tag, new_option)
            this.setState((preState) => ({
                tagLoading: false,
                tagSelection: [...preState.tagSelection, new_option]
            }))
            this.props.tagCreated(new_tag)
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
            const new_snip = await create_snip(snipObj)
            this.props.snipCreated(new_snip)
            this.props.history.push("/")
        })

    }

    render() {
        const { title, snippet, tagLoading, tagSelection, languageSelection, description } = this.state;
        return (
            <div>
                <Divider hidden />
                <Container text>
                    <Form>
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
            </div>
        );
    }
}

export default withRouter(SnipForm);
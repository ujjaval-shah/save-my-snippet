import './App.css';
import 'semantic-ui-css/semantic.min.css'

import React, { Component } from 'react';
import { get_languages, get_snips, get_tags } from './api/Apis';
// import Snippet from './components/Snippet';
import SnippetList from './components/SnippetList';
import { Route, Switch } from 'react-router';
import SnipForm from './components/SnipForm';
import { BrowserRouter } from 'react-router-dom';
import SnipEdit from './components/SnipEdit';
import TopBar from './components/TopBar';
import PageLoading from './components/state/PageLoading';
import ConnectionFailed from './components/state/ConnectionFailed';

class App extends Component {

	state = {
		tags: null,
		snips: null,
		languages: null,
		connectionFailed: false,
		loading: false
	}

	componentDidMount = async () => {
		this.setState({ loading: true }, async () => {
			const [call1, tags] = await get_tags()
			const [call2, snips] = await get_snips()
			const [call3, languages] = await get_languages()
			if (call1 && call2 && call3) this.setState({ tags, snips, languages, loading: false });
			else this.setState({ loading: false, connectionFailed: true }, () => console.log(this.state))
		})
	}

	tryAgain = () => {
		this.setState({ loading: true }, async () => {
			const [call1, tags] = await get_tags()
			const [call2, snips] = await get_snips()
			const [call3, languages] = await get_languages()
			if (call1 && call2 && call3) this.setState({ tags, snips, languages, loading: false, connectionFailed: false });
			else this.setState({ loading: false, connectionFailed: true }, () => console.log(this.state))
		})
	}

	tagCreated = (newTag) => {
		this.setState((prevState) => ({
			tags: [...prevState.tags, newTag]
		}))
	}

	tagUpdated = (updatedTag) => {
		this.setState((prevState) => ({
			tags: [...prevState.tags.filter(item => item.id !== updatedTag.id), updatedTag]
		}))
	}

	snipCreated = (newSnip) => {
		this.setState((prevState) => ({
			snips: [...prevState.snips, newSnip]
		}))
	}

	snipUpdated = (updatedSnip) => {
		this.setState((prevState) => ({
			snips: [...prevState.snips.filter(item => item.id !== updatedSnip.id), updatedSnip]
		}))
	}

	snipDeleted = (deletedId) => {
		this.setState((prevState) => ({
			snips: [...prevState.snips.filter(item => item.id !== deletedId)]
		}))
	}

	render() {
		const { tags, snips, languages, connectionFailed, loading } = this.state;

		if (loading) return (
			<BrowserRouter>
				<TopBar />
				<PageLoading />
			</BrowserRouter>)
		if (connectionFailed) return (
			<BrowserRouter>
				<TopBar />
				<ConnectionFailed tryAgain={this.tryAgain} />
			</BrowserRouter>)

		return (
			<BrowserRouter>
				<TopBar />
				<div className="app">
					<Switch>
						<Route path='/snip/create'>
							<SnipForm tags={tags} languages={languages}
								tagCreated={this.tagCreated}
								snipCreated={this.snipCreated}
							/>
						</Route>
						<Route path='/snip/:snipId/edit'>
							{(snips !== null && tags !== null && languages !== null) && <SnipEdit tags={tags} snips={snips} languages={languages}
								tagCreated={this.tagCreated}
								snipUpdated={this.snipUpdated}
							/>}
						</Route>
						<Route path="/tag/all">
							<div className="main">
								{snips && <SnippetList tags={tags} snips={snips} languages={languages}
									snipDeleted={this.snipDeleted}
									tagUpdated={this.tagUpdated}
								/>}
							</div>
						</Route>
						<Route path="/tag/edit">
							<div className="main">
								{snips && <SnippetList tags={tags} snips={snips} languages={languages}
									snipDeleted={this.snipDeleted}
									tagUpdated={this.tagUpdated}
									tagCreated={this.tagCreated}
								/>}
							</div>
						</Route>
						<Route path="/tag/:tagId(\d+)">
							<div className="main">
								{snips && <SnippetList tags={tags} snips={snips} languages={languages}
									snipDeleted={this.snipDeleted}
									tagUpdated={this.tagUpdated}
								/>}
							</div>
						</Route>
						<Route path="/">
							<div className="main">
								{snips && <SnippetList tags={tags} snips={snips} languages={languages}
									snipDeleted={this.snipDeleted}
									tagUpdated={this.tagUpdated}
								/>}
							</div>
						</Route>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;

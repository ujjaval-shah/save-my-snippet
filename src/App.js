import './App.css';
import 'semantic-ui-css/semantic.min.css'
import TagList from './components/TagList';

import React, { Component } from 'react';
import { get_languages, get_snips, get_tags } from './api/TagApis';
// import Snippet from './components/Snippet';
import SnippetList from './components/SnippetList';
import { Route, Switch } from 'react-router';
import SnipForm from './components/SnipForm';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {

	state = {
		tags: null,
		snips: null,
		languages: null
	}

	componentDidMount = async () => {
		const tags = await get_tags()
		const snips = await get_snips()
		const languages = await get_languages()
		this.setState({ tags, snips, languages })
	}

	tagCreated = (newTag) => {
		this.setState((prevState) => ({
			tags: [...prevState.tags, newTag]
		}))
	}

	snipCreated = (newSnip) => {
		this.setState((prevState) => ({
			snips: [...prevState.snips, newSnip]
		}))
	}

	render() {
		const { tags, snips, languages } = this.state;

		return (
			<BrowserRouter>
				<div className="main">
					<TagList tags={tags} />
					<Switch>
						<Route path='/create'>
							<SnipForm tags={tags} languages={languages}
								tagCreated={this.tagCreated}
								snipCreated={this.snipCreated}
							/>
						</Route>
						<Route path="/">
							{snips && <SnippetList tags={tags} snips={snips} languages={languages} />}
						</Route>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;

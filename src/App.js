import './App.css';
import 'semantic-ui-css/semantic.min.css'
import TagList from './components/TagList';

import React, { Component } from 'react';
import { get_languages, get_snips, get_tags } from './api/TagApis';
// import Snippet from './components/Snippet';
import SnippetList from './components/SnippetList';

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

	render() {
		const { tags, snips, languages } = this.state;

		return (
			<div class="main">
				<TagList tags={tags} />
				{snips && <SnippetList tags={tags} snips={snips} languages={languages} />}
			</div>
		);
	}
}

export default App;

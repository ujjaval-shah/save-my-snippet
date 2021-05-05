import './App.css';
import 'semantic-ui-css/semantic.min.css'
import TagList from './components/TagList';

import React, { Component } from 'react';
import { get_tags } from './api/TagApis';
import Snippet from './components/Snippet';

class App extends Component {

	state = {
		tags: []
	}

	componentDidMount = async () => {
		const tags = await get_tags()
		this.setState({ tags })
	}

	render() {
		const { tags } = this.state;

		return (
			<div class="App">
				<TagList tags={tags} />
				<Snippet tags={tags} />
			</div>
		);
	}
}

export default App;

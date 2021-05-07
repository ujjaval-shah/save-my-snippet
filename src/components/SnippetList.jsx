import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';
import Snippet from './Snippet';

class SnippetList extends Component {
    render() {
        const { tags, snips, languages } = this.props;
        return (
            <div>
                {snips.map(item => <Snippet key={item.id} tags={tags} snip={item} languages={languages} />)}
                <Divider hidden />
            </div>
        );
    }
}

export default SnippetList;
import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class TagList extends Component {
    state = {
        activeItem: null
    }

    render() {
        return (
            <>

                <div className="side-bar" >

                    <Menu inverted vertical>

                        <Menu.Item header> Folders </Menu.Item>

                        {
                            this.props.tags && this.props.tags.map(item => (
                                <Menu.Item as='a' key={item.id}
                                    name={item.tag}
                                    active={this.state.activeItem === item.id}
                                    onClick={() => {
                                        this.setState({
                                            activeItem: item.id
                                        })
                                    }}
                                />
                            ))
                        }

                    </Menu>

                </div>

            </>
        );
    }
}

export default TagList;
import React, { Component } from 'react';
import { Menu, Sidebar } from 'semantic-ui-react';

class TagList extends Component {
    state = {
        activeItem: null
    }

    render() {
        return (
            <>

                <Sidebar
                    animation='push'
                    direction='left'
                    icon='labeled'
                    vertical
                    visible

                    style={{ backgroundColor: "#f1f3f4" }}
                >

                    <Menu fluid vertical tabular>

                        <Menu.Item header style={{ backgroundColor: "#6435c9", color: "white" }}> Folders </Menu.Item>

                        {
                            this.props.tags && this.props.tags.map(item => (
                                <Menu.Item as='a' key={item.id}
                                    name={item.tag}
                                    style={{ backgroundColor: (this.state.activeItem === item.id ? "white" : "#f1f3f4") }}
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

                </Sidebar>

            </>
        );
    }
}

export default TagList;
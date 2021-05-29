import React, { Component } from 'react';
import { Icon, Menu, Segment } from 'semantic-ui-react';

class TagList extends Component {
    state = {
        activeItem: null
    }

    render() {
        return (
            <>

                <div className="side-bar" >
                    <Segment basic>
                        <Menu vertical tabular>

                            <Menu.Item as='a' key={-1}
                                active={this.props.activeTag === -1}
                                onClick={() => this.props.setActiveTag(-1)}
                                style={{ textTransform: 'initial', fontFamily: 'Cousine' }}
                            >
                                <Icon name='file code' />
                                ALL SNIPS
                            </Menu.Item>

                            {
                                this.props.tags && this.props.tags.map(item => (
                                    <Menu.Item as='a' key={item.id}
                                        content={item.tag}
                                        active={this.props.activeTag === item.id}
                                        onClick={() => this.props.setActiveTag(item.id)}
                                        style={{ textTransform: 'initial', fontFamily: 'Cousine' }}
                                    />
                                ))
                            }

                        </Menu>
                    </Segment>
                </div>

            </>
        );
    }
}

export default TagList;
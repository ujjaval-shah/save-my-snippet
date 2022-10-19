import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
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

                            <Menu.Item as={Link} key={-1}
                                active={(this.props.match.path === '/' || this.props.match.path === '/tag/all')}
                                to='/tag/all'
                            // onClick={() => this.props.setActiveTag(-1)}
                            >
                                <Icon name='file code' />
                                ALL SNIPS
                            </Menu.Item>

                            {
                                this.props.tags && this.props.tags.map(item => (
                                    <Menu.Item as={Link} key={item.id}
                                        to={`/tag/${item.id}`}
                                        content={item.tag}
                                        active={Number(this.props.activeTag) === item.id}
                                        // onClick={() => this.props.setActiveTag(item.id)}
                                        style={{ textTransform: 'initial', fontFamily: 'Cousine' }}
                                    />
                                ))
                            }

                            <Menu.Item as={Link} key={-2}
                                active={this.props.activeTag === -2}
                                to="/tag/edit"
                            // onClick={() => this.props.setActiveTag(-2)}
                            >
                                <Icon name='edit' />
                                EDIT FOLDERS
                            </Menu.Item>

                            <Menu.Item as={Link} key={-3}
                                active={this.props.activeTag === -3}
                                to="/languages/edit"
                            >
                                <Icon name='edit' />
                                EDIT LANGUAGES
                            </Menu.Item>

                        </Menu>
                    </Segment>
                </div>

            </>
        );
    }
}

export default withRouter(TagList);
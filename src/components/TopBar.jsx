import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

function TopBar(props) {
    return (
        <Container textAlign='center' fluid>
            <div className='logo'>
                <Link to='/' className='logo-click-area' style={{ color: 'white' }}> SaveMySnippet </Link>
            </div>
        </Container>
    );
}

export default withRouter(TopBar);
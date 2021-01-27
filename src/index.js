import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Container from './container/Container'

class Index extends React.Component {
    render() {
        return (
            <div>
                <Container/>
            </div>
        )
    }
}

ReactDOM.render(
    <Index/>,
    document.getElementById('root')
);


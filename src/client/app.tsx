import React from 'react';
import ReactDOM from 'react-dom';

const HelloComponent = (props: { name: string }) => {
    return <h1>Hello {props.name}!</h1>;
};

ReactDOM.render(<HelloComponent name='World' />, document.getElementById('rummikub-game'));

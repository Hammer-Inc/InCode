import React, {Component} from "react/cjs/react.production.min";

export default class Backdrop extends Component {
    render() {
        const overlayStyle = {
            position: 'fixed',
            width: '100%',
            height: '100%',
            backgroundColor: ' rgba(0, 0, 0, 0.6)',
            zIndex: '1000'
        };
        return (<div style={overlayStyle} onClick={this.props.onClick}>{this.props.children}</div>)

    }
}
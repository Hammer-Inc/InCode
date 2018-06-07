import React, {Component} from 'react';
import './App.css';
import './404.css'

class NotFound extends Component {
    render() {
        return (
            <div id="container">
                <div id="box">
                <div id="header">
                    <b>404</b> Not Found
                </div>
                <div id="footer">
                    The requested resource could not be found but may be available in the future. Subsequent requests by
                    the client are permissible.
                </div>
                </div>
            </div>

        )
    }
}

export default NotFound;

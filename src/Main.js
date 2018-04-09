import React, {Component} from "react/cjs/react.production.min";
import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Assigned from "./Assigned";

export default class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/login" component={(props) => (
                    <Login {...props}
                           {...this.props}

                    />)}
                />
                <Route exact path="/assigned" component={(props) => (
                    <Assigned {...props}
                              {...this.props}
                    />)}
                />
                <Route exact path="/" component={(props) => (
                    <Home {...props}/>)}
                />

                <Route component={() => <p>404</p>}/>
            </Switch>
        )
    }
}
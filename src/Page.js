import React, {Component} from "react/cjs/react.production.min";
import Navigation from "./Navigation";
import Content from "./Content";

/** Auth Component
 Contains all functions/states required to update the authentication state.
 */
export default class Page extends Component {

    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            information_state: {
                codeword: "",
                data: "",
                message: [], // Of object position, value
                parity: [], // of object: position, value, components
                syndrome: {
                    errors: {
                        fixable: null,
                        index: null
                    },
                    matrix: [],
                }
            },
        };
    }

    render() {
        return (<div>
            <Navigation
                doUpdate={this.updateEnv}
                information={this.state.information_state}
            />
            <div style={{margin: "48px 72px", minHeight:'400px'}}>
                <Content
                    information={this.state.information_state}
                />
            </div>
            <label className="text-muted">This application was created by Avraham Hammer (S3599575)</label>
        </div>);
    }

    updateEnv = (newEnv) => {
        let information = newEnv["information"];

        this.setState({
            information_state: information
        })
    }
}


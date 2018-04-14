import React, {Component} from "react/cjs/react.production.min";
import {FlatButton, Tab, Tabs, TextField} from "material-ui";
import validateResponse, {matchers} from "../Logic/API";
import {apiLocation} from "../config"
import PropTypes from 'prop-types';

export default class CodewordInput extends Component {
    static endpoint = "/api/v1/codeword/";
    static propTypes = {
        doUpdate: PropTypes.func,
        inputStateChange: PropTypes.func,
        input_state: PropTypes.object,
        information: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            binary: {
                text: '',
                validation_state: '',
            },
            string: {
                text: '',
                validation_state: '',
            },
            loading: false,
            mode: "binary"
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.input_state["type"] !== this.props.input_state["type"]) {
            this.setState({
                mode: nextProps.input_state["type"]
            })
        }

    }

    getValidation = (value) => {
        if (value === "") {
            return ''
        }
        // console.log(value);
        if (this.state.mode === "string") {
            if (value.match(matchers["string"])) {
                return ''
            }
            return "You must enter one or more alphanumeric characters"
        }
        if (this.state.mode === "binary") {
            if (value.match(matchers["binary"])) {
                return ''
            }
            return "Your codeword may only contain binary(1 or 0) characters"
        }
    };


    modeUpdate = (event) => {
        console.log(event);
        this.setState({
            mode: event
        })
    };


    updateText = (event) => {
        if (this.state.mode === 'binary') {
            this.setState({
                binary: {
                    text: event.target.value,
                    validation_state: this.getValidation(event.target.value)
                }
            })
        }
        if (this.state.mode === 'string') {
            this.setState({
                string: {
                    text: event.target.value,
                    validation_state: this.getValidation(event.target.value)
                }
            })
        }
    };

    consumeEndpoint = () => {

        this.setState({loading: true});
        let query_string = "codeword=" + this.state[this.state.mode].text;
        let request = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        fetch(apiLocation + CodewordInput.endpoint + this.state.mode + "?" + query_string, request)
            .then(validateResponse)
            .then((data) => {
                this.props.doUpdate(data);

                this.setState({
                    loading: false,
                });
            }).catch((error) => {
            console.log(error);
            this.setState({
                loading: false,
                requestFailed: true
            });
        })
    };

    render() {
        return (
            <div>
                <Tabs
                    value={this.state.mode}
                    onChange={this.modeUpdate}
                >
                    <Tab label="Binary Input" value="binary">
                        <TextField
                            hintText={"1011"}
                            floatingLabelText={"Codeword"}
                            value={this.state.binary.text}
                            onChange={this.updateText}
                            fullWidth={true}
                            disabled={this.state.loading}
                            errorText={this.state.binary.validation_state}
                        />
                        <p>The text entered will have parity bits added and will appear below under the simulate parity
                            errors header</p>
                    </Tab>
                    <Tab label="String Input" value="string">
                        <TextField
                            hintText={"abc"}
                            floatingLabelText={"Codeword"}
                            value={this.state.string.text}
                            onChange={this.updateText}
                            fullWidth={true}
                            disabled={this.state.loading}
                            errorText={this.state.string.validation_state}
                        />
                        <p>The string will be converted from ascii into binary and then parity bits will be added</p>
                    </Tab>
                </Tabs>
                <FlatButton label={this.state.loading ? "Loading" : "Generate"}
                            onClick={this.consumeEndpoint}
                            disabled={this.state.loading}
                            primary={true}/>
            </div>
        )
    }

}

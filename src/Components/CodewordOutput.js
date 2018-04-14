import React, {Component} from "react/cjs/react.production.min";
import {FlatButton, Tab, Tabs, TextField} from "material-ui";
import validateResponse, {matchers} from "../Logic/API";
import {apiLocation, endpoint} from "../config"
import PropTypes from 'prop-types';

export default class CodewordOutput extends Component {
    static propTypes = {
        doUpdate: PropTypes.func,
        inputStateChange: PropTypes.func,
        input_state: PropTypes.object,
        information: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            validate: {
                text: '',
                validation_state: '',
            },
            loading: false,
            mode: "validate"
        };
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.information.codeword !== null &&
            nextProps.information.codeword !== this.props.information.codeword) {
            this.setState({
                validate: {
                    text: nextProps.information.codeword,
                    validation_state: '',
                }
            })
        }
    }

    getValidation = (value) => {
        if (value === "") {
            return ''
        }
        // console.log(value);
        if (this.state.mode in matchers) {
            if (value.match(matchers[this.state.mode])) {
                return ''
            }
            return "The full parity must be at least 3 characters long and be composed of binary(1 and 0) values only"
        }
    };

    updateText = (event) => {
        if (this.state.mode === 'validate') {
            this.setState({
                validate: {
                    text: event.target.value,
                    validation_state: this.getValidation(event.target.value)
                }
            })
        }

    };

    consumeEndpoint = () => {

        this.setState({loading: true});
        if (!this.getValidation(this.state[this.state.mode].text))
            return;
        let query_string = "codeword=" + this.state[this.state.mode].text;
        let request = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        fetch(apiLocation + endpoint + this.state.mode + "?" + query_string, request)
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
                >
                    <Tab label="Simulate parity errors" value="validate">
                        <TextField
                            hintText={""}
                            floatingLabelText={"Codeword with Parity"}
                            value={this.state.validate.text}
                            onChange={this.updateText}
                            fullWidth={true}
                            disabled={this.state.loading}
                            errorText={this.state.validate.validation_state}
                            multiLine={true}
                            rowsMax={5}
                        />

                    </Tab>
                </Tabs>
                <FlatButton label={this.state.loading ? "Loading" : "Validate"}
                            primary={true}
                            onClick={this.consumeEndpoint}
                            disabled={this.state.loading || this.state[this.state.mode].validation_state !== ''}
                />
            </div>
        )
    }

}

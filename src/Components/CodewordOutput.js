import React, {Component} from "react/cjs/react.production.min";
import {Card, CardActions, CardHeader, CardText, FlatButton, TextField} from "material-ui";
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
            mode: "validate",
            steps: {
                0: true,
                1: false,
            }
        };
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        let result = {};
        if (nextProps.information.codeword !== null) {
            result[prevState.mode] = {
                text: nextProps.information.codeword,
                validation_state: '',
            };
            return result
        }
        return null;
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

    updateStep = (value, index) => {
        console.log(value);
        let temp = {
            steps: this.state.steps
        };
        temp.steps[index] = value;
        this.setState(temp);
    };


    consumeEndpoint = () => {

        if (this.getValidation(this.state[this.state.mode].text) !== '')
            return;
        let query_string = "codeword=" + this.state[this.state.mode].text;
        let request = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };
        this.setState({loading: true});

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
                <div
                    style={{textAlign: 'left'}}
                >
                    <ReceiveTutorial
                        nextCallback={() => this.updateStep(true, 1)}
                        openCallback={(v) => this.updateStep(v, 0)}
                        open={true}
                    />
                    <Validator
                        openCallback={(v) => this.updateStep(v, 1)}
                        open={this.state.steps["1"]}
                        mode={this.state.mode}
                        text={this.state.validate.text}
                        validation={this.state.validate.validation_state}
                        generateCallback={this.consumeEndpoint}
                        textCallback={this.updateText}
                    />

                </div>

            </div>
        )
    }

}

class ReceiveTutorial extends Component {
    static propTypes = {
        open: PropTypes.bool,
        openCallback: PropTypes.func,
        nextCallback: PropTypes.func,
    };

    render() {
        return (
            <Card
                expanded={this.props.open}
                onExpandChange={this.props.openCallback}
            >
                <CardHeader
                    actAsExpander={true}
                    showExpandableButton={true}
                    title={"Receiving Data"}
                    subtitle={"Tutorial"}
                />
                <CardText
                    expandable={true}
                >
                    When Data is received or read the receiving system uses the parity bits
                    calculated at the sending end to confirm the validity of the read
                    information. The bits are then stripped and passed up to the next layer
                    of the OSI model
                </CardText>
                <CardActions
                    expandable={true}
                >
                    <FlatButton
                        label={"Next"}
                        onClick={() => {
                            this.props.nextCallback();
                            this.props.openCallback(false)
                        }}
                        primary
                    />
                </CardActions>
            </Card>
        )
    }
}

class Validator extends Component {
    static propTypes = {
        mode: PropTypes.string,
        open: PropTypes.bool,
        openCallback: PropTypes.func,
        text: PropTypes.string,
        validation: PropTypes.string,
        textCallback: PropTypes.func,
        generateCallback: PropTypes.func,
    };
    onKeyUp = (event) => {
        if (event.key === 'Enter') {
            this.props.generateCallback()
        }
    };

    render() {
        let mode = this.props.mode;
        let is_valid = mode === "validate";
        // Paranoid as fuck but can remove some weird edge case bugs from the equation
        if (!is_valid)
            return null;
        return (
            <Card
                expanded={this.props.open}
                onExpandChange={this.props.openCallback}
            >
                <CardHeader
                    title={"Step 3"}
                    subtitle={"Enter text to validate"}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText
                    expandable={true}
                >
                    <TextField
                        name={"codeword validate"}
                        style={{marginTop: "0px"}}
                        onKeyDown={this.onKeyUp}
                        hintText={"110100"}
                        value={this.props.text}
                        onChange={this.props.textCallback}
                        fullWidth={true}
                        disabled={false}
                        errorText={this.props.validation}
                    />
                </CardText>
                <CardActions expandable={true}>
                    <FlatButton label={"Validate"}
                                onClick={this.props.generateCallback}
                                disabled={false}
                                primary={true}/>
                </CardActions>
            </Card>
        )
    }
}
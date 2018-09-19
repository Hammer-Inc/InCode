import React, {Component} from "react/cjs/react.production.min";
import {
    Card,
    CardActions,
    CardHeader,
    CardText,
    FlatButton,
    RadioButton,
    RadioButtonGroup,
    TextField
} from "material-ui";
import validateResponse, {matchers} from "../Logic/API";
import {apiLocation} from "../config"
import PropTypes from 'prop-types';
import {ContentFontDownload, ImageLooksOne} from "material-ui/svg-icons/index";
import {cyan500, lime200} from "material-ui/styles/colors";


export default class CodewordInput extends Component {
    static endpoint = "/api/v1/codeword/";
    static propTypes = {
        doUpdate: PropTypes.func.isRequired,
        inputStateChange: PropTypes.func.isRequired,
        inputState: PropTypes.object.isRequired,
        information: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        let mode = this.props.inputState["type"];
        let temp = {
            binary: {
                text: '',
                validation_state: '',
            },
            string: {
                text: '',
                validation_state: '',
            },
            mode: 'binary',
            loading: false,

            steps: {
                0: localStorage.getItem("seenTutorial_CWin") !== '1',
                1: false,
                2: localStorage.getItem("seenTutorial_CWin") === '1'
            }
        };
        if (mode === "string" || mode === "binary") {
            temp[mode].text = this.props.inputState.text;
            temp.mode = mode;
        }
        this.state = temp
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (!nextProps.inputState["type"] in prevState) {
            return {
                mode: nextProps.inputState["type"],
                loading: false,
            };
            // temp[nextProps.inputState.type] = {};
            // temp[nextProps.inputState.type].text = nextProps.information.data;
            // temp[nextProps.inputState.type].validation_state = '';
            // return temp;
        }
        return {
            loading: false
        }
    }

    onCompleteTutorial = () => {
        localStorage.setItem("seenTutorial_CWin", '1')
    };

    getValidation = (value) => {
        if (value === "") {
            return ''
        }
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
        console.log(`Mode Update: ${event.target.value}`);
        this.setState({
            mode: event.target.value,
        })
    };


    updateText = (event) => {
        if (this.state.mode === 'binary') {
            this.setState({
                binary: {
                    text: event.target.value,
                    validation_state: this.getValidation(event.target.value)
                }
            });
            console.log(`Binary ${event.target.value}`)
        }
        if (this.state.mode === 'string') {
            this.setState({
                string: {
                    text: event.target.value,
                    validation_state: this.getValidation(event.target.value)
                }
            });
            console.log(`String ${event.target.value}`)
        }
    };

    consumeEndpoint = () => {
        if (this.getValidation(this.state[this.state.mode].text) !== '')
            return;
        if (this.state[this.state.mode].text === '')
            return;

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
                this.setState({
                    loading: false
                });
                this.props.doUpdate(data);
            }).catch((error) => {
            console.log(error);
            this.setState({
                loading: false,
                requestFailed: true
            });
        })
    };

    updateStep = (value, index) => {
        let temp = {
            steps: this.state.steps
        };
        temp.steps[index] = value;
        this.setState(temp);
    };

    render() {
        let mode = this.state.mode;
        let text = this.state[mode].text;
        let validation = this.state[mode].validation_state;
        return (
            <div>
                <div
                    style={{textAlign: 'left'}}
                >
                    <Tutorial
                        open={this.state.steps[0]}
                        openCallback={(v) => this.updateStep(v, 0)}
                        nextCallback={() => {
                            this.updateStep(true, 1);
                            this.onCompleteTutorial();
                        }}
                    />

                    <ModeSelector
                        mode={mode}
                        open={this.state.steps[1]}
                        openCallback={(v) => this.updateStep(v, 1)}
                        nextCallback={() => this.updateStep(true, 2)}
                        modeCallback={this.modeUpdate}
                    />
                    <DataInput
                        mode={mode}
                        open={this.state.steps[2]}
                        openCallback={(v) => this.updateStep(v, 2)}
                        text={text}
                        validation={validation}
                        textCallback={this.updateText}
                        generateCallback={this.consumeEndpoint}
                        disableChange={this.state.loading}
                    />

                </div>
            </div>
        )
    }

}

class Tutorial extends Component {
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
                    title={"Sending Data"}
                    subtitle={"Tutorial"}
                >

                </CardHeader>
                <CardText
                    expandable={true}
                >
                    Data when sent over a network or stored in some mediums (like ECC RAM)
                    is
                    prone to errors. The Hamming Code is designed to detect and correct
                    these errors, below you can simulate sending a message and see what bits
                    the
                    hamming code would add to your message to ensure no errors occur in
                    transmission
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

class ModeSelector extends Component {
    static propTypes = {
        open: PropTypes.bool,
        openCallback: PropTypes.func,
        mode: PropTypes.string,
        modeCallback: PropTypes.func,
    };

    render() {
        let {open, openCallback, mode, modeCallback} = this.props;
        return (
            <Card
                expanded={open}
                onExpandChange={openCallback}
            >
                <CardHeader
                    title={"Step 1"}
                    subtitle={"Select an input mode"}
                    actAsExpander={true}
                    showExpandableButton={true}
                >
                </CardHeader>
                <CardText
                    expandable={true}
                >
                    Select your preferred input mode here, default is "Binary", if you select a mode other than
                    binary, your input will be converted to it's binary representation before parity bits are
                    added.
                </CardText>
                <CardText expandable={true}>
                    <RadioButtonGroup name="Input Mode" valueSelected={mode}
                                      onChange={modeCallback}>
                        <RadioButton
                            value="binary"
                            label="Binary"
                            checkedIcon={<ImageLooksOne style={{color: cyan500}}/>}
                            uncheckedIcon={<ImageLooksOne/>}
                        />
                        <RadioButton
                            value="string"
                            label="String"
                            checkedIcon={<ContentFontDownload style={{color: cyan500}}/>}
                            uncheckedIcon={<ContentFontDownload/>}
                        />
                    </RadioButtonGroup>
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

class DataInput extends Component {
    static propTypes = {
        mode: PropTypes.string,
        open: PropTypes.bool,
        openCallback: PropTypes.func,
        text: PropTypes.string,
        validation: PropTypes.string,
        textCallback: PropTypes.func,
        generateCallback: PropTypes.func,
        disableChange: PropTypes.bool,
    };
    onKeyUp = (event) => {
        if (event.key === 'Enter') {
            this.props.generateCallback()
        }
    };

    render() {
        let mode = this.props.mode;
        let is_binary = mode === "binary";
        let is_string = mode === "string";
        return (
            <Card
                expanded={this.props.open}
                onExpandChange={this.props.openCallback}
            >
                <CardHeader
                    title={"Step 2"}
                    subtitle={"Enter text to encode"}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText
                    expandable={true}
                >
                    <TextField
                        name={"codeword input"}
                        style={{marginTop: "0px"}}
                        onKeyDown={this.onKeyUp}
                        hintText={is_binary ? "111" : is_string ? "abc" : "error_mode"}
                        value={this.props.text}
                        onChange={this.props.textCallback}
                        fullWidth={true}
                        disabled={this.props.disableChange}
                        errorText={this.props.validation}
                        underlineStyle={{borderColor: lime200}}
                    />
                </CardText>
                <CardActions expandable={true}>
                    <FlatButton label={this.props.disableChange ? "Generate (Loading)" : 'Generate'}
                                onClick={this.props.generateCallback}
                                disabled={this.props.validation !== '' || this.props.text === '' || this.props.disableChange}
                                primary
                    />
                </CardActions>
            </Card>
        )
    }
}
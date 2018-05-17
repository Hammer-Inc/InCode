import React, {Component} from "react/cjs/react.production.min";

import {AppBar, Drawer, IconButton, Paper} from "material-ui";
import {NavigationClose, NavigationMenu} from "material-ui/svg-icons/index";
import Backdrop from "./Components/Backdrop"
import CodewordInput from "./Components/CodewordInput";
import PropTypes from "prop-types";
import CodewordOutput from "./Components/CodewordOutput";
import ModeStepper from "./Components/ModeStepper";

class Navigation extends Component {
    static propTypes = {
        doUpdate: PropTypes.func.isRequired,
        information: PropTypes.object,
    };

    static validModes = {"send": ["binary", "string"], "receive": ["validate"]};

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            inputState: {
                data: "",
                type: "binary"
            },
            mode: "send",
            width: 0,
            height: 0
        };
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    };

    handleModeUpdate = (newMode) => {
        this.setState({
            mode: newMode
        })
    };

    handleToggle = () => this.setState({open: !this.state.open});

    handleInputChange = (newState) => {
        let newMode = this.state.mode === "send" ? "receive" : "send";
        this.setState({
            inputState: newState,
            mode: newMode
        });
    };

    // Cascade update at correct levels
    doUpdate = (newEnv) => {
        this.handleInputChange(newEnv["input"]);
        this.setState({
            open: false,
        });
        this.props.doUpdate(newEnv);
    };

    render() {
        return (
            <nav>
                <AppBar
                    title={"Hamming Code Generator"}
                    iconElementLeft={<IconButton onClick={this.handleToggle}><NavigationMenu/></IconButton>}
                />
                <Drawer
                    open={this.state.open}
                    width={this.state.width < 415? this.state.width - 15 : 400}
                >
                    <AppBar
                        title="Settings"
                        titleStyle={{cursor: 'pointer'}}
                        onTitleTouchTap={this.handleToggle}
                        iconElementLeft={<IconButton onClick={this.handleToggle}><NavigationClose/></IconButton>}
                    />
                    <div
                        style={{margin: "10px"}}
                    >
                        <ModeStepper
                            input_mode={this.state.mode}
                            on_mode_change={this.handleModeUpdate}
                        />
                        {
                            this.state.mode === "send" ? (
                                <Paper
                                    zDepth={1}
                                    rounded={true}
                                >
                                    <CodewordInput
                                        doUpdate={this.doUpdate}
                                        inputStateChange={this.handleInputChange}
                                        inputState={this.state.inputState}
                                        information={this.props.information}
                                    />
                                </Paper>
                            ) : this.state.mode === "receive" ? (
                                <Paper
                                    zDepth={2}
                                    rounded={true}
                                >

                                    <CodewordOutput
                                        doUpdate={this.doUpdate}
                                        inputStateChange={this.handleInputChange}
                                        inputState={this.state.inputState}
                                        information={this.props.information}
                                    />
                                </Paper>
                            ) : null
                        }
                    </div>
                </Drawer>

                {this.state.open && (<Backdrop onClick={this.handleToggle}/>)}
            </nav>
        );
    }
}

export default Navigation
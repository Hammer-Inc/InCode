import PropTypes from "prop-types";
import {
    ActionSettingsEthernet,
    HardwareComputer,
    HardwareDesktopWindows,
    HardwareKeyboardArrowRight
} from "material-ui/svg-icons/index";
import React, {Component} from "react";
import {FontIcon, Step, StepButton, Stepper} from "material-ui";
import {cyan500} from "material-ui/styles/colors";

export default class BitCard extends Component {
    static propTypes = {
        input_mode: PropTypes.string,
        on_mode_change: PropTypes.func,
    };


    render() {
        let active_icon = {
            color: cyan500
        };
        let isSending = this.props.input_mode === 'send';
        let isReceiving = this.props.input_mode === 'receive';
        return (<div>
            <Stepper
                linear={false}
                connector={<ActionSettingsEthernet/>}
            >
                <Step completed={isSending}>
                    <StepButton
                        onClick={() => {
                            this.props.on_mode_change("send")
                        }}
                        icon={
                            <FontIcon>
                                <HardwareComputer
                                    style={isSending ? active_icon : {}}
                                />
                                <HardwareKeyboardArrowRight
                                    style={isSending ? active_icon : {}}
                                />
                            </FontIcon>
                        }
                    >
                    </StepButton>
                </Step>
                <Step completed={isReceiving}>
                    <StepButton
                        onClick={() => {
                            this.props.on_mode_change("receive")
                        }}

                        icon={
                            <FontIcon>
                                <HardwareKeyboardArrowRight
                                    style={isReceiving ? active_icon : {}}
                                />
                                <HardwareDesktopWindows
                                    style={isReceiving ? active_icon : {}}
                                />

                            </FontIcon>
                        }
                    >

                    </StepButton>
                </Step>
            </Stepper>
        </div>)
    }
}
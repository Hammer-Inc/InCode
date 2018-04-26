import PropTypes from "prop-types";
import {
    ActionSettingsEthernet,
    HardwareComputer,
    HardwareDesktopWindows,
    HardwareKeyboardArrowRight
} from "material-ui/svg-icons/index";
import React, {Component} from "react";
import {IconButton, Step, Stepper} from "material-ui";
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
                connector={<div style={{width: '200px'}}>
                    <HardwareKeyboardArrowRight/>
                    <ActionSettingsEthernet/>
                    <HardwareKeyboardArrowRight/>
                </div>}
            >
                <Step>
                    <IconButton
                        tooltip={"Send Data"}
                        tooltipPosition={'bottom-center'}
                        onClick={() => {
                            this.props.on_mode_change("send")
                        }}
                        iconStyle={isSending ? active_icon : {}}
                    >
                        <HardwareComputer
                        />
                    </IconButton>
                </Step>
                <Step>
                    <IconButton
                        tooltip={"Receive Data"}
                        tooltipPosition={'bottom-center'}
                        onClick={() => {
                            this.props.on_mode_change("receive")
                        }}
                        iconStyle={isReceiving ? active_icon : {}}
                    >
                        <HardwareDesktopWindows
                        />
                    </IconButton>
                </Step>
            </Stepper>
        </div>)
    }
}
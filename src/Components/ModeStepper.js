import PropTypes from "prop-types";
import {
    ActionSettingsEthernet,
    HardwareComputer,
    HardwareDesktopWindows,
    HardwareKeyboardArrowRight
} from "material-ui/svg-icons/index";
import React, {Component} from "react";
import {IconButton} from "material-ui";
import {cyan500, lime500} from "material-ui/styles/colors";

export default class ModeStepper extends Component {
    static propTypes = {
        input_mode: PropTypes.string,
        on_mode_change: PropTypes.func,
    };


    render() {
        const active_icon = {
            color: lime500
        };
        let isSending = this.props.input_mode === 'send';
        let isReceiving = this.props.input_mode === 'receive';
        const style = {
            root: {
                display: 'block'
            },
            header: {
                display: 'flex',
                flexDirection: 'row',
                placeContent: 'center space-between',
                alignItems: 'center',
            }
        };
        return (
            <div>
                <div style={style.root}>
                    <div style={style.header}>
                        <div>
                            <IconButton
                                tooltip={"Send Data"}
                                tooltipPosition={'bottom-center'}
                                onClick={() => {
                                    this.props.on_mode_change("send")
                                }}
                                iconStyle={isSending ? active_icon : {}}
                            >
                                <HardwareComputer/>
                            </IconButton>
                        </div>
                        <div>
                            <HardwareKeyboardArrowRight/>
                            <ActionSettingsEthernet/>
                            <HardwareKeyboardArrowRight/>
                        </div>
                        <div>
                            <IconButton
                                tooltip={"Receive Data"}
                                tooltipPosition={'bottom-center'}
                                onClick={() =>
                                    this.props.on_mode_change("receive")
                                }
                                iconStyle={isReceiving ? active_icon : {}}
                            >
                                <HardwareDesktopWindows/>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>)
    }
}
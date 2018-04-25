import React, {Component} from "react/cjs/react.production.min";
import PropTypes from "prop-types";
import {GridTile, Paper} from "material-ui";
import Tooltip from "react-bootstrap/es/Tooltip";
import {OverlayTrigger} from "react-bootstrap";

export default class ParitySheet extends Component {
    static propTypes = {
        bit: {
            position: PropTypes.number,
            index: PropTypes.number,
            value: PropTypes.number,
            components: PropTypes.array,
        },
        isSelected: PropTypes.bool,
        isShowingParity: PropTypes.bool,
        onShowParity: PropTypes.func,
        corrected: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
            isParity: this.props.bit.components != null,
            isHovered: false
        }
    }

    onClickValue = (event) => {
        if (this.state.isParity) {
            if (this.props.isShowingParity) {
                this.props.onShowParity(null)
            } else {
                this.props.onShowParity(this.props.bit)
            }
        }
    };

    onMouseEnter = () => {
        if (this.state.isParity) {
            this.setState({
                isHovered: true
            })
        }
    };
    onMouseLeave = () => {
        if (this.state.isParity) {
            this.setState({
                isHovered: false
            })
        }
    };

    render() {
        let colouring = {
            hard: "rgba(" + (this.state.isParity ? "200,0,0,1" : "0,200,200,1") + ")",
            strong: "rgba(" + (this.state.isParity ? "200,0,0,0.7" : "0,200,200,0.7") + ")",
            pale: "rgba(" + (this.state.isParity ? "200,0,0,0.2" : "0,200,200,0.2") + ")",
            bright: "rgba(" + (this.state.isParity ? "255,0,0,0.3" : "0,255,255,0.3") + ")",
            transparent: "rgba(" + (this.state.isParity ? "255,0,0,0" : "0,255,255,0") + ")",
        };
        let styling = {
            header: {
                backgroundColor: colouring.pale,
                borderColor: colouring.strong,
                color: 'black',
                display: 'inline-block',
                borderRightStyle: 'inset',
                borderBottomStyle: 'inset',
                borderRightWidth: '2px',
                borderBottomWidth: '2px',
                zIndex: '999'
            },
            overlay: {
                text: {
                    color: colouring.strong,
                    marginRight: '16px !important'
                },
                bg: "linear-gradient(to top, " + colouring.transparent + " 0%," + colouring.transparent + " 70%," + colouring.transparent + "100%)"
            },

            card: {
                margin: '1px 1px',
                minWidth: '150px',
                textAlign: 'left',
                height: '100%',
                border: ''
            },
            selectedCard: {
                border: '2px double yellow',
            },
            correctedCard: {
                border: '2px double green'
            },

            index: {
                display: 'inline-block',
                color: colouring.bright,
                fontSize: '22px',
                zIndex: '999'
            },

            value: {
                fontSize: '100px',
                textAlign: 'center',
                position: 'absolute',
                width: '100%',
                WebkitTouchCallout: "none",
                WebkitUserSelect: "none",
                KhtmlUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
                userSelect: "none",
            },

            statusText: {
                display: 'inline-block',
                color: colouring.bright,
                fontSize: '11px',
                textAlign: 'center'
            },
            correctedText: {
                color: 'green'
            },
            onHover: {
                color: colouring.hard,
                cursor: 'pointer'
            },
            normal: {
                color: colouring.strong,
            }
        };
        return (
            <GridTile
                key={this.props.bit.position}
                title={this.state.isParity ? 'Parity' : 'Data'}
                titleStyle={styling.overlay.text}
                style={styling.overlay.text}
                titleBackground={styling.overlay.bg}
            >
                <Paper
                    style={{...styling.card, ...(this.props.isSelected ? styling.selectedCard : {}), ...(this.props.corrected ? styling.correctedCard : {})}}>
                    <OverlayTrigger
                        overlay={
                            (<Tooltip id={"tooltip-bit-" + this.props.bit.position}>
                                More Information
                            </Tooltip>)}
                        placement='top'
                        delayShow={300}
                        delayHide={150}

                    >
                        <div
                            onMouseEnter={this.onMouseEnter}
                            onMouseLeave={this.onMouseLeave}
                            onClick={this.onClickValue}
                            style={{...styling.value, ...(this.state.isHovered ? styling.onHover : styling.normal)}}>
                            {this.props.bit.value}
                        </div>
                    </OverlayTrigger>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h5 style={styling.header}>
                            {
                                (this.state.isParity ? "P" : "D") + this.props.bit.index
                            }
                        </h5>
                        {this.props.isShowingParity ?
                            (
                                <h6 style={styling.statusText}>
                                    Selected
                                </h6>
                            ) : this.props.corrected ? (
                                <h6 style={{...styling.statusText, ...styling.correctedText}}>
                                    Corrected
                                </h6>
                            ) : null
                        }
                        <h6 style={styling.index}>
                            {1 + this.props.bit.position}
                        </h6>
                    </div>
                </Paper>
            </GridTile>
        );
    };
}


import {Component} from "react/cjs/react.production.min";
import PropTypes from "prop-types";
import React from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {GridTile, Paper} from "material-ui";

export default class Sheet extends Component {
    static colours = {
        sheet: {
            background: 'rgba(255,255,255,1)',
            fade: 'rgba(255,255,255,0)',
            fadeText: 'rgba(0,0,0,1)',
            value: 'rgba(0,0,0,1)',
            valueHover: 'rgba(0,0,0,0.7)',

        },
        header: {
            text: 'rgba(0,0,0,1)',
            background: 'rgba(100,100,100,0.3)',
            border: 'rgba(0,0,0,1)'
        }
    };

    static propTypes = {
        identifier: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        header: PropTypes.string.isRequired,
        title: PropTypes.string,

        onClick: PropTypes.func.isRequired,
        highlight: PropTypes.shape({
            type: PropTypes.string.isRequired,
            style: PropTypes.string.isRequired,
        }),

        headerStyle: PropTypes.object,
        overlayStyle: PropTypes.object,
        cardStyle: PropTypes.object,
        indexStyle: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
    }

    onMouseEnter = () => {
        if (this.state.isParity) {
            this.setState({
                hover: true
            })
        }
    };
    onMouseLeave = () => {
        if (this.state.isParity) {
            this.setState({
                hover: false
            })
        }
    };

    render() {
        let headerStyle = {
            ...{
                backgroundColor: Sheet.colours.header.background,
                borderColor: Sheet.colours.header.border,
                color: 'black',
                display: 'inline-block',
                borderRightStyle: 'inset',
                borderBottomStyle: 'inset',
                borderRightWidth: '2px',
                borderBottomWidth: '2px',
                zIndex: '999'
            },
            ...this.props.headerStyle
        };
        let overlayBg = this.props.overlayStyle || Sheet.colours.sheet.fade;
        let statusStyle = {
            ...{
                display: 'inline-block',
                fontSize: '11px',
                textAlign: 'center'
            }, ...(this.props.highlight === undefined ? {} : this.props.highlight.style)
        };
        let cardStyle = {
            ... {
                margin: '1px 1px',
                minWidth: '150px',
                textAlign: 'left',
                height: '100%',
                border: ''
            },
            ...this.props.cardStyle,
            ...(this.props.highlight !== undefined? this.props.highlight.style : {})
        };
        let indexStyle = {
            ...{
                display: 'inline-block',
                color: Sheet.colours.sheet.value,
                fontSize: '22px',
                zIndex: '999'
            },
            ...this.props.indexStyle
        };

        const valueStyle = {
            fontSize: '100px',
            textAlign: 'center',
            position: 'absolute',
            cursor: 'pointer',
            width: '100%',
            color: 'inherit',
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            KhtmlUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
        };
        const overlayTextStyle = {
            color: Sheet.colours.sheet.fadeText,
            marginRight: '16px !important'
        };
        const headerBar = {
            display: 'flex',
            justifyContent: 'space-between'
        };


        return (

            <GridTile
                key={this.props.identifier}
                title={this.props.title}
                titleStyle={overlayTextStyle}
                style={overlayTextStyle}
                titleBackground={overlayBg}
            >
                <Paper
                    style={cardStyle}>
                    <OverlayTrigger
                        overlay={
                            (<Tooltip id={"tooltip-sheet-id-" + this.props.identifier}>
                                More Information
                            </Tooltip>)}
                        placement='top'
                        delayShow={300}
                        delayHide={150}

                    >
                        <div
                            onMouseEnter={this.onMouseEnter}
                            onMouseLeave={this.onMouseLeave}
                            onClick={this.props.onClick}
                            style={{...valueStyle, ...(this.state.isHovered ? {color: Sheet.colours.sheet.valueHover} : {color: Sheet.colours.sheet.value})}}>
                            {this.props.value}
                        </div>
                    </OverlayTrigger>
                    <div style={headerBar}>
                        <h5 style={headerStyle}>
                            {this.props.header}
                        </h5>
                        {this.props.highlight !== undefined ?
                            (
                                <h6 style={statusStyle}>
                                    {this.props.highlight.type}
                                </h6>
                            ) : null
                        }
                        <h6 style={indexStyle}>
                            {1 + this.props.index}
                        </h6>
                    </div>
                </Paper>
            </GridTile>
        )
            ;
    };
}
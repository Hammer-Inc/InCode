import React, {Component} from "react/cjs/react.production.min";
import PropTypes from "prop-types";
import {GridTile, Paper} from "material-ui";
import Tooltip from "react-bootstrap/es/Tooltip";
import {OverlayTrigger} from "react-bootstrap";

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
        identifier: PropTypes.string().isRequired,
        value: PropTypes.string().isRequired,
        index: PropTypes.number().isRequired,
        header: PropTypes.string().isRequired,
        title: PropTypes.string,

        isSelected: PropTypes.bool().isRequired,
        onClick: PropTypes.func().isRequired,
        highlight: PropTypes.shape({
            type: PropTypes.string().isRequired,
            color: PropTypes.string().isRequired,
        }),
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
}

const styles = {
    header: {
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
    overlay: {
        text: {
            color: Sheet.colours.colours.sheet.fadeText,
            marginRight: '16px !important'
        },
        bg: Sheet.colours.sheet.fade
    },

    card: {
        margin: '1px 1px',
        minWidth: '150px',
        textAlign: 'left',
        height: '100%',
        border: ''
    },

    index: {
        display: 'inline-block',
        color: Sheet.colours.sheet.value,
        fontSize: '22px',
        zIndex: '999'
    },

    value: {
        fontSize: '100px',
        textAlign: 'center',
        position: 'absolute',
        cursor: 'pointer',
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
        fontSize: '11px',
        textAlign: 'center'
    },
    headerBar: {
        display: 'flex',
        justifyContent: 'space-between'
    }
};

export {styles}
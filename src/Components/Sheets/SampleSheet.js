import React, {Component} from "react/cjs/react.production.min";
import PropTypes from "prop-types";
import {GridTile, Paper} from "material-ui";
import Tooltip from "react-bootstrap/es/Tooltip";
import {OverlayTrigger} from "react-bootstrap";
import Sheet, {styles} from "./Sheet";

export default class SampleSheet extends Sheet {
    render() {
        return (
            <GridTile
                key={this.props.identifier}
                title={this.props.title}
                titleStyle={styles.overlay.text}
                style={styles.overlay.text}
                titleBackground={styles.overlay.bg}
            >
                <Paper
                    style={styles.card}>
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
                            style={{...styles.value, ...(this.state.isHovered ? {color:SampleSheet.colours.sheet.valueHover}:{color:SampleSheet.colours.sheet.value})}}>
                            {this.props.value}
                        </div>
                    </OverlayTrigger>
                    <div style={}>
                        <h5 style={styles.header}>
                            {this.props.header}
                        </h5>
                        {this.props.highlight !== undefined ?
                            (
                                <h6 style={{...styles.statusText, ...{color:this.props.highlight.color} }}>
                                    {this.props.highlight.type}
                                </h6>
                            ): null
                        }
                        <h6 style={styles.index}>
                            {1 + this.props.index}
                        </h6>
                    </div>
                </Paper>
            </GridTile>
        );
    };
}


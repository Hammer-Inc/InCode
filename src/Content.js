import React, {Component} from "react/cjs/react.production.min";
import PropTypes from "prop-types";
import {FlatButton, GridList, GridTile, Paper} from "material-ui";
import {sortbyposition} from "./Logic/API";

const styles = {
    parent: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'scroll',
    },
    element: {
        margin: '1px 1px',
        minWidth: '150px',
        textAlign: 'left',
        height: '100%',
    },
    element_highlighted: {
        margin: '1px 1px',
        minWidth: '150px',
        textAlign: 'left',
        height: '100%',
        backgroundColor: 'light-yellow'
    },
    index: {
        display: 'inline-block',
        color: 'black',

    },
    header: {
        data: {
            backgroundColor: "rgba(0,200,200,0.2)",
            borderColor: 'rgb(0,200,200)',
            color: 'black',
            display: 'inline-block',
            borderRightStyle: 'double',
            borderBottomStyle: 'double',
            borderRightWidth: '2px',
            borderBottomWidth: '2px',
        },
        parity: {
            backgroundColor: "rgba(200,0,0,0.2)",
            borderColor: 'rgb(200,0,0)',
            color: 'black',
            display: 'inline-block',
            borderRightStyle: 'double',
            borderBottomStyle: 'double',
            borderRightWidth: '2px',
            borderBottomWidth: '2px',
        }
    }

};

export default class Content extends Component {
    static propTypes = {
        information: PropTypes.object

    };


    constructor(props) {
        super(props);
        this.state = {
            highlighted: []
        };
    }


    getBitHeader = (bit) => {
        if (bit.hasOwnProperty("components")) {
            return "r" + bit.index
        }
        return "D" + bit.index
    };

    getTitleStyling = (bit) => {
        let style = {};
        if (bit.hasOwnProperty('components')) {
            style.color = 'black'
        } else {
            style.color = 'black'
        }
        return style
    };
    getBgStyling = (bit) => {
        if (bit.hasOwnProperty('components')) {
            return "linear-gradient(to top, rgba(200,0,0,0.7) 0%,rgba(100,0,0,0.3) 70%,rgba(50,0,0,0) 100%)"
        }
        return "linear-gradient(to top, rgba(0,200,200,0.7) 0%,rgba(0,100,100,0.3) 70%,rgba(0,50,50,0) 100%)"
    };

    getHeaderStyling = (bit) => {
        if (bit.hasOwnProperty('components')) {
            return styles.header.parity
        }
        return styles.header.data
    };

    setHighlight = (event) => {
        console.log(event.target.value.props('cmp'))
        this.setState({
            highlight: []
        })
    };

    render() {
        return (
            <div style={styles.parent}>
                <GridList
                    style={styles.gridList}
                    cols={'2.2'}>
                    {this.props.information.parity.concat(
                        this.props.information.message).sort(
                        sortbyposition).reverse().map((bit) => (
                        <GridTile
                            key={bit.position}
                            title={bit.hasOwnProperty('components') ? 'Parity' : 'Data'}
                            titleStyle={this.getTitleStyling(bit)}
                            titleBackground={this.getBgStyling(bit)}
                        >
                            <Paper
                                style={bit.position in this.state.highlighted ? styles.element_highlighted : styles.element}>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <h5 style={this.getHeaderStyling(bit)}>
                                        {this.getBitHeader(bit)}
                                    </h5>
                                    <h6 style={styles.index}>
                                        i={1 + bit.position}
                                    </h6>
                                </div>
                                <div style={{margin: '0px 2px'}}>
                                    {bit.hasOwnProperty('components') ? (
                                        <div>
                                            {bit.components.map((comp) => {
                                                return "D" + comp.index;
                                            }).join("⊕")}
                                            <FlatButton
                                                label={"Highlight Parity Bits"}
                                                // onClick={this.setHighlight}
                                                // cmp={bit.position}
                                                secondary={true}/>
                                        </div>

                                    ) : (<div/>)}
                                    <div>
                                        Value={bit.value}
                                    </div>
                                </div>
                            </Paper>
                        </GridTile>

                    ))}
                </GridList>
            </div>
        );
    }
}
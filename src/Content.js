import React, {Component} from "react/cjs/react.production.min";
import PropTypes from "prop-types";
import {Card, CardHeader, CardText, GridList, Paper} from "material-ui";
import {sortbyposition} from "./Logic/API";
import ParitySheet from "./Components/Sheets/ParitySheet";
import ParityInfo from "./Components/ParityInfo";

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
};

export default class Content extends Component {
    static propTypes = {
        information: PropTypes.object.isRequired,
    };


    constructor(props) {
        super(props);
        this.state = {
            highlight: [],
            highlight_source: null,
        };
    }

    setHighlight = (bit) => {
        if (bit === null) {
            this.setState({
                highlight_source: null,
                highlight: [],
            })
        } else {
            this.setState({
                highlight_source: bit.index,
                highlight: bit.components.map((x) => x.index)
            })
        }
    };

    render() {
        return (
            <div style={{display: 'block'}}>
                <div style={{textAlign: 'left'}}>
                    <Card
                        expandable={true}
                        initiallyExpanded={true}
                    >
                        <CardHeader
                            title={"Viewing results"}
                            subtitle={"Tutorial"}
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText
                            expandable={true}
                        >
                            <p>
                                Once you enter some data in the 'settings' sidebar menu and click validate you will see
                                a series of cards below. Each card represents a binary value you entered or a parity bit
                                calculated for the information entered.
                            </p>
                            <p style={{display:this.props.information.message.length === 0 ? 'none':'inherit' }}>
                                <strong>Hint:</strong> Try clicking on a card to see more information about it!
                            </p>
                        </CardText>
                    </Card>
                </div>
                <div style={styles.parent}>
                    <GridList
                        style={styles.gridList}
                        cols={'2.2'}>
                        {this.props.information.message.length === 0 ? (
                            <div>
                                Insert Sample card here
                            </div>
                        ):null}
                        {this.props.information.parity.concat(
                            this.props.information.message).sort(
                            sortbyposition).reverse().map((bit) => (
                                <ParitySheet
                                    bit={bit}
                                    isSelected={this.state.highlight.indexOf(bit.index) > -1 && !bit.hasOwnProperty('components')}
                                    isShowingParity={this.state.highlight_source === bit.index && bit.hasOwnProperty('components')}
                                    onShowParity={this.setHighlight}
                                    corrected={this.props.information.syndrome.errors.index === bit.position}
                                />
                            )
                        )}
                    </GridList>
                </div>
                <div>
                    {this.state.highlight_source !== null && this.state.highlight_source !== undefined ? (
                        <ParityInfo
                            source={this.props.information.parity[this.state.highlight_source - 1]}

                        />
                    ) : null}

                </div>
            </div>
        );
    }
}
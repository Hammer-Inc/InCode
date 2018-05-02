import React, {Component} from "react/cjs/react.production.min";
import PropTypes from "prop-types";
import {Card, CardHeader, CardText, GridList} from "material-ui";
import {sortbyposition} from "./Logic/API";
import InfoCard from "./Components/InfoCard";
import Sheet from "./Components/Sheets/Sheet";
import {blue300, green100, green300, green500} from "material-ui/styles/colors";


const styles = {
    parent: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
    },
};

export default class Content extends Component {
    static propTypes = {
        information: PropTypes.object.isRequired,
    };


    constructor(props) {
        super(props);
        this.state = {
            infoTarget: undefined,
            highlight: [],
            highlightOrigin: undefined,
        };
    }

    setInfoTarget = (type, obj, key) => {
        if (this.state.infoTarget !== undefined) {
            if (key === this.state.infoTarget.key) {
                this.setState({
                    infoTarget: undefined
                });
                return null
            }
        }
        this.setState({
            infoTarget: {
                type: type,
                obj: obj,
                key: key,
            }
        })
    };


    resetHighlight = () => this.setState({highlight: [], highlightOrigin: undefined});

    setHighlightFromParity = (bit) => {
        let result = [bit.position];
        if (bit.hasOwnProperty('components')) {
            for (let val in bit.components) {
                result = result.concat(bit.components[val].position);
            }
        }
        this.setState({
            highlight: result,
            highlightOrigin: bit.position,
        });

    };

    render() {
        let target = this.state.infoTarget;
        let hasElements = this.props.information.message.length !== 0;
        const highlightStyle = {
            border: '2px solid red'
        };
        const infoStyle = {
            filter: 'brightness(95%)'
        };
        const correctionStyle = {
            backgroundColor: green300
        };
        let elements = this.props.information.parity.concat(this.props.information.message).sort(sortbyposition).reverse();
        const elementsAsGrid = (e) => e.map((bit) => {
                let is_parity = bit.hasOwnProperty("components");
                let is_corrected = this.props.information.syndrome.errors.index === bit.position;
                let is_selected = this.state.highlightOrigin === bit.position;
                let rgb = is_parity ? '200,0,0' : '0,200,200';
                let colour_a = 'rgba(' + rgb + '0.7)';
                let colour_b = 'rgba(' + rgb + '0.3)';
                let uniqueID = "full://" + this.props.information.codeword + ":" + bit.position;
                let is_info = this.state.infoTarget !== undefined && uniqueID === this.state.infoTarget.key;
                let is_highlighted = this.state.highlight.includes(bit.position);

                let is_special = is_highlighted || is_info || is_corrected;
                let cardStyleSpecial = {
                    ...(is_highlighted ? highlightStyle : {}),
                    ...(is_info ? infoStyle : {}),
                    ...(is_corrected ? correctionStyle : {})
                };
                let statusStyle = {
                    color: blue300
                };
                let statusType = is_info ? "Selected" : "";
                return (
                    <Sheet key={uniqueID} identifier={uniqueID} value={bit.value} index={bit.position}
                           header={(is_parity ? "P" : "D") + bit.index}
                           onClick={() => {
                               this.setInfoTarget(is_parity ? "parity" : "data", bit, uniqueID)
                           }}
                           title={is_parity ? "Parity" : "Data"}
                           highlight={
                               is_special?
                                   {
                                       type: statusType,
                                       style: cardStyleSpecial,
                                       statusStyle: statusStyle
                                   }:
                                   undefined
                           }
                           headerStyle={{borderColor: colour_b, backgroundColor: colour_a}}
                           indexStyle={{color: colour_b}}

                           iconEnabled={is_parity}
                           iconSelected={is_selected}
                           onIconClick={() => {
                               if (is_selected) {
                                   this.resetHighlight()
                               } else {
                                   this.setHighlightFromParity(bit)
                               }
                           }}
                    />
                )
            }
        );
        const sample = () => [0, 1, 2, 3, 4, 5].map((x) => {
            return (
                <Sheet
                    identifier={'sample-0'}
                    value={x % 2}
                    index={x}
                    header={"s" + x}
                    onClick={() => {
                    }}
                    title={"Sample"}/>
            )
        });
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
                            <p style={{display: !hasElements ? 'none' : 'inherit'}}>
                                <strong>Hint!</strong> Click on a card to see more information about it.
                            </p>
                        </CardText>
                    </Card>
                    <br/>
                    <Card>
                        <CardHeader
                            title={'View Results'}
                            subtitle={"Information"}
                        />
                        <CardText>
                            <div>
                                Raw Data: {this.props.information.data}
                            </div>
                            <div>
                                Data including parity bits: {this.props.information.codeword}
                            </div>
                        </CardText>

                        <CardText>
                            <GridList
                                style={styles.gridList}
                                cols={'2.2'}>
                                {hasElements ? elementsAsGrid(elements) : sample()}
                            </GridList>
                        </CardText>
                        {target !== undefined ? (
                            <InfoCard
                                source={target}
                            />

                        ) : null}

                    </Card>

                </div>
            </div>
        );
    }
}
import React, {Component} from "react/cjs/react.production.min";
import PropTypes from "prop-types";
import {Card, CardHeader, CardText, GridList} from "material-ui";
import {sortbyposition} from "./Logic/API";
import InfoCard from "./Components/InfoCard";
import Sheet from "./Components/Sheet";
import {blue300, lime300, lime500, red300, red500} from "material-ui/styles/colors";
import CookieCard from "./Components/CookieCard";


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
            backgroundColor: lime300
        };
        let elements = this.props.information.parity.concat(this.props.information.message).sort(sortbyposition).reverse();
        const elementsAsGrid = (e) => e.map((bit) => {
                let is_parity = bit.hasOwnProperty("components");
                let is_corrected = this.props.information.syndrome.errors.index === bit.position;
                let is_selected = this.state.highlightOrigin === bit.position;
                let accent_primary = is_parity ? red500 : lime500;
                let accent_secondary = is_parity ? red300 : lime300;

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
                           title={(hasElements ? "" : "Sample ") + (is_parity ? "Parity" : "Data")}
                           highlight={
                               is_special ?
                                   {
                                       type: statusType,
                                       style: cardStyleSpecial,
                                       statusStyle: statusStyle
                                   } :
                                   undefined
                           }
                           headerStyle={{borderColor: accent_secondary, backgroundColor: accent_primary}}
                           indexStyle={{color: accent_secondary}}

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
        const sampleCards = [
            {
                index: 1,
                position: 2,
                value: 1
            },
            {
                components: [{
                    index: 1,
                    position: 2,
                    value: 1
                }],
                index: 2,
                position: 1,
                value: 1,
            },
            {
                components: [{
                    index: 1,
                    position: 2,
                    value: 1
                }],
                index: 1,
                position: 0,
                value: 1,
            },
        ];
        return (
            <div style={{display: 'block'}}>
                <div style={{textAlign: 'left'}}>
                    <CookieCard
                        uniqueID={"ViewingResultsTutorial-1"}
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
                    </CookieCard>
                    <br/>
                    <Card>
                        <CardHeader
                            title={'View Results'}
                            subtitle={"Information"}
                        />
                        {hasElements ?
                            <CardText>
                                <div>
                                    Raw Data: {this.props.information.data}
                                </div>
                                <div>
                                    Data including parity bits: {this.props.information.codeword}
                                </div>
                            </CardText>
                            : null
                        }
                        <CardText>
                            <GridList
                                style={styles.gridList}
                                cols={'2.2'}>
                                {hasElements ? elementsAsGrid(elements) : elementsAsGrid(sampleCards)}
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
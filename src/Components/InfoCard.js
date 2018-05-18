import React, {Component} from "react/cjs/react.production.min";
import PropTypes from "prop-types";
import {CardHeader, CardText} from "material-ui";
import CookieCard from "./CookieCard";

export default class InfoCard extends Component {
    static propTypes = {
        source: PropTypes.object,
    };


    render() {
        let target = this.props.source;
        let obj = target.obj;
        let isParity = target.type === 'parity';
        let isData = target.type === 'data';
        let isSample = target.type === 'sample';

        let MoreParityInfo = [
            <CardHeader
                title={"Calculating Parity Bits"}
                subtitle={"Tutorial"}
                actAsExpander={true}
                showExpandableButton={true}
            />,
            <CardText expandable={true}>
                <p>
                    In order to calculate a bit, you perform an exclusive or operation on all it's
                    sub-components. (An exclusive or is just a fancy way of saying if the sum is even, the result is 0,
                    if it's odd, the result is 1)
                    The sub components are best defined by the 'Take n, skip n' formula, where n is the
                    position
                    of the parity bit in question.
                </p>
                <p>
                    If you wanted to for example, calculate the parity bit P2, you can see above it is
                    located at position 2. You then starting at P2, take two bits (including P2), and skip two bits,
                    The calculation is defined below.
                </p>
                <strong>Hint!</strong> For a more visual example, click the highlight button on P2.
            </CardText>,

        ];
        return [
            <CardHeader
                title={"More Information"}
                subtitle={target.type + " bit at position " + target.obj.position}
                style={{textTransform: 'capitalize'}}
            />,
            <CardText>
                {
                    isParity ?
                        [
                            <CookieCard
                                uniqueID={"MoreParityInformationTutorial-1"}
                                children={MoreParityInfo}
                            />,
                            <CardText>
                                <div>
                                    P{obj.index} = {obj.components.map((b) => "D" + b.index).join("\u200D \u00a0⊕ \u00a0")}
                                </div>
                                <div>
                                    P{obj.index} = {obj.components.map((b) => b.value).join("\u200D \u00a0⊕ \u00a0")}&#8203;
                                </div>
                                <div>
                                    P{obj.index} = {obj.value}
                                </div>
                            </CardText>
                        ] : null
                }
                {
                    isData ? (
                        <div>
                            <h6>Raw Data bit</h6>
                            This is a raw data bit with the value of {obj.value}, it is located at
                            position {obj.index - 1} from the
                            right in the raw data
                        </div>
                    ) : null
                }
                {
                    isSample ? <div>
                        When you select a parity bit, you can see more information here.
                    </div> : null
                }
                <p>

                </p>
            </CardText>
        ];

    }
}
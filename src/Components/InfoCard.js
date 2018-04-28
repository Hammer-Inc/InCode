import React, {Component} from "react/cjs/react.production.min";
import PropTypes from "prop-types";
import {CardHeader, CardText} from "material-ui";

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
        return [
            <CardHeader
                title={"More Information"}
                subtitle={target.type + " bit at position " + target.obj.position}
                style={{textTransform: 'capitalize'}}
            />,
            <CardText>
                {
                    isParity ? (
                        <div>
                            <div>
                                <h6>
                                    How to calculate this bit
                                </h6>
                                Take the sum below
                            </div>
                            <div>
                                {obj.components.map((b) => "D" + b.index).join("\u200D \u00a0⊕ \u00a0")}
                            </div>
                            or
                            <div>
                                {obj.components.map((b) => b.value).join("\u200D \u00a0⊕ \u00a0")}&#8203;
                            </div>
                            <div>
                                Is the sum even, then the value of this parity bit is 0, otherwise 1.
                                Thus the result is {obj.value}
                            </div>

                        </div>
                    ) : null
                }
                {
                    isData ? (
                        <div>
                            The value of this bit is {obj.value}, it is the bit at position {obj.index -1} from the right in the raw data
                        </div>
                    ) : null
                }
                <p>

                </p>
            </CardText>
        ];

    }
}
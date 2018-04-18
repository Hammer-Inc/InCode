import React, {Component} from "react/cjs/react.production.min";
import PropTypes from "prop-types";
import {Card, CardHeader, CardText} from "material-ui";

export default class BitCard extends Component {
    static propTypes = {
        source: PropTypes.object,

    };


    render() {
        let styling = {
            breakStuff: {
                overflow:'auto',
                overflowWrap: 'break-word',
                wordWrap:'break-word',
                msWordBreak: 'break-all',
                wordBreak:'break-word'
            },
        };
        return (
            <Card style={{textAlign:'left'}}>
                <CardHeader
                    title={"P" + this.props.source.index}
                    subtitle={"Parity bit at position " + this.props.source.position}
                >
                    <CardText>
                        <p>
                            This bit can be calculated using the following formula:
                        </p>
                        <p style={styling.breakStuff}>
                            {"P" + this.props.source.index} =
                            {this.props.source.components.map((comp) => {
                                return "D" + comp.index;
                            }).join(" ⊕ ")}
                        </p>
                        <p style={styling.breakStuff}>
                            {"P" + this.props.source.index} =
                            {this.props.source.components.map((comp) => {
                                return comp.value;
                            }).join(" ⊕ ")}
                        </p>
                        <p>
                            {"\t"}={this.props.source.value}
                        </p>
                    </CardText>
                </CardHeader>
            </Card>
        )
    }
}
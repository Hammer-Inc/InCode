import React, {Component} from "react/cjs/react.production.min";
import PropTypes from "prop-types";
import {CardText} from "material-ui";

export default class InfoCard extends Component {
    static propTypes = {
        source: PropTypes.object,

    };


    render() {
        const styling = {
            breakStuff: {
                overflow: 'auto',
                overflowWrap: 'break-word',
                wordWrap: 'break-word',
                msWordBreak: 'break-all',
                wordBreak: 'break-word'
            },
        };
        let isParity = this.props.source.hasOwnProperty("components");
        return (
            <CardText>
                <p>
                    This bit can be calculated using the following formula:
                </p>
                <p>
                    {"\t"}={this.props.source.value}
                </p>
            </CardText>

        )
    }
}
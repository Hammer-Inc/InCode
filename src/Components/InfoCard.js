import React, {Component} from "react/cjs/react.production.min";
import PropTypes from "prop-types";
import {CardText} from "material-ui";

export default class InfoCard extends Component {
    static propTypes = {
        source: PropTypes.object,

    };


    render() {
        let isParity = this.props.source.hasOwnProperty("components");
        return (
            <CardText>
                {isParity ? (
                    <p>
                        This bit can be calculated using the following formula:
                    </p>
                ) : null}
                <p>
                    {"\t"}={this.props.source.value}
                </p>
            </CardText>

        )
    }
}
import React, {Component} from "react"
import {getStatusClass, priorityToString, toTitle} from "../Logic/Utility";

export default class Ticket extends Component {
    render() {
        const {platform, issue, priority, status} = this.props.ticket;
        return (
            <tr onClick={() => this.props.onClick(this.props.index)}
                value={this.props.index}
                className={(this.props.isSelected ? "active " : "") + getStatusClass(status) + " "}>
                <th>{platform}</th>
                <th>{toTitle(issue)}</th>
                <th>{priorityToString(priority)}</th>
            </tr>
        );
    }
}
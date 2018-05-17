import React, {Component} from "react/cjs/react.production.min";
import PropTypes from "prop-types";
import {Card, CardActions, RaisedButton} from "material-ui";

export default class CookieCard extends Component {
    static propTypes = {
        uniqueID: PropTypes.string.isRequired,
        children: PropTypes.element.isRequired,
        actionChildren: PropTypes.arrayOf(PropTypes.element),
        initiallyExpanded: PropTypes.bool,
        showHideButton: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        if (!localStorage.hasOwnProperty(this.props.uniqueID)) {
            if (this.props.initiallyExpanded !== undefined)
                localStorage.setItem(this.props.uniqueID, this.props.initiallyExpanded ? "true" : "false")
        }
        this.state = {
            isOpen: localStorage.getItem(this.props.uniqueID) === 'true'
        }
    }

    onChange = (value) => {
        if (value) {
            localStorage.setItem(this.props.uniqueID, 'true')
        } else {
            localStorage.setItem(this.props.uniqueID, 'false');
        }
        this.setState({isOpen: value})
    };

    render() {
        let showActions = this.props.showHideButton || true;
        return <Card expandable={true}
                     expanded={this.state.isOpen}
                     onExpandChange={this.onChange}
        >
            {this.props.children}
            <CardActions expandable={true}>
                {showActions
                    ?(<RaisedButton label={"Hide"}
                                  primary={this.props.actionChildren === undefined}
                                  secondary={this.props.actionChildren !== undefined}
                                  onClick={() => this.onChange(!this.state.isOpen)}/>):null
                }

                {this.props.actionChildren}
            </CardActions>
        </Card>
    }
}
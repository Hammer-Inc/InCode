import React, {Component} from "react/cjs/react.production.min";
import {Button, Col, Label} from "react-bootstrap";
import {AutoComplete, IconButton, MenuItem, Paper, SelectField} from "material-ui";
import api_url, {handleRequestError} from "../config/api";
import {priorityToString, toTitle} from "../Logic/Utility";
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import Row from "react-bootstrap/es/Row";

export default class HelpdeskHelper extends Component {


    constructor(props) {
        super(props);
        this.state = {
            priority: null,
            tech: {},
            status: null,
            user: {
                name: "",
                email: "",
            },
            comments: [],
            reassignField: ""
        };
    }

    fetchComments = () => {
        let request = {
            method: 'GET',
            headers: {
                "Authorization": "Basic " + btoa(this.props.login_info.email + ":" + this.props.login_info.apiToken),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        fetch(api_url + '/ticket/' + this.props.tickets[this.props.selectedTicket].id + '/comments', request)
            .then(handleRequestError)
            .then((json) => {
                this.setState({
                    comments: json,
                })
            }).catch((e) => {
            console.log(e);
        })
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedTicket === null)
            return;
        const ticket = nextProps.tickets[nextProps.selectedTicket];
        this.setState({
            priority: ticket.priority,
            tech: {id: ticket.assigned_to, name: "Technical Support", email: ""},
            status: ticket.status,
        });
    }

    componentDidUpdate(oldProps) {
        if (this.props.selectedTicket !== null)
            if (this.props.selectedTicket !== oldProps.selectedTicket)
                this.fetchComments();
    }

    pushChanges = () => {
        let request = {
            method: 'PUT',
            headers: {
                "Authorization": "Basic " + btoa(this.props.login_info.email + ":" + this.props.login_info.apiToken),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                assigned_to: this.state.tech.id,
                status: this.state.status,
                priority: this.state.priority,
            }),
        };


        fetch(api_url + '/ticket/update/' + this.props.tickets[this.props.selectedTicket].id, request)
            .then(handleRequestError)
            .then(() => {
                this.props.notify("Success! The ticket has been updated.");
                this.props.onTicketUpdate();
            }).catch((e) => {
            this.props.notify("Error! The ticket could not be updated.");
            console.log(e);
        })
    };

    render() {
        const ticket = this.props.tickets[this.props.selectedTicket];
        return (
            <div>
                {ticket !== undefined &&
                <Paper>
                    <div style={{textAlign: "left"}}>
                        <Row>
                            <Col xs="12" style={{textAlign: "center"}}>
                                <h3 className="text-uppercase">Ticket Details</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" xsPush={1}>
                                <p><b>ID: </b>{ticket.id}</p>
                                <p><b>Title: </b>{toTitle(ticket.issue)}</p>
                                <p><b>Priority: </b>{priorityToString(this.state.priority)}</p>
                                <p><b>Ticket Status: </b>{this.state.status}</p>
                            </Col>
                            <Col mdPush={1} xs="12">
                                <IconButton
                                    onClick={this.props.onAddComment}
                                    tooltip="Add Comment"
                                    tooltipPosition="bottom-center"
                                ><CommentIcon/></IconButton>
                            </Col>
                            <Col xs="10" xsPush={1} xsPull={1}>
                                <AutoComplete
                                    hintText={this.state.reassignField}
                                    dataSource={this.props.support}
                                    dataSourceConfig={{
                                        text: 'email',
                                        value: 'id'
                                    }}
                                    onUpdateInput={this.handleAutocompleteChange}
                                    onNewRequest={this.updateTechUser}
                                    floatingLabelText="Assign to"
                                    fullWidth={true}
                                    filter={AutoComplete.fuzzyFilter}
                                    maxSearchResults={5}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="10" xsPush={1} xsPull={1}>
                                <Label bsStyle="secondary">Priority</Label>

                                <SelectField
                                    value={this.state.priority}
                                    onChange={this.handlePriorityChange}
                                    floatingLabelText="Priority"
                                    style={{textAlign: "left"}}

                                >
                                    <MenuItem value={0} primaryText="Low"/>
                                    <MenuItem value={1} primaryText="Medium"/>
                                    <MenuItem value={2} primaryText="High"/>
                                </SelectField>
                            </Col>
                        </Row>
                        <Row>
                            <Col xsPush={1} xspull={1} xs="10">
                                <Button className="pull-left" bsStyle="danger"
                                        onClick={this.props.onDeselectCallback}><span
                                    className="glyphicon glyphicon-back"/> Back
                                </Button>
                                <Button className="pull-right" bsStyle="success"
                                        onClick={this.pushChanges}>Assign</Button>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col xsPush={1} xspull={1} xs="10">
                                {this.state.comments.map((comment, i) =>

                                    (<div>
                                        <b>Comment </b><i>Sent on {comment.updated_at}</i>
                                        <p>{comment.contents}</p>
                                    </div>)
                                )}
                            </Col>
                        </Row>
                    </div>
                </Paper>
                }
            </div>
        )

    }

    handlePriorityChange = (e, t, value) => {
        this.setState({
            priority: value
        });
    };

    handleAutocompleteChange = (value) => {
        this.setState({
            reassignField: value
        })
    };
    updateTechUser = (value) => {
        this.setState({
            tech: value,
            status: "in progress"
        });
    }
}

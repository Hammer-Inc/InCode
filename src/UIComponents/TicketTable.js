import React, {Component} from "react/cjs/react.production.min";
import {Alert, Button, Table} from "react-bootstrap";
import Ticket from "./Ticket";
import Backdrop from "./Backdrop";
import {CircularProgress} from "material-ui";

export default class TicketTable extends Component {
    constructor(props) {
        super(props);
        this.state ={
            showClosedTickets: false,
        };
    }

    render() {
        const {tickets} = this.props;
        return (
            <div>
                {
                    tickets === null ? (<Backdrop><CircularProgress size={100} thickness={5}/></Backdrop>):
                    tickets.length < 1 ? (
                            <Alert>You have not been assigned any tickets.</Alert>
                        ) :
                        <Table responsive striped hover>
                            <thead>
                            <tr>
                                <th>Platform</th>
                                <th>Issue</th>
                                <th>Priority</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tickets.map((ticket, i) => {
                                return (<Ticket
                                        ticket={ticket}
                                        index={i}
                                        isSelected={this.props.selectedTicket === i}
                                        onClick={this.props.onSelectCallback}
                                        showClosed={this.props.showClosedTickets}
                                    />
                                )
                            })
                            }
                            </tbody>
                        </Table>
                }
            </div>
        )
    }

    toggleClosed=(v)=> {
        this.setState({
            showClosedTickets: v
        })

    }
}

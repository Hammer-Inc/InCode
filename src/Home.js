import React, {Component} from 'react';
import './App.css';
import {Card, CardHeader, CardText} from "material-ui";

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <br/>
                <Card>
                    <CardHeader
                        title="Welcome to Ticket Collector v1.0"
                        subtitle="Blog Update"
                    />
                    <CardText>
                        <p>
                            Hello and welcome to Ticket Collector, the new backend system form RMIT ITS.
                        </p>
                    </CardText>
                </Card>
            </div>
        );
    }
}

export default Home;
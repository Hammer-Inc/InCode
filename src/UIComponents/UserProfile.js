import React, {Component} from "react/cjs/react.production.min";
import {Avatar, Card, CardHeader, CardText} from "material-ui";

export default class UserProfile extends Component {


    render() {
        const name = this.props.login_info.name;
        const title = this.props.login_info.userType === "helpdesk" ? "Helpdesk Support" : "Technical Support";
        const email = this.props.login_info.email;
        return (
            <div>
                {this.props.authed && (
                    <Card>
                        <CardHeader
                            title={name}
                            subtitle={title}
                            avatar={<Avatar>{name[0]}</Avatar>}
                        />
                        <CardText>
                            <p>Email Address: {email}</p>
                        </CardText>
                    </Card>
                )}
            </div>
        )

    }
}

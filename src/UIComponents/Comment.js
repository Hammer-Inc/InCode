import {NavigationCheck, NavigationClose} from "material-ui/svg-icons/index";
import React, {Component} from "react/cjs/react.production.min";
import {CircularProgress, Dialog} from "material-ui";
import {Alert, Button, FormControl} from "react-bootstrap";
import {api_url, handleRequestError} from "../config/api";

export default class CommentBox extends Component {

    state = {
        comment: null,
        title: "",
        user_id: null,
        inProgress: false,
        failure: null,
    };
    constructor(props) {
        super(props);
        this.setState({
            comment: null,
            title: "",
            user_id: null,
            inProgress: false,
            failure: null,
        });
    }

    submitComment = () => {
        this.setState({
            inProgress: false,
        });
        let request = {
            method: 'POST',
            headers: {
                "Authorization": "Basic " + btoa(this.props.login_info.email + ":" + this.props.login_info.apiToken),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: this.state.comment,
                report_id: this.props.id,
                user_id: this.props.login_info.id,
            })
        };

        fetch(api_url + '/ticket/' + this.props.id + "/comment", request)
            .then(handleRequestError)
            .then(() => {
                this.setState({
                    inProgress: false,
                });
                this.props.notify("Comment submitted successfully");
                this.props.close();
            }).catch((e) => {
            this.setState({
                failure: true,
                inProgress: false,
            });

        })
    };

    render(){
        const onSend = this.state.inProgress;
        const onFail = this.state.failure;
        const dialogButtons = [
            (<Button onClick={this.props.close}><NavigationClose/> Close</Button>),
            (<Button onClick={this.submitComment}><NavigationCheck/> Save</Button>),
        ];
        return (
            <Dialog
                title={"Add a new Comment"}
                modal={true}
                actions={dialogButtons}
                open={this.props.show}
            >
                {onSend ?
                    (<CircularProgress size={80} thickness={5}/>) :
                    (

                        <div>
                            {onFail && (
                                <Alert bsStyle="danger" onDismiss={() => {this.setState({failure:null});}}>
                                    <strong>Error!</strong> Could not submit your comment.
                                </Alert>

                            )}
                            <FormControl
                                type="text"
                                placeholder="Title"
                                onChange={this.updateTitle}
                            />
                            <FormControl componentClass="textarea" placeholder="Comment Text"
                                         onChange={this.updateComment}/>
                        </div>
                    )}

            </Dialog>
        )
    }


    updateComment = (e) => {
        this.setState({
            comment: e.target.value
        })
    };
}
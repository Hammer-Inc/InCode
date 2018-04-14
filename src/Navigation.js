import React, {Component} from "react/cjs/react.production.min";

import {AppBar, Drawer, IconButton, Paper} from "material-ui";
import {NavigationClose, NavigationMenu} from "material-ui/svg-icons/index";
import Backdrop from "./Components/Backdrop"
import CodewordInput from "./Components/CodewordInput";
import PropTypes from "prop-types";
import CodewordOutput from "./Components/CodewordOutput";

export default class Navigation extends Component {
    static propTypes = {
        doUpdate: PropTypes.func,
        information: PropTypes.object

    };

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            input_state: {
                data: "",
                type: "binary"
            },
        };
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleInputChange = (newState) => {
        this.setState({input_state: newState});
    };

    // Cascade update at correct levels
    doUpdate = (newEnv) => {
        this.handleInputChange(newEnv["input"]);
        this.setState({
            open: false,
        });
        this.props.doUpdate(newEnv);
    };

    render() {
        return (
            <nav>
                <AppBar
                    title={this.state.open ? "" : "Hamming Simulator"}
                    iconElementLeft={<IconButton onClick={this.handleToggle}><NavigationMenu/></IconButton>}
                />
                <Drawer open={this.state.open}>
                    <AppBar
                        title="Options"
                        titleStyle={{cursor: 'pointer'}}
                        onTitleTouchTap={this.handleToggle}
                        iconElementLeft={<IconButton onClick={this.handleToggle}><NavigationClose/></IconButton>}
                    />
                    <div
                        style={{margin: "10px"}}
                    >
                        <Paper
                            zDepth={1}
                            rounded={true}
                        >
                            <CodewordInput
                                doUpdate={this.doUpdate}
                                inputStateChange={this.handleInputChange}
                                input_state={this.state.input_state}
                                information={this.props.information}
                            />
                        </Paper>
                        <br/>
                        <Paper
                            zDepth={2}
                            rounded={true}
                        >
                            <CodewordOutput
                                doUpdate={this.doUpdate}
                                inputStateChange={this.handleInputChange}
                                input_state={this.state.input_state}
                                information={this.props.information}
                            />
                        </Paper>
                        {/*<CodewordOutput*/}
                        {/*doUpdate={this.doUpdate}*/}
                        {/*information={this.props.information}*/}
                        {/*/>*/}
                    </div>
                </Drawer>

                {this.state.open && (<Backdrop onClick={this.handleToggle}/>)}
            </nav>
        );
    }
}

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
// import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import {withRouter} from "react-router-dom"


function TabContainer(props) {
    return (
        // <Typography component="div" style={{ padding: 8 * 3 }}>
        <div>
            {props.children}
        </div>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function LinkTab(props) {
    return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        marginLeft: "auto",
        marginRight: "auto",
        width: 400,
    },
});

class ButtonNavigation extends React.Component {
    constructor(props){
        super(props)

        this.directToLogin =this.directToLogin.bind(this)
        this.directToRegister = this.directToRegister.bind(this)
    }
    state = {
        value: 0,

    };


    handleChange = (event, value) => {
        this.setState({ value });
    };
    
    directToRegister(){
        this.props.history.push("/register")
    }
    directToLogin(){
        this.props.history.push("/")
    }
    render() {
        const { classes } = this.props;
        const { value } = this.state;


        return (
                <div className={classes.root}>
                    <AppBar position="static">
                        <Tabs variant="fullWidth" value={value} onChange={this.handleChange}>
                            {/*<LinkTab
                                label="LOGIN"
                                // Route path={"/Login"}
                            />

                            <LinkTab
                                label="Register"
                                // onClick={this.directToRegister}
                            />*/}
                            <button onClick={this.directToLogin}>Login</button>
                            <button onClick={this.directToRegister}>Register</button>

                        </Tabs>
                    </AppBar>

                </div>

        );
    }
}

ButtonNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ButtonNavigation));

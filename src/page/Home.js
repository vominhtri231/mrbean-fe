import React from "react";
import {Slide} from 'react-slideshow-image';
import "../css/homepage.css"
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";

export default function Home(props) {

  const handleButtonLoginClick = () => {
    props.history.push("/login");
  };

  const properties = {
    duration: 3000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true
  };

  return <div style={{width: '100%', flexGrow: '1'}}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Welcome to Mr.Bean English
        </Typography>
        <div style={{position: 'absolute', right: 20}}>
          <Button style={{color: '#FFF'}} onClick={handleButtonLoginClick}>
            Login
          </Button>
        </div>
      </Toolbar>
    </AppBar>
    <Slide {...properties} style={{marginTop: 15}}>
      <div className="each-slide">
        <div id="slider0">
        </div>
      </div>
      <div className="each-slide">
        <div id="slider1">
        </div>
      </div>
      <div className="each-slide">
        <div id="slider2">
        </div>
      </div>
      <div className="each-slide">
        <div id="slider3">
        </div>
      </div>
    </Slide>
  </div>
}

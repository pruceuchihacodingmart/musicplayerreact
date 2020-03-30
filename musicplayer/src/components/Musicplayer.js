import React, { Component } from "react";
import "../CSS/Musicplayercss.scss";
import { GiPlayButton, GiPauseButton } from "react-icons/gi";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { store } from "../storeInitilize";
import { connect } from "react-redux";

class Musicplayer extends Component {
  constructor(props) {
    super(props);
    this.myInput = React.createRef();
    this.state = {
      play: false
    };
  }
  // handleposclick = (e)=>{
  //   let totalWidth = document.querySelector(".progress").offsetWidth;
  //   let currentSelected = e.offsetX;
  //   let total = (totalWidth - currentSelected)/100;
  //   console.log(total);
  // }

  // componentDidMount = (e) =>{
  //   window.addEventListener("click",this.handleposclick)
  // }
  componentDidMount() {
    document.querySelector(".progress").addEventListener("click",this.handleposclick)
  }


  handleclick = () => {
    store.dispatch({
      type: "playstate",
      songStatus: !this.props.album.songStatus
    });
  };

  handleposclick=async(e)=>{
    let totalWidth = document.querySelector(".progress").offsetWidth;
    let currentSelected = e.offsetX;
    let total = (currentSelected/totalWidth)*100;
    let ct = (total / 100) * this.props.album.duration;
    this.props.album.songReference.currentTime=ct
    await store.dispatch({
      type: "currentTime",
      currentTime: ct
    });
  }

  // componentDidMount=()=>{
  //   window.addEventListener("click",this.handleposclick)
  // }

  render() {
    return (
      <div className="box">
        <div className="theplayer">
          <MdNavigateBefore className="icons" />
          <GiPlayButton
            onClick={this.handleclick}
            className={this.props.album.songStatus ? "none" : "icons"}
          />
          <GiPauseButton
            onClick={this.handleclick}
            className={this.props.album.songStatus ? "icons" : "none"}
          />
          <MdNavigateNext className="icons" />
          <div className="progress">
            <div className="bar">
              <div
                ref={this.myInput}
                style={{
                  width:
                    (this.props.album.currentTime / this.props.album.duration) *
                      100 +
                    "%"
                }}
              ></div>
            </div>
          </div>
          <span className="time">
            {Math.ceil(this.props.album.currentTime)}/
            {Math.ceil(this.props.album.duration)}
          </span>
        </div>

        <div className="nowplaying">
          <span>NOW PLAYING: </span>
          <span id>
            {this.props.album.title} {this.props.album.album}
          </span>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    album: state.album
  };
};

export default connect(mapStateToProps)(Musicplayer);

import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import "../CSS/Mainsectioncss.scss";
import Addalbum from "./Addalbum";
import Addsongs from "./Addsongs";
import Viewsongs from "./Viewsongs";
import Musicplayer from "./Musicplayer";
import Queue from "./Queue";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosReturnRight, IoIosReturnLeft } from "react-icons/io";

class Mainsection extends Component {
  constructor() {
    super();
    this.state = {
      image: "",
      showaddalbums: false,
      showaddsongs: false,
      data: [],
      songsdata: [],
      key: null,
      showsongs: false,
      queuestatus: false
    };
  }

  //  functions

  handlefile = e => {
    let files = e.target.files[0];

    this.setState({
      image: files
    });
    // console.log(files);
    let formData = new FormData();
    formData.append("file", this.state.image);
    Axios.get(`http://localhost:8080/?image=${this.state.image}`).then(data => {
      // console.log(data);
    });
  };

  // handleOnClick = () => {
  //   store.dispatch({
  //     type: "add",
  //     title: "lucid dreams",
  //     album: "juice wrld",
  //     id: 4
  //   });
  // };

  // render

  componentDidMount = () => {
    this.getCallMake();
  };

  getCallMake = async () => {
    await Axios.post("http://localhost:8080/view/album").then(data => {
      // console.log("datum", data);
      this.setState({ data: data.data.rows });
    });
  };

  makeViewCall = id => {
    Axios.post("http://localhost:8080/songs/view", {
      aid: id
    }).then(data => {
      // console.log("datum", data);
      this.setState({ songsdata: data.data.rows });
      // console.log(this.state.songsdata)
    });
  };
  openclosequeue = () => {
    this.setState({ queuestatus: !this.state.queuestatus });
  };

  render() {
    const musicList = this.state.data.map((list, index) => {
      return (
        <div
          className="card"
          style={{
            marginLeft: "20px",
            marginBottom: "10px"
          }}
          key={index}
        >
          <div
            className="card-header"
            style={{ display: "inline-flex", justifyContent: "space-between" }}
          >
            <span
              className="textSpan"
              onClick={() => {
                this.setState({ showsongs: !this.state.showsongs });
                this.makeViewCall(list.aid);
              }}
            >
              {list.album}
            </span>
            <span
              className="addSpan"
              onClick={() => {
                this.setState({ showaddsongs: !this.state.showaddsongs });
                this.setState({ key: list.aid });
              }}
            >
              +
            </span>
          </div>
          <img
            style={{ height: "117px", cursor: "pointer" }}
            onClick={() => {
              this.setState({ showsongs: !this.state.showsongs });
              this.makeViewCall(list.aid);
            }}
            src={list.albumimage}
            alt="wait folks"
          />
        </div>
      );
    });

    return (
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "30px" }}>
          <h1 className="head">Music player</h1>
          <div>
            <div
              style={{ display: "flex", flexWrap: "wrap", marginRigth: "10px" }}
            >
              {musicList}
            </div>
          </div>

          <Addalbum
            showstate={this.state.showaddalbums}
            closeHandler={e => {
              this.setState({ showaddalbums: !this.state.showaddalbums });
            }}
            getCallMake={this.getCallMake}
          />
          <Addsongs
            showstate={this.state.showaddsongs}
            aid={this.state.key}
            closeHandler={e => {
              this.setState({ showaddsongs: !this.state.showaddsongs });
            }}
          />
          <Viewsongs
            queuestatus={this.state.queuestatus}
            queueviewhandler={e=>{
              this.setState({queuestatus:!this.state.queuestatus})
            }}
            showviewstate={this.state.showsongs}
            aid={this.state.key}
            songdata={this.state.songsdata}
            length={this.state.songsdata.length}
            ordernumber={this.handleorder}
            ordervalue={this.state.ordernumber}
            closeHandler={e => {
              this.setState({ showsongs: !this.state.showsongs });
            }}
          />
        </div>
        <div style={{ height: "20%" }}>
          <FiPlusCircle
            className="Show"
            onClick={() =>
              this.setState({ showaddalbums: !this.state.showaddalbums })
            }
          />
        </div>
        <Musicplayer style={{ position: "sticky" }} />
        <div>
          <div>
            <IoIosReturnLeft
              onClick={this.openclosequeue}
              className={this.state.queuestatus ? "none" : "Show"}
            />
          </div>
          <div>
            <IoIosReturnRight
              onClick={this.openclosequeue}
              className={this.state.queuestatus ? "Show" : "none"}
            />
          </div>
        </div>

        <Queue
          queuestatus={this.state.queuestatus}
          songdata={this.state.songsdata}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    musicList: state.Albums,
    ordernumber: state.ordernumber
  };
};

export default connect(mapStateToProps)(Mainsection);

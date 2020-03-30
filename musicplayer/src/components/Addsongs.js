import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
// import { store } from "../storeInitilize";
import axios from 'axios';
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

class Addsongs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songtitle: "",
      songalbum: "",
      songURL:"",
      progress:0
    };
  }

  onChanging = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async() => {
    // store.dispatch({
    //   type: "add",
    //   album: this.state.songalbum
    // });

    await axios
    .post("http://localhost:8080/addsong/songname", {
      albumName: this.state.songalbum,
      songPath: this.state.songURL,
      aid:this.props.aid,
      songtitle:this.state.songtitle
    })
    .then(async res => {
      // console.log(res)
      // this.props.getCallMakeSong();
    });
  };

  handleUploadStart = () => {
    this.setState({ progress: 0 });
  };

  handleUploadSuccess = filename => {
    this.setState({
      // songtitle: filename,
      progress: 100
    });
    firebase
      .storage()
      .ref("songs")
      .child(filename)
      .getDownloadURL()
      .then(url =>
        this.setState({
          songURL: url
        })
      );
  };
handleProgress=progress=>{
this.setState({
  progress:progress
})
}
    
  // handlefile=(e)=>{
  //   let files = e.target.files[0];

  //   this.setState({
  //     songpath: files.name
  //   });
  //   console.log(files.name);
  // }
  

  render() {
    // console.log(this.state)
    return (
      <div className="mainme">
        <Modal
          show={this.props.showstate}
          style={{ marginTop: "15%", marginLeft: "2%" }}
        >
          <Modal.Header style={{ backgroundColor: "#202124", color: "white" }}>
            <Modal.Title>ADD SONGS</Modal.Title>
            <Button variant="secondary" onClick={this.props.closeHandler}>
              X
            </Button>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={e => {
                e.preventDefault();
                this.props.closeHandler();
                this.handleSubmit();
              }}
            >
              <input
                type="text"
                name="songtitle"
                placeholder="title:"
                onChange={this.onChanging}
                style={{
                  borderStyle: "inset",
                  width: "100%",
                  margin: "0 0 2% 0"
                }}
              />
              <input
                type="text"
                name="songalbum"
                placeholder="album:"
                onChange={this.onChanging}
                style={{
                  borderStyle: "inset",
                  width: "100%",
                  margin: "0 0 2% 0"
                }}
              />
              <FileUploader
                accept="audio/*"
                name="songtitle"
                storageRef={firebase.storage().ref("songs")}
                onUploadStart={this.handleUploadStart}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
              />
              {/* <input type="file" name="file" onChange={this.handlefile} /> */}

              <Modal.Footer>
              <label>Progress:</label>
                <p>{this.state.progress}</p>
                <div className="submit">
                  <button variant="primary">ADD</button>
                </div>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default connect()(Addsongs);

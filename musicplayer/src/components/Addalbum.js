import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
// import { store } from "../storeInitilize";
// import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
import axios from "axios";
import config from "../firebase-config";
import '../CSS/Addalbumcss.scss'

firebase.initializeApp(config);

const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};

class Addalbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songalbum: "",
      imagename: "",
      imageURL: "",
      progress: 0
    };
  }

  onChanging = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async () => {
    await axios
      .post("http://localhost:8080/addalbum/albumname", {
        albumName: this.state.songalbum,
        albumImagePath: this.state.imageURL
      })
      .then(async res => {
        this.props.getCallMake();
      });
  };

  handlefile = e => {
    let files = e.target.files[0];

    // console.log("asd",btoa(files))
    this.setState({
      imagename: files
    });
    getBase64(files).then(base64 => {
      this.setState({ imageURL: base64 });
    }, console.log(this.state));

    // console.log(files);
  };

  handleUploadStart = () => {
    this.setState({ progress: 0 });
  };

  handleUploadSuccess = filename => {
    this.setState({
      imagename: filename,
      progress: 100
    });
    firebase
      .storage()
      .ref("albumimages")
      .child(filename)
      .getDownloadURL()
      .then(url =>
        this.setState({
          imageURL: url
        })
      );
  };
  handleProgress = progress => {
    this.setState({
      progress: progress
    });
  };

  render() {
    // console.log(this.state);
    return (
      <div className="mainme">
        <Modal
          show={this.props.showstate}
          style={{ marginTop: "8%", marginLeft: "2%" }}
        >
          <Modal.Header style={{ backgroundColor: "#202124", color: "white" }}>
            <Modal.Title>ADD album</Modal.Title>
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
                className="inputclass"
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
              <input type="file" style={{borderRadius:"25px"}} name="file" onChange={this.handlefile} />
              {/* <FileUploader
                accept="image/*"
                name="imagename"
                storageRef={firebase.storage().ref("albumimages")}
                onUploadStart={this.handleUploadStart}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}types
              /> */}

              <label>Image:</label>
              {this.state.imagename && (
                <img
                  style={{
                    height: "248px",
                    width: "479px"
                  }}
                  alt="Loading...."
                  src={this.state.imageURL}
                />
              )}
              <Modal.Footer>
                <label>Progress:</label>
                <p>{this.state.progress}</p>
                <div className="submit">
                  <button style = {{borderRadius:'25px'}}variant="primary">ADD</button>
                </div>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default connect()(Addalbum);

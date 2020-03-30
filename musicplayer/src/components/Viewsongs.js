import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import "../CSS/viewsongcss.scss";
import { store } from "../storeInitilize";
import { MdQueueMusic } from "react-icons/md";
import { GiPlayButton, GiPauseButton } from "react-icons/gi";
import { MdPlayCircleOutline } from "react-icons/md";

var nextsonginqueue = 0;
var queueview = 0;
var n = 0;

class Viewsongs extends Component {
  constructor() {
    super();
    this.songReference = null;
    this.currentSong = null;
    this.state = {
      data: [],
      index: -1,
      queuecounter: 0
    };
  }

  playAudio = ref => {
    ref.play().then(async () => {
      // console.log(ref.currentTime);
      await store.dispatch({
        type: "currentTimeAndDuration",
        currentTime: this.props.album.songReference.currentTime,
        duration: this.props.album.songReference.duration
      });

      if (this.state.queuecounter !== 0) {
        if (
          Math.ceil(this.props.album.songReference.currentTime) ===
          Math.ceil(this.props.album.songReference.duration)
        ) {
          // eslint-disable-next-line
          await this.props.queue.map((list, index) => {
            debugger
            // console.log("sdsss",list.order)
            if (index === nextsonginqueue) {
              this.toplay(
                list.queuelinks,
                list.index,
                list.queuesongs,
                list.queuealbum,
                list.id
              );

              store.dispatch({
                type: "playstate",
                songStatus: !this.props.album.songStatus
              });
            }
          });
          nextsonginqueue++;
          this.setState({ queuecounter: this.state.queuecounter - 1 });
        }
      } else if (
        Math.ceil(this.props.album.songReference.currentTime) ===
        Math.ceil(this.props.album.songReference.duration)
      ) {
        let len =
          this.state.index + 1 < this.props.songdata.length
            ? this.state.index + 1
            : 0;
        let i = this.props.songdata[len];
        await this.toplay(i.songlink, len, i.songs, i.album, i.sid);
        store.dispatch({
          type: "playstate",
          songStatus: !this.props.album.songStatus
        });
      }

      // this.setState({ play: !this.state.play });
      //  console.log("playstate ", this.state.play)
    });
  };

  pauseAudio = ref => {
    ref.pause();
  };

  toplay = async (songlink, index, title, album, id) => {
    this.setState({ index: index });
    // if (this.currentSong !== songlink) {
    // this.songReference = new Audio(songlink);
    // this.currentSong = songlink;

    if (this.props.album.currentSong !== songlink) {
      // this.songReference = new Audio(songlink)
      this.props.album.songReference.src = songlink;
      {
        let songDetails = {
          songReference: this.props.album.songReference,
          currentSong: songlink,
          title: title,
          album: album,
          id: id,
          songStatus: !this.props.album.songStatus
        };

        store.dispatch({
          type: "playstate",
          songStatus: !this.props.album.songStatus
        });
        store.dispatch({
          type: "playsong",
          songDetails
        });
      }
    } else {
      store.dispatch({
        type: "playstate",
        songStatus: !this.props.album.songStatus
      });
    }
    if (this.props.album.songStatus) {
      store.dispatch({
        type: "playstate",
        songStatus: !this.props.album.songStatus
      });
    }
    // }
    //  this.checkState(this.props.music.songReference);
  };

  // handlefirstqueuesong = () => {
  //   if (
  //     this.props.album.songReference.src === "" ||
  //     this.props.album.songReference.src === null
  //   ) {
  //     this.props.album.songReference.src = this.props.queue[0].queuelinks;
  //     let songDetails = {
  //       songReference: this.props.album.songReference,
  //       currentSong: this.props.queue[0].queuelinks,
  //       title: this.props.queue[0].queuesongs,
  //       album: this.props.queue[0].queuealbum,
  //       id: this.props.queue[0].id,
  //       songStatus: !this.props.album.songStatus
  //     };

  //     store.dispatch({
  //       type: "playsong",
  //       songDetails
  //     });
  //   }
  // };

  componentWillReceiveProps(props) {
    // if (this.props.queue.length > 0) {
    //   this.handlefirstqueuesong();
    // }
    if (props.album && props.album.songReference) {
      this.checkState(props.album.songReference, props.album.songStatus);
    }
  }

  checkState = (songReference, status) => {
    if (!status) {
      this.pauseAudio(songReference);
    } else {
      this.playAudio(songReference);
    }
  };

  handlequeueclick = async (songlink, index, title, album, id) => {
    this.setState({ queuecounter: this.state.queuecounter + 1 });
    await store.dispatch({
      type: "addtoqueue",
      queuelinks: songlink,
      queuesongs: title,
      queueindex: index,
      id: id,
      queuealbum: album
    });
    if (queueview === 0) {
      this.props.queueviewhandler();
      queueview++;
    }
  };

  addallsongshandler = () => {
    // eslint-disable-next-line
    this.props.songdata.map((items, index) => {
      let i = this.state.queuecounter;
      this.setState({ queuecounter: index + i + 1 });
      store.dispatch({
        type: "addtoqueue",
        queuelinks: items.songlink,
        queuesongs: items.songs,
        queueindex: index,
        id: items.sid,
        queuealbum: items.album
      });
    });

    if (queueview === 0) {
      this.props.queueviewhandler();
      queueview++;
    }
  };

  // toplay = songlink => {
  //   let { songLinks } = this.state;
  //   let refe = this;
  //   let index = -1;
  //   songLinks.map((data, ind) => {
  //     if (data.link === songlink)
  //     index = ind;
  //   });

  //   // let index = songLinks.indexOf(songlink);
  //   if (index >= 0) {
  //     callAction(songLinks[index].songRef);
  //   } else {
  //     let audioRef = new Audio(songlink);
  //     songLinks.push({
  //       link: songlink,
  //       songRef: audioRef
  //     });
  //     this.setState({ songLinks }, () => {
  //       callAction(audioRef);
  //     });
  //   }

  //   function callAction(ref) {
  //     if (refe.state.play) {
  //       refe.playAudio(ref);
  //     } else {
  //       refe.pauseAudio(ref);
  //     }
  //   }

  // let ref = this;
  // if (this.state.play) {
  //   audio.play().then(() => setValue());
  // } else {
  //   audio.pause();
  //   setValue();
  // }
  // function setValue() {
  //   ref.setState({play: !ref.state.play})
  // }
  // };

  render() {
    const musicList = this.props.songdata.map((list, index) => {
      return (
        <div className="albums" style={{ marginRight: "20px" }} key={index}>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <span>{list.songs}</span>

              <div>
                <GiPlayButton
                  className={
                    this.props.album.songStatus &&
                    this.state.index === index &&
                    this.props.album.title === list.songs
                      ? "none"
                      : "play"
                  }
                  onClick={() =>
                    this.toplay(
                      list.songlink,
                      index,
                      list.songs,
                      list.album,
                      list.sid
                    )
                  }
                />
                <GiPauseButton
                  className={
                    this.props.album.songStatus &&
                    this.state.index === index &&
                    this.props.album.title === list.songs
                      ? "play"
                      : "none"
                  }
                  onClick={() => this.toplay(list.songlink, index)}
                />
                <MdQueueMusic
                  className="play"
                  onClick={() =>
                    this.handlequeueclick(
                      list.songlink,
                      index,
                      list.songs,
                      list.album,
                      list.sid
                    )
                  }
                />

                {/* <button
                  onClick={() => this.toplay(list.songlink,index)}
                  className={this.state.play && (this.state.index===index)? "pause" : "play"}
                ></button> */}
              </div>
            </div>
          </div>
          <hr />
        </div>
      );
    });

    return (
      <div className="mainme">
        <Modal
          show={this.props.showviewstate}
          style={{ marginTop: "15%", marginLeft: "2%" }}
        >
          <Modal.Header style={{ backgroundColor: "#202124", color: "white" }}>
            <Modal.Title>Songs List</Modal.Title>
            <MdPlayCircleOutline
              className="playall"
              onClick={this.addallsongshandler}
            />

            <Button variant="secondary" onClick={this.props.closeHandler}>
              X
            </Button>
          </Modal.Header>
          <Modal.Body>{musicList}</Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    album: state.album,
    queuecounter: state.queuecounter,
    queue: state.queue
  };
};

export default connect(mapStateToProps)(Viewsongs);

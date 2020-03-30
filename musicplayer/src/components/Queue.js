import React, { Component } from "react";
import "../CSS/Queuecss.scss";
import { connect } from "react-redux";
import { GiIvoryTusks } from "react-icons/gi";
import { store } from "../storeInitilize";
import Reorder, { reorder } from "react-reorder";

class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: []
    };
  }

  onReorder(event, previousIndex, nextIndex, fromId, toId) {
    store.dispatch({
      type: "deletequeue",
      queue: reorder(this.props.queue, previousIndex, nextIndex)
    });
  }

  deletequeuemusic = id => {
    let newQueue = this.props.queue.filter(index => index.id !== id);
    store.dispatch({
      type: "deletequeue",
      queue: newQueue
    });
  };

  componentWillReceiveProps(props) {
    if (props)
      this.setState({
        queue: props.queue || [{}]
      });
  }
  selectedsonglink = selectedsong => {
    console.log(selectedsong);
    this.props.album.songReference.src = selectedsong.queuelinks;
    let songDetails = {
      songReference: this.props.album.songReference,
      currentSong: selectedsong.queuelinks,
      title: selectedsong.queuesongs,
      album: selectedsong.queuealbum,
      id: selectedsong.id,
      songStatus: !this.props.album.songStatus
    };

    store.dispatch({
      type: "playsong",
      songDetails
    });
  };

  render() {
    // eslint-disable-next-line
    const musicList =
      this.state.queue.length !== 0
        ? this.state.queue.map((list, index) => {
            return (
              <div
                key={index}
                id="my-list"
                className={this.props.album.id === list.id ? "glow" : "normal"}
              >
                <span onClick={() => this.selectedsonglink(list)}>
                  {list.queuesongs}
                </span>
                <span style={{ left: "12px", position: "relative" }}>
                  <GiIvoryTusks
                    onClick={() => this.deletequeuemusic(list.id)}
                  />
                </span>
              </div>
            );
          })
        : [<div id="my-list">No Songs in the Queue</div>];
    return (
      <div style={{ textAlign: "center" }}>
        <div className={this.props.queuestatus ? "ssa" : "none"}>
          <h2>QUEUE</h2>
          <div>
            <Reorder onReorder={this.onReorder.bind(this)} reorderId="my-list">
              {musicList}
            </Reorder>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    album: state.album,
    queue: state.queue
  };
};

export default connect(mapStateToProps)(Queue);

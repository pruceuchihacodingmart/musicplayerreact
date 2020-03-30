const initState = {
  album: {
    songStatus: false,
    songReference: new Audio()
  },
  queue: [],
  ordernumber: 0
};

const rootReducer = (state = initState, action) => {
  // console.log(action);
  switch (action.type) {
    case "playstate": {
      return {
        ...state,
        album: { ...state.album, songStatus: action.songStatus }
      };
    }
    case "playsong": {
      return {
        ...state,
        album: action.songDetails
      };
    }
    case "currentTimeAndDuration": {
      return {
        ...state,
        album: {
          ...state.album,
          currentTime: action.currentTime,
          duration: action.duration
        }
      };
    }
    case "currentTime": {
      return {
        ...state,
        album: { ...state.album, currentTime: action.currentTime }
      };
    }
    case "addtoqueue": {
      return {
        ...state,
        queue: [
          ...state.queue,
          {
            queuesongs: action.queuesongs,
            queuelinks: action.queuelinks,
            queueindex: action.queueindex,
            id: action.id,
            queuealbum: action.queuealbum
          }
        ]
      };
    }
    case "deletequeue": {
      return {
        ...state,
        queue: action.queue
      };
    }

    case "ordernumber": {
      return {
        ordernumber: action.ordernumber
      };
    }
    default:
  }
  return state;
};

export default rootReducer;

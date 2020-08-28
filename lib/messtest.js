// ThreadsDirectBroadcastService


// async broadcastDirectMessage(userName, message) {
//     return asyncPipe(
//         this._getDestinationId,
//         this._getIgEntity('directThread'),
//         this._broadcastMessage(message)
//     )(userName);
// },

// const asyncPipe = (...promises) => promises.reduceRight((f, g) => (x) => g(x).then(f));
// const pipe = (...fns) => (x) => fns.reduce((accum, fn) => fn(accum), x);

// async _getDestinationId(userName) {
//     const userId = await this.igClient.user.getIdByUsername(userName);
//     return userId.toString();
// };

// _getIgEntity(directThread) {
//     return async (destinationId) => {
//       return this.igClient.entity[directThread]([await destinationId]);
//     }
// }

// broadcastDirectMessage(v0ldemar_01, '!!!!!')
//     .then((isSend) => console.log(isSend)))
//     .catch(console.log);




// ThreadsDirectService

function useDirect(requestDirectInbox, conversations) {
    const token = Cookies.get('t');
    const [currentThreadId, setCurrentThreadId] = useState(null);
    const requestDirectInboxCallback = useCallback(
      () => requestDirectInbox(token),
      [requestDirectInbox, token]
    );
  
    useEffect(() => { requestDirectInboxCallback() }, [requestDirectInboxCallback]);
    const [messages, setMessages] = useState([]);
    const [myId, setMyId] = useState(undefined);
  
    useEffect(() => {
      if (conversations && currentThreadId) {
        setMessages(conversations[currentThreadId].chat);
        setMyId(conversations[currentThreadId].my_id);
      };
    }, [conversations, currentThreadId]);
  
    return [currentThreadId, setCurrentThreadId, messages, myId, token];
}


function getThreadsDirectState() {
    let threadsDirectState;
    try { threadsDirectState = pages[currentThreadId].state }
    catch { threadsDirectState = undefined };
    return threadsDirectState;
};

const threadsDirectState = getThreadsDirectState();


getThreadDirectPage(threadId, threadsDirectState, account)
    .then((threadDirectPage) => console.log({ ...threadDirectPage }))


async getThreadDirectPage(threadId, state) {
    return pipe(
        _getThreadById,
        _deserialize(state),
        _getThreadItems
    )(threadId);

_getThreadById(thread_id) {
    return igClient.feed.directThread({ thread_id });
};

_deserialize(state) => (thread) => {
    let isDeserialized = false;
    try {
        if (typeof state === 'string') {
        thread.deserialize(state);
        } else {
        thread.deserialize(JSON.parse(state));
        };
        isDeserialized = true;
    } catch (error) {
        console.log('\x1b[36m', error);
    };
    return { thread, isDeserialized };
},    

async _getThreadItems({ thread, isDeserialized }) {
    const items = createChat(await thread.items());
    const state = thread.serialize();
    if (!isDeserialized) {
      return ({ items: [], state });
    }
    return ({ items, state });
},
'use strict';
const getChatItems = function (chatsFeed) {    
  return new Promise((resolve, reject) => {      
    chatsFeed.items().then(resolve).catch(reject);
  });
};
// // const getChat = function (chatId) {
// //   const thread = igClient.entity.directThread();
// //   return new Promise((resolve, reject) => {
// //     const threadF = igClient.feed.directThread(thread);
// //     threadF.cursor = undefined;
// //     threadF.id = chatId;
// //     threadF.request().then((response) => resolve(response.thread)).catch(reject);
// //   });
// // };

// let threadFeed;
// const getOlderMessages = function (thread, chatId) {
//   const needsNewThreadFeed = !thread || thread.thread_id !== chatId;

//   const getOlderMessages = (thread, resolve) => {
//     if (!needsNewThreadFeed && !threadFeed.isMoreAvailable()) {
//       //there aren't any older messages
//       resolve({ thread, messages: [] });
//     } else {
//       threadFeed.items().then((messages) => {
//         resolve({ thread, messages });
//       });
//     }
//   };
//   return new Promise((resolve) => {
//     if (needsNewThreadFeed) {
//       const feed = igClient.feed.directInbox();
//       feed.items().then((directChats) => {
//         const thread = directChats.find(chat => chat.thread_id === chatId);
//         threadFeed = igClient.feed.directThread(thread);
//         getOlderMessages(thread, resolve);
//       });
//     } else {
//       getOlderMessages(thread, resolve);
//     }
//   });
// };
// const deleteChat = function (chatId) {
//   return new Promise((resolve, reject) => {
//     const thread = igClient.entity.directThread(chatId);
//     thread.hide(chatId).then(resolve).catch(reject);
//   });
//   };
  
// const sendNewChatMessage = function (message, recipients) {
//   return new Promise((resolve, reject) => {
//     const directThread = igClient.entity.directThread(recipients);
//     directThread.broadcastText(message).then(resolve).catch(reject);
//   });
// };
  
// const sendMessage = function (message, chatId) {
//   return new Promise((resolve, reject) => {
//     const directThread = igClient.entity.directThread(chatId);
//     directThread.broadcastText(message).then(resolve).catch(reject);
//   });
// };
  
// const searchUsers = function (search) {
//   return new Promise((resolve, reject) => {
//     igClient.user.search(search).then(resolve).catch(reject);
//   });
// };
  
// const uploadImage = (filePath, recipients) => {
//     return new Promise((resolve, reject) => {
//       const directThread = igClient.entity.directThread(recipients);
//       readFileAsync(filePath).then((buffer) => {
//         directThread.broadcastPhoto({
//           file: buffer,
//         }).then(resolve).catch(reject);
//       }).catch(reject);
//     });
// }
  
// const uploadVideo = (filePath, recipients) => {
//     return new Promise((resolve, reject) => {
//       const directThread = igClient.entity.directThread(recipients);
//       readFileAsync(filePath).then((buffer) => {
//         directThread.broadcastVideo({
//           video: buffer,
//         }).then(resolve).catch(reject);
//       }).catch(reject);
//     });
// }
  
// const uploadAudio = (filePath, recipients) => {
//     return new Promise((resolve, reject) => {
//       const directThread = igClient.entity.directThread(recipients);
//       readFileAsync(filePath).then((buffer) => {
//         directThread.broadcastVoice({
//           file: buffer,
//         }).then(resolve).catch(reject);
//       }).catch(reject);
//     });
// }
  
// const uploadFile = function (filePath, fileType, recipients) {
//     if (fileType === 'image') {
//       return uploadImage(filePath, recipients);
//     }
//     if (fileType === 'video') {
//       return uploadVideo(filePath, recipients);
//     }
//     if (fileType === 'audio') {
//       return uploadAudio(filePath, recipients);
//     }
// };
  
// const seen = function (thread) {
//   const { thread_id } = thread;
//   const { item_id } = thread.items[0];
//   const directThread = igClient.entity.directThread(thread_id);
//   directThread.markItemSeen(item_id);
// }; 
 
// const getUser = function (userId) {
//   return new Promise((resolve, reject) => {
//     igClient.user.info(userId).then(resolve).catch(reject);
//   });
// };
  
const getPresence = function (igClient) {
  return new Promise((resolve, reject) => {
    igClient.direct.getPresence().then(resolve).catch(reject);
  });
};

export { getChatItems, getPresence }
  
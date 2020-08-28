'use strict';
import * as message from './message.js';
let chatListTimeoutObj;
let igClient; 

async function getChatList (igClient) {
  const chatsFeed = igClient.feed.directInbox();    
  let allChats = [];
  do {
    try {     
      let chats = await message.getChatItems(chatsFeed); 
      allChats = [...allChats, ...chats];        
      if (chatListTimeoutObj) { 
          clearTimeout(chatListTimeoutObj);
      }                        
      chatListTimeoutObj = setTimeout(() => getChatList(igClient), 10000);
    }
    catch (e) {
      console.log(e)
      setTimeout(getChatList, 60000);
    }  
  } while (chatsFeed.isMoreAvailable())  ;
  const presenceInfo = await message.getPresence(igClient);     
  for (const chat in allChats) {
    if (allChats[chat].users.length === 1 && Object.prototype.hasOwnProperty.call(presenceInfo.user_presence, allChats[chat].users[0].pk)) {
      allChats[chat].presence = presenceInfo.user_presence[allChats[chat].users[0].pk];
      //console.log('presenceInfo', formatTime(allChats[chat].presence.last_activity_at_ms), allChats[chat].users[0].username);
    }
  } 
  //console.log(allChats);
  //..((allChats.map((chat) => chat.users)).map((elem) => elem.map((el) => el.username)).forEach((item) => console.log(item.toString())));
  return allChats;  
}
export { getChatList };

// let chatTimeoutObj;
// let messagesThread;

// // function getChat (id) {  
// //   if (messagesThread && messagesThread.thread_id != id) {
// //     messagesThread = null;
// //   }
// //   message.getChat(id).then((chat) => {
// //     if (chatTimeoutObj) {
// //       clearTimeout(chatTimeoutObj);
// //     }
// //     chatTimeoutObj = setTimeout(getChat, 10, id);
// //   }).catch(() => setTimeout(getChat, 60000, id));
// // } 
  
function deleteChat (id) {
  clearTimeout(chatListTimeoutObj);
  instagram.deleteChat(id).then(()=> {      
    console.log(id);
  }).catch(() => {
    getChatList();
  });
}   

message.getOlderMessages(messagesThread, id)
  .then((data) => {
    messagesThread = data.thread;        
});
  
async function sendMessage (message, accounts, chatId, trackerKey) { 
  const isNewChat = !chatId;
  let users = accounts.map((account) => account.pk);
  //ipcRenderer.send('message', { message, isNewChat, users, chatId, trackerKey });
  if (isNewChat) {
    await message.sendNewChatMessage(message, users);
  } else {
    await message.sendMessage(message, chatId);
  }
  console.log(trackerKey);
}

function submitMessage (chat, message) {  
  const sendingAt = new Date();
  const tackerKey = sendingAt.getTime();
  if (message.trim()) {
    sendMessage(message, chat.users, chat.thread_id, tackerKey);   
  }
}
 
 
//   // electron.ipcMain.on('upload', (_, data) => {
//   //   const sendTo = data.isNewChat ? data.recipients : data.chatId;
//   //   const { type } = data;
//   //   instagram.uploadFile(data.filePath, type, sendTo)
//   //     .then((chat) => getChat(null, chat.thread_id))
//   //     .catch(() => mainWindow.webContents.send('upload-error', { chatId: data.chatId, type}));
//   // });
  
//   // electron.ipcMain.on('searchUsers', (_, search) => {
//   //   message.searchUsers(search).then((users) => {
      
//   //   });
//   // });
  
//   // electron.ipcMain.on('markAsRead', (_, thread) => {
//   //   instagram.seen(thread);
//   // });
  
  
  
  
  
 
  
  
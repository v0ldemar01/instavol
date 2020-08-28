'use strict';
const { SkywalkerSubscriptions, GraphQLSubscriptions } = require('instagram_mqtt/dist/realtime/subscriptions');
const getConnectConfig = async (igClient) => ({
    graphQlSubs: [        
        GraphQLSubscriptions.getAppPresenceSubscription(),
        GraphQLSubscriptions.getZeroProvisionSubscription(igClient.state.phoneId),
        GraphQLSubscriptions.getDirectStatusSubscription(),
        GraphQLSubscriptions.getDirectTypingSubscription(igClient.state.cookieUserId),
        GraphQLSubscriptions.getAsyncAdSubscription(igClient.state.cookieUserId),
    ],    
    skywalkerSubs: [
        SkywalkerSubscriptions.directSub(igClient.state.cookieUserId),
        SkywalkerSubscriptions.liveSub(igClient.state.cookieUserId)
    ],    
    irisData: await igClient.feed.directInbox().request(),    
})
const subscription = (igClient) => ({
    on(event, handler) {
        igClient.realtime.on(event, handler);
    }
})
const logEvent = name => data => {    
    console.log(name, data);
}

exports.realTimeClient = async (igClient) => {
    const subscribe = subscription(igClient);
    // subscribe.on('receive', (topic, messages) => {
    //     console.log('receive', topic, messages);
    // });
    subscribe.on('direct', logEvent('direct'));   
    subscribe.on('message', logEvent('messageWrapper'));    
    subscribe.on('realtimeSub', logEvent('realtimeSub'));    
    subscribe.on('error', console.error);
    subscribe.on('close', () => console.error('RealtimeClient closed'));
    const connectSettings = await getConnectConfig(igClient);
    await igClient.realtime.connect(connectSettings);
    
    igClient.realtime.direct.sendForegroundState({
        inForegroundApp: true,
        inForegroundDevice: true,
        keepAliveTimeout: 60,
    }).then(() => {
        console.log('connected');        
    });      
    
}

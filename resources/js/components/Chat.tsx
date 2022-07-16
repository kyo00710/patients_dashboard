/* Imports PubNub JavaScript and React SDKs to create and access PubNub instance accross your app. */
/* Imports the required PubNub Chat Components to easily create chat apps with PubNub. */
import React from "react";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { Chat, MessageList, MessageInput } from "@pubnub/react-chat-components";


// const currentChannel = "Default";
const theme = "light";

// @ts-ignore
function PatientChat(props) {
    /* Creates and configures your PubNub instance. Be sure to replace "myPublishKey" and "mySubscribeKey"
with your own keyset. If you wish, modify the default "myFirstUser" uuid value for the chat user. */
    const pubnub = new PubNub({
        publishKey: "pub-c-23731d1a-c0f4-4c71-b9e5-9dd3ce93d068",
        subscribeKey: "sub-c-03afae69-f9e6-451c-b831-da82dc59227d",
        uuid: props.chat_uuid ?? 'default',
    });

    let currentChannel = props.chat_channel;


    console.log(currentChannel);
    console.log(props.chat_uuid);

    return (
        <PubNubProvider client={pubnub}>
            {/* PubNubProvider is a part of the PubNub React SDK and allows you to access PubNub instance
      in components down the tree. */}
            <Chat {...{ currentChannel, theme }}>
                {/* Chat is an obligatory state provider. It allows you to configure some common component
        options, like the current channel and the general theme for the app. */}
                <MessageList />
                <MessageInput />
            </Chat>
        </PubNubProvider>
    );
}

export default PatientChat;

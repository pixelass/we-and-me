import { MessageEvent } from "pubnub";
import { usePubNub } from "pubnub-react";
import { useCallback, useEffect, useState } from "react";
import { Except } from "type-fest";
import { v4 } from "uuid";

export const userId = v4();

export interface Payload {
	host?: string;
	time?: number;
}

export interface Message {
	action: {
		type: "counter" | "host";
		payload: Payload;
	};
	timestamp;
}

export interface ReceivedMessage extends Message {
	senderId: string;
}

export interface PubNubMessageEvent extends Except<MessageEvent, "message"> {
	message: ReceivedMessage;
}

export interface UsePubnubMessagingProps {
	channel?: string;
	onMessage?(message: ReceivedMessage, timetoken: string): void;
}
export const usePubnubMessaging = ({ channel, onMessage }: UsePubnubMessagingProps) => {
	const pubnub = usePubNub();
	const [message, setMessage] = useState<Message | null>(null);

	const broadcast = useCallback((message: Message) => {
		setMessage(message);
	}, []);

	const handleMessage = useCallback(
		(event_: PubNubMessageEvent) => {
			const { message, timetoken } = event_;
			if (message) {
				onMessage(message, timetoken);
			}
		},
		[onMessage]
	);

	const sendMessage = useCallback(
		(message: ReceivedMessage) => {
			if (message && channel) {
				void pubnub.publish({ channel, message });
			}
		},
		[pubnub, channel]
	);

	useEffect(() => {
		if (!channel) {
			return;
		}

		const listener = { message: handleMessage };
		const subscription = { channels: [channel] };
		pubnub.addListener(listener);
		pubnub.subscribe(subscription);

		return () => {
			pubnub.removeListener(listener);
			pubnub.unsubscribe(subscription);
		};
	}, [pubnub, channel, handleMessage]);

	useEffect(() => {
		sendMessage({ senderId: userId, ...message });
	}, [message, sendMessage]);

	return {
		broadcast,
	};
};

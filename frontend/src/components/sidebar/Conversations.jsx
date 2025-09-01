// STARTER CODE SNIPPET
import React from 'react';
import Conversation from "./Conversation";
import { getRandomEmoji } from "../../utils/emojis";
import useGetConversations from "../../hooks/useGetConversations";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	console.log("CONVERSATION: ", conversations);
	return (
		<div className='py-2 flex flex-col overflow-auto'>

		  {conversations.map((conversation, idx) => (
		  <Conversation
			  key={conversation._id}
			  conversation={conversation}
			  emoji={getRandomEmoji()}
			  lastIdx={idx === conversations.length - 1}
		  />
		))}
			
		{loading ? <span className='loading loading-spinner self-center mt-4'></span> : null}
		</div>
	);
};
export default Conversations;


// STARTER CODE SNIPPET
// import Conversation from "./Conversation";

// const Conversations = () => {
// 	return (
// 		<div className='py-2 flex flex-col overflow-auto'>
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 		</div>
// 	);
// };
// export default Conversations;
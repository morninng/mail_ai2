function ShowConversationVM(){
	var self = this;
	self.message_array = ko.observableArray([
		{message:"this is AI comment",speaker_class:"chat_msg_other", name:"AI"},
		{message:"this is your comment",speaker_class:"chat_msg_own", name:"you"}
	]);

}



ShowConversationVM.prototype.push_own_message = function(message_val){
	var self = this;
	var obj = {message:message_val,speaker_class:"chat_msg_own", name:"you"};
	self.message_array.push(obj);

}

ShowConversationVM.prototype.push_ai_message = function(message_val){
	
	var self = this;
	var obj = {message:message_val,speaker_class:"chat_msg_other", name:"AI"};
	self.message_array.push(obj);

}
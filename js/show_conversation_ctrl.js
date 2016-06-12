function ShowConversationCtrl(){
	var self = this;

}


ShowConversationCtrl.prototype.initialize = function(){

	var self = this;
	self.show_conversation_vm = new ShowConversationVM();
	ko.applyBindings(self.show_conversation_vm, document.getElementById('conversation_container') );

}



ShowConversationCtrl.prototype.push_ai_comment = function(message){
	var self = this;
	self.show_conversation_vm.push_ai_message(message);
  chat.scrollBottom();
}


ShowConversationCtrl.prototype.push_own_comment = function(message){

	var self = this;
	self.show_conversation_vm.push_own_message(message);
  chat.scrollBottom();
}
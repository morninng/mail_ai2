function MailSuggestVM(){
	var self = this;
	self.title = ko.observable('Bob');

	self.highlighted_from = 0;
	self.highlighted_to = 0;
	self.mail_sentence_array = ko.observableArray();
}

MailSuggestVM.prototype.initialize = function(){
	console.log("initialize Mail_suggest");
}

MailSuggestVM.prototype.set_context = function(context_array){

	var self = this;
	self.mail_sentence_array.removeAll();
	for(var i=0; i< context_array.length; i++){
		var obj = {line_class:"default", line_num:i+1, line_context:context_array[i]}
		self.mail_sentence_array.push(obj)
	}
	self.highlighted_to = context_array.length;
}


MailSuggestVM.prototype.set_start = function(start_num){

	var self = this;
	self.highlighted_from = Number(start_num);
	self.reset_hightlight();
}

MailSuggestVM.prototype.set_last = function(last_num){

	var self = this;
	self.highlighted_to = Number(last_num);
	self.reset_hightlight();
}




MailSuggestVM.prototype.reset_hightlight = function(){

	var self = this;
	var temporal_cache_array = self.mail_sentence_array().concat();
	self.mail_sentence_array.removeAll();

	for(var i=0; i< temporal_cache_array.length; i++){
		if((i+1)<self.highlighted_from){
			temporal_cache_array[i].line_class = "default";
		}else if((i+1) < (self.highlighted_to  +1)){
			temporal_cache_array[i].line_class = "selected";
		}else{
			temporal_cache_array[i].line_class = "default";
		}
		self.mail_sentence_array.push(temporal_cache_array[i]);
	}
}



MailSuggestVM.prototype.select_all = function(context_array){

	var self = this;
	self.mail_sentence_array.removeAll();
	self.highlighted_from = 0;
	self.highlighted_to = context_array.length;

	for(var i=0; i< context_array.length; i++){
		var obj = {line_class:"selected", line_num:i+1, line_context:context_array[i]}
		self.mail_sentence_array.push(obj)
	}

}



MailSuggestVM.prototype.extract_selected_sentences = function(){

	var self = this;
	var extracted_array = new Array();
	var temporal_cache_array = self.mail_sentence_array().concat();
	var extracted_obj_array = temporal_cache_array.slice(self.highlighted_from, self.highlighted_to+1);

	for(var i=0; i< temporal_cache_array.length; i++){
		if(temporal_cache_array[i].line_class == "selected"){
			extracted_array.push(temporal_cache_array[i].line_context);
		}
	}
	return extracted_array;

}
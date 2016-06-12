function MailSuggestCtrl(){

	var self = this;
	self.answer_candidate_array = new Array();
	self.current_answer_candidate = null;
	self.current_candidate_num = 0;
	self.current_candidate_sentence_array = new Array();
	self.loading_visible = true;
}


MailSuggestCtrl.prototype.initialize = function(){

	var self = this;
	self.mail_suggest_vm = new MailSuggestVM();
	ko.applyBindings(self.mail_suggest_vm, document.getElementById('suggested_mail') );
	self.mail_suggest_vm.initialize();

}



// function to be used on status: mail_suggestion


MailSuggestCtrl.prototype.set_mail_candidate = function(answer_candidate_array){

	var self = this;
	self.answer_candidate_array = answer_candidate_array;
	self.current_answer_candidate = answer_candidate_array[0];
	self.current_candidate_num = 0;
	self.show_suggested_mail();

}


MailSuggestCtrl.prototype.next = function(){

	var self = this;
	if(self.answer_candidate_array[self.current_candidate_num + 1]){
		self.current_candidate_num  = self.current_candidate_num + 1;
		self.current_answer_candidate = self.answer_candidate_array[self.current_candidate_num];
		self.show_suggested_mail();
		return true;
	}
	return false;
}


MailSuggestCtrl.prototype.show_suggested_mail = function(){

	var self = this;
	var mail_cocntext = self.current_answer_candidate.body[0];
	self.current_candidate_sentence_array = mail_cocntext.split('\n');
	self.mail_suggest_vm.set_context(self.current_candidate_sentence_array);

}


// function to be used on status: row_selection

MailSuggestCtrl.prototype.become_select_status = function(in_num){

	var self = this;
	//var from_line = 0;
	//var to_line = self.current_candidate_sentence_array.length;
	self.mail_suggest_vm.select_all(self.current_candidate_sentence_array);

}


MailSuggestCtrl.prototype.set_start = function(in_sentence){

	var self = this;
	var number = self.extract_num(in_sentence)
	self.mail_suggest_vm.set_start(number)
}


MailSuggestCtrl.prototype.set_last = function(in_sentence){

	var self = this;
	
	var number = self.extract_num(in_sentence)
	self.mail_suggest_vm.set_last(number)
}

MailSuggestCtrl.prototype.extract_num = function(in_sentence){

	var in_sentence_array = in_sentence.split("");
	var number_array = new Array();

	for(var i=0; i< in_sentence_array.length; i++){
		for(j=0; j< num_char_array.length; j++){
			if(in_sentence_array[i] == num_char_array[j]){
				var num_converted = num_converter[in_sentence_array[i]];
				number_array.push(num_converted);
			}
		}
	}
	if(number_array.length !=0){
		var number = number_array.join("");
	}
	return number;

}


MailSuggestCtrl.prototype.extract_selected_sentences = function(){

	var self = this;
	var selected_sentence = self.mail_suggest_vm.extract_selected_sentences()

	return selected_sentence;
}

/*

MailSuggestCtrl.prototype.highlight_row_from = function(in_num){

	var self = this;
	self.mail_suggest_vm.set_from(in_num);

}


MailSuggestCtrl.prototype.highlight_row_to = function(in_num){

	var self = this;
	self.mail_suggest_vm.set_to(in_num);

}

*/

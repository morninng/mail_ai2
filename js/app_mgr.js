var global_status = null;
var mail_suggest_ctr = null;
var show_conversation_ctr = null;

function get_mailcandidate_success(error, mailcandidate_array){
	if(error){
		alert("サーバにアクセスできませんインターネット接続してますか？");
	}else{

		if(mailcandidate_array.length==0){
			alert("関連するメール履歴がありません。なにか別のキーワードをいただけないでしょうか？");
			global_status = "mail_suggestion";
		}else{
			mail_suggest_ctr.set_mail_candidate(mailcandidate_array);
			global_status = "mail_suggestion";
			show_conversation_ctr.push_ai_comment("返信としてこのメールで引用する部分はありますか？");
		}
	}
}

(function () {

	global_status = "init";



	mail_suggest_ctr = new MailSuggestCtrl();
	mail_suggest_ctr.initialize();
	show_conversation_ctr = new ShowConversationCtrl();
	show_conversation_ctr.initialize();


	watson_interface.get_initial_mail_candidate("お世話になります。下記ご連絡ありがとうございます。ページ表示時のサイドパネル展開はどのようにすればよいでしょうか？", get_mailcandidate_success);


	var SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
	var recognition = new SpeechRecognition();
    	recognition.continuous = true;
	recognition.lang = 'ja';
	 
	recognition.onresult = function(e){
		var results = e.results;
		for(var i = e.resultIndex; i<results.length; i++){
			if(results[i].isFinal){
				console.log(results[i][0].transcript);
				speech_event_handler(results[i][0].transcript);
			}
		}
	};
	recognition.start();


}());


/**********************************/
/*********  mail_suggestion *********/


function next_mail_cancdidate(){
	var result = mail_suggest_ctr.next();
	if(result){
		show_conversation_ctr.push_ai_comment("この文章ではいかがでしょうか？");
	}else{
		show_conversation_ctr.push_ai_comment("回答候補がなくなってしまいました。別の検索キーワードをいただけないでしょうか？");
		global_status = "expect_other_keyword";
	}
}

function new_mail_cancdidate(){
	var result = mail_suggest_ctr.next();
	if(result){
		show_conversation_ctr.push_ai_comment("再検索しました。この文章ではいかがでしょうか？");
		global_status = "mail_suggestion";
	}else{
		show_conversation_ctr.push_ai_comment("回答候補がないので、別の検索キーワードをいただけないでしょうか？");
		global_status = "expect_other_keyword";
	}
}

function no_matching_keyword(){

	show_conversation_ctr.push_ai_comment("申し訳ありません。他の候補を見る場合には「次」と、別用語で再検索する場合には「～に関して」とおっしゃっていただけますか？");
}

/**********************************/
/*********  expect_other_keyword *********/

function find_with_otherkeyword(input_sentence){
	watson_interface.find_other_candidate(input_sentence, get_mailcandidate_success);	

}

/**********************************/
/*********  row_selection *********/

function goto_rowselection(keyword_sentence){
	global_status = "row_selection";
	mail_suggest_ctr.become_select_status();
	show_conversation_ctr.push_ai_comment("何行目から何行目を引用しますか？");
}

function set_starting_row(sentence){
	console.log(sentence);
	mail_suggest_ctr.set_start("starting sentence" + sentence);

}

function set_last_row(sentence){
	console.log("last sentence:" + sentence);
	mail_suggest_ctr.set_last("starting sentence" + sentence);
}


function need_line_num(){

	show_conversation_ctr.push_ai_comment("行数がききとれません。");
}


function set_last_row(sentence){
	console.log("last sentence:" + sentence);
	mail_suggest_ctr.set_last("starting sentence" + sentence);
}

/**********************************/
/*********  mail_make *********/

function goto_make_mail(){
	if (!maildraft.template_type) {
		global_status = "make_mail";
		mail_suggest_ctr.become_select_status();
		show_conversation_ctr.push_ai_comment("テンプレートタイプを選択してください。「社外」、「社内」、「謝罪」");
	}
	else {
		goto_expect_other_keyword();
	}
}

function need_template(){
	show_conversation_ctr.push_ai_comment("テンプレートタイプが聞き取れません。");
}


function goto_expect_other_keyword(){

	makeMailDraft(maildraft.template_type,"Pepper","DAC近江");

	var sentence = mail_suggest_ctr.extract_selected_sentences();
	addMailDraft(sentence);
	var mail = getMailDraft();
	answer.setBody(mail);

	global_status = "expect_other_keyword";
	show_conversation_ctr.push_ai_comment("文案が出来上がりました。他に質問はありますか？");
}

/**********************************/

function speech_event_handler(input_sentence){


	show_conversation_ctr.push_own_comment(input_sentence);


	switch(global_status){

		case "init":

		break;
		case "mail_suggestion":
			var keyword = reserved_word.mail_suggestion

			for(var i=0; i< keyword.next_candidate.length; i++){
				if(input_sentence.indexOf(keyword.next_candidate[i]) != -1){
					next_mail_cancdidate();
					return;
				}
			}

			for(var i=0; i< keyword.search_other_keyword.length; i++){
				if(input_sentence.indexOf(keyword.search_other_keyword[i]) != -1){
					find_with_otherkeyword(input_sentence);
					return;
				}
			}

			for(var i=0; i< keyword.goto_row_selection.length; i++){
				if(input_sentence.indexOf(keyword.goto_row_selection[i]) != -1){
					goto_rowselection()
					return;
				}
			}
			no_matching_keyword();

		break;
		case "expect_other_keyword":
			find_with_otherkeyword(input_sentence);

		break;

		case "row_selection":
			var found = false;
			var keyword = reserved_word.row_selection;
			for(var i=0; i< keyword.from_keyword.length; i++){
				if(input_sentence.indexOf(keyword.from_keyword[i]) != -1){
					found = true;
					var found_char_length = input_sentence.indexOf(keyword.from_keyword[i]);
					console.log(found_char_length);
					var string_length = input_sentence.length;
					console.log(string_length);
					var delimiter_length = keyword.from_keyword[i].length;
					console.log(delimiter_length);
					var pre_string = input_sentence.substr(0,found_char_length);
					console.log("pare string" + pre_string);
					var post_string = input_sentence.substr(found_char_length + delimiter_length, string_length);
					console.log("post string" +  post_string);
					set_starting_row(pre_string);
				}
			}
			if(post_string){
				input_sentence = post_string;
			}

			for(var i=0; i< keyword.to_keyword.length; i++){
				if(input_sentence.indexOf(keyword.to_keyword[i]) != -1){
					found = true;
					var found_char_length = input_sentence.indexOf(keyword.to_keyword[i]);
					console.log(found_char_length);
					var string_length = input_sentence.length;
					console.log(string_length);
					var delimiter_length = keyword.from_keyword[i].length;
					console.log(delimiter_length);
					var pre_string = input_sentence.substr(0,found_char_length);
					console.log("pare string" + pre_string);
					var post_string = input_sentence.substr(found_char_length + delimiter_length, string_length);
					console.log("post string" +  post_string);
					set_last_row(pre_string);

				}
			}

			for(var i=0; i< keyword.goto_make_mail_keyword.length; i++){
				if(input_sentence.indexOf(keyword.goto_make_mail_keyword[i]) != -1){
					goto_make_mail();
					return;
				}
			}

			if(!found) {
				need_line_num();
			}
			else {
				show_conversation_ctr.push_ai_comment("ハイライトされている箇所でよろしいですか？");
			}


		break;

		case "make_mail":

			var keyword = reserved_word.make_mail;
			if (!maildraft.template_type) {

				for(var i=0; i< keyword.default_template_keyword.length; i++){
					if(input_sentence.indexOf(keyword.default_template_keyword[i]) != -1){
						maildraft.template_type = "default";
						goto_expect_other_keyword();
						return;
					}
				}
	
				for(var i=0; i< keyword.office_template_keyword.length; i++){
					if(input_sentence.indexOf(keyword.office_template_keyword[i]) != -1){
						maildraft.template_type = "office";
					goto_expect_other_keyword();
							return;
					}
				}
	
				for(var i=0; i< keyword.apology_template_keyword.length; i++){
					if(input_sentence.indexOf(keyword.apology_template_keyword[i]) != -1){
						maildraft.template_type = "apology";
						goto_expect_other_keyword();
						return;
					}
				}

				need_template();
				return;
			}

			for(var i=0; i< keyword.goto_expect_other_keyword.length; i++){
				if(input_sentence.indexOf(keyword.goto_expect_other_keyword[i]) != -1){
					goto_expect_other_keyword();
					return;
				}
			}
		break;

		case "next_or_findother":
		
		break;

		case " template_selection":
		
		break;

		case "complete":
		
		break;
	}

}

var watson_proxy_aws="https://64o0pet0uh.execute-api.us-east-1.amazonaws.com/1/retrieve-rank";
//var request_url = "https://6bcdc9a9-e87b-4819-870c-304119f3b8f7:CioxOG8aKepa@gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/sca3eec3cd_3817_4766_bdab_fd26a11c5091/solr/japanese_collection/select";
//var request_url_pre = "https://6bcdc9a9-e87b-4819-870c-304119f3b8f7:CioxOG8aKepa@gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/sca3eec3cd_3817_4766_bdab_fd26a11c5091/solr/japanese_collection/select?q="
//var request_url_post = "&wt=json&fl=id,title,body"


var watson_interface = new Object();


watson_interface.get_initial_mail_candidate = function(search_sentence, callback){

	search_by_watson(search_sentence, callback);

}

watson_interface.find_other_candidate = function(search_sentence, callback){

	search_by_watson(search_sentence, callback);

}

function search_by_watson(search_sentence, callback){


	$.get(watson_proxy_aws, { q: search_sentence, wt: "json",fl:"id,title,body"})
	.done(
	  function(data){
	  	
	    console.log(data);
	    var answer_candidate_array = data.response.docs;
	    if(answer_candidate_array && Array.isArray(answer_candidate_array)){
	    	callback(null, answer_candidate_array);
		}else{
			callback("no answer candidate");
		}

	  })
	.fail(
		function(){
			callback("request to watson failed");
		}
	)
}

function apply_candidate_to_dom(text_data){

	$("#suggested_mail").text(text_data);	

}


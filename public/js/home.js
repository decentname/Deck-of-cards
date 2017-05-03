$('document').ready(function(){
	$(init);

	function init(){
		$.ajax({
	    type: "GET",
	    url: "http://localhost:5000/comments/getComments",
	    success: function(data,textStatus,xhr){
	    	console.log(data);
	    	var div = '';
	    	for(let i=0;i<data.length;i++){

	      		var d = new Date(data[i].timestamp);
		    	div += `
			    	<div class="comment">
					    <div class="content">
					    	<a class="author">`+data[i].email+`</a>
					    	<div class="metadata">
					        	<span class="date">`+d.toString()+`</span>
					      	</div>
					      	<div class="text">
					        	<p>`+data[i].comment+`</p>
					      	</div>
					    </div>
				  	</div>`;
			}

			$(div).appendTo('#ui-comments');
	    }
	  });

	}

	 


	$('#Add').click(function(){
		var text = $('textarea#content').val();
		$('textarea#content').val('');
		$.ajax({
	    type: "POST",
	    url: "http://localhost:5000/comments/add",
	    data:{'text':text},
	    success: function(data,textStatus,xhr){
	    	var d = new Date(data[0].timestamp);
	    	console.log(data);
	      $(`<div class="comment">
	    <div class="content">
	      <a class="author">`+data[0].email+`</a>
	      <div class="metadata">
	        <span class="date">`+d.toString()+`</span>
	      </div>
	      <div class="text">
	        <p>`+data[0].comment+`</p>
	      </div>
	    </div>
	  </div>`).appendTo('#ui-comments');
	    }
	  });


	})

})
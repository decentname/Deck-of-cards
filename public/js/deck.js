$('document').ready(function(){
	$('#content').css('height',window.innerHeight);
	$('#content').css('width',window.innerWidth);
	$(init);

	$('#again').click(function(){
		$(init);
	})

	function popCards(val){
		$.ajax({
			type: "POST",
			url: "https://cardforblind.herokuapp.com/deck/updateDeck/",
			data: JSON.stringify({'val':val}),
	        contentType: 'application/json',
			success: function(data,textStatus,xhr){
			  // console.log(data.Cards);
			  console.log(data.Cards);

			  if(data.Cards == '0'){
			    //call success
			    success();
			  }
			}
		});
	} 

	function init(){

		$('#successMessage').css('display','none');

		$('#cardPile').html(`
			<div id='card1'></div>
	 		<div id='card2'></div>
	 		<div id='card3'></div>
	 		<div id='card4'></div>
	 		<div id='card5'></div>
	 		<div id='card6'></div>
	 		<div id='card7'></div>
	 		<div id='card8'></div>
	 		<div id='card9'></div>
	 		<div id='card10'></div>
	 		<div id='card11'></div>
	 		<div id='card12'></div>
	 		<div id='card13'></div>
	 		<div id='card14'></div>
	 		<div id='card15'></div>
	 		<div id='card16'></div>
	 		<div id='card17'></div>
	 		<div id='card18'></div>
	 		<div id='card19'></div>
	 		<div id='card20'></div>
	 		<div id='card21'></div>
	 		<div id='card22'></div>
	 		<div id='card23'></div>
	 		<div id='card24'></div>
	 		<div id='card25'></div>
	 		<div id='card26'></div>
	 		<div id='card27'></div>
	 		<div id='card28'></div>
	 		<div id='card29'></div>
	 		<div id='card30'></div>
	 		<div id='card31'></div>
	 		<div id='card32'></div>
	 		<div id='card33'></div>
	 		<div id='card34'></div>
	 		<div id='card35'></div>
	 		<div id='card36'></div>
	 		<div id='card37'></div>
	 		<div id='card38'></div>
	 		<div id='card39'></div>
	 		<div id='card40'></div>
	 		<div id='card41'></div>
	 		<div id='card42'></div>
	 		<div id='card43'></div>
	 		<div id='card44'></div>
	 		<div id='card45'></div>
	 		<div id='card46'></div>
	 		<div id='card47'></div>
	 		<div id='card48'></div>
	 		<div id='card49'></div>
	 		<div id='card50'></div>
	 		<div id='card51'></div>
	 		<div id='card52'></div>
`);

		$.ajax({
			type:'GET',
			url:'https://cardforblind.herokuapp.com/deck/getDeck',
			success:function(data,textstatus,xhr){
				console.log("getDeck res",data.deck);
				var cards = data.deck;
				for(var i =0;i<cards.length;i++){
					$("#"+cards[i].name).text(cards[i].card);
					$("#"+cards[i].name).css('visibility','visible');
			    	$("#"+cards[i].name).data( 'house', cards[i].card[0]).draggable( {
			        	containment: '#content',
			        	stack: '#cardPile div',
			        	cursor: 'move',
			        	revert: true
			      	});
			  	}
			}
		})

		$('#cardSlots').html('');
 		// Create the card slots
	  	var words = ['H','D','C','S'];
	  	for ( var i=1; i<=4; i++ ) {
	    	$('<div>' + words[i-1] + '</div>').data( 'house', words[i-1] ).appendTo( '#cardSlots' ).droppable( {
	    		accept: '#cardPile div',
	      		hoverClass: 'hovered',
	      		drop: handleCardDrop
	    	});
	  	}
		
		$('#logout').css('display','block');

		function handleCardDrop( event, ui ) {
			var slotHouse = $(this).data( 'house' );
			var cardHouse = ui.draggable.data( 'house' );
			var val = ui.draggable.text(); 
			console.log(val);
			if ( slotHouse == cardHouse ) {
			ui.draggable.addClass( 'correct' );
			ui.draggable.draggable( 'disable' );
			// $(this).droppable( 'disable' );
			ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
			ui.draggable.draggable( 'option', 'revert', false );
			//pop each card
			popCards(val);
			} 
		}
	
	}

	function success(){
	    $('#successMessage').show();
	    $('#successMessage').animate( {
	      left: '380px',
	      top: '200px',
	      width: '400px',
	      height: '100px',
	      opacity: 1
	    } );
	}

})
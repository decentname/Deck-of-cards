var db = require('../config/db');

exports.display = function(email,cb){
	db.get().collection('deck').find({'email':email}).toArray(function(err,res){
		if (err){
			return cb(err,null);	
		}
		else{
			// console.log(res);
			//If user has won or user is new 
			if(res.length==0 || res[0].deck.length==0){
				//create first
				var cards = [];
				var deck = ['H1','H2','H3','H4','H5','H6','H7','H8','H9','H10','H11','H12','H13',
							'C1','C2','C3','C4','C5','C6','C7','C8','C9','C10','C11','C12','C13',
							'D1','D2','D3','D4','D5','D6','D7','D8','D9','D10','D11','D12','D13',
							'S1','S2','S3','S4','S5','S6','S7','S8','S9','S10','S11','S12','S13'
						];
				var i;
				for(i=1;i<=52;i++){
					var card = deck.splice(Math.floor(Math.random()*deck.length), 1);
					cards.push({'name':'card'+i.toString(),'card':card[0]})
				}

				db.get().collection('deck').update({'email':email},{'email':email,'deck':cards},{'upsert':true},function(err,resp){
					if(err){
						return cb(err,null);	
					}
					else{
						// console.log(resp);
						return cb(null,{'deck':cards});	
					}
				})
			}
			else{
				return cb(null,res[0]);
			}	
		} 
		
	})
}

exports.update = function(email,val,cb){
	// console.log(email,val);
	db.get().collection('deck').update({'email':email},{ $pull: {deck: {'card':val}} },function(err,res){
		// console.log(err,res);
		if (err){
			return cb(err,null);	
		}
		else{
			db.get().collection('deck').aggregate([{$match: {'email':email}},{$project: {Cards: { $size: "$deck" } } }],function(err,rep){
				// console.log(err,rep);
				return cb(null,rep);	
			})	
		} 
	})
}
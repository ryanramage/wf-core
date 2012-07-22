define('js/app', ['simple-uuid'], function(uuid){
	var exports = {};
	exports.generateSheet = function(businessId, lastSheetOrder, count) {
			var codes = [];
			for (var i=0; i < count; i++) {
				var code = uuid.uuid();
				var shortCode = exports.shortCode(code);
				codes.push({
					code: code,
					shortCode : shortCode
				});
			}
			var sheet = {};
			sheet.generatedDate = new Date().getTime();
			sheet.businessId = businessId;
			sheet.sheetOrder = lastSheetOrder+1;
			sheet.codes = codes;
			return sheet;
	}
	
	
	exports.shortCode = function(code) {
		return code.substring(0, 8).replace('0', 'X');	
	}
	

	exports.addPunchToCard = function(card, code) {
		if (!card.punches) card.punches = [];
		card.punches.push(code);
	}


	exports.preValidate = function(card) {
		for (var i=0; i < card.punches.lengh; i++) {
		
		}			
	}
		
  return exports;
});
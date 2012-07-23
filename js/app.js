define('js/app', ['simple-uuid'], function(uuid){
	var exports = {};
	exports.generateSheet = function(businessId, lastSheetOrder, count) {
			var sheet = {};
			sheet.generatedDate = new Date().getTime();
			sheet.businessId = businessId;
			sheet.sheetOrder = lastSheetOrder+1;
			sheet.codes = [];
			for (var i=0; i < count; i++) {
				var code = uuid.uuid();
				var punchCode = exports.punchCode(code, sheet.sheetOrder);
				sheet.codes.push({
					code: code,
					punchCode : punchCode
				});
			}
			return sheet;
	}
	
	
	exports.punchCode = function(code, sheetOrder) {
		return code.substring(0, 8).replace(/0/g, 'X').replace(/1/g, 'R') + '-' + sheetOrder;	
	}

	exports.splitPunchCode = function(punchCode) {
		var codes =  punchCode.split('-');
		return {
			punchCode : codes[0],
			sheetOrder : codes[1]
		}
	}

	

	exports.addPunchToCard = function(card, punchCode) {
		if (!card.punches) card.punches = [];
		card.punches.push(code);
	}


	exports.preValidate = function(card) {
		for (var i=0; i < card.punches.length; i++) {
			card.punches[i] = splitPunchCode(card.punches[i]);
		}			
	}
		
  return exports;

});
define('js/wf-core', ['simple-uuid', './base-converter', 'jsPDF'], function(uuid, converter, jsPDF){
	var exports = {};
	exports.generateSheet = function(businessId, lastSheetOrder, count) {
			var sheet = {};
			sheet.generatedDate = new Date().getTime();
			sheet.businessId = businessId;
			sheet.sheetOrder = lastSheetOrder+1;
			sheet.codes = [];
			for (var i=0; i < count; i++) {
				var code = uuid.uuid();
				var punchCode = exports.createPunchCode(code, sheet.sheetOrder);
				sheet.codes.push({
					code: code,
					punchCode : punchCode
				});
			}
			return sheet;
	}

    exports.generateSheetPDF = function(sheet) {
        var doc = new jsPDF();
        doc.text(20, 10, 'Sheet ' + sheet.sheetOrder);
        doc.setFontSize(11);
        var numPerCol = 17;
        var lineSpacing = 15;
        var colSpacing = 30;

        for (var i=0; i<sheet.codes.length; i++){
            var punchCode = sheet.codes[i].punchCode;
            var x = colSpacing + (Math.floor(i/numPerCol) * colSpacing);
            var y = 35 + ((i % numPerCol) * lineSpacing);
            doc.text(x, y, punchCode);
        }
        return doc;
    }


    exports.generateCard = function(businessId, title, punchCount) {
        var card = {
            cardId : uuid.uuid(),
            businessId : businessId,
            title : title,
            punchCount : punchCount,
            generatedDate : new Date().getTime(),
            punches : []
        }
        return card;
    }


	exports.createPunchCode = function(code, sheetOrder) {
        var front = code.substring(0, 4);
        var decimal = converter.hexToDec(front)
        var ourSpace = converter.decToGeneric(decimal, '23456789ABCDEFGHJKLMNPQRTUVWXYZ');

		return ourSpace + '-' + sheetOrder;
	}

	exports.splitPunchCode = function(punchCode) {
		var codes =  punchCode.split('-');
		return {
			shortCode : codes[0],
			sheetOrder : codes[1]
		}
	}

	

	exports.addPunchToCard = function(card, punchCode) {
		if (!card.punches) card.punches = [];
		card.punches.push({
            punchCode : punchCode,
            punchDate : new Date().getTime()
        });
	}


	exports.preValidate = function(card) {
		for (var i=0; i < card.punches.length; i++) {
            var punchCode = card.punches[i].punchCode;
            var splitUp = exports.splitPunchCode(punchCode);
			card.punches[i].shortCode = splitUp.shortCode;
            card.punches[i].sheetOrder = splitUp.sheetOrder;
		}			
	}
		
  return exports;

});
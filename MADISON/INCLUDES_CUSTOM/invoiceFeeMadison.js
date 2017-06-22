function invoiceFeeMadison(fcode, fperiod, itemCap) {	var feeFound=false;	getFeeResult = aa.finance.getFeeItemByFeeCode(itemCap,fcode,fperiod);	if (getFeeResult.getSuccess()) {		var feeList = getFeeResult.getOutput();		for (feeNum in feeList) {			if (feeList[feeNum].getFeeitemStatus().equals("NEW")) {				var feeSeq = feeList[feeNum].getFeeSeqNbr();				feeSeqList.push(feeSeq);				paymentPeriodList.push(fperiod);				var inv = aa.finance.createInvoice(itemCap, feeSeqList, paymentPeriodList);				logDebug("Assessed fee " + fcode + " found and invoiced");				feeFound=true;			}		}	} else { 		logDebug( "**ERROR: getting fee items (" + fcode + "): " + getFeeResult.getErrorMessage())	}	return feeFound;}
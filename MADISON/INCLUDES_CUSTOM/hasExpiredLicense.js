function hasExpiredLicense(pDateType, plicenseNbr) {	var vDateType;	if ( pDateType==null || pDateType=="" ) {		logDebug ("Invalid date type parameter");		return false;	} else {		vDateType = pDateType.toUpperCase();		if (!matches(vDateType, "EXPIRE","INSURANCE","BUSINESS")) {			logDebug ("Invalid date type parameter");			return false;		}	}	var vExpired = false;	var vToday = new Date();	var vResult = getLicProfExpDate(vDateType, plicenseNbr);	if (vResult != "NO DATE FOUND") {		vResult = jsDateToASIDate(vResult);		vToday = jsDateToASIDate(vToday);		expiredDate = vResult;		var licDate = new Date(vResult);		var tdate = new Date(vToday);		if (licDate < tdate) {			vExpired = true;			logDebug("Licence # " + plicenseNbr + " expired on " + vResult);		} else {			logDebug("No licensed professionals found on CAP");			return vExpired;		}	} else {		expiredDate = "";		vExpired = false;	}	return vExpired;}
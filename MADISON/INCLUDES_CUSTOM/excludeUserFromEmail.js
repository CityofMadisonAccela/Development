function excludeUserFromEmail() {	var bdValue = "";	var excludeUser = false;	var bizDomScriptResult = aa.bizDomain.getBizDomain("EXCLUDE_USERS_FROM_EMAIL");	if (bizDomScriptResult.getSuccess()) {		bizDomScriptArray = bizDomScriptResult.getOutput().toArray()		for (var i in bizDomScriptArray) {			bdValue = bizDomScriptArray[i].getBizdomainValue().toString();			if (appTypeString.equals(bdValue)) {				if (publicUserID == null) {					var userObj = aa.person.getUser(currentUserID);				} else {					var userObj = aa.publicUser.getPublicUserByPUser(publicUserID);				}				if (userObj.getSuccess()) {					var aUser = userObj.getOutput();					var userId = aUser.getUserID();					userId = userId.toUpperCase();					var userArray = bizDomScriptArray[i].getDescription().split(",");					for (var u in userArray) {						uId = userArray[u];						uId = uId.toUpperCase();						if (userId.equals(uId)) {							excludeUser = true;						}					}				}			}		}	}	if (excludeUser == true) {		return true;	} else {		return false;	}}
function getOwnerfromParcel(){	var existingOwner = aa.owner.getOwnerByCapId(capId);	if (existingOwner.getSuccess())		var ownerList = existingOwner.getOutput();	for (var thisO in ownerList)		{		if (ownerList[thisO].getOwnerFullName() != null)			{return false}		}	var parcelListResult = aa.parcel.getParcelDailyByCapID(capId,null);	if (parcelListResult.getSuccess())		var parcelList = parcelListResult.getOutput();	else		{ logDebug("**ERROR: Failed to get Parcel List " + parcelListResult.getErrorMessage()); return false; }
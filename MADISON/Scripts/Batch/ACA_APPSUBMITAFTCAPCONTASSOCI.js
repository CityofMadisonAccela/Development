 /*ACA Contacts Application Submit After Script for associating Reference Contacts.*/var contacts = aa.env.getValue("ContactList");if (contacts != null && contacts.size() > 0) {	for ( var j = 0; j < contacts.size(); j++)	{		associateContacts(contacts.get(j));	}}function associateContacts(contactModel){	aa.print("ContactModel = " + contactModel);	var existingRefContact = getExistingRefContact(contactModel.getPeople());		if (existingRefContact == null) 	{		var capContactSeqNbr = contactModel.getPeople().getContactSeqNumber();		createRefContact(contactModel);		var refSeqNbr = contactModel.getPeople().getContactSeqNumber();		aa.print("Create Ref Contact ID = " + refSeqNbr);		existingRefContact = aa.people.createPeopleModel().getOutput().getPeopleModel();		existingRefContact.setContactSeqNumber(refSeqNbr);		contactModel.getPeople().setContactSeqNumber(capContactSeqNbr);		aa.print("capContactSeqNbr = " + capContactSeqNbr + " Ref ID = "				+ existingRefContact.getContactSeqNumber());	}	updateCapByRefContact(contactModel, existingRefContact);}function associateReferenceContacts(capContacts){	if (capContacts != null && capContacts.length > 0)	{		var contactModel;		for (var i = 0; i < capContacts.length; i++)		{			if (capContacts[i] != null && capContacts[i].getCapContactModel() != null)			{				contactModel = capContacts[i].getCapContactModel();				associateContacts(contactModel);			}		}	}}function getExistingRefContact(people){	var newPeople = aa.people.createPeopleModel().getOutput().getPeopleModel();	newPeople.setServiceProviderCode(people.getServiceProviderCode());	newPeople.setFein(people.getFein());	newPeople.setSocialSecurityNumber(people.getSocialSecurityNumber());	newPeople.setFirstName(people.getFirstName());	newPeople.setLastName(people.getLastName());		var result = aa.people.getPeopleByPeopleModel(newPeople);        	if (result.getOutput() != null && result.getOutput().length > 0)	{		aa.print("Retrive Ref Contacts length = " + result.getOutput().length);		refPeople = result.getOutput()[0];		aa.print("[Object 0] = " + refPeople + "   ContactSeqNbr = " + refPeople.getContactSeqNumber());		return result.getOutput()[0];	}	else	{		return null;	}}function createRefContact(contactModel){	var contactSeqNbr = contactModel.getPeople().getContactSeqNumber();	aa.print("---------Create Ref Contact-------------");	referencePeople = contactModel.getPeople();	aa.people.createPeople(referencePeople);	var newRefContactSeq = referencePeople.getContactSeqNumber();	aa.print("---------Create Ref Contact ["+ newRefContactSeq +"] Success! -------------");	return contactModel;}function updateCapByRefContact(contactModel, refPeople){        contactModel.setRefContactNumber(refPeople.getContactSeqNumber());	aa.print("---------Link Ref Contact-------------");	aa.people.editCapContact(contactModel);	aa.print("---------Link Ref Contact ["+ refPeople.getContactSeqNumber() +"] to Cap, Success! -------------");}
//CMN;Licenses!DCR!AA Plan!NA;getEmailAddrs^`
/*
	Script conversion from EMSE 
	Change Log
		Riki 6/22/2017 - Initial conversion
		Riki 6/27/2017 - Since this is specific to emails and AA, I am keeping it as a script in communication
							I am going to be moving the GetContactTypeEmail as a function since it is used by
							other scripts
*/	
sToEmail = "";
sCcEmail = "";
sBizName = "";
bNoEmail = false;
myContactType = "Contractor";
contractorEmail = "";
contractorBizName = "";
branch("EML:GetContactTypeEmail");
if (contactEmail != undefined && contactEmail != null && contactEmail != "nomail@cityofmadisonDEV.com") {
	contractorEmail = contactEmail;
	contractorBizName = businessName;
	}

myContactType = "EEO/AA Officer";
eeo_aa_Email = "";
eeo_aa_BizName = "";
branch("EML:GetContactTypeEmail");
if (contactEmail != undefined && contactEmail != null && contactEmail != "nomail@cityofmadisonDEV.com") {
	eeo_aa_Email = contactEmail;
	eeo_aa_BizName = businessName;
	}

if (eeo_aa_Email != "") {
	sToEmail = eeo_aa_Email;
	if(contractorEmail != "") sCcEmail = contractorEmail;
	} else {
	if(contractorEmail != "")  sToEmail = contractorEmail;
	}

if (eeo_aa_BizName != "") {
	sBizName = eeo_aa_BizName;
	} else {
	if(contractorBizName != "") sBizName = contractorBizName;
	}

if (contractorEmail  == "" && eeo_aa_Email  == "") {
	bNoEmail = true;
	}
//`^
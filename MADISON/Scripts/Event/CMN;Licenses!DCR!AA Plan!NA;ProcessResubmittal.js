CMN;Licenses!DCR!AA Plan!NA;ProcessResubmittal^`if (isTaskActive("Intake")) {	updateTask("Intake","AA Plan Resubmitted","Updated by script","");	}if (isTaskActive("AA Plan Review")) {	updateTask("AA Plan Review","AA Plan Resubmitted","Updated by script","");	}if (isTaskActive("Data Update Review")) {	updateTask("Data Update Review","AA Plan Resubmitted","Updated by script","");	}updateAppStatus("AA Plan Resubmitted","Updated by script");branch("EML;Licenses!DCR!AA Plan!NA;ResubmitNotice");
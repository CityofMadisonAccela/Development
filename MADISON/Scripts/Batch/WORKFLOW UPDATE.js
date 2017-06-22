 /*---- User intial parameters ----*/var requiredType = aa.util.newArrayList();var documentGroup = "STANDARD_BUILDING";requiredType.add("Engineering Plan");requiredType.add("Plot Plan");requiredType.add("Structural Plan");var cond_type = "Required Documents";var cond_name = "Required Documents to Pass Plan Review";var wfProcess = "TESTPROCESS";var wtask = "Plan_Submission";var wfstatus = "Accepted";/*---- User intial parameters end----*//*---- Inital environment parameters ----*/var s_id1 = aa.env.getValue("PermitId1");var s_id2 = aa.env.getValue("PermitId2");var s_id3 = aa.env.getValue("PermitId3");var userID = aa.env.getValue("CurrentUserID");var capIDModel = aa.cap.getCapIDModel(s_id1, s_id2, s_id3).getOutput();var servProvCode = capIDModel.getServiceProviderCode();var workflowTask = aa.env.getValue("WorkflowTask");var stepNum = aa.env.getValue("SD_STP_NUM");var processID = aa.env.getValue("ProcessID");var processCode = aa.env.getValue("PROCESSCODE");var taskStatus = aa.env.getValue("WorkflowStatus"); /*---- Inital environment parameters end ----*/function main(){	if(isNeedToValidateReqDocument(capIDModel,processCode, stepNum, processID, taskStatus))	{			isRequiredDocument();	}}function isNeedToValidateReqDocument(capID, processCode, stepNum, processID, taskStatus){	if (capID == null || aa.util.instanceOfString(capID) 		|| stepNum == null || processID == null 		|| processCode == null || taskStatus == null)	{				return false;	}	var taskItem = getTaskItem(capID, stepNum, processID);		if (taskItem == null)	{		return false;	}	if (processCode.equals(wfProcess)		&& taskItem.getTaskDescription().equals(wtask)		&& taskItem.getDisposition().equals(wfstatus))	{		aa.print("Run isRequiredDocument()"); 		return true;	}		return false;}function getTaskItem(capID, stepNum, processID){	var taskItemScriptModel = null;	var result = aa.workflow.getTask(capID, stepNum, processID);	if(result.getSuccess())	{		taskItemScriptModel = result.getOutput();		if (taskItemScriptModel == null)		{			aa.print("ERROR: Failed to get workflow task with CAPID(" + capID + ")");		}	}  	else 	{		aa.print("ERROR: Failed to get workflow task(" + capID + ") for review: " + result.getErrorMessage());	}	return taskItemScriptModel;}function isRequiredDocument(){	var documentList = aa.document.getDocumentListByEntity(capIDModel.toString(), "CAP").getOutput();	var count = 0;	if(documentList != null && documentList.size() > 0)	{		for(var i = 0; i < documentList.size(); i++)		{			var documentModel = documentList.get(i);			if (documentGroup == documentModel.getDocGroup())			{				var docCategory = documentModel.getDocCategory();				for(var j=0; j < requiredType.size(); j ++)				{					if(docCategory != null && docCategory.equalsIgnoreCase(requiredType.get(j)))					{						requiredType.set(j, "");						count = count + 1;						break;					}				}			}		}	}			if (requiredType.size() > count)	{			aa.print("Need to add a condition.");		addCapCondition();	}	}function addCapCondition(){	var stdcondition = aa.capCondition.getStandardConditions(cond_type, cond_name).getOutput();	var capConditionModel = aa.capCondition.getNewConditionScriptModel().getOutput();	var sysUserModel = aa.people.getSysUserByID(userID).getOutput();	capConditionModel.setIssuedByUser(sysUserModel);	capConditionModel.setCapID(capIDModel);	capConditionModel.setServiceProviderCode(servProvCode);		aa.condition.createConditionFromStdCondition(capConditionModel, stdcondition[0].getConditionNbr());}aa.env.setValue("ScriptReturnCode","0");aa.env.setValue("ScriptReturnMessage", "successful");main();
CMN;SendLandNotificationsAndSetDueDateLoop^`if (callType == "WTUA") {	editTaskDueDate(childTasks[task].getTaskDescription(), pDueDate, childTasks[task].getProcessCode());	}emailAddress = "None";var whoToEmail = "None";taskDes = childTasks[task].getTaskDescription();if (callType == "WTUA") {	cDueDate = pDueDate;	} else {	if(childTasks[task].getDueDate()!=null) cDueDate = childTasks[task].getDueDate().getMonth() + "/" + childTasks[task].getDueDate().getDayOfMonth() + "/" + childTasks[task].getDueDate().getYear();	}assignedPerson = childTasks[task].getAssignedStaff();assignedFullName = assignedPerson.getFullName();if (callType == "DUA" && childTasks[task].completeFlag == "Y") {	whoToEmail = "Completed";	}if (childTasks[task].activeFlag == "Y" && assignedFullName != "") {	whoToEmail = "Assigned";	assignedPersonDept = assignedPerson.getDeptOfUser();	}if (childTasks[task].activeFlag == "Y" && assignedFullName != "") {	deptList = aa.people.getSysUserListByDepartmentName(assignedPersonDept).getOutput();	}if (childTasks[task].activeFlag == "Y" && assignedFullName == "") {	whoToEmail = "Group";	}if (whoToEmail == "Completed") {	emailAddress = aa.people.getSysUserByID(childTasks[task].getTaskItem().getAuditID()).getOutput().getEmail();	}if (whoToEmail == "Assigned") {	for (sUser in deptList) if (deptList[sUser].getFullName().equals(assignedFullName)) emailAddress = deptList[sUser].getEmail();	}if (whoToEmail == "Group") {	emailAddress = lookup(appTypeString + typeReviewVerif, childTasks[task].getTaskDescription());	}if (whoToEmail == "Group" && emailAddress == undefined) {	emailAddress = lookup("Land/Land Use/NA/NA" + typeReviewVerif, childTasks[task].getTaskDescription());	logDebug("Sending Email to: "+emailAddress);	}if (whoToEmail != "None" && emailAddress != "None") {	branch("EML;Land!~!~!;LMAgencyNotificationInProcess");	}
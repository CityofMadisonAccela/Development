 //Accela Automation//File: Inspection-updateInspectinMilestone.txt//Accela, Inc.//Copyright (C): 2009////Description: Used to udpate inspection milestone////Notes://CapID: 09CAP-00000-003ZD//inspection group code:BLD_FLOW//inspection type: Insulation Ceiling////Revision History:var inspectionGroupCode ="BLD_FLOW";var inspectionType ="Insulation Ceiling";aa.print("update inspection milestone start.");var capId1="09CAP";var capId2="00000";var capId3="003ZD";var capIDModel = null;var result = null;result=aa.cap.getCapID(capId1, capId2, capId3);if(result.getSuccess()){    aa.print("Get getCapID sucessfully.");    capIDModel= result.getOutput();}else{		aa.print("Get getCapID fail.");}var result = aa.inspection.getInspMilestoneByCapID(capIDModel);var InspMilestones=null;if(result.getSuccess()){    aa.print("Get milestone model sucessfully.");    InspMilestones= result.getOutput();}else{	aa.print("Get milestone model fail.");}if(InspMilestones!=null&&InspMilestones.length>0){     			aa.print("Update: Inspection Group Code|Inspection Type|Required/Optional|Flow Active|Flow Completed|Inspection Milestone");      for(var i =0;i<InspMilestones.length;i++)      {         					var obj= InspMilestones[i];					aa.print("UpdateBefore:" + InspMilestones[i].getInspCode()					+ "|" + InspMilestones[i].getInspType()					+ "|" + InspMilestones[i].getInspRequired() 					+ "|" + InspMilestones[i].getInspMilestone());					if(inspectionType.equals(InspMilestones[i].getInspType()))					{							//if you want to update inspection milestone other property, please add code here.							obj.setInspRequired("Y");												//obj.setInspMilestone(5);							InspMilestones[i]=obj;												}   					aa.print("UpdateAfter:" + InspMilestones[i].getInspCode()					+ "|" + InspMilestones[i].getInspType()					+ "|" + InspMilestones[i].getInspRequired()// Y/N 					+ "|" + InspMilestones[i].getInspMilestone()); //10,20,30...							      }}result = aa.inspection.updateInspectionMilestone(InspMilestones);if(result.getSuccess()){     aa.print("update inspection milestone sucessfully."); }else{   aa.print("update inspection milestone fails.");   aa.print(result.getErrorMessage());}   aa.print("update inspection milestone end.");
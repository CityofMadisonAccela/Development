 /*********************************************************************** * Accela Automation * File:  * Accela, Inc. * Copyright (C): 2011 *  * Description: Remove Set Headers List By LP. *  * Notes: * * Revision History: **********************************************************************///Set setCode to Remove Set Headers List By LP.var setCode = "112233";//LP Number To Remove Set Headers List By LPvar lpNBR = 897415;//Remove Set Headers List By LP.var result = aa.set.removeSetHeadersListByLP(setCode,lpNBR);if(result.getSuccess()){	var removeCount = result.getOutput();	aa.print(" Success For Remove :" + removeCount);				aa.print("-----------------------------------------------------------------");}else{	//If Activate fail, then print the error message.	aa.print(result.getErrorMessage());}
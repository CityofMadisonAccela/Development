// run in script test to convert std choices to scripts
// NOT PERFECT!!! please review each script
// branches will need to be converted to functions and manually updated.

/*
	Change LOG
		Riki  7/6/2017 - #1 replace "branch(" to "include("
		Riki 7/10/2017 - #2 We are going to place a comment section at the beginning
*/	

var b = aa.proxyInvoker.newInstance("com.accela.aa.aamain.systemConfig.BizDomainBusiness").getOutput()
bl = b.getRBizDomains(aa.getServiceProviderCode()).toArray();

for (i in bl) 
{ 
	if (bl[i].getType() && 
		bl[i].getType().equals("EMSE")) 
	{
		aa.print(bl[i].getBizDomain().replace(":",";").replace("/","!").replace("*","~") + "^" + "`");
		
		//Riki 7/10/2017 - #2 We are going to place a comment section at the beginning
		aa.print("/*	Script conversion from EMSE [Stand Choice Name]");
		aa.print("	Change Log");
		aa.print("		[Name Date] - Initial conversion");
		aa.print("*/");
		
		convert(bl[i]);
		aa.print("`" + "^");
	}
}

function debugObject(object)
{
	for (property in object) 
	{ 
		aa.print(property + ": " + object[property]);
	} 
}


function convert(strControl) {
	var bizDomScriptResult = aa.bizDomain.getBizDomain(strControl.getBizDomain());
	if (bizDomScriptResult.getSuccess())
	  {
	  bizDomScriptArray = bizDomScriptResult.getOutput().toArray()
	  var disableTokens = false;
	  var ifStatement = false;
	  for (var i in bizDomScriptArray)
		   {
			if (bizDomScriptArray[i].getDescription()) {
				
				l = bizDomScriptArray[i].getDescription().trim().split("\\^");

				if (l[0].length() && ifStatement) {
					ifStatement = false;
					aa.print("\t}\n");  // finish continuation
					}
					
				if (l[0].length() && l[0] != "true" && l[0] != "true ") {
					ifStatement = true;
					if (!disableTokens) {
					   l[0] = l[0].replace("{","AInfo['");
					   l[0] = l[0].replace("branch(","include(").replace(":",";").replace("/","!").replace("*","~"); //Riki 7/6/2017 - #1 replace "branch(" to "include("
					   l[0] = l[0].replace("}","']");
					   }
					aa.print("if (" + l[0].trim() + ") {")
					}
				else {
					if (l[0].length()) ifStatement = false;
					}
					
				if (l[1]) {
					if (l[1].indexOf("disableTokens=true")) disableTokens = true;
					if (l[1].indexOf("disableTokens=false")) disableTokens = false;
					lt = l[1].trim().split(";");
					for (var j in lt) {
						if (!disableTokens) {
						   lt[j] = lt[j].replace("{","AInfo['");
						   lt[j] = lt[j].replace("branch(","include(").replace(":",";").replace("/","!").replace("*","~"); //Riki 7/6/2017 - #1 replace "branch(" to "include("
						   lt[j] = lt[j].replace("}","']");
						   }
						aa.print((ifStatement ? "\t" : "") + lt[j].trim() + ";");
						}
					}
					
				if (ifStatement && l[2]) {
					aa.print("\t} else {");
					if (l[2].indexOf("disableTokens=true")) disableTokens = true;
					if (l[2].indexOf("disableTokens=false")) disableTokens = false;
					lt = l[2].trim().split(";");
					for (var j in lt) {
						if (!disableTokens) {
						   lt[j] = lt[j].replace("{","AInfo['");
						   lt[j] = lt[j].replace("branch(","include(").replace(":",";").replace("/","!").replace("*","~"); //Riki 7/6/2017 - #1 replace "branch(" to "include("
						   lt[j] = lt[j].replace("}","']");
						   }
						aa.print("\t" + lt[j].trim() + ";");
						}
					}
				}
				
			
			}
		if (ifStatement) aa.print("\t}");
		}
}


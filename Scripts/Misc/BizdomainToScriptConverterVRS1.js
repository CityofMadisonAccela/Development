function debugObject(e){for(property in e)aa.print(property+": "+e[property])}function convert(e){var a=aa.bizDomain.getBizDomain(e.getBizDomain());if(a.getSuccess()){bizDomScriptArray=a.getOutput().toArray();var t=!1,r=!1;for(var i in bizDomScriptArray)if(bizDomScriptArray[i].getDescription()){if(l=bizDomScriptArray[i].getDescription().trim().split("\\^"),l[0].length()&&r&&(r=!1,aa.print("\t}\n")),l[0].length()&&"true"!=l[0]&&"true "!=l[0]?(r=!0,t||(l[0]=l[0].replace("{","AInfo['"),l[0]=l[0].replace("branch(","include(").replace(":",";").replace("/","!").replace("*","~"),l[0]=l[0].replace("}","']")),aa.print("if ("+l[0].trim()+") {")):l[0].length()&&(r=!1),l[1]){l[1].indexOf("disableTokens=true")&&(t=!0),l[1].indexOf("disableTokens=false")&&(t=!1),lt=l[1].trim().split(";");for(var n in lt)t||(lt[n]=lt[n].replace("{","AInfo['"),lt[n]=lt[n].replace("branch(","include(").replace(":",";").replace("/","!").replace("*","~"),lt[n]=lt[n].replace("}","']")),aa.print((r?"\t":"")+lt[n].trim()+";")}if(r&&l[2]){aa.print("\t} else {"),l[2].indexOf("disableTokens=true")&&(t=!0),l[2].indexOf("disableTokens=false")&&(t=!1),lt=l[2].trim().split(";");for(var n in lt)t||(lt[n]=lt[n].replace("{","AInfo['"),lt[n]=lt[n].replace("branch(","include(").replace(":",";").replace("/","!").replace("*","~"),lt[n]=lt[n].replace("}","']")),aa.print("\t"+lt[n].trim()+";")}}r&&aa.print("\t}")}}var b=aa.proxyInvoker.newInstance("com.accela.aa.aamain.systemConfig.BizDomainBusiness").getOutput();bl=b.getRBizDomains(aa.getServiceProviderCode()).toArray();for(i in bl)bl[i].getType()&&bl[i].getType().equals("EMSE")&&(aa.print(bl[i].getBizDomain().replace(":",";").replace("/","!").replace("*","~")+"^`"),aa.print("/*\tScript conversion from EMSE [Stand Choice Name]"),aa.print("\tChange Log"),aa.print("\t\t[Name Date] - Initial conversion"),aa.print("*/"),convert(bl[i]),aa.print("`^"));
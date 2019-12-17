var TypeString = java.lang.String;
Logger.nativeLogger = java.lang.Class.forName("zhekasmirnov.launcher.api.log.DialogHelper", true, UI.getContext().getClass().getClassLoader()),
Logger.formateLog = Logger.nativeLogger.getMethod("getFormattedLog");
Logger.showLog = function () {
	Logger.nativeLogger.getMethod("openFormattedDialog", TypeString, TypeString).invoke(null, Logger.formateLog.invoke(null), "InnerCore Logger 2.0:");
}
Logger.nLog = function(m, p, color1, color2){
	Logger.Log("</font><font color='"+color2+"'>"+p, "</font><font color='"+color1+"'>"+m);
}
Debug.debugThis = function (func) {
	try {
		func();
	} catch (e) {
		Logger.LogError(e);
	}
}
// Debug.debugThis(function(){
	// Logger.nLog("Test", "test", "#c93e34", "#33cc34");
// })
// Logger.showLog();
var Str = java.lang.String,
	firstStart = __config__.getBool("firstStart");
function endFont() {
	return "</font>";
}
function font(color, size) {
	return "<font size='" + size + "' color='" + color + "'>"
}
Logger.nativeLogger = java.lang.Class.forName("zhekasmirnov.launcher.api.log.DialogHelper", true, UI.getContext().getClass().getClassLoader()),
	Logger.formateLog = Logger.nativeLogger.getMethod("getFormattedLog");
Logger.showLog = function (type) {
	Logger.nativeLogger.getMethod("openFormattedDialog", Str, Str).invoke(null, Logger.formateLog.invoke(null), (type == 'error' ? 'Mod ERROR' : "Full InnerCore Log:"));
}
function Log(message, prefix, color1, color2) {
	var p = '', m = '', color = [
		(endFont() + font("#777777")),
		(color1 ? endFont() + font(color1) : ''),
		(color2 ? endFont() + font(color2, 5) : '')
	];
	if (Array.isArray(message))
		for (let i in message)
			m += message[i] + (i != (message.length - 1) ?
				(color[0] + ', ' + color[1]) : (color[0] + ';'));
	else m = message;

	if (Array.isArray(prefix))
		for (let i in prefix)
			p += ' ' + prefix[i] + (i != (prefix.length - 1) ?
				(color[0] + " ] -•- [ " + color[2]) : ' ');
	else p = ' ' + prefix + ' ';

	Logger.Log(color[1] + (m ? m : "Log Message"), color[2] + (p ? p : "Log Prefix") + color[0]);
}
function LogWarning(err, message, prefix, line) {
	if (line && err) prefix.push(err.fileName + '#' + err.lineNumber)
	Log(message, prefix, '#f9A602', '#f9A602')
}
function LogError(err, prefix, line) {
	Log(line ? [err.fileName + '#' + err.lineNumber, err.message] : err.message, prefix, '#ff0000', '#ff0000')
	Logger.showLog('error');
}
var log = Log;
Callback.addCallback("NativeCommand", function (str) {
	if (str == '/log') {
		Game.prevent()
		Logger.showLog()
	}
});
// Debug.debugThis(function(){
	// Log(['Message 1', 'Message 2', 'Message 3'], ['Prefix 1', 'Prefix 2', 'Prefix 3'], '#ffaa00', '#376e75');
	// Log(null, null, 'ffaa00', '#376e75')
// });
// Logger.showLog();
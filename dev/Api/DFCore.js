ModAPI.registerAPI("DFCore", {
	Spirit: Spirit,
	TradeAPI: Trade,
	Talisman: Talisman,
	MediumRegistry: Medium,
	Logging: Logging,
	Parser: Parser,
	TileThreading: TileThreading,
	requireGlobal: function(command){
		return eval(command);
	}
});

Log("Divine Favor API shared with name DFCore.", "API");

var
	DP_ = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, UI.getContext().getResources().getDisplayMetrics()),
	ctx_ = UI.getContext(),
	DecorView_ = UI.getContext().getWindow().getDecorView(),
	Button_ = android.widget.Button,
	ToggleButton_ = android.widget.ToggleButton,
	TextView_ = android.widget.TextView,
	ImageView_ = android.widget.ImageView,
	View_ = android.view.View,
	Toast_ = android.widget.Toast,
	LinearLayout_ = android.widget.LinearLayout,
	RelativeLayout_ = android.widget.RelativeLayout,
	LayoutParams_ = android.widget.RelativeLayout.LayoutParams,
	WRAP_ = LayoutParams_.WRAP_CONTENT,
	PARENT_ = LayoutParams_.MATCH_PARENT,
	VERTICAL_ = LinearLayout_.VERTICAL,
	HORIZONTAL_ = LinearLayout_.HORIZONTAL,
	FrameLayout_ = android.widget.FrameLayout,
	PopupWindow_ = android.widget.PopupWindow,
	OnDismissListener_ = android.widget.PopupWindow.OnDismissListener,
	OnCheckedChangeListener_ = android.widget.CompoundButton.OnCheckedChangeListener,
	WIDTH_ = UI.getContext().getScreenWidth(),
	HEIGHT_ = UI.getContext().getScreenHeight(),
	ScrollView_ = android.widget.ScrollView,
	HorizontalScrollView_ = android.widget.HorizontalScrollView,
	SeekBar_ = android.widget.SeekBar,
	EditText_ = android.widget.EditText,
	GONE_ = android.view.View.GONE,
	VISIBLE_ = android.view.View.VISIBLE,
	INVISIBLE_ = android.view.View.INVISIBLE,
	OnTouchListener_ = android.view.View.OnTouchListener,
	OnClickListener_ = android.view.View.OnClickListener,
	MotionEvent_ = android.view.MotionEvent,
	Gravity_ = android.view.Gravity,
	TOP_ = android.view.Gravity.TOP,
	BOTTOM_ = android.view.Gravity.BOTTOM,
	LEFT_ = android.view.Gravity.LEFT,
	RIGHT_ = android.view.Gravity.RIGHT,
	CENTER_ = android.view.Gravity.CENTER,
	ViewGroup_ = android.view.ViewGroup,
	AlertDialog_ = android.app.AlertDialog,
	Intent_ = android.content.Intent,
	Uri_ = android.net.Uri,
	Bitmap_ = android.graphics.Bitmap,
	Canvas_ = android.graphics.Canvas,
	Paint_ = android.graphics.Paint,
	Drawable_ = android.graphics.drawable.Drawaable,
	BitmapDrawable_ = android.graphics.drawable.BitmapDrawable,
	ColorDrawable_ = android.graphics.drawable.ColorDrawable,
	Typeface_ = android.graphics.Typeface,
	Color_ = android.graphics.Color,
	BitmapFactory_ = android.graphics.BitmapFactory,
	PorterDuffColorFilter_ = android.graphics.PorterDuffColorFilter,
	PorterDuff_ = android.graphics.PorterDuff,
	File_ = java.io.File,
	BufferedInputStream_ = java.io.BufferedInputStream,
	FileInputStream_ = java.io.FileInputStream,
	InputStream_ = java.io.InputStream,
	BufferedImage_ = java.awt.image.BufferedImage,
	Runnable_ = java.lang.Runnable,
	DownloadManager_ = android.app.DownloadManager,
	Base64_ = android.util.Base64,
	Thread_ = java.lang.Thread
function DebugThis(func, name) {
	UI.getContext().runOnUiThread(new java.lang.Runnable({
		run() {
			// Logger.Log('Debugging', ' DebugThis ' + ((name + ' ') || ''))
			Log(((name + ' ') || 'Function without name'), ' DebugThis ')
			try {
				func()
			} catch (e) {
				Log(e.name + ': [' + e.message + ']', " ERROR: " + e.fileName + '#' + e.lineNumber + ' ')
			}
		}
	}))
}
function GenerateKey() {
	return Math.random().toString(36).substring(7)
}
var Parser = {
	tCount: 0,
	addT() {
		let i = 0, text = ''
		while (i < this.tCount) {
			text += ' '
			i++
		}
		return text
	},
	get(OBJECT_NAME, isVAR, name) {
		if (OBJECT_NAME == null || OBJECT_NAME == undefined) return ""
		var isOBJ = (typeof OBJECT_NAME !== "object")
		var isARR = (Array.isArray(OBJECT_NAME))
		var text = (isOBJ ? ('\n' + name + ': {\n') : (isARR ? (isVAR ? 'var ' + name + ' = [\n' : '[\n') : (isVAR ? ('var ' + name + ' = {\n') : '{\n')))
		this.tCount++
		var OBJECT_VALUE = eval(OBJECT_NAME)
		try {
			for (var i in OBJECT_VALUE) {
				var code = OBJECT_VALUE[i]
				if (typeof code === "object") {
					code = this.get(OBJECT_VALUE[i], false, i)
				} else if (typeof code === 'string')
					code = "'" + OBJECT_VALUE[i] + "'"
				text += this.addT()
				if (!Array.isArray(OBJECT_NAME))
					text += i + ": " + code + ',\n'
				else text += code + ', /*' + i + '*/\n'
			}
		} catch (e) {
			// this.get(i)
			Logger.Log(e, "ERROR: " + i)
		}
		this.tCount--
		text += this.addT() + ((Array.isArray(OBJECT_NAME)) ? ']' : '}')
		Logger.Log(text, name)
		return text
	}
}
var Aimgs = {
	log: "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAF8SURBVFhHxZcNkYMwEIWXc1AkcBLOApXAWaiEaqiEakDCYaEWkIAFLi/NtkmahfCz7TeTspMw2c17YWdajONIEhcieXEhZ6LChQFf7vnCnsmBtF+ygL2TM6l9RQXmMJIG49L15neesu2CIpJ3QE2BtnMR0dDU9k6sVmApfnLASswqAHl9zNrLnATetc8oOQMV1C2QkgMUoGrBVHJmkQW+/GV064e6ctEd4zENPyZoj1RWf/fJCDULck4OVCzITc5kW+BLfjZyS41nqBLzxgYQW7GrBUtPDnazYE1yJssCyD8p++3bRY7Gk9rJD3a3YMvJwSYLtiZnrALF6bT40kkc6sY+bRPySTQklT7AlLdoCN0wKGC8Xl30PtQUgAVDf3wMiawCoEysDs+l1gDLzkNitgBsbi6pHZzIn8PYgp4F/a+Lpgk+w1hKPh3P+6eV3uXPMIdHJ+QC1sKWgLcUIJ0efEQBn1UFxMT/XrQQWzEWXKgG5xA/Q80innsT/QMbMetiECyDAwAAAABJRU5ErkJggg==",
	move: "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAEdSURBVFhH7VfLDoMgEMT+X3toj+3n9dpLf9C6G5bggro7YEwTJyEQgZ3hMasO4ziGBsjkIdZuXGKNIFcOrwIVUCOERCAC1ojcIrwCLAQuEV4B6bLdHq/YKttTMYtAjmDICTOk59/P2+4KsmFDYVzvT6pq/ZsFdUE3nAJqAtxedqCIrQXIgD1EVGPnAmYdHi8DSLFFgCaPra7QuYE56XW850o3cbgL5IMEOoIp5XLtHS+gefkXkT4KSz7nORTIkP+ri8yPYBZgGqAFdYOQk2h9B1iEDOiMWWzZsdol5A7DliIoY9MdaCiM83Xcgr8UQPasWXTp+Sq8v2bWwWYHeXdgMzD53JPEkCNYFKGTjAXoJSwIEHJCiwsSEUoeQgg/H7AdQ/sAbHkAAAAASUVORK5CYII=",
	exit: "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAEqSURBVFhHxZcBkoMgDEWlN+5F6pGpv5CCkEAScXwzjp3dNe+NonVDjHF7knNACH1NjCF/sqGc9cp7/gAg/XyEYVYKmEksEcZZ5QzM0EQoQ/fq7/QBYCRQygmKsAUATmSU19gDQC28IAcpwHOrQeyQ73lPlDPgvd8NtHJwvgQ3RrTyd3b1a+CGCEkO+EW4MGIkB3wAWBAxkwM5AFyI0MjBOGARkvwHvo7FDb++sH2wPz6NNvmF5OIT7s/kMvKXYJUcTGb1ASvlxGDmOeAOOSHMLgF3ygnGkQIcctzn7b2uonHxi3BCLfZE+F/JDtgnnOOJ6XolY+WEIwKoA4ZywhGRAiYHquSEcVY5A8KBJjmhnAW674J6hbao5BWaWd0akCRWOdDMevjf8237ArFY21e0301rAAAAAElFTkSuQmCC",
}
/**
 * Experemental deleting tick and init new Thread 
 * with tick() function, more stable!
 * @param {Number} id идентификатор блока
 * @param {Number} upTime - время задержки в милисекундах
 * @param {{}} prototype прототип описания TileEntity
 */
var TileThreading = {
	TileList: [],
	TICKING: false,
	InitThis(this_) {
		var key = this_.data.TTKEY_
		if (!key || key == "") key = GenerateKey()
		Log('TTKEY: "' + key + '" at [' + this_.x + "," + this_.y + "," + this_.z + "];", " Tile ADDED ")
		TileThreading.TileList[key] = this_
		return key
	},
	DestroyThis(this_) {
		var key = this_.data.TTKEY_
		Log('TTKEY: "' + key + '" at [' + this_.x + "," + this_.y + "," + this_.z + "];", " Tile DELETED ")
		delete TileThreading.TileList[key]
		// return key
	},
	RunTicking() {
		TileThreading.TICKING = true
		Log("Running ticking Thread", " Tile Threading ")
	},
	StopTicking() {
		TileThreading.TICKING = false
		TileThreading.TileList = []
		Log("Stopping and clearing Tile Thread", " Tile Threading ")
	},
	StartThread() {
		Log("Starting New Ticking Tile Thread", " Tile Threading ")
		DebugThis(function () {
			new java.lang.Thread(function () {
				while (TileThreading.TICKING) {
					for (let KEY in TileThreading.TileList)
						TileThreading.TileList[KEY].ticking()
					java.lang.Thread.sleep(50)
				}
			}).start()
		}, 'Tile Threading')
	}
}

Callback.addCallback("LevelLoaded", function () {
	TileThreading.RunTicking()
})
Callback.addCallback("LevelLeft", function () {
	TileThreading.StopTicking()
})
TileThreading.StartThread()

// Tile(id, prototype) {
// 	TileEntity.registerPrototype(id, prototype)
// var p = TileEntity.getPrototype(id)
// // Log(Parser.get(p, true, 'TileENT'), "DEBUG")
// var init = p.init
// // var tick = p.tick
// var destroy = p.destroy
// p.defaultValues.key = ""
// p.ticking = p.tick
// p.tick = function () {}
// p.init = function () {
// 	DebugThis(function () {
// 		if (p.data) {
// 			let KEY = GenerateKey()
// 			p.data.key = KEY
// 			TileThreading.TileList[KEY] = p
// 			if (init) init()
// 		}
// 	}, 'Tile Init')
// }
// p.destroy = function () {
// 	DebugThis(function () {
// 		// p.data.key
// 		delete TileThreading.TileList[p.data.key]
// 		if (destroy) destroy()
// 	}, 'Tile Destroy')
// }
// },
// THREADLIST[prototype.data.] = this





// var ticking = prototype.ticking
// // prototype.tick = function () {}
// if (prototype.init) {
// 	var init = prototype.init
// 	prototype.init = function () {
// 		alert("Old init")
// 		new Thread_(function () {
// 			ticking()
// 			Thread_.sleep(upTime || 50)
// 		})
// 		init()
// 	}
// } else
// 	prototype.init = function () {
// 		alert("New init")
// 		new Thread_(function () {
// 			ticking()
// 			Thread_.sleep(upTime || 50)
// 		})
// 	}
// TileEntity.registerPrototype(id, prototype)
// }


var mc_typeface = Typeface_.createFromFile(new File_(FileTools.root + "games/com.mojang/innercore/mc-typeface.ttf"))
var scaling = __config__.access("interface.scaling") || 1
function resize(value, isWidth) {
	return isWidth
		? (value * scaling / 800 * WIDTH_)
		: (value * scaling / 480 * HEIGHT_)
}

// WIDGET - TEXTVIEW
var TextView = function () {
	this.TextView = new TextView_(ctx_)
	return this
}
TextView.prototype = {
	setText(text) {
		this.TextView.setText(text || "")
		return this
	},
	setTextSize(size) {
		this.TextView.setTextSize(resize(size))
		return this
	},
	setTextColor(color) {
		this.TextView.setTextColor(color || Color_.WHITE)
		return this
	},
	setGravity(gravity) {
		this.TextView.setGravity(gravity || Gravity_.left)
		return this
	},
	setTypeface(font) {
		this.TextView.setTypeface(font || mc_typeface)
		return this
	},
	setLayoutParams(p1, p2) {
		this.TextView.setLayoutParams(new LayoutParams_(p1, p2))
		return this
	},
	setOnClickListener(click) {
		this.TextView.setOnClickListener(click)
		return this
	},
	get() {
		return this.TextView
	}
}

// GRAPHICS - BITMAP
var Bitmap = function () {
	return this
}
Bitmap.prototype = {
	fromFile(path, scale) {
		path = __dir__ + path
		if (path && new File_(path).exists()) {
			var img = FileTools.ReadImage(path)
			this.img = new BitmapDrawable_(
				new Bitmap_.createScaledBitmap(
					new Bitmap_.createBitmap(
						img, 0, 0, img.getWidth(), img.getHeight()
					),
					img.getWidth() * (scale || 1),
					img.getHeight() * (scale || 1),
					false
				)
			)
		}
		return this
	},
	decode(data, sizeX, sizeY, scale) {
		data = Base64_.decode(data, 0)
		var scale = {
			x: (sizeX || 32) * (scale || 1),
			y: (sizeY || 32) * (scale || 1)
		}
		var decodedBitmap = BitmapFactory_.decodeByteArray(data, 0, data.length)
		// var bmp = Bitmap.createBitmap(decodedBitmap, scale.x, scale.y);
		// new android.graphics.Canvas(bmp).drawBitmap(decodedBitmap, 0, 0, null);
		this.img = new Bitmap_.createScaledBitmap(decodedBitmap, scale.x, scale.y, false)
		// new BitmapDrawable(

		// ) || null
		return this
	},
	get() {
		return this.img || (null && alert("NO U"))
	}
}

// WIDGET - IMAGEVIEW
var ImageView = function () {
	this.ImageView = new ImageView_(ctx_)
	return this
}
ImageView.prototype = {
	setImageDrawable(path, scale) {
		this.ImageView.setImageDrawable(new Bitmap().fromFile(path, scale).get())
		return this
	},
	setImageBitmap(bitmap) {
		this.ImageView.setImageBitmap(bitmap)
		return this
	},
	setLayoutParams(p1, p2) {
		this.ImageView.setLayoutParams(new LayoutParams_(p1, p2))
		return this
	},
	setClick(click, ret) {
		this.ImageView.setOnClickListener(function () {
			DebugThis(function () {
				click()
			}, 'ImageView OnClick')
			return ret || true
		})
		return this
	},
	setLongClick(click, ret) {
		this.ImageView.setOnLongClickListener(function () {
			DebugThis(function () {
				click()
			}, 'ImageView OnLongClick')
			return ret || true
		})
		return this
	},
	setOnTouchListener(touch) {
		this.ImageView.setOnTouchListener(touch)
		return this
	},
	get() {
		return this.ImageView
	}
}

// WIDGET - BUTTON
var Button = function () {
	this.Button = new Button_(ctx_)
	this.Button.setTypeface(mc_typeface)
	return this
}
Button.prototype = {
	setText(text) {
		this.Button.setText(text || "")
		return this
	},
	setTextSize(size) {
		this.Button.setTextSize(resize(size))
		return this
	},
	setTextColor(color) {
		this.Button.setTextColor(color || Color.WHITE)
		return this
	},
	setTypeface(font) {
		this.Button.setTypeface(font != null ? font : null)
		return this
	},
	clearTypeface() {
		this.Button.setTypeface(null)
		return this
	},
	setLayoutParams(p1, p2) {
		this.Button.setLayoutParams(new LayoutParams_(p1, p2))
		return this
	},
	setOnClickListener(click) {
		this.Button.setOnClickListener(click)
		return this
	},
	setOnLongClickListener(click) {
		this.Button.setOnLongClickListener(click)
		return this
	},
	setOnTouchListener(touch) {
		this.Button.setOnTouchListener(touch)
		return this
	},
	// setOnTouchListener(){
	// 	new OnTouchListener_() {
	// 		onTouch: function (view, event) {
	// 			if (event.getAction() == MotionEvent.ACTION_DOWN) {
	// 				mx = event.getRawX();
	// 				my = event.getRawY();
	// 			} else if (event.getAction() == MotionEvent.ACTION_MOVE) {
	// 				var _x = event.getRawX();
	// 				var _y = event.getRawY();

	// 				if (Math.abs(mx - _x) < 10 || Math.abs(my - _y) < 10) {
	// 					return false;
	// 				}

	// 				__window.update(WIDTH - _x - 20 * DP, HEIGHT - _y - 20 * DP, 45 * DP, 45 * DP);
	// 				_moving = true;
	// 			} else if (event.getAction() == MotionEvent.ACTION_UP) {
	// 				if (_moving) {
	// 					_moving = false;
	// 					return true;
	// 				}
	// 			}
	// 			return false;
	// 		}
	// 	}
	// },
	get() {
		return this.Button
	}
}

// WIDGET - SCROLLVIEW
var ScrollView = function () {
	this.ScrollView = new ScrollView_(ctx_)
	return this
}
ScrollView.prototype = {
	setLayoutParams(p1, p2) {
		this.ScrollView.setLayoutParams(new LayoutParams_(p1, p2))
		return this
	},
	addView(view) {
		this.ScrollView.addView(view)
		return this
	},
	multiAddView(gt, viewList) {
		for (let i in viewList)
			if (!gt)
				this.addView(viewList[i].get())
			else
				this.addView(viewList[i])
		return this
	},
	setOnClickListener(click) {
		this.ScrollView.setOnClickListener(click)
		return this
	},
	get() {
		return this.ScrollView
	}
}

// WIDGET - HORIZONTAL-SCROLLVIEW
var HScrollView = function () {
	this.HScrollView = new HorizontalScrollView_(ctx_)
	return this
}
HScrollView.prototype = {
	setLayoutParams(p1, p2) {
		this.HScrollView.setLayoutParams(new LayoutParams_(p1, p2))
		return this
	},
	addView(view) {
		this.HScrollView.addView(view)
		return this
	},
	setOnClickListener(click) {
		this.HScrollView.setOnClickListener(click)
		return this
	},
	get() {
		return this.HScrollView
	}
}

// WIDGET LINEARLAYOUT
var Linear = function () {
	this.padding = {
		TOP: 0,
		LEFT: 0,
		BOTTOM: 0,
		RIGHT: 0
	}
	this.margin = {
		TOP: 0,
		LEFT: 0,
		BOTTOM: 0,
		RIGHT: 0
	}
	this.views = {}
	this.LinearLayout = new LinearLayout_(ctx_)
	// this.LinearLayout.setLayoutParams(new LayoutParams(WRAP, WRAP))
	return this
}
Linear.prototype = {
	setLayoutParams(p1, p2) {
		this.LinearLayout.setLayoutParams(new LayoutParams_(p1, p2))
		return this
	},
	setOrientation(orientation) {
		this.LinearLayout.setOrientation(orientation ? orientation : HORIZONTAL_)
		return this
	},
	addView(view) {
		this.LinearLayout.addView(view)
		return this
	},
	multiAddView(gt, viewList) {
		for (let i in viewList) {
			if (!gt)
				this.addView(viewList[i].get())
			else
				this.addView(viewList[i])
			this.views[i] = viewList[i]
		}
		return this
	},
	getParams() {
		return this
	},
	setGravity(gravity) {
		this.LinearLayout.setGravity(gravity || CENTER)
		return this
	},
	setOnClickListener(click) {
		this.LinearLayout.setOnClickListener(click)
		return this
	},
	get() {
		return this.LinearLayout
	}
}

// WIDGET POPUPWINDOW
var Window = function () {
	this.PopupWindow = new PopupWindow_(ctx_)
	this.location = {x: 0, y: 0}
	return this
}
Window.prototype = {
	setWidth(width) {
		this.PopupWindow.setWidth(width)
		return this
	},
	setHeight(height) {
		this.PopupWindow.setHeight(height)
		return this
	},
	setContentView(view) {
		this.PopupWindow.setContentView(view)
		return this
	},
	setFocusable(bool) {
		this.PopupWindow.setFocusable(bool)
		return this
	},
	setGravity(gravity) {
		this.gravity = gravity
		return this
	},
	getLocation() {
		return this.location
	},
	setLocation(x, y) {
		this.location.x = x
		this.location.y = y
		return this.location
	},
	showAtLocation(x, y, parent) {
		var window = this.PopupWindow,
			gravity = this.gravity
		this.location = {x: x || 0, y: y || 0}
		DebugThis(function () {
			window.showAtLocation(parent || DecorView_, gravity || CENTER_, x || 0, y || 0)
		}, 'showAtLocation')
		return this
	},
	setBackgroundDrawable(path, scale) {
		this.PopupWindow.setBackgroundDrawable(new Bitmap().file(path).scale(scale).get())
		return this
	},
	setOnClickListener(click) {
		this.PopupWindow.setOnClickListener(click)
		return this
	},
	dismiss() {
		this.PopupWindow.dismiss()
		return this
	},
	get() {
		return this.PopupWindow
	}
}

// WIDGET - EDITTEXT
var EditText = function () {
	this.EditText = new EditText_(ctx_)
	return this
}
EditText.prototype = {
	setText(text) {
		this.EditText.setText(text || "")
		return this
	},
	setTextSize(size) {
		this.EditText.setTextSize(resize(size))
		return this
	},
	setTextColor(color) {
		this.EditText.setTextColor(color || Color_.WHITE)
		return this
	},
	setGravity(gravity) {
		this.EditText.setGravity(gravity || Gravity_.left)
		return this
	},
	setTypeface(font) {
		this.EditText.setTypeface(font || mc_typeface)
		return this
	},
	setLayoutParams(p1, p2) {
		this.EditText.setLayoutParams(new LayoutParams_(p1, p2))
		return this
	},
	setHint(hint) {
		this.EditText.setHint(hint)
		return this
	},
	setSingleLine(bool) {
		this.EditText.setSingleLine(bool)
		return this
	},
	setInputType(type) {
		this.EditText.setInputType(type)
		return this
	},
	setBackgroundDrawable(path, scale) {
		this.EditText.setBackgroundDrawable(new Bitmap().file(path).scale(scale).get())
		return this
	},
	setHintTextColor(color) {
		this.EditText.setHintTextColor(color || this.color.RED)
		return this
	},
	setOnClickListener(click) {
		this.EditText.setOnClickListener(click)
		return this
	},
	get() {
		return this.EditText
	}
}
var Logging = {
	windowPrefs: {
		moving: false
	},
	Window: new Window().setGravity(TOP_ | LEFT_).setContentView(//.setWidth(300).setHeight(300)
		new Linear().setLayoutParams(PARENT_, PARENT_).setOrientation(HORIZONTAL_).multiAddView(false, [
			new ImageView().setImageBitmap(new Bitmap().decode(Aimgs.log, 32, 32, 2.5).get())
				.setClick(function (view) {
					Logging.Show()
				}),
			new ImageView().setImageBitmap(new Bitmap().decode(Aimgs.move, 32, 32, 2.5).get())
				.setOnTouchListener(function (view, event) {// alert('TOUCH')
					var mCurrentX = Logging.Window.getLocation().x
					var mCurrentY = Logging.Window.getLocation().y
					var _moving = Logging.windowPrefs.moving
					if (event.getAction() == MotionEvent_.ACTION_DOWN) {// alert("DOWN")
						mDx = mCurrentX - Math.round(event.getRawX())
						mDy = mCurrentY - Math.round(event.getRawY())
					} else if (event.getAction() == MotionEvent_.ACTION_MOVE) {// alert("MOVE")
						var location_ = Logging.Window.setLocation(Math.round(event.getRawX() + mDx), Math.round(event.getRawY() + mDy))
						mCurrentX = location_.x
						mCurrentY = location_.y
						Logging.Window.get().update(mCurrentX, mCurrentY, -1, -1)
						moving = true
						// var _x = Math.round(event.getRawX()) // var _y = Math.round(event.getRawY()) // if (Math.abs(mx - _x) < 10 || Math.abs(my - _y) < 10) return false
						// var _window = [Logging.Window.get().getWidth(), Logging.Window.get().getHeight()]
						// Logger.Log('[mx: ' + mDx + ', my: ' + mDy + ']|[cx: ' + mCurrentX + ', cy: ' + mCurrentY + ']|[wx: ' + _window[0] + ', wy: ' + _window[1] + ']')
					} else if (event.getAction() == MotionEvent_.ACTION_UP) {// alert("UP")
						if (moving) {
							moving = false
							return false
						}
					}
					return true
				}),
			new ImageView().setImageBitmap(new Bitmap().decode(Aimgs.exit, 32, 32, 2.5).get())
				.setLongClick(function (view) {
					Logging.Window.dismiss()
					return true
				})
		]).get()
	),
	endFont() {
		return "</font>"
	},
	font(color, size) {
		return "<font size='" + size + "' color='" + color + "'>"
	},
	nativeLogger: java.lang.Class.forName("zhekasmirnov.launcher.api.log.DialogHelper", true, ctx_.getClass().getClassLoader()),
	formateLog() {
		return this.nativeLogger.getMethod("getFormattedLog")
	},
	openFormattedLog() {
		return this.nativeLogger.getMethod("openFormattedDialog", java.lang.String, java.lang.String)
	},
	Show(type) {
		this.openFormattedLog().invoke(null, this.formateLog().invoke(null),
			(type == 'error' ? 'Mod ERROR' : "Full InnerCore Log:")
		)
	}
}
// Logger.nativeLogger =
// 	Logger.
// 		Logger.Show = function (type) {
// 			Logger.
// }
function Log(message, prefix/*, color1, color2*/) {
	var p = '', m = ''
	// color = [
	// 	(Logging.endFont() + Logging.font("#777777")),
	// 	(color1 ? Logging.endFont() + Logging.font(color1) : ''),
	// 	(color2 ? Logging.endFont() + Logging.font(color2, 5) : '')
	// ]
	if (Array.isArray(message))
		for (let i in message)
			m += message[i] + ((i != (message.length - 1) ? ',\n' : ';'))
	// (color[0] + ', ' + color[1]) : (color[0] + ';'))
	else m = message

	if (Array.isArray(prefix))
		for (let i in prefix)
			p += ' ' + prefix[i] + (i != (prefix.length - 1) ? ' ] >-< [ ' : ' ')
	// (color[0] + " ] -•- [ " + color[2]) : ' ')
	else p = ' ' + prefix + ' '

	// Logger.Log(color[1] + (m ? m : "Log Message"), color[2] + (p ? p : "Log Prefix") + color[0])
	Logger.Log((m ? m : "Log Message"), (p ? p : "Log Prefix"))
}
function LogWarning(err, message, prefix, line) {
	if (line && err) prefix.push(err.fileName + '#' + err.lineNumber)
	Log(message, prefix/*, '#f9A602', '#f9A602'*/)
}
function LogError(err, prefix, line) {
	Log(line ? [err.fileName + '#' + err.lineNumber, err.message] : err.message, prefix/*, '#ff0000', '#ff0000'*/)
	Logging.Show('error')
}
var log = Log
Callback.addCallback("ClientChat", function (str) {
	switch (str) {
		case 'log': case 'Log': case '/log': case '/Log':
			Logging.Show()
			break
		default: break
	}
})

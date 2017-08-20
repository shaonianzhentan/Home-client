const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const fs = require('fs')

// Specify flash path, supposing it is placed in the same directory with main.js.
let pluginName = 'libpepflashplayer.so'
/*
switch (process.platform) {
  case 'win32':
    pluginName = 'pepflashplayer.dll'
    break
  case 'darwin':
    pluginName = 'PepperFlashPlayer.plugin'
    break
  case 'linux':
    pluginName = 'libpepflashplayer.so'
    break
}
*/
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))

// Optional: Specify flash version, for example, v17.0.0.169
app.commandLine.appendSwitch('ppapi-flash-version', '25.0.0.148')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow =  new BrowserWindow({
    width: 800,
    height: 600,
	alwaysOnTop: true,
	fullscreen:true,
	autoHideMenuBar:true,
	webSecurity:false,
	allowDisplayingInsecureContent:true,	
	allowRunningInsecureContent:true,
    webPreferences: {
      plugins: true
    }	
  })

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  
  let contents = mainWindow.webContents;

  //contents.enableDeviceEmulation({screenPosition:'mobile'});

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
  
  
 

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//获取本地IP地址
function getIPAdress(){  
    var interfaces = require('os').networkInterfaces();  
    for(var devName in interfaces){  
          var iface = interfaces[devName];  
          for(var i=0;i<iface.length;i++){  
               var alias = iface[i];  
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                     return alias.address;  
               }  
          }  
    }  
}

//console.log('----------local host: '+getIPAdress());


ipcMain.on('system', (event, arg) => {
	switch(arg){
		case 'capturePage':
			 mainWindow.capturePage((img)=>{
				
				var fp = '/home/pi/node/pi/screenshots.png';
				fs.writeFile(fp, img.toJPEG(90), (err) => {
				   event.sender.send('capturePage',fp);
				});
				//event.sender.send('capturePage',img.toJPEG(90).toString('base64'));
			 });
		break;
		case 'GetIP':
			var ip = getIPAdress();
			console.log(ip);
			event.sender.send('GetIP',ip);
		break;
		case 'dev':
			mainWindow.webContents.toggleDevTools()
		break;
		case 'openDev':
			mainWindow.webContents.openDevTools()
		break;
		case 'closeDev':
			mainWindow.webContents.closeDevTools()
		break;
		case 'top':
			mainWindow.setAlwaysOnTop(true)
		break;
	}
})

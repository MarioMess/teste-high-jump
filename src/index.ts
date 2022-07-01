import { app, BrowserWindow, ipcMain } from "electron";
import { useState } from "react";
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
import { ConfigDB } from "./app/config/database";
import { State } from "./app/views/home";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) { 
  app.quit();
}

const createWindow = (): void => {
 const mainWindow:BrowserWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });  

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.webContents.openDevTools();
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle("GET_PRODUCTS", async (e) => {
  const connection = await ConfigDB.dbConnection(); 
  const tasks = await connection.asPromise();
  e.returnValue("GET_PRODUCTS", JSON.stringify(tasks));  
});
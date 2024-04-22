// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;

use tauri::App;

mod login;

fn main() {
    tauri::Builder::default()
        .setup(|app| Ok(setup(app)))
        .invoke_handler(login::generate_handler())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn setup(app: &App) {
    create_cache_dir(&app)
}

fn create_cache_dir(app: &App) {
    let message = "创建缓存目录失败";
    let dir = app.path_resolver().app_cache_dir().expect(message);
    match std::fs::metadata(&dir) {
        Ok(_) => {}
        Err(_) => { std::fs::create_dir(dir).expect(message) }
    }
    return;
}
use tauri::{App, Manager};

use crate::command::{get_login_cache, login};

mod command;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            login,
            get_login_cache
        ])
        .setup(|app| Ok(setup(app)))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn setup(app: &mut App) {
    app.app_handle();
    return;
}
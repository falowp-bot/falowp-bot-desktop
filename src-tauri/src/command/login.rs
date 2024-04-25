use serde::{Deserialize, Serialize};
use sled::{Config, Db};
use tauri::{AppHandle, Manager};

use crate::window::{close_login_window, open_main_window};

//登录
#[tauri::command]
pub fn login(server_url: &str, password: &str, app_handle: AppHandle) -> String {
    open_main_window(&app_handle);
    close_login_window(&app_handle);
    set_login_cache(&server_url, &password, &app_handle);
    return "".to_string();
}

//获取登录缓存
#[tauri::command]
pub fn get_login_cache(app_handle: AppHandle) -> LoginCache {
    let db = db(&app_handle);
    let mut server_url = String::from("");
    let mut password = String::from("");
    if let Ok(Some(value)) = db.get("server_url") {
        server_url = std::str::from_utf8(&*value).unwrap().to_string();
    }
    if let Ok(Some(value)) = db.get("password") {
        password = std::str::from_utf8(&*value).unwrap().to_string();
    }
    return LoginCache { server_url, password };
}

#[derive(Serialize, Deserialize)]
pub struct LoginCache {
    pub(crate) server_url: String,
    pub(crate) password: String,
}

fn set_login_cache(server_url: &str, password: &str, app_handle: &AppHandle) {
    let db = db(&app_handle);
    db.insert("server_url", server_url).unwrap();
    db.insert("password", password).unwrap();
    return;
}


fn db(app_handle: &AppHandle) -> Db {
    let cache_dir = app_handle.path().app_data_dir().unwrap();
    println!("{:?}", cache_dir);
    let login_cache_path = cache_dir.join("login-cache");
    return Config::default()
        .path(&login_cache_path)
        .open()
        .unwrap();
}

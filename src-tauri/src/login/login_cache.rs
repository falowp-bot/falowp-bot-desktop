use sled::{Config, Db};
use tauri::AppHandle;

//设置登录缓存
#[tauri::command]
pub fn set_login_cache(server_url: &str, password: &str, app_handle: AppHandle) {
    let db = db(&app_handle);
    db.insert("server_url", server_url).unwrap();
    db.insert("password", password).unwrap();
    return;
}

//获取登录缓存
#[tauri::command]
pub fn get_login_cache(app_handle: AppHandle) {
    let db = db(&app_handle);
    println!("{:?}", db);
    let server_url = db.get("server_url").unwrap();
    let password = db.get("password").unwrap();
    println!("{:?}", server_url);
    println!("{:?}", password);
    return;
}

fn db(app_handle: &AppHandle) -> Db {
    let cache_dir = app_handle.path_resolver().app_cache_dir().unwrap();
    let login_cache_path = cache_dir.join("login-cache");
    return Config::default()
        .path(&login_cache_path)
        .open()
        .unwrap();
}

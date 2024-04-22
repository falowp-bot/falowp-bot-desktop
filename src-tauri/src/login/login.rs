use tauri::AppHandle;

use crate::login::login_cache::set_login_cache;

//登录
#[tauri::command]
pub fn login(server_url: &str, password: &str, app_handle: AppHandle) -> String {
    set_login_cache(server_url, password, app_handle);
    println!("{}", server_url);
    return "".parse().unwrap();
}
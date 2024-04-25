use tauri::{AppHandle, Manager};

//关闭登录页
pub fn close_login_window(app_handle: &AppHandle) {
    match app_handle.get_window("login") {
        None => {}
        Some(window) => { window.close().unwrap() }
    }
}
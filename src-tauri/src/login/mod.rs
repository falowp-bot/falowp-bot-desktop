use tauri::{Invoke, Wry};

mod login;
mod login_cache;

pub fn generate_handler() -> impl Fn(Invoke<Wry>) {
    tauri::generate_handler![
        login::login,
        login_cache::get_login_cache,
        login_cache::set_login_cache
    ]
}
use tauri::{AppHandle, WebviewWindowBuilder};

//显示主页
pub fn open_main_window(app_handle: &AppHandle) {
    let window = WebviewWindowBuilder::new(app_handle, "main", Default::default())
        .title("小花落Bot")
        .inner_size(960f64, 600f64)
        .build()
        .unwrap();
    window.show().unwrap();
    window.set_focus().unwrap()
}
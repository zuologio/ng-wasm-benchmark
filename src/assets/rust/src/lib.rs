mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// #[wasm_bindgen]
// extern {
//     fn alert(s: &str);
// }

#[wasm_bindgen]
pub fn init() {
    utils::set_panic_hook()
}

#[wasm_bindgen]
pub fn fibonacci_with_recursion(index: i32) -> i32 {
    if index <= 1 {
        index
    } else {
        fibonacci_with_recursion(index - 1) + fibonacci_with_recursion(index - 2)
    }
}

#[wasm_bindgen]
pub fn fibonacci_with_loop(index: i32) -> i64 {
    if index <= 1 {
        index as i64
    } else {

        let mut last = 0;
        let mut current = 1;
        let mut temp;

        for _x in 2..index+1 {
            temp = current;
            current = last + current;
            last = temp;
        }

        current
    }
}
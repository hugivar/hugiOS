use std::io::{self, Read};
use std::process;

fn initial_print() {
    let mut name = "Egghead";
    println!("Hello, world. My name is {}", name);
}

fn say_name(first: &String, last: &String) {
    println!("first {} and last {}", first, last);
}

fn enter_name() {
    println!("Enter your name");

    let mut name = String::new();

    io::stdin().read_line(&mut name);

    println!("Hello {}", name);
}

fn sum (a: u32, b: u32) -> u32 {
    a + b
}

fn get_number() -> u32 {
    let number: u32;
    let mut value: String = String::new();
    io::stdin().read_line(&mut value);

    match value.trim().parse() {
        Ok(val) => { number = val},
        Err(err) => { 
            println!("Not a valid number");
            process::exit(0);
        }
    };

    number;
}

fn gather_sum() {
    loop {
        println!("What is the first number");
        let a:u32 = get_number();

        println!("What is the second number");
        let b:u32 = get_number();

        let total = sum(a, b);
        println!("Sum of {} and {} is {}", a, b, total)
    }
}

fn main() {
    // initial_print();

    // enter_name();

    // let first_name: &String = &"Alice".to_string();
    // let last_name: &String = &"Smith".to_string();

    // say_name(first_name, last_name);
    // say_name(first_name, last_name);

    gather_sum();
}

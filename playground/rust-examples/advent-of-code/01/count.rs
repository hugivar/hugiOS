use std::fs;
use std::io;
use std::io::BufRead;

fn main() -> io::Result<()> {
    let file = fs::File::open("input.txt")?;
    let reader = io::BufReader::new(file);

    let mut current = 0;
    let mut max = 0;

    for line in reader.lines() {
        let line = line?;

        if line.is_empty() {
            if current > max {
                max = current;
            }
            
            current = 0;
            continue;
        }

        match line.parse::<i32>() {
            Ok(number) => {
                current += number;
            },
            Err(error) => {
                println!("Error: {}", error);
                continue;
            }
        }
    };

    println!("Max value is {}", max);

    return Ok(());
}
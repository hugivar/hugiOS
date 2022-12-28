use std::io;
use std::fs;
use std::io::BufRead;

fn main() -> io::Result<()> {
    let file = fs::File::open("input.txt")?;
    let reader = io::BufReader::new(file);

    let mut counts = Vec::new();
    let mut current = 0;

    for line in reader.lines() {
        let line = line?;

        if line.is_empty() {
            counts.push(current);
            current = 0;

            continue;
        }

        match line.parse::<i32>() {
            Ok(number) => {
                current += number;
                continue;
            },
            Err(error) => {
                println!("Error {}", error);
                continue;
            }
        };
    };

    counts.sort_by(|a, b| b.cmp(a));

    let top_three = &counts[0..3];
    let mut sum = 0;
    for number in top_three {
        println!("number {}", number);
        sum += number;
    }

    println!("sum {}", sum);
    Ok(())
}
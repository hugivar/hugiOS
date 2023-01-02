use std::io;
use std::fs;
use std::io::BufRead;

fn main() -> io::Result<()> {
    let file = fs::File::open("input.txt")?;
    let reader = io::BufReader::new(file);

    let mut score = 0;

    for line in reader.lines() {
        let line = line?;

        let mut parts = line.split(" ");
        let opponent = parts.next().unwrap();
        let me = parts.next().unwrap();

        /*
            A/X = rock
            B/Y = paper
            C/Z = scissors
        */


        let win_score = match(opponent, me) {
            ("A", "Z") | ("B", "X") | ("C", "Y") => 0,
            ("A", "Y") | ("B", "Z") | ("C", "X") => 6,
            _ => 3,
        };
        println!("win_score {}", win_score);
        score += win_score;

        let extra_score = match me {
            "X" => 1,
            "Y" => 2,
            "Z" => 3,
            _ => 0
        };
        println!("extra_score {} {}", me, extra_score);
        score += extra_score;
    }

    println!("score {}", score);
    Ok(())
}
use anyhow::Result;
use substreams_ethereum::Abigen; 

fn main() -> Result<(), anyhow::Error> {
    Abigen::new("GovernorBravo", "abi/governorbravo.json")?
        .generate()?
        .write_to_file("src/abi/governorbravo.rs")?;

    Ok(())
}
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct FlightFactorDefaultValues {
    empty_weight: i32,
    max_cargo: i32,
    pallets: i32,
    weight: i32,
}

const B752: FlightFactorDefaultValues = FlightFactorDefaultValues {
    empty_weight: 117500,
    max_cargo: 35000,
    pallets: 15,
    weight: 3840,
};

const B763: FlightFactorDefaultValues = FlightFactorDefaultValues {
    empty_weight: 198000,
    max_cargo: 99999,
    pallets: 13,
    weight: 9800,
};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

enum FlightFactorAircraft {
    B752,
    B763,
}

#[derive(Serialize, Deserialize)]
struct TotalWeights {
    pallets: i32,
    cargo: i32,
    zfw: i32,
}

#[derive(Serialize, Deserialize)]
struct FlightFactorWeights {
    max: TotalWeights,
    balanced: TotalWeights,
    min: TotalWeights,
}

fn get_enum(string: &str) -> FlightFactorAircraft {
    let mut new_enum = FlightFactorAircraft::B763;
    match string {
        "B752" => new_enum = FlightFactorAircraft::B752,
        "B763" => new_enum = FlightFactorAircraft::B763,
        _ => new_enum = FlightFactorAircraft::B752,
    }

    new_enum
}

fn do_math(payload: i32, aircraft: FlightFactorDefaultValues) -> TotalWeights {
    let pallets = payload / aircraft.weight;
    let pallet_weight = pallets * aircraft.weight;
    let cargo = payload - pallet_weight;
    let zfw = aircraft.empty_weight + payload;

    TotalWeights {
        pallets,
        cargo,
        zfw,
    }
}

#[tauri::command]
fn calculate_weight(payload: i32, icao: &str) -> TotalWeights {
    let aircraft = get_enum(icao);
    let mut total = TotalWeights {
        pallets: 10,
        cargo: payload,
        zfw: 0,
    };

    match aircraft {
        FlightFactorAircraft::B752 => total = do_math(payload, B752),
        FlightFactorAircraft::B763 => total = do_math(payload, B763),
    }

    total
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![calculate_weight])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

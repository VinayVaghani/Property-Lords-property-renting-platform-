//  file for save all listing data in DB

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/PropertyLords";

main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const categories = ["Trending", "Rooms", "Iconic Cities", "Mountains", "Castles", "Amazing Pools", "Camping", "Farms", "Domes", "Boats"];

const getCategory = (title, desc) => {
    title = title.toLowerCase();
    desc = desc ? desc.toLowerCase() : "";
    if (title.includes("cabin") || title.includes("treehouse") || desc.includes("forest") || desc.includes("tent")) {
        return "Camping";
    } else if (title.includes("mountain") || title.includes("ski") || title.includes("chalet") || title.includes("alps")) {
        return "Mountains";
    } else if (title.includes("castle")) {
        return "Castles";
    } else if (title.includes("beach") || title.includes("pool") || title.includes("lake") || title.includes("ocean") || title.includes("sea")) {
        return "Amazing Pools";
    } else if (title.includes("loft") || title.includes("apartment") || title.includes("room") || title.includes("studio")) {
        return "Rooms";
    } else if (title.includes("villa") || title.includes("historic") || title.includes("town") || title.includes("city")) {
        return "Iconic Cities";
    } else if (title.includes("farm") || title.includes("ranch") || desc.includes("cow") || desc.includes("farm")) {
        return "Farms";
    } else if (title.includes("dome")) {
        return "Domes";
    } else if (title.includes("boat") || title.includes("houseboat") || title.includes("yacht")) {
        return "Boats";
    }
    return categories[Math.floor(Math.random() * categories.length)];
};

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "6a3b7161b9754c2a63a4121b", // Fallback owner ID or local user ID
        category: getCategory(obj.title, obj.description)
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();
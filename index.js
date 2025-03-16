const express = require("express");
const axios = require("axios");
const redis = require("redis");
const cors = require("cors");

const DEFAULT_EXPIRATION = 3600; // Cache trong 1 giờ

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Kết nối Redis
const redisClient = redis.createClient();
redisClient.connect().catch(console.error);

// Middleware kiểm tra cache
async function getOrSetCache(key, callback) {
    const cacheData = await redisClient.get(key);
    if (cacheData) {
        console.log("Cache Hit");
        return JSON.parse(cacheData);
    }
    console.log("Cache Miss");
    const freshData = await callback();
    await redisClient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
    return freshData;
}

// API lấy danh sách ảnh theo albumId
app.get("/photos", async (req, res) => {
    const albumId = req.query.albumId;

    const data = await getOrSetCache(`photos?albumId=${albumId}`, async () => {
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/photos", {
            params: { albumId },
        });
        return data;
    });

    res.json(data);
});

// API lấy ảnh theo ID
app.get("/photos/:id", async (req, res) => {
    const { id } = req.params;

    const data = await getOrSetCache(`photo:${id}`, async () => {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`);
        return data;
    });

    res.json(data);
});

// Chạy server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

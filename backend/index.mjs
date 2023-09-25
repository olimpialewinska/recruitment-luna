import express from "express";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const modules = [
    {
        id: "0a0f77eb1-50a0-4d98-8116-064fc5a84693",
        name: "Hydroponic module 1",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nullam non nisi est sit amet.",
        available: true,
        targetTemperature: 10.0,
    },
    {
        id: "4d0aa62c-b1a9-489d-b4a2-fc16b878ba47",
        name: "Hydroponic module 2",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla aliquet enim tortor at auctor.",
        available: false,
        targetTemperature: 15.5,
    },
    {
        id: "d4928094-8ef8-48be-823a-4cddef643249",
        name: "Hydroponic module 3",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam in arcu cursus euismod quis viverra nibh cras.",
        available: true,
        targetTemperature: 20.0,
    },
];

app.get("/ping", (_, res) => {
    res.status(200).json("pong!");
});

app.get("/modules", (_, res) => {
    res.status(200).json(
        modules.map(({ id, name, available, targetTemperature }) => ({
            id,
            name,
            available,
            targetTemperature,
        })),
    );
});

app.get("/modules/:id", (req, res) => {
    const id = req.params.id;
    const module = modules.find(module => module.id === id);
    if (!module) {
        return res.status(404).send("No module with the provided id");
    }
    res.status(200).json(module);
});

app.post("/modules", (req, res) => {
    const { name, description, targetTemperature } = req.body;
    if (!name || !description || !targetTemperature) {
        return res.status(400).send("Missing required parameters");
    }

    const module = {
        id: crypto.randomUUID(),
        name,
        description,
        targetTemperature,
        available: true,
    };

    modules.push(module);
    res.status(201).json(module);
});

app.patch(`/modules/:id`, (req, res) => {
    const id = req.params.id;

    const module = modules.find(module => module.id === id);
    if (!module) {
        return res.status(404).send("No module with the provided id");
    }

    const { name, description, targetTemperature } = req.body;

    if (name) {
        module.name = name;
    }
    if (description) {
        module.description = description;
    }
    if (targetTemperature) {
        module.targetTemperature = targetTemperature;
    }

    res.status(200).json(module);
});

const httpServer = app.listen(3001, listen);

function listen() {
    const { address, port } = httpServer.address();
    console.log(`Listening at ${address}:${port}`);
}

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", socket => {
    console.log(`WebSocket client connected: ${socket.id}`);
    socket.emit("msg", "Conected to server");

    socket.on("disconnect", () => {
        console.log(`WebSocket client disconnected: ${socket.id}`);
    });
});

setInterval(() => {
    const message = modules
        .filter(module => module.available)
        .map(({ id, targetTemperature }) => ({
            id,
            temperature: Number((targetTemperature + Math.random() * 2 - 1).toFixed(1)),
        }));

    io.emit("moduleUpdate", message);
}, 1000);

import { ObjectId } from "mongodb";
import { client } from "../Db/db.js";

export default function taskEndpoints(app) {
  const collection = client.db("todoApp").collection("tasks");

  // POST /tasks
  app.post("/tasks", async (req, res) => {
    try {
      const { task } = req.body;
      if (!task) return res.status(400).json({ error: "Task is required" });

      const result = await collection.insertOne({
        task,
        createdAt: new Date()
      });

      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add task" });
    }
  });

  // GET /tasks
  app.get("/tasks", async (req, res) => {
    try {
      const tasks = await collection.find().toArray();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });

  // DELETE /tasks/:id
  app.delete("/tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await collection.deleteOne({ _id: new ObjectId(id) });
      res.json({ message: "Task deleted" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete task" });
    }
  });
}

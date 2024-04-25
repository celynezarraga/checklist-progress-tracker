import express, { Application, Request, Response } from "express";

const PORT = 3030;

const app: Application = express();


app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Hello world!!!"
    });
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server has started at port: ${PORT}`);
});

export default app;
import express from 'express';

const app = express();
app.use(express.json());

const PORT = 3000;
let cnt = 0;


app.get('/', (req, res) => {
    cnt++;
    res.send({hello: 'world', cnt}); // cnt: cnt  abb. cnt
})

app.post('/', (req, res) => {
    cnt--;
    res.send({hello: 'world', cnt});
})

app.post('/stats', (req, res) => {
    const body: number[] = req.body;
    let sum = 0;
    let avg = 0;

    [sum, avg] = computedSumAndAvg(body);

    return res.send({
        Sum: sum,
        Average: avg
    });
})

app.post('/reply', (req, res) => {
    const body = req.body;
    console.log(body);

    res.send({body: body});
})

app.listen(PORT, () => {
    console.log('🚀 Server started at http://localhost:3000');

});






/////////////////////////////// FUNCTIONS //////////////////////////////

const computedSumAndAvg = (nums: number[]): [number, number]=>{
    let sum = 0;
    nums.forEach(num => {
        sum+=num;
    });
    const avg = sum / nums.length;
    return [sum, avg];
}

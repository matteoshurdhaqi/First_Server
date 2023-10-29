import express from 'express';

const app = express();

let count = 0;

app.get('/', (req, res) => {
    const minus = Number(req.query.minus);
    
    Number.isInteger(minus) ? count -= minus : count ++;
   
    console.log(req.query);
    
    return res.send(`
    <h1>Ciao belli</h1>
    <h3>Questo è il mio primo server!!!</h3>
    <p>Numero di accessi: ${count}</p>
    `) 
})

app.get('/diff/:n1/:n2', (req, res)=>{
    const n1 = Number(req.params.n1);
    const n2 = Number(req.params.n2);
    if(Number.isNaN(n1) || Number.isNaN(n2)){
        return res.status(400).send(`<h1>Error: 400</h1> <h2>Bad Request</h2><p>La richiesta non può essere soddisfatta a causa di errori di sintassi.</p>`)
    }else{
        const diff = n1 - n2;
        return res.send(`<h1>Pagina Somma</h1> <p>${n1} + ${n2} = ${diff}</p>`)
    }
 
})
app.get('/sum/:n1/:n2', (req, res)=>{
    const n1 = Number(req.params.n1);
    const n2 = Number(req.params.n2);
    if(Number.isNaN(n1) || Number.isNaN(n2)){
        return res.status(400).send(`<h1>Error: 400</h1> <h2>Bad Request</h2><p>La richiesta non può essere soddisfatta a causa di errori di sintassi.</p>`)
    }else{
        const sum = n1 + n2;
        return res.send(`<h1>Pagina Somma</h1> <p>${n1} + ${n2} = ${sum}</p>`)
    }
})

app.get('/stats', (req, res)=>{
    let nums = (req.query.nums as string[]).map((n)=> Number(n));
    let sum = 0;
    
    nums.forEach(num => {
       return sum += num;
    });

    let avg = sum / nums.length;

    res.send(`
        <h1>Stats</h1>
        <p>Somma = ${sum}</p>
        <p>Media = ${avg}</p>
    `)
  
})

//considera tutti gli altri link inseriti e se nessuno degli altri ha funzionato
app.get('*', (req, res)=> {
    return res.status(404).send(`<h1>Error: 404</h1> <p>Page not Found</p>`)
})

app.listen(3000, () => {
    console.log('🚀 Server started at http://localhost:3000');
});


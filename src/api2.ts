import express from 'express';

const app = express();
app.use(express.json());

const PORT = 3000;


interface BlogPost{
    id: number;
    title: string;
    body: string;
    date: Date;
    draft: boolean;
}

const posts: BlogPost[] = [
    {
        id: 0,
        title: 'First post',
        body: 'This is the first post',
        date: new Date(),
        draft: false,
    },
    {
        id: 1,
        title: 'Second post',
        body: 'This is the second post',
        date: new Date(),
        draft: false,
    },
]

// app.get('/posts', (req, res) => {
//     res.send(posts);
// });

app.get('/posts/:id', (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find((post) => post.id === id);
    !post ? res.status(404).send({Error: 'No post found'}) : res.send(post);
})

app.listen(PORT, () => {
    console.log('🚀 Server started at http://localhost:3000');
});
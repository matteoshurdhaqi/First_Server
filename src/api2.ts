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

type BlogData = Pick<BlogPost, 'title' | 'body'>;

const validateInputMiddelware: express.RequestHandler = (req, res, next) => {
    const postData: BlogData = req.body;
    if(!postData.title){
        res.status(403).send({Error: 'Title field is required'});
    }
    if(!postData.body){
        res.status(403).send({Error: 'Body field is required'});
    }

    next();
}

let posts: BlogPost[] = []

// READ
app.get('/posts', (req, res) => {
    res.send(posts);
});

app.get('/posts/:id', (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find((post) => post.id === id);
    !post ? res.status(404).send({Error: 'No post found'}) : res.send(post);
})
// CREATE
app.post('/posts/',validateInputMiddelware, (req, res) => {
    const postData: BlogData = req.body;

    const lastPost = posts[posts.length - 1];

    const newPost: BlogPost = {
        id: lastPost ? lastPost.id + 1 : 0,
        date: new Date(),
        draft: false,
        title: postData.title,
        body: postData.body
    };
    posts.push(newPost);
    return res.status(201).send(newPost);
});
// DELETE
app.delete('/posts/:id', (req, res) => {
    const id = Number(req.params.id);
    const postToDelete = posts.find((post) => post.id === id);
    !postToDelete ? res.status(404).send({Error: 'No post found'}) : posts = posts.filter(post => post.id != postToDelete.id);
    return res.status(204).send(postToDelete);
});
// UPDATE
app.put('/posts/:id', validateInputMiddelware, (req, res) => {
    const id = Number(req.params.id);
    const postData: BlogData = req.body;
    
    const postToUpdateIndex = posts.findIndex((post) => post.id === id);
    !postToUpdateIndex ? res.status(404).send({Error: 'No post found'}) : posts[postToUpdateIndex] = {...posts[postToUpdateIndex], title: postData.title, body: postData.body};
    return res.send(posts[postToUpdateIndex]);
})



app.listen(PORT, () => {
    console.log('🚀 Server started at http://localhost:3000');
});
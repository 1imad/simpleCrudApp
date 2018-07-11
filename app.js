const   Express = require('express'),
        bodyParser = require('body-parser'),
        methodOverride = require('method-override'),
        mongoose = require('mongoose');
        port = process.env.PORT || 3000,
        app = Express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(Express.static('public'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/demo');

var dataSchema = new mongoose.Schema({
    name: String,
    age: Number
});

var data = mongoose.model('data', dataSchema);

app.get('/', (req, res) =>{
    data.find({}, (err, data)=>{
        if(err){
            console.log(err)
        }else{
        res.render('index', {data: data});        
        }
    })
})

app.post('/add', (req, res) => {
    let formData = req.body;
    data.create(formData, (err, formData)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/');
        }
    })
});
app.get('/update/:id', (req, res)=>{
    data.findById(req.params.id, (err, data) => {
        if(err){
            console.log(err);
        }else{
        }
        res.render('update', {data: data});
    })
})
app.put('/update/:id', (req, res) => {
    let formData = req.body;
    console.log(formData);
    data.update({_id: req.params.id},{name: formData.name, age: formData.age}, (err) => {
        if(err){
            console.log(err)
        }else{
            res.redirect('/')
        }
    });
});
app.delete('/delete/:id', (req, res)=>{
    data.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    });
});

app.listen(port, () => {
    console.log('App is listening at ' + port);
})
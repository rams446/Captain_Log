    require('dotenv').config();
    const express = require('express');
    const app = express();
    const PORT = process.env.PORT || 3000;
    const { connect, connection } = require('mongoose');
    const methodOverride = require('method-override');
    const Log = require('./models/logs')
   

    // Database connection
    connect(process.env.MONGO_URI, {
        // Having these two properties set to true is best practice when connecting to MongoDB
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection.once('open', () => {
        console.log('connected to mongo');
    });

    // View Engine Middleware Configure
    const reactViewsEngine = require('jsx-view-engine').createEngine();
    app.engine('jsx', reactViewsEngine);
    // This line tells the render method the default file extension to look for.
    app.set('view engine', 'jsx');
    // This line sets the render method's default location to look for a jsx file to render. Without this line of code we would have to specific the views directory everytime we use the render method
    app.set('views', './views');

    // Middleware
    app.use(express.urlencoded({ extended: false })); // This enables the req.body
   // after app has been defined
   // use methodOverride.  We'll be adding a query parameter to our delete form named _method
    app.use(methodOverride('_method'));
    // this tells the server to go look for static assests in public folder app.css
    app.use(express.static('public'));
    // Custom Middleware
    app.use((req, res, next) => {
    console.log('Middleware running...');
    next();
    });

    //=======INDUCES========
// Index
app.get('/logs', async (req, res) => {
    console.log('Index Controller Func. running...');
    try {
      const foundLog= await Log.find({});
      res.status(200).render('Index', { logs: foundLog });
    } catch (err) {
      res.status(400).send(err);
    }
  });



// New // renders a form to create a new Log
app.get('/logs/new', (req, res) => {
    res.render('New');
  });

  // Delete // recieves the id of the fruit document and deletes it, after that it will redirect back to the Index.
app.delete('/logs/:id', async (req, res) => {
    try {
      await Log.findByIdAndDelete(req.params.id); // grabbing _id from params, it is given value on the Index.jsx page (ln. 29(template literal))
      res.status(200).redirect('/logs');
    } catch (err) {
      res.status(400).send(err);
    }
  });

  //Update/PUT
app.put('/logs/:id', async (req, res) => {
    try {
      const updatedLog= await Log.findByIdAndUpdate(
        // id grabbed from the url, check ln 15 on Edit.jsx
        req.params.id,
        // Data from Edit form
        req.body,
        // Need this to prevent a delay in the update
        { new: true }
      );
      console.log(updatedLog);
      // Redirect to that fruit's show page
      res.redirect(`/logs/${req.params.id}`);
    } catch (err) {
      res.status(400).send(err);
    }
  });


//Create 
app.post('/logs', async(req,res) => {
try {
const newLog = await Log.create(req.body)
console.log(newLog)
} catch (err) {
    res.status(400).send(err);
}
});



// Edit
app.get('/logs/:id/edit', async (req, res) => {
    try {
      // finding the document that we are about to edit, giving the Edit.jsx the document found through props
      const foundLog = await Log.findById(req.params.id);
      res.render('Edit', {
        logs: foundLog,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  });
  

//Show 

app.get('/logs/:id', async (req, res) => {
    try {
      // We are using the id given to us in the URL params to query our database.
      const foundLog = await Log.findById(req.params.id);
      res.render('Show', {
        //second param must be an object
        log: foundLog,
        //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
      });
    } catch (err) {
      res.status(400).send(err);
    }
  });
  

    
    // Listen
    app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
    });
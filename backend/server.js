// require('dotenv').config()
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const activityRoutes = require('./routes/activityRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const fitbitRoutes = require('./routes/fitbitRoutes');
const recipeRoutes = require('./routes/recipeRoutes')
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

mongoose.connect(
  `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
).then(() => console.log('MongoDB Connected')).catch((err) => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/v1/fitbit', fitbitRoutes);
app.use('/api/recipes', recipeRoutes);

dotenv.config();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


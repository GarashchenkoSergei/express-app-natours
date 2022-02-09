const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());

const simpleToursPath = `${__dirname}/dev-data/data/tours-simple.json`;

const tours = JSON.parse(
  fs.readFileSync(simpleToursPath),
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 200,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const tourId = req.params.id * 1;
  const tour = tours.find((el) => el.id === tourId);

  if (!tour) {
    return res.status(404).json({
      status: 404,
      message: 'No such tour, Invalid ID number',
    });
  }

  return res.status(200).json({
    status: 200,
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };

  tours.push(newTour);

  fs.writeFile(simpleToursPath, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 404,
      message: 'Failed, Invalid ID number',
    });
  }

  return res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour will be here...>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 404,
      message: 'Failed, Invalid ID number',
    });
  }

  return res.status(204).json({
    status: 'success',
    data: null,
  });
};

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening port: ${port}...`);
});

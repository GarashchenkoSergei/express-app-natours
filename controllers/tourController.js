const fs = require('fs');

const simpleToursPath = `${__dirname}/../dev-data/data/tours-simple.json`;
const tours = JSON.parse(
  fs.readFileSync(simpleToursPath),
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 200,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
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
    requestedAt: req.requestTime,
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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

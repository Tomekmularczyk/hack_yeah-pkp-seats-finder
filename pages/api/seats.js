const SEATS_AVAILABLE = 3;

let seatsTaken = 0;

const handleGETNrOfSeats = (req, res) => {
  res.status(200).json({
    seatsTaken,
    emptySeats: seatsTaken > SEATS_AVAILABLE ? 0 : SEATS_AVAILABLE - seatsTaken
  });
};

const handlePOSTNrOfSeats = (req, res) => {
  const { nrOfPeople } = req.body;
  seatsTaken = nrOfPeople;
  return res.status(200).json({ message: "Updated" });
};

export default (req, res) => {
  switch (req.method) {
    case "GET": {
      return handleGETNrOfSeats(req, res);
    }
    case "POST": {
      return handlePOSTNrOfSeats(req, res);
    }
    default:
      return res.status(400).json({ message: "Unknown method" });
  }
};

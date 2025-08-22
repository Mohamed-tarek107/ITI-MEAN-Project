import { Watch } from "../../../db/models/watchList.model.js";


const getWatchlist = async (req, res) => {
  try {
    const watchlist = await Watch.find();
    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving watchlist' });
  }
}

const addToWatchlist = async (req, res) => {
  try {
    const newWatch = new Watch(req.body);
    await newWatch.save();
    res.status(201).json(newWatch);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to watchlist' });
  }
}

const removeFromWatchlist = async (req, res) => {
  try {
    const deletedWatch = await Watch.findByIdAndDelete(req.params.id);
    if (!deletedWatch) {
      return res.status(404).json({ message: 'Watchlist item not found' });
    }
    res.json({ message: 'Watchlist item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting watchlist item' });
  }
}

export {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist
}
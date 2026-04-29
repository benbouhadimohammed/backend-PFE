const pool = require('../config/db')

const getStats = async (req, res) => {
  try {
    const users    = await pool.query('SELECT COUNT(*) FROM users')
    const annonces = await pool.query('SELECT COUNT(*) FROM annonces')
    const posts    = await pool.query('SELECT COUNT(*) FROM forum_post')

    res.json({
      users:    parseInt(users.rows[0].count),
      annonces: parseInt(annonces.rows[0].count),
      posts:    parseInt(posts.rows[0].count),
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM users'
    )
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM users WHERE id_user = $1', [id])
    res.json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


const getAllAnnonces = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM annonces '
    )
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteAnnonce = async (req, res) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM annonces WHERE id_annonce = $1', [id])
    res.json({ message: 'Annonce deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


const getAllPosts = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM forum_post '
    )
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deletePost = async (req, res) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM forum_post WHERE id_forum = $1', [id])
    res.json({ message: 'Post deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getStats,
  getAllUsers,
  deleteUser,
  getAllAnnonces,
  deleteAnnonce,
  getAllPosts,
  deletePost,
}
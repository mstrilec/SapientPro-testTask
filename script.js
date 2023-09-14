const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(bodyParser.json());

// Поміняйте username та password під свою базу даних

const sequelize = new Sequelize('user_address_db', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});


const Address = sequelize.define('Address', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  country: { type: DataTypes.STRING, allowNull: false },
  state: DataTypes.STRING,
  city: { type: DataTypes.STRING, allowNull: false },
  zipCode: { type: DataTypes.INTEGER, allowNull: false, validate: { len: [5, 5] } },
  address: { type: DataTypes.TEXT, allowNull: false },
});

const User = sequelize.define('User', {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: { type: DataTypes.STRING, allowNull: false },
  birthday: DataTypes.DATE,
  image: { type: DataTypes.STRING, allowNull: false },
});


app.post('/addresses', async (req, res) => {
  try {
    const newAddress = await Address.create(req.body);
    res.status(201).json(newAddress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при створенні адреси' });
  }
});

app.get('/addresses', async (req, res) => {
  try {
    const allAddresses = await Address.findAll();
    res.json(allAddresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при отриманні адрес' });
  }
});

app.get('/addresses/:id', async (req, res) => {
  const addressId = req.params.id;
  try {
    const address = await Address.findByPk(addressId);
    if (!address) {
      res.status(404).json({ error: 'Адреса не знайдена' });
    } else {
      res.json(address);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при отриманні адреси' });
  }
});

app.put('/addresses/:id', async (req, res) => {
  const addressId = req.params.id;
  try {
    const updatedAddress = await Address.update(req.body, { where: { id: addressId } });
    if (updatedAddress[0] === 0) {
      res.status(404).json({ error: 'Адреса не знайдена' });
    } else {
      res.json({ message: 'Адреса успішно оновлена' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при оновленні адреси' });
  }
});

app.delete('/addresses/:id', async (req, res) => {
  const addressId = req.params.id;
  try {
    const deletedAddress = await Address.destroy({ where: { id: addressId } });
    if (!deletedAddress) {
      res.status(404).json({ error: 'Адреса не знайдена' });
    } else {
      res.json({ message: 'Адреса успішно видалена' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при видаленні адреси' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при отриманні користувачів' });
  }
});

app.post('/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при створенні юзера' });
  }
});

app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ error: 'Юзер не знайдений' });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при отриманні юзера' });
  }
});

app.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await User.update(req.body, { where: { id: userId } });
    if (updatedUser[0] === 0) {
      res.status(404).json({ error: 'Юзер не знайдений' });
    } else {
      res.json({ message: 'Юзер успішно оновлений' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при оновленні юзера' });
  }
});

app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.destroy({ where: { id: userId } });
    if (!deletedUser) {
      res.status(404).json({ error: 'Юзер не знайдений' });
    } else {
      res.json({ message: 'Юзер успішно видалений' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при видаленні юзера' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const request = require('supertest');
const app = require('../app');
const axios = require("axios");

// From models 
const { User, Book, Favourite, sequelize } = require('../models');
const { queryInterface } = sequelize;

const { createToken } = require('../helper/jwt');
const { hashPassword } = require('../helper/bcrypt');

let userTestingToken;
let userTesting;
let aadilToken;
let aadilId;
let book1;
let bookNotFound;

beforeAll(async () => {
    try {
        // User
        let user = require('../data/user.json').map((item) => {
            delete item.id;
            item.createdAt = item.updatedAt = new Date();
            item.password =  hashPassword(item.password);
            return item;
        });
        await queryInterface.bulkInsert('Users', user);

        let aadil = await User.findOne({ where: { username: 'aadil' } });
        userTesting = await User.create({
            username: "testing2",
            email: "testing2@mail.com",
            password:  "testingtesting2",
        });

        aadilToken = createToken({
            id : aadil.id
        });

        aadilId = aadil.id;

        userTestingToken = createToken({
            id : userTesting.id
        });

        // Book
        let fetchBook = await axios.get('https://potterapi-fedeperin.vercel.app/en/books')
        let book = fetchBook.data.map((item) => {
            let actualPrice;
            if (item.title == `Harry Potter and the Sorcerer's Stone`) {
                actualPrice = 227000
            } else if (item.title == `Harry Potter and the chamber of secrets`) {
                actualPrice = 227000
            } else if (item.title == `Harry Potter and the Prisoner of Azkaban`) {
                actualPrice = 136000
            } else if (item.title == `Harry Potter and the Goblet of Fire`) {
                actualPrice = 205000
            } else if (item.title == `Harry Potter and the Order of the Phoenix`) {
                actualPrice = 260000
            } else if (item.title == `Harry Potter and the Half-Blood Prince`) {
                actualPrice = 245000
            } else if (item.title == `Harry Potter and the Deathly Hallows`) {
                actualPrice = 296000
            } else if (item.title == `Harry Potter and the Cursed Child`) {
                actualPrice = 168000
            }
            return {
                id: item.number,
                title: item.title,
                author: "J. K. Rowling",
                releaseDate: item.releaseDate,
                imageUrl: item.cover,
                description: item.description,
                price: actualPrice,
                pages: item.pages,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });

    await queryInterface.bulkInsert('Books', book, {});

        book1 = await Book.findOne({ where: { id: 1 } });
        bookNotFound = await Book.findOne({ where: { id: 10 } });
    } catch (err) {
        console.log('--------->>>>>', err)
    }
})

describe('TESTING ALL', () => {
    describe('USER Testing', () => {
        describe('POST /register', () => {
            describe('Success Register', () => {
                test('Should return status 201', async () => {
                    const { body, status } = await request(app)
                    .post('/register')
                    .send({
                        username: "testing",
                        email: "testing@mail.com",
                        password:  "testingtesting",
                        phoneNumber : "111-111-111",
                    });

                    expect(status).toBe(201);
                    expect(body).toMatchObject({
                        username: expect.any(String),
                        email: expect.any(String),
                        role: expect.any(String),
                    });
                });
            });

            describe('Failed Register Username Bad Request', () => {
                test('Should return status 400', async () => {
                    const { body, status } = await request(app)
                    .post('/register')
                    .send({
                        username: "",
                        email: "testing@mail.com",
                        password:  "testingtesting",
                        phoneNumber : "111-111-111",
                    });

                    expect(status).toBe(400);
                    expect(body).toBeInstanceOf(Object);
                    expect(body).toHaveProperty('message', `Username is required`);
                });
            });

            describe('Failed Register Email Bad Request', () => {
                test('Should return status 400', async () => {
                    const { body, status } = await request(app)
                    .post('/register')
                    .send({
                        username: "testing",
                        password:  "testingtesting",
                        phoneNumber : "111-111-111",
                    });

                    expect(status).toBe(400);
                    expect(body).toBeInstanceOf(Object);
                    expect(body).toHaveProperty('message', `Email is required`);
                });
            });

            describe('Failed Register Password Bad Request', () => {
                test('Should return status 400', async () => {
                    const { body, status } = await request(app)
                    .post('/register')
                    .send({
                        username: "testing",
                        email: "testing@mail.com",
                        password: ""
                    });

                    console.log({ body, status })
                    expect(status).toBe(400);
                    expect(body).toBeInstanceOf(Object);
                    expect(body).toHaveProperty('message', `Password is required`);
                });
            });

            describe('Failed Register Password too Short', () => {
                test('Should return status 400', async () => {
                    const { body, status } = await request(app)
                    .post('/register')
                    .send({
                        username: "testing",
                        email: "testing@mail.com",
                        password:  "test",
                        phoneNumber : "111-111-111",
                    });
                    
                    expect(status).toBe(400);
                    expect(body).toBeInstanceOf(Object);
                    expect(body).toHaveProperty('message', `Password must be at least 8 characters`);
                })
            })

            describe('Failed Register Invalid Email Format', () => {
                test('Should return status 400', async () => {
                    const { body, status } = await request(app)
                    .post('/register')
                    .send({
                        username: "testing",
                        email: "testing",
                        password:  "testingtesting",
                        phoneNumber : "111-111-111",
                    });
                    
                    expect(status).toBe(400);
                    expect(body).toBeInstanceOf(Object);
                    expect(body).toHaveProperty('message', `Invalid Email format`);
                })
            })

            describe('Failed Register Email is already Exists', () => {
                test('Should return status 400', async () => {
                    const { body, status } = await request(app)
                    .post('/register')
                    .send({
                        username: "testing",
                        email: "testing@mail.com",
                        password:  "testingtesting",
                        phoneNumber : "111-111-111",
                    });
                    
                    expect(status).toBe(400);
                    expect(body).toBeInstanceOf(Object);
                    expect(body).toHaveProperty('message', `Email is already Exists`);
                })
            })
        });

        describe('POST /login', () => {
            describe('Success Login', () => {
                test('Should return status 200', async () => {
                    const { body, status } = await request(app)
                    .post('/login')
                    .send({
                        username: "testing2",
                        email: "testing2@mail.com",
                        password:  "testingtesting2",
                    });
                    
                    expect(status).toBe(200);
                    expect(body).toMatchObject({
                        access_token: expect.any(String),
                    });
                });
            })

            describe('Failed Login Bad Request', () => {
                test('Should return status 400 : required body', async () => {
                    const { body, status } = await request(app)
                    .post('/login')
                    .send({
                        username: "",
                        email: "",
                        password:  "",
                    });
                    
                    expect(status).toBe(400);
                    expect(body).toBeInstanceOf(Object);
                    expect(body).toHaveProperty('message', `Username, Email or Password is required`);
                })
            })

            describe('Failed Login Invalid username or email', () => {
                test('Should return status 400 : invalid user', async () => {
                    const { body, status } = await request(app)
                    .post('/login')
                    .send({
                        username: "zugazuga",
                        email: "zugazuga@mail.com",
                        password:  "testingtesting2",
                    });

                    expect(status).toBe(400);
                    expect(body).toBeInstanceOf(Object);
                    expect(body).toHaveProperty('message', `Username, Email or Password is invalid`);
                })
            })

            describe('Failed Login Invalid password', () => {
                test('Should return status 400 : invalid user', async () => {
                    const { body, status } = await request(app)
                    .post('/login')
                    .send({
                        username: "testing2",
                        email: "testing2@mail.com",
                        password:  "zugazuga",
                    });

                    expect(status).toBe(400);
                    expect(body).toBeInstanceOf(Object);
                    expect(body).toHaveProperty('message', `Username, Email or Password is invalid`);
                })
            })
        });
    });

    describe('MAIN Testing', () => {
        describe('GET /books', () => {
            describe('Success GET /books', () => {
                test('Should return status 200', async () => {
                    const { body, status } = await request(app)
                    .get('/books');

                    expect(status).toBe(200);
                    expect(body).toBeInstanceOf(Array);    
                });
            });
        });

        describe('GET /books/:id', () => {
            describe('Success GET /books/:id', () => {
                test('Should return status 200', async () => {
                    const { body, status } = await request(app)
                   .get('/books/1');

                    expect(status).toBe(200);
                    expect(body).toBeInstanceOf(Object);
                })
            });

            describe('Failed GET /books/:id', () => {
                test('Should return status 404', async () => {
                    const { body, status } = await request(app)
                   .get('/books/100');

                    expect(status).toBe(404);
                    expect(body).toBeInstanceOf(Object);
                })
            });
        });

        describe('GET /favourites', () => {
            describe('Success GET /books', () => {
                test('Should return status 200', async () => {
                    const { body, status } = await request(app)
                    .get('/favourites')
                    .set('Authorization', `Bearer ${aadilToken}`)
                    
                    expect(status).toBe(200);
                    expect(body).toBeInstanceOf(Array);
                });
            });
        });

        describe('POST /favourites/:bookId', () => {
            describe('Success POST /favourites/:bookId', () => {
                test('Should return status 200', async () => {
                    let quantity = 1;
                    const { body, status } = await request(app)
                    .post('/favourites/1')
                    .set('Authorization', `Bearer ${aadilToken}`)
                    .send({
                        userId: aadilId,
                        bookId: book1.dataValues.id,
                        quantity: quantity,
                        totalPrice: quantity*book1.dataValues.price
                    });
                    
                    expect(status).toBe(201);
                    expect(body).toBeInstanceOf(Object);
                });
            });

            describe('Failed Not Login', () => {
                test('Should return status 401', async () => {
                    let quantity = 1;
                    const { body, status } = await request(app)
                    .post('/favourites/1')
                    .send({
                        userId: aadilId,
                        bookId: book1.dataValues.id,
                        quantity: quantity,
                        totalPrice: quantity*book1.dataValues.price
                    });
                
                    expect(status).toBe(401);
                    expect(body).toBeInstanceOf(Object);
                    expect(body).toHaveProperty('message', `Unauthenticated User`);
                });
            });

            describe('Failed No Bearer', () => {
                test('Should return status 401', async () => {
                    let quantity = 1;
                    const { body, status } = await request(app)
                    .post('/favourites/1')
                    .set('Authorization', `Be ${aadilToken}`)
                    .send({
                        userId: aadilId,
                        bookId: book1.dataValues.id,
                        quantity: quantity,
                        totalPrice: quantity*book1.dataValues.price
                    });

                    expect(status).toBe(401);
                    expect(body).toBeInstanceOf(Object);
                    expect(body).toHaveProperty('message', `Unauthenticated User`);
                });
            });

            describe('Failed Book Not Found', () => {
                test('Should return status 404', async () => {
                    let quantity = 1;
                    const { body, status } = await request(app)
                   .post('/favourites/10')
                   .set('Authorization', `Bearer ${aadilToken}`)
                   .send({
                        userId: aadilId,
                        bookId: book1.dataValues.id,
                        quantity: quantity,
                        totalPrice: quantity*book1.dataValues.price
                    });

                    expect(status).toBe(404);
                    expect(body).toBeInstanceOf(Object);
                });
            });
        });

        describe('PUT /favourites/:id', () => {
            describe('Success PUT /favourites/:id', () => {
                test('Should return status 200', async () => {
                    await Favourite.create({
                        userId: aadilId,
                        bookId: book1.dataValues.id,
                        quantity: 1,
                        totalPrice: book1.dataValues.price
                    });
                    const { body, status } = await request(app)
                    .put('/favourites/1')
                    .set('Authorization', `Bearer ${aadilToken}`)
                    .send({
                        quantity: 2
                    });

                    expect(status).toBe(200);
                    expect(body).toBeInstanceOf(Object);
                    expect(body).toHaveProperty('message', `Favourite with id 1 has been Updated`);
                });
            });

            describe('Failed Not Login', () => {
                test('Should return status 401', async () => {
                    await Favourite.create({
                        userId: aadilId,
                        bookId: book1.dataValues.id,
                        quantity: 1,
                        totalPrice: book1.dataValues.price
                    });
                    const { body, status } = await request(app)
                    .put('/favourites/1')
                    .send({
                        quantity: 2
                    });

                    expect(status).toBe(401);
                    expect(body).toBeInstanceOf(Object);
                    expect(body).toHaveProperty('message', `Unauthenticated User`);
                });
            })

            describe('Failed No Bearer', () => {
                test('Should return status 401', async () => {
                    await Favourite.create({
                        userId: aadilId,
                        bookId: book1.dataValues.id,
                        quantity: 1,
                        totalPrice: book1.dataValues.price
                    });
                    const { body, status } = await request(app)
                    .put('/favourites/1')
                    .set('Authorization', `Be ${aadilToken}`)
                    .send({
                        quantity: 2
                    });

                    expect(status).toBe(401);
                    expect(body).toBeInstanceOf(Object);
                    expect(body).toHaveProperty('message', `Unauthenticated User`);
                });
            })

            describe('Failed Not Found', () => {
                test('Should return status 404', async () => {
                    await Favourite.create({
                        userId: aadilId,
                        bookId: 1,
                        quantity: 1,
                        totalPrice: 123.000
                    });
                    const { body, status } = await request(app)
                    .put('/favourites/10')
                    .set('Authorization', `Bearer ${aadilToken}`)
                    .send({
                        quantity: 2
                    });

                    expect(status).toBe(404);
                    expect(body).toBeInstanceOf(Object);
                    expect(body).toHaveProperty('message', `Favourite you're looking for doesn't exist`);
                });
            })
        });

        describe('DELETE /favourites/:id', () => {
            describe('Success DELETE /favourites/:id', () => {
                test('Should return status 200', async () => {
                    await Favourite.create({
                        userId: aadilId,
                        bookId: book1.dataValues.id,
                        quantity: 1,
                        totalPrice: book1.dataValues.price
                    });
                    const { body, status } = await request(app)
                   .delete('/favourites/1')
                   .set('Authorization', `Bearer ${aadilToken}`);

                   expect(status).toBe(200);
                   expect(body).toBeInstanceOf(Object);
                   expect(body).toHaveProperty('message', `Favourite with id 1 has been Deleted`);
                });
            });

            describe('Failed Not Login', () => {
                test('Should return status 401', async () => {
                    await Favourite.create({
                        userId: aadilId,
                        bookId: book1.dataValues.id,
                        quantity: 1,
                        totalPrice: book1.dataValues.price
                    });
                    const { body, status } = await request(app)
                   .delete('/favourites/1')

                   expect(status).toBe(401);
                   expect(body).toBeInstanceOf(Object);
                   expect(body).toHaveProperty('message', `Unauthenticated User`);
                });
            });

            describe('Failed No Bearer', () => {
                test('Should return status 401', async () => {
                    await Favourite.create({
                        userId: aadilId,
                        bookId: book1.dataValues.id,
                        quantity: 1,
                        totalPrice: book1.dataValues.price
                    });
                    const { body, status } = await request(app)
                   .delete('/favourites/1')
                   .set('Authorization', `Be ${aadilToken}`);

                   expect(status).toBe(401);
                   expect(body).toBeInstanceOf(Object);
                   expect(body).toHaveProperty('message', `Unauthenticated User`);
                });
            });

            describe('Failed Not Found', () => {
                test('Should return status 404', async () => {
                    const { body, status } = await request(app)
                   .delete('/favourites/1')
                   .set('Authorization', `Bearer ${aadilToken}`);

                   expect(status).toBe(404);
                   expect(body).toBeInstanceOf(Object);
                   expect(body).toHaveProperty('message', `Favourite you're looking for doesn't exist`);
                });
            });
        });
    });
});

afterAll(async () => {
  await queryInterface.bulkDelete('Users', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true
  });

  await queryInterface.bulkDelete('Books', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true
  });

  await queryInterface.bulkDelete('Favourites', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true
  });
});
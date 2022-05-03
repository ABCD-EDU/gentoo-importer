const axios = require('axios').default;
const { parse } = require('csv-parse');
const fs = require('fs');

fs.createReadStream('./users.csv')
  .pipe(parse({ delimiter: ',' }))
  .on('data', (r) => {
    const user = {
      email: r[1],
      username: r[0],
      google_photo: r[3],
      description: r[2],
      birthdate: {
        day: 0,
        month: 0,
        year: 0,
      },
    };

    axios
      .post(
        `http://localhost:8001/v1/register`,
        JSON.stringify(user),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        console.log('WRITTEN TO DB');
      })
      .catch();
  })
  .on('end', () => {
    console.log('FINISHED');
  });

fs.createReadStream('./posts.csv')
  .pipe(parse({ delimiter: ',' }))
  .on('data', (r) => {
    let content = {
      user_id: '66',
      content: r[1],
      created_on: r[0],
    };

    axios
      .post(
        `http://localhost:8002/v1/submit-post`,
        JSON.stringify(content),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        console.log('WRITTEN TO DB');
      })
      .catch(() => {
        console.log('FAIL WRITE');
      });
  })
  .on('end', () => {
    console.log('FINISHED');
  });

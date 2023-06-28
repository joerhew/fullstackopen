const _ = require('lodash');

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item;
  }

  const arrLikes = blogs.map(blog => blog.likes)

  return arrLikes.reduce(reducer, 0);
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const arrLikes = blogs.map(blog => blog.likes);
  const highestLikes = Math.max(...arrLikes);
  const favouriteBlog = blogs.filter(blog => blog.likes === highestLikes);

  return favouriteBlog[0];
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const authorCounts = _.countBy(blogs, 'author');
  const countsArray = _.map(authorCounts, (blogs, author) => ({ author, blogs }));
  const authorWithMostBlogs = _.maxBy(countsArray, 'blogs');

  return authorWithMostBlogs;
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const blogsByAuthor = _.groupBy(blogs, 'author');
  const likesByAuthor = _.map(blogsByAuthor, (blogs, author) => {
    return {
      author,
      likes: _.sumBy(blogs, 'likes'),
    };
  });
  const mostLikesAuthor = _.maxBy(likesByAuthor, 'likes');

  return mostLikesAuthor;
}

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

mostLikes(blogs);

module.exports = {
  totalLikes, favouriteBlog, mostBlogs, mostLikes
}


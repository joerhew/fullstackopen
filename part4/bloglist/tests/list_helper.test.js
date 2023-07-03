const listHelper = require('../utils/list_helper');

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

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

describe('total likes', () => {
  test('of an empty list is 0', () => {
    const list = [];
    const result = listHelper.totalLikes(list);

    expect(result).toBe(0);
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);

    expect(result).toBe(5);
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs);

    expect(result).toBe(36)
  })
})

describe('favourite blog', () => {
  test('of an empty list is null', () => {
    const list = [];
    const result = listHelper.favouriteBlog(list);
    expect(result).toEqual(null);
  })

  test('of a list with a single blog is equal to that blog', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  })

  test('of a bigger list to be corect', () => {
    const result = listHelper.favouriteBlog(blogs);
    const blogWithHighestLiks = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    }

    expect(result).toEqual(blogWithHighestLiks);
  })
})

describe('author with the most blogs', () => {
  test('of an empty list is null', () => {
    const list = [];
    const result = listHelper.mostBlogs(list);
    expect(result).toEqual(null);
  })

  test('of a list with a single blog is equal to the author of that blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }
    expect(result).toEqual(expectedResult);
  })

  test('of a bigger list to be correct', () => {
    const result = listHelper.mostBlogs(blogs);
    const expectedResult = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    expect(result).toEqual(expectedResult);
  })
})

describe('author with the most likes', () => {
  test('of an empty list is null', () => {
    const list = [];
    const result = listHelper.mostLikes(list);
    expect(result).toEqual(null);
  })

  test('of a list with a single blog is equal to the author of that blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    expect(result).toEqual(expectedResult);
  })

  test('of a bigger list to be correct', () => {
    const result = listHelper.mostLikes(blogs);
    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    expect(result).toEqual(expectedResult);
  })
})
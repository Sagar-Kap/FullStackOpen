const _ = require("lodash");

const dummy = (blogs) => {
  return blogs.length;
};

const totalLikes = (blogs) => {
  let likes = 0;
  for (let i in blogs) {
    likes += blogs[i].likes;
  }
  return likes;
};

const favoriteBlog = (blogs) => {
  const sortedArr = blogs.sort((a, b) => b.likes - a.likes);
  const largestObject = sortedArr[0];
  const toReturn = {
    title: largestObject.title,
    author: largestObject.author,
    likes: largestObject.likes,
  };
  return toReturn;
};

const mostBlogs = (blogs) => {
  const groupedBlogs = _.countBy(blogs, "author");

  const authorMost = _.maxBy(Object.keys(groupedBlogs), (key) => {
    return groupedBlogs[key];
  });

  return { author: authorMost, blogs: groupedBlogs[authorMost] };
};

const mostLikes = (blogs) => {
  const groupByAuthopr = _.groupBy(blogs, "author");
  const totalLikes = _.mapValues(groupByAuthopr, (blog) => {
    return blog.reduce((total, single) => {
      return total + single.likes;
    }, 0);
  });

  const mostLiked = _.maxBy(
    Object.entries(totalLikes),
    ([key, value]) => value
  );

  return { author: mostLiked[0], likes: mostLiked[1] };
};

module.exports = {
  dummy,

  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
